import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, Edit2, FileUp, ImagePlus, Plus, RefreshCcw, Sparkles, Trash2, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createBlog, deleteBlog, updateBlog, uploadBlogCoverImage, uploadBlogSourceFile } from '@/services/adminApi';
import { fetchBlogs } from '@/services/contentApi';
import {
  AdminBadge,
  AdminFieldGrid,
  AdminHero,
  AdminList,
  AdminSection,
  AdminSubsection,
  AdminSurface,
  Button,
  EmptyState,
  INITIAL_BLOG,
  Input,
  Textarea,
  formatDate,
  getCategoryName,
  joinClasses,
  toDateInput,
} from '@/components/admin/AdminUI';
import { handleAdminPageError } from '@/components/admin/adminHelpers';

const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const ACCEPTED_SOURCE_MIME_TYPES = new Set([
  'text/plain',
  'text/markdown',
  'text/html',
  'text/rtf',
  'application/rtf',
  'application/pdf',
]);
const ACCEPTED_SOURCE_EXTENSIONS = new Set(['txt', 'md', 'markdown', 'html', 'htm', 'rtf', 'pdf']);
const TEXT_SOURCE_EXTENSIONS = new Set(['txt', 'md', 'markdown', 'html', 'htm', 'rtf']);
const MAX_COVER_FILE_SIZE = 5 * 1024 * 1024;
const MAX_SOURCE_FILE_SIZE = 10 * 1024 * 1024;
const BLOG_SOURCE_ACCEPT = '.txt,.md,.markdown,.html,.htm,.rtf,.pdf';

const formatFileSize = (value) => {
  if (!value) return '0 KB';
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read the selected file.'));
    reader.readAsDataURL(file);
  });

const getFileExtension = (fileName = '') => {
  const parts = String(fileName).toLowerCase().split('.');
  return parts.length > 1 ? parts.at(-1) : '';
};

const toTitleFromFileName = (fileName = '') =>
  String(fileName)
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

const toExcerptFromContent = (content = '') => {
  const compact = String(content).replace(/\s+/g, ' ').trim();
  return compact.length > 180 ? `${compact.slice(0, 177)}...` : compact;
};

const stripHtml = (value) => {
  if (typeof window === 'undefined') {
    return value.replace(/<[^>]+>/g, ' ');
  }

  const doc = new DOMParser().parseFromString(value, 'text/html');
  return doc.body.textContent || '';
};

const stripRtf = (value) =>
  value
    .replace(/\\par[d]?/g, '\n')
    .replace(/\\'[0-9a-fA-F]{2}/g, ' ')
    .replace(/\\[a-z]+-?\d* ?/g, '')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const decodePdfLiteral = (value) =>
  value
    .replace(/\\([\\()])/g, '$1')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\([0-7]{3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)));

const extractPdfText = async (file) => {
  const buffer = await file.arrayBuffer();
  const raw = new TextDecoder('latin1').decode(buffer);
  const matches = [...raw.matchAll(/\((?:\\.|[^\\()])*\)/g)]
    .map((match) => decodePdfLiteral(match[0].slice(1, -1)).trim())
    .filter((item) => item.length > 2 && /[a-zA-Z]/.test(item));

  const cleaned = matches.join('\n').replace(/\s{2,}/g, ' ').trim();
  return cleaned;
};

const extractTextFromSourceFile = async (file) => {
  const extension = getFileExtension(file.name);
  const mimeType = file.type || '';

  if (mimeType === 'application/pdf' || extension === 'pdf') {
    return extractPdfText(file);
  }

  if (mimeType === 'text/html' || extension === 'html' || extension === 'htm') {
    return stripHtml(await file.text());
  }

  if (mimeType === 'text/rtf' || mimeType === 'application/rtf' || extension === 'rtf') {
    return stripRtf(await file.text());
  }

  return file.text();
};

