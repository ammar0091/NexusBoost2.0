const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const express = require("express");
const ContactLead = require("../models/ContactLead");
const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const { requireAdminAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

const IMAGE_TYPE_TO_EXTENSION = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);
const SOURCE_TYPE_TO_EXTENSION = new Map([
  ["text/plain", "txt"],
  ["text/markdown", "md"],
  ["text/html", "html"],
  ["text/rtf", "rtf"],
  ["application/rtf", "rtf"],
  ["application/pdf", "pdf"],
]);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_SOURCE_FILE_SIZE_BYTES = 10 * 1024 * 1024;

function sanitizeFileName(value) {
  return (
    String(value || "file")
      .toLowerCase()
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "file"
  );
}

function decodeBase64Upload(dataUrl) {
  if (typeof dataUrl !== "string") {
    return null;
  }

  const match = dataUrl.match(/^data:([^;]+);base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match) {
    return null;
  }

  const mimeType = match[1].toLowerCase();
  const buffer = Buffer.from(match[2].replace(/\s+/g, ""), "base64");
  if (!buffer.length) {
    return null;
  }

  return { mimeType, buffer };
}

function buildUploadUrl(req, publicPath) {
  const forwardedProto = req.get("x-forwarded-proto");
  const protocol = forwardedProto ? forwardedProto.split(",")[0].trim() : req.protocol;
  return `${protocol}://${req.get("host")}${publicPath}`;
}

async function storeUploadedFile(req, { dataUrl, fileName, typeMap, maxSizeBytes, folderName }) {
  const parsedUpload = decodeBase64Upload(dataUrl);
  if (!parsedUpload) {
    return { error: "Invalid upload payload." };
  }

  const extension = typeMap.get(parsedUpload.mimeType);
  if (!extension) {
    return { error: "This file type is not supported." };
  }

  if (parsedUpload.buffer.length > maxSizeBytes) {
    return { error: `File size must be ${Math.round(maxSizeBytes / (1024 * 1024))}MB or smaller.` };
  }

  const uploadDir = path.join(__dirname, "..", "..", "public", "uploads", folderName);
  await fs.mkdir(uploadDir, { recursive: true });

  const safeBaseName = sanitizeFileName(fileName);
  const storedFileName = `${Date.now()}-${crypto.randomUUID()}-${safeBaseName}.${extension}`;
  const filePath = path.join(uploadDir, storedFileName);
  await fs.writeFile(filePath, parsedUpload.buffer);

  const publicPath = `/uploads/${folderName}/${storedFileName}`;
  return {
    data: {
      fileName: storedFileName,
      originalFileName: String(fileName || storedFileName).trim() || storedFileName,
      mimeType: parsedUpload.mimeType,
      path: publicPath,
      url: buildUploadUrl(req, publicPath),
      size: parsedUpload.buffer.length,
    },
  };
}

router.use(requireAdminAuth);

router.post(
  "/uploads/blog-cover",
  asyncHandler(async (req, res) => {
    const result = await storeUploadedFile(req, {
      dataUrl: req.body?.dataUrl,
      fileName: req.body?.fileName,
      typeMap: IMAGE_TYPE_TO_EXTENSION,
      maxSizeBytes: MAX_IMAGE_SIZE_BYTES,
      folderName: "blogs",
    });

    if (result.error) {
      return res.status(400).json({ message: result.error === "This file type is not supported." ? "Upload a PNG, JPG, WEBP, or GIF image." : result.error });
    }

    res.status(201).json({
      data: {
        fileName: result.data.fileName,
        imageUrl: result.data.url,
        path: result.data.path,
        size: result.data.size,
      },
    });
  })
);

router.post(
  "/uploads/blog-source",
  asyncHandler(async (req, res) => {
    const result = await storeUploadedFile(req, {
      dataUrl: req.body?.dataUrl,
      fileName: req.body?.fileName,
      typeMap: SOURCE_TYPE_TO_EXTENSION,
      maxSizeBytes: MAX_SOURCE_FILE_SIZE_BYTES,
      folderName: "blog-sources",
    });

    if (result.error) {
      return res.status(400).json({ message: result.error === "This file type is not supported." ? "Upload TXT, MD, HTML, RTF, or PDF files only." : result.error });
    }

    res.status(201).json({
      data: {
        fileName: result.data.originalFileName,
        url: result.data.url,
        mimeType: result.data.mimeType,
        size: result.data.size,
        path: result.data.path,
      },
    });
  })
);

router.get(
  "/stats",
  asyncHandler(async (req, res) => {
    const [contactCount, newsletterCount, unresolvedCount] = await Promise.all([
      ContactLead.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      ContactLead.countDocuments({ status: "new" }),
    ]);

    res.json({
      data: {
        contactCount,
        unresolvedCount,
        newsletterCount,
      },
    });
  })
);

router.get(
  "/contacts",
  asyncHandler(async (req, res) => {
    const contacts = await ContactLead.find().sort({ createdAt: -1 }).lean();
    res.json({
      data: contacts.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        interest: item.interest,
        message: item.message,
        status: item.status,
        createdAt: item.createdAt,
      })),
      meta: { total: contacts.length },
    });
  })
);

router.patch(
  "/contacts/:id/status",
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (!["new", "resolved"].includes(status)) {
      return res.status(400).json({ message: "status must be new or resolved" });
    }

    const contact = await ContactLead.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.status = status;
    await contact.save();
    res.json({ message: "Status updated" });
  })
);

router.delete(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const deleted = await ContactLead.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted" });
  })
);

router.get(
  "/newsletters",
  asyncHandler(async (req, res) => {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 }).lean();
    res.json({
      data: subscribers.map((item) => ({
        id: item._id,
        email: item.email,
        createdAt: item.createdAt,
      })),
      meta: { total: subscribers.length },
    });
  })
);

router.delete(
  "/newsletters/:id",
  asyncHandler(async (req, res) => {
    const deleted = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    res.json({ message: "Subscriber deleted" });
  })
);

module.exports = router;
