import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please enter a valid email address.';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'General Question', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      <SEO
        title="Contact Oatly | Ask Us Anything"
        description="Got a question, compliment, or weird suggestion about oat milk? Get in touch with the Oatly team."
        pathname="/contact"
      />

      <div className="bg-oatly-yellow text-oatly-black border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl space-y-4">
        <span className="badge-sticker bg-oatly-black text-white">HUMAN SUPPORT</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase font-display">CONTACT OATLY</h1>
        <p className="text-base md:text-lg opacity-90 max-w-2xl">
          Write to us! Whether you want to tell us your favorite coffee shop or report a carton issue, real humans read every single message.
        </p>
      </div>

      <div className="bg-white border-4 border-oatly-black p-8 shadow-brutal space-y-6">
        
        {submitted ? (
          <div className="p-8 bg-oatly-mint text-oatly-black border-4 border-oatly-black shadow-brutal text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-oatly-blue" />
            <h2 className="text-3xl font-black uppercase font-display">MESSAGE SENT!</h2>
            <p className="text-sm font-bold max-w-md mx-auto">
              Thank you for reaching out. An Oatly customer human will get back to you within 24-48 business hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-oatly text-xs py-2 px-6">
              SEND ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-extrabold uppercase mb-2">YOUR NAME *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="HUMAN NAME"
                  className="w-full px-4 py-3 bg-oatly-cream border-2 border-oatly-black font-bold text-sm uppercase placeholder:text-gray-400 focus:outline-none focus:bg-white"
                />
                {errors.name && <div className="text-red-600 text-xs font-bold mt-1">{errors.name}</div>}
              </div>

              <div>
                <label className="block text-xs font-mono font-extrabold uppercase mb-2">YOUR EMAIL ADDRESS *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="HUMAN@EMAIL.COM"
                  className="w-full px-4 py-3 bg-oatly-cream border-2 border-oatly-black font-bold text-sm uppercase placeholder:text-gray-400 focus:outline-none focus:bg-white"
                />
                {errors.email && <div className="text-red-600 text-xs font-bold mt-1">{errors.email}</div>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-extrabold uppercase mb-2">SUBJECT</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-oatly-cream border-2 border-oatly-black font-extrabold text-sm uppercase focus:outline-none focus:bg-white cursor-pointer"
              >
                <option value="General Question">General Question / Love Letter</option>
                <option value="Product Availability">Product Availability at Supermarket</option>
                <option value="Barista Coffee Shop">Barista / Coffee Shop Supply</option>
                <option value="Press & Media">Press & Media Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-extrabold uppercase mb-2">YOUR MESSAGE *</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="TYPE YOUR MESSAGE HERE..."
                className="w-full px-4 py-3 bg-oatly-cream border-2 border-oatly-black font-medium text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white"
              />
              {errors.message && <div className="text-red-600 text-xs font-bold mt-1">{errors.message}</div>}
            </div>

            <button type="submit" className="w-full btn-oatly py-4 text-sm font-extrabold flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> SUBMIT MESSAGE TO OATLY
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
