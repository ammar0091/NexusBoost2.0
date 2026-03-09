import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { submitContact } from "@/services/contentApi";

const ContactItem = ({ icon: Icon, label, value, href }) => {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper href={href} className="group flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
        <p className="text-base font-bold text-slate-900">{value}</p>
      </div>
    </Wrapper>
  );
};

const ContactPage = () => {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "Search Engine Optimization",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await submitContact(formData);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit form.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      interest: "Search Engine Optimization",
      message: "",
    });
  };

  return (
    <div className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
            <MessageSquare size={12} fill="currentColor" /> Let's Connect
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            HAVE A PROJECT?
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 space-y-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                Contact Info
              </p>
              <div className="space-y-6">
                <ContactItem
                  icon={Mail}
                  label="Email Us"
                  value="hello@nexusboost.com"
                  href="mailto:hello@nexusboost.com"
                />
                <ContactItem icon={Phone} label="Call Us" value="+91 98765 43210" />
                <ContactItem icon={MapPin} label="Office" value="Cyber City, Delhi, IN" />
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-sm font-medium text-slate-600 italic">
                "Our team typically responds within{" "}
                <span className="text-blue-600 font-bold">2 business hours.</span>"
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-50/50 p-8 lg:p-12 rounded-[3rem] border border-slate-100">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500">We'll get back to you shortly.</p>

                <button
                  onClick={resetForm}
                  className="mt-8 text-blue-600 font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                >
                  Send another <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Interest
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-sm font-medium"
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
                  disabled={status === "loading"}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>

                {status === "error" ? (
                  <p className="text-sm font-semibold text-red-500 text-center">{errorMessage}</p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-sm font-medium"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
      {label}
    </label>
    <textarea
      {...props}
      rows="4"
      required
      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-sm font-medium resize-none"
    />
  </div>
);

export default ContactPage;
