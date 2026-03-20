import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { submitContact } from '@/services/contentApi';

const ContactItem = ({ icon, label, value, href }) => {
  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper href={href} className=" px-4 py-3 flex items-center gap-3">
      <span className="rounded-lg border border-(--nb-border) bg-(--nb-surface) p-2 text-(--nb-accent)">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-text-muted)">{label}</p>
        <p className="text-sm font-semibold text-(--nb-text)">{value}</p>
      </div>
    </Wrapper>
  );
};

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Search Engine Optimization',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContact(formData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to submit form.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      interest: 'Search Engine Optimization',
      message: '',
    });
  };

  return (
    <section className=" pt-37 pb-20">
      <div className="nb-container grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-5">
          <div>
            <p className="nb-pill border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent) mb-4">
              <MessageSquare size={12} />
              Contact
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-(--nb-text) leading-[0.95]">Have a project in mind?</h1>
            <p className="mt-4 text-(--nb-text-muted) leading-relaxed">
              Share your goals and timeline. We usually reply within two business hours.
            </p>
          </div>

          <div className="space-y-3">
            <ContactItem
              icon={<Mail size={16} />}
              label="Email"
              value="hello@nexusboost.com"
              href="mailto:hello@nexusboost.com"
            />
            <ContactItem icon={<Phone size={16} />} label="Call" value="+91 98765 43210" href="tel:+919876543210" />
            <ContactItem icon={<MapPin size={16} />} label="Office" value="Cyber City, Delhi, IN" />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="nb-panel p-6 md:p-8">
            {status === 'success' ? (
              <div className="py-10 text-center">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  <CheckCircle2 size={26} />
                </span>
                <h2 className="mt-5 text-3xl font-black text-(--nb-text)">Message sent</h2>
                <p className="mt-2 text-(--nb-text-muted)">Our team will get back to you shortly.</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text)"
                >
                  Send another
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    label="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-text-muted)">Interest</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-4 py-3 text-sm text-(--nb-text) outline-none focus:border
                    -[var(--nb-accent)]"
                  >
                    <option>Search Engine Optimization</option>
                    <option>Paid Advertising (PPC)</option>
                    <option>Social Media Marketing</option>
                    <option>Web Development</option>
                  </select>
                </div>

                <Textarea
                  label="Tell us about your project"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your goals..."
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-(--nb-accent) px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <span className="h-4 w-4 rounded-full border-2 border-slate-900/30 border-t-slate-900 animate-spin" />
                  ) : (
                    <>
                      Send message
                      <Send size={15} />
                    </>
                  )}
                </button>

                {status === 'error' ? <p className="text-sm text-red-300">{errorMessage}</p> : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-text-muted)">{label}</label>
    <input
      {...props}
      required
      className="w-full rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-4 py-3 text-sm text-(--nb-text) outline-none focus:border
      -[var(--nb-accent)]"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-text-muted)">{label}</label>
    <textarea
      {...props}
      rows="4"
      required
      className="w-full resize-none rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-4 py-3 text-sm text-(--nb-text) outline-none focus:border
      -[var(--nb-accent)]"
    />
  </div>
);

export default Contact;
