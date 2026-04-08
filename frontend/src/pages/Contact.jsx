import { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { submitContact } from '@/services/contentApi';
import {
  CONTACT_CHANNELS,
  CONTACT_FORM_DEFAULTS,
  CONTACT_INTEREST_OPTIONS,
} from '@/constants/contactData';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState(() => ({ ...CONTACT_FORM_DEFAULTS }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      interest: formData.interest.trim(),
      message: formData.message.trim(),
    };

    if (payload.name.length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (payload.message.length < 10) {
      setStatus('error');
      setErrorMessage('Please add a little more detail about the project.');
      return;
    }

    try {
      await submitContact(payload);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Try again.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({ ...CONTACT_FORM_DEFAULTS });
  };

  return (
    <section className="relative min-h-screen bg-(--nb-surface) pt-32 pb-10">
      <div className="nb-container relative z-10">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div className="lg:pr-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--nb-accent)" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-(--nb-accent)">
                Inquiry / Open for Projects
              </p>
            </div>

            <h1 className="text-5xl font-light leading-[0.9] tracking-tighter text-(--nb-text) md:text-5xl">
              Let's talk <br />
              <span className="font-serif italic text-(--nb-text-muted) opacity-80">business.</span>
            </h1>

            <p className="mt-10 max-w-sm text-sm font-light leading-relaxed tracking-wide text-(--nb-text-muted) opacity-80">
              We're a dedicated team that cares about your growth as much as you do. Reach out however you prefer.
            </p>

            <div className="mt-16 space-y-8">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                const Wrapper = channel.href ? 'a' : 'div';
                const wrapperProps = channel.href ? { href: channel.href } : {};

                return (
                  <div key={channel.label} className="group">
                    <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-(--nb-text-muted)">
                      {channel.label}
                    </p>
                    <Wrapper
                      {...wrapperProps}
                      className={`flex items-center gap-4 transition-colors ${channel.href ? 'group-hover:text-(--nb-accent)' : ''}`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) ${
                          channel.href ? 'group-hover:border-(--nb-accent)' : ''
                        }`}
                      >
                        <Icon size={14} />
                      </div>
                      <span className={`text-md font-medium tracking-tight ${channel.href ? '' : 'text-(--nb-text)'}`}>
                        {channel.value}
                      </span>
                    </Wrapper>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            {status === 'success' ? (
              <div className="min-h-100 flex animate-fade-in flex-col justify-center">
                <CheckCircle2 size={50} className="mb-6 font-light text-emerald-500" strokeWidth={1} />
                <h2 className="text-3xl font-light tracking-tight text-(--nb-text)">Inquiry Transmitted.</h2>
                <p className="mt-4 max-w-xs text-sm text-(--nb-text-muted)">
                  We've received your message. We'll reach out within 2 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="group mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-(--nb-accent)"
                >
                  <span>Send another</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-10">
                  <FloatingInput
                    label="I am"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Reach me at"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--nb-text-muted)">
                      Interested in
                    </label>
                    <div className="flex flex-wrap gap-2 py-2">
                      {CONTACT_INTEREST_OPTIONS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setFormData({ ...formData, interest: item })}
                          className={`rounded-full border px-5 py-2 text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
                            formData.interest === item
                              ? 'border-(--nb-text) bg-(--nb-text) text-(--nb-surface)'
                              : 'border-(--nb-border) text-(--nb-text-muted) hover:border-(--nb-text)'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <FloatingInput
                    label="The Project"
                    name="message"
                    placeholder="What are we building?"
                    isTextarea
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-(--nb-text) disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Transmitting...' : 'Transmit Inquiry'}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--nb-border) transition-all duration-500 group-hover:scale-110 group-hover:border-(--nb-accent) group-hover:bg-(--nb-accent)/5">
                      <ArrowUpRight size={20} className="text-(--nb-accent)" />
                    </div>
                  </button>
                  {status === 'error' ? <p className="mt-4 text-xs font-medium text-red-400">{errorMessage}</p> : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingInput = ({ label, isTextarea, value, onChange, name, placeholder, type = 'text' }) => (
  <div className="relative border-b border-(--nb-border)/60 pb-2 transition-all duration-500 focus-within:border-(--nb-accent)">
    <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.3em] text-(--nb-text-muted)/70">{label}</label>
    {isTextarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-24 w-full resize-none bg-transparent py-2 text-base text-(--nb-text) outline-none placeholder:text-(--nb-text-muted)/35"
        required
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent py-2 text-base text-(--nb-text) outline-none placeholder:text-(--nb-text-muted)/35"
        required
      />
    )}
  </div>
);

export default Contact;