const getSlugPreview = (value, fallback) => value || fallback.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const AdminBlogs = () => {
  const navigate = useNavigate();
  const coverInputRef = useRef(null);
  const sourceInputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(INITIAL_BLOG);
  const [editId, setEditId] = useState('');
  const [saving, setSaving] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [importingSource, setImportingSource] = useState(false);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingSource, setIsDraggingSource] = useState(false);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [selectedCoverPreview, setSelectedCoverPreview] = useState('');
  const [selectedSourceFile, setSelectedSourceFile] = useState(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const blogs = await fetchBlogs({ enableFallback: false });
      setItems(blogs);
    } catch (err) {
      handleAdminPageError(err, navigate, toast);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (!loading && items.length === 0) {
      setIsComposerOpen(true);
    }
  }, [items.length, loading]);

  useEffect(() => {
    if (!selectedCoverFile) {
      setSelectedCoverPreview('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedCoverFile);
    setSelectedCoverPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedCoverFile]);

  const clearSelectedCover = useCallback(() => {
    setSelectedCoverFile(null);
    setIsDraggingCover(false);
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  }, []);

  const clearSelectedSource = useCallback(() => {
    setSelectedSourceFile(null);
    setIsDraggingSource(false);
    if (sourceInputRef.current) {
      sourceInputRef.current.value = '';
    }
  }, []);

  const clearEditor = useCallback(
    (shouldCloseComposer = true) => {
      setForm(INITIAL_BLOG);
      setEditId('');
      clearSelectedCover();
      clearSelectedSource();
      if (shouldCloseComposer) {
        setIsComposerOpen(false);
      }
    },
    [clearSelectedCover, clearSelectedSource],
  );

  const openComposerForNew = useCallback(() => {
    clearEditor(false);
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [clearEditor]);

  const validateCoverFile = useCallback((file) => {
    if (!file) return false;

    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
      toast.error('Use PNG, JPG, WEBP, or GIF for the cover image.');
      return false;
    }

    if (file.size > MAX_COVER_FILE_SIZE) {
      toast.error('Cover image size should be 5MB or less.');
      return false;
    }

    return true;
  }, []);

  const validateSourceFile = useCallback((file) => {
    if (!file) return false;

    const extension = getFileExtension(file.name);
    const isAllowedType = ACCEPTED_SOURCE_MIME_TYPES.has(file.type) || ACCEPTED_SOURCE_EXTENSIONS.has(extension);
    if (!isAllowedType) {
      toast.error('Upload TXT, MD, HTML, RTF, or PDF files only.');
      return false;
    }

    if (file.size > MAX_SOURCE_FILE_SIZE) {
      toast.error('Draft file size should be 10MB or less.');
      return false;
    }

    return true;
  }, []);

  const handleCoverSelection = useCallback(
    (file) => {
      if (!validateCoverFile(file)) return;
      setSelectedCoverFile(file);
    },
    [validateCoverFile],
  );

  const handleSourceSelection = useCallback(
    (file) => {
      if (!validateSourceFile(file)) return;
      setSelectedSourceFile(file);
    },
    [validateSourceFile],
  );

  const uploadSelectedCover = useCallback(
    async (file, options = {}) => {
      if (!file) return form.coverImage;

      const { notifySuccess = true, notifyError = true } = options;

      setUploadingCover(true);
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const uploaded = await uploadBlogCoverImage({ fileName: file.name, dataUrl });
        setForm((current) => ({ ...current, coverImage: uploaded.imageUrl }));
        clearSelectedCover();

        if (notifySuccess) {
          toast.success('Cover image uploaded');
        }

        return uploaded.imageUrl;
      } catch (err) {
        if (notifyError) {
          toast.error(err.message || 'Cover image upload failed');
        }
        throw err;
      } finally {
        setUploadingCover(false);
      }
    },
    [clearSelectedCover, form.coverImage],
  );

  const importSelectedSource = useCallback(
    async (file, options = {}) => {
      if (!file) return form.sourceFile;

      const { notifySuccess = true, notifyError = true, mergeIntoContent = true } = options;

      setImportingSource(true);
      try {
        const [dataUrl, importedText] = await Promise.all([readFileAsDataUrl(file), extractTextFromSourceFile(file)]);
        const uploaded = await uploadBlogSourceFile({ fileName: file.name, dataUrl });
        const nextSourceFile = {
          fileName: uploaded.fileName,
          url: uploaded.url,
          mimeType: uploaded.mimeType,
          size: uploaded.size,
        };

        const cleanedText = importedText.split(String.fromCharCode(0)).join('').replace(/\s+\n/g, '\n').trim();

        setForm((current) => {
          const nextForm = { ...current, sourceFile: nextSourceFile };

          if (mergeIntoContent && cleanedText) {
            nextForm.content = current.content.trim() ? `${current.content.trim()}\n\n${cleanedText}` : cleanedText;
          }

          if (!current.title.trim()) {
            nextForm.title = toTitleFromFileName(file.name);
          }

          if (!current.excerpt.trim() && cleanedText) {
            nextForm.excerpt = toExcerptFromContent(cleanedText);
          }

          return nextForm;
        });

        clearSelectedSource();

        if (notifySuccess) {
          if (cleanedText) {
            toast.success('Draft imported into the editor');
          } else {
            toast.success('Source file attached. PDF text could not be extracted cleanly.');
          }
        }

        return nextSourceFile;
      } catch (err) {
        if (notifyError) {
          toast.error(err.message || 'Draft import failed');
        }
        throw err;
      } finally {
        setImportingSource(false);
      }
    },
    [clearSelectedSource, form.sourceFile],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.coverImage && !selectedCoverFile) {
      toast.error('Add a cover image URL or upload an image file.');
      return;
    }

    setSaving(true);
    try {
      const coverImage = selectedCoverFile
        ? await uploadSelectedCover(selectedCoverFile, { notifySuccess: false, notifyError: false })
        : form.coverImage;
      const sourceFile = selectedSourceFile
        ? await importSelectedSource(selectedSourceFile, { notifySuccess: false, notifyError: false, mergeIntoContent: true })
        : form.sourceFile;
      const payload = {
        ...form,
        coverImage,
        sourceFile,
        readTime: Number(form.readTime),
        publishedAt: form.publishedAt || undefined,
      };

      if (editId) await updateBlog(editId, payload);
      else await createBlog(payload);

      toast.success(editId ? 'Post updated' : 'Post created');
      clearEditor(true);
      await loadItems();
    } catch (err) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    clearSelectedCover();
    clearSelectedSource();
    setEditId(item.id);
    setForm({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      category: getCategoryName(item.category),
      coverImage: item.coverImage || '',
      readTime: item.readTime || 5,
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      publishedAt: toDateInput(item.publishedAt),
      featured: Boolean(item.featured),
      sourceFile: item.sourceFile || null,
    });
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Delete this blog?')) return;
      await deleteBlog(id);
      toast.success('Post deleted');
      await loadItems();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const slugPreview = useMemo(() => getSlugPreview(form.slug, form.title), [form.slug, form.title]);
  const coverPreview = selectedCoverPreview || form.coverImage;
  const featuredCount = useMemo(() => items.filter((item) => item.featured).length, [items]);
  const importedCount = useMemo(() => items.filter((item) => item.sourceFile?.url).length, [items]);

  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow="Editorial Workspace"
        title="Blog publishing that feels like a real content desk"
        description="Manage every post from one place, import written drafts, upload cover art, and open the editor only when you need to create or revise something."
        stats={[
          { label: 'Posts live', value: items.length, helper: 'Your current blog library' },
          { label: 'Featured', value: featuredCount, helper: 'Pinned higher in the feed' },
          { label: 'Draft sources', value: importedCount, helper: 'Posts with uploaded source files' },
        ]}
        actions={
          <>
            <Button type="button" variant="secondary" onClick={loadItems}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" onClick={openComposerForNew}>
              <Plus className="h-4 w-4" />
              Add New Post
            </Button>
          </>
        }
      />

      {isComposerOpen ? (
        <AdminSection
          title={editId ? 'Edit post' : 'Add new post'}
          description="Only the sections that matter: core details, media, imported draft content, and clean SEO fields."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminSubsection title="Core details" description="Start with identity, positioning, and publishing basics.">
              <AdminFieldGrid>
                <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated-from-title" />
                <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                <Input label="Read Time" type="number" min="1" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} />
                <Input label="Publish Date" type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} />
                <div className="space-y-3 rounded-2xl border border-neutral-900 bg-black/30 p-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Publishing state</p>
                    <p className="mt-2 text-sm text-neutral-400">Slug preview: <span className="text-neutral-200">/blogs/{slugPreview || 'article-slug'}</span></p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm text-neutral-300">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-white" />
                    Featured post
                  </label>
                </div>
              </AdminFieldGrid>
            </AdminSubsection>

            <AdminSubsection title="Cover media" description="Paste a URL or drop an image and upload it straight from this panel.">
              <div className="space-y-4">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => !uploadingCover && coverInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if ((event.key === 'Enter' || event.key === ' ') && !uploadingCover) {
                      event.preventDefault();
                      coverInputRef.current?.click();
                    }
                  }}
                  onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDraggingCover(true);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDraggingCover(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    setIsDraggingCover(false);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDraggingCover(false);
                    handleCoverSelection(event.dataTransfer.files?.[0]);
                  }}
                  className={joinClasses(
                    'rounded-3xl border border-dashed px-5 py-6 transition',
                    isDraggingCover ? 'border-white bg-white/5' : 'border-neutral-800 bg-[#090909] hover:border-neutral-700',
                    uploadingCover ? 'cursor-wait opacity-70' : 'cursor-pointer',
                  )}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-black text-neutral-200">
                        <ImagePlus className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white">Drop a cover image here</p>
                        <p className="mt-1 text-sm text-neutral-500">PNG, JPG, WEBP, or GIF up to 5MB. Click the panel to browse files.</p>
                        {selectedCoverFile ? <p className="mt-3 text-sm text-neutral-300">{selectedCoverFile.name} � {formatFileSize(selectedCoverFile.size)}</p> : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCoverFile ? (
                        <Button type="button" onClick={() => uploadSelectedCover(selectedCoverFile)} isLoading={uploadingCover}>
                          <Upload className="h-4 w-4" />
                          Upload Cover
                        </Button>
                      ) : (
                        <Button type="button" variant="secondary">
                          Select Image
                        </Button>
                      )}
                      {selectedCoverFile ? (
                        <Button type="button" variant="secondary" onClick={clearSelectedCover} disabled={uploadingCover}>
                          <X className="h-4 w-4" />
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={(event) => handleCoverSelection(event.target.files?.[0])}
                />

                <AdminFieldGrid>
                  <Input
                    label="Cover Image URL"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="https://example.com/cover-image.jpg"
                  />
                  <div className="rounded-2xl border border-neutral-900 bg-black/30 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Current media</p>
                    {coverPreview ? (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-800">
                        <img src={coverPreview} alt={form.title || 'Blog cover'} className="h-40 w-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-neutral-500">No cover selected yet.</p>
                    )}
                  </div>
                </AdminFieldGrid>
              </div>
            </AdminSubsection>

            <AdminSubsection title="Draft import" description="Bring in written drafts from notepad-style files or PDF source docs.">
              <div className="space-y-4">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => !importingSource && sourceInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if ((event.key === 'Enter' || event.key === ' ') && !importingSource) {
                      event.preventDefault();
                      sourceInputRef.current?.click();
                    }
                  }}
                  onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDraggingSource(true);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDraggingSource(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    setIsDraggingSource(false);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDraggingSource(false);
                    handleSourceSelection(event.dataTransfer.files?.[0]);
                  }}
                  className={joinClasses(
                    'rounded-3xl border border-dashed px-5 py-6 transition',
                    isDraggingSource ? 'border-amber-300 bg-amber-300/5' : 'border-neutral-800 bg-[#090909] hover:border-neutral-700',
                    importingSource ? 'cursor-wait opacity-70' : 'cursor-pointer',
                  )}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-black text-neutral-200">
                        <FileUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white">Drop a draft file here</p>
                        <p className="mt-1 text-sm text-neutral-500">TXT, MD, HTML, RTF, or PDF. Text files are imported into the editor; PDFs are attached and parsed on a best-effort basis.</p>
                        {selectedSourceFile ? <p className="mt-3 text-sm text-neutral-300">{selectedSourceFile.name} � {formatFileSize(selectedSourceFile.size)}</p> : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSourceFile ? (
                        <Button type="button" onClick={() => importSelectedSource(selectedSourceFile)} isLoading={importingSource}>
                          <Upload className="h-4 w-4" />
                          Import Draft
                        </Button>
                      ) : (
                        <Button type="button" variant="secondary">
                          Select Draft
                        </Button>
                      )}
                      {selectedSourceFile ? (
                        <Button type="button" variant="secondary" onClick={clearSelectedSource} disabled={importingSource}>
                          <X className="h-4 w-4" />
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>

                <input
                  ref={sourceInputRef}
                  type="file"
                  accept={BLOG_SOURCE_ACCEPT}
                  className="hidden"
                  onChange={(event) => handleSourceSelection(event.target.files?.[0])}
                />

                {form.sourceFile?.url ? (
                  <AdminSurface className="p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Attached source</p>
                        <p className="mt-2 text-sm font-medium text-white">{form.sourceFile.fileName}</p>
                        <p className="mt-1 text-xs text-neutral-500">{form.sourceFile.mimeType || 'document'} � {formatFileSize(form.sourceFile.size)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a href={form.sourceFile.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-800 bg-[#0b0b0b] px-4 py-2.5 text-sm text-neutral-200 transition hover:bg-[#121212]">
                          View source
                        </a>
                        <Button type="button" variant="secondary" onClick={() => setForm({ ...form, sourceFile: null })}>
                          Remove Source
                        </Button>
                      </div>
                    </div>
                  </AdminSurface>
                ) : null}
              </div>
            </AdminSubsection>

            <AdminSubsection title="Editorial copy" description="Polish the summary and full article body after import or write directly here.">
              <div className="space-y-4">
                <Textarea label="Excerpt" rows={4} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
                <Textarea label="Content" rows={18} className="min-h-80" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write the full blog content here or import a source file above." />
              </div>
            </AdminSubsection>

            <AdminSubsection title="SEO essentials" description="Keep search metadata simple and usable.">
              <AdminFieldGrid>
                <Input label="SEO Title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
                <Textarea label="SEO Description" rows={3} value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
              </AdminFieldGrid>
            </AdminSubsection>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" isLoading={saving}>
                <Sparkles className="h-4 w-4" />
                {editId ? 'Update Post' : 'Publish Post'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => clearEditor(true)}>
                Close Editor
              </Button>
            </div>
          </form>
        </AdminSection>
      ) : null}

      <AdminSection title="Published library" description="Everything you have uploaded or created lives here. Edit, replace, or delete from one clean list.">
        {loading ? (
          <p className="py-10 text-center text-neutral-500">Loading blogs...</p>
        ) : items.length ? (
          <AdminList>
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-3xl border border-neutral-900 bg-[#090909]">
                <div className="flex flex-col lg:flex-row">
                  <div className="h-52 w-full shrink-0 overflow-hidden border-b border-neutral-900 bg-black lg:h-auto lg:w-64 lg:border-b-0 lg:border-r">
                    {item.coverImage ? <img src={item.coverImage} alt={item.title} className="h-full w-full object-cover" loading="lazy" /> : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-5 md:p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <AdminBadge tone="muted">{getCategoryName(item.category)}</AdminBadge>
                        {item.featured ? <AdminBadge tone="accent">Featured</AdminBadge> : null}
                        {item.sourceFile?.url ? <AdminBadge tone="success">Source attached</AdminBadge> : null}
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-400">{item.excerpt}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                        <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {formatDate(item.publishedAt)}</span>
                        <span>{item.readTime} min read</span>
                        <span>/blogs/{item.slug || item.id}</span>
                        {item.sourceFile?.url ? (
                          <a href={item.sourceFile.url} target="_blank" rel="noreferrer" className="text-neutral-300 transition hover:text-white">
                            {item.sourceFile.fileName}
                          </a>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="secondary" onClick={() => handleEdit(item)}>
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button type="button" variant="danger" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </AdminList>
        ) : (
          <EmptyState title="No blogs yet" description="Open the add-new section and publish your first post." />
        )}
      </AdminSection>
    </div>
  );
};

export default AdminBlogs;


