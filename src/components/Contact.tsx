"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { ScrollReveal } from "./ui/ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data: { success?: boolean; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        // In case the response is not valid JSON
      }

      if (response.ok && data.success) {
        setStatus("success");
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#6366f1", "#00f2fe", "#10b981"],
          });
        } catch {
          // Ignore confetti error
        }
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again later.");
      }
    } catch (err: unknown) {
      console.error("Contact Form submission error:", err);
      setStatus("error");
      setErrorMessage("Unable to connect to the backend server. Please make sure the server is running.");
    }
  };

  return (
    <section id="contact" className="relative py-5 md:py-10 lg:py-16 z-10 overflow-x-clip transition-colors duration-300">
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono tracking-wider shadow-xs dark:shadow-sm">
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>LET&apos;S WORK TOGETHER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get In <span className="text-gradient-cyan">Touch</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-light">
            Have a project idea, web application development request, or contract inquiry? Reach out directly via form, email, or WhatsApp.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Info Cards */}
          <ScrollReveal direction="right" className="lg:col-span-5 space-y-6 w-full">
            <div className="bg-white/90 dark:bg-zinc-900/80 p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 space-y-6 shadow-md dark:shadow-xl transition-colors duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Direct Contact Details</h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed font-light">
                Feel free to reach out anytime. I respond promptly to all messages and project inquiries.
              </p>

              {/* Email Card */}
              <a
                href="mailto:islammdsohan603@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/5 hover:border-cyan-500/50 transition-all group min-h-[44px] shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase">Email Address</div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors break-all">
                    islammdsohan603@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone / WhatsApp Card */}
              <a
                href="https://wa.me/8801849468455"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/5 hover:border-emerald-500/50 transition-all group min-h-[44px] shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase">WhatsApp & Phone</div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    +880 1849 468455
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/5 min-h-[44px] shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase">Location</div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Dhaka, Bangladesh (Remote Available Worldwide)
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="bg-white/90 dark:bg-zinc-900/80 p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 flex flex-wrap items-center justify-around gap-4 shadow-md dark:shadow-xl transition-colors duration-300">
              <a
                href="https://github.com/islammdsohan603"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors font-medium text-sm min-h-[44px]"
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sohanislamwebdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors font-medium text-sm min-h-[44px]"
              >
                <FaLinkedin className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://wa.me/8801849468455"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-medium text-sm min-h-[44px]"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Contact Form */}
          <ScrollReveal direction="left" className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="bg-white/90 dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/10 space-y-6 shadow-md dark:shadow-xl transition-colors duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-700 dark:text-zinc-300 uppercase">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 transition-colors text-sm min-h-[44px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-700 dark:text-zinc-300 uppercase">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 transition-colors text-sm min-h-[44px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-700 dark:text-zinc-300 uppercase">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion / Full-Time Hiring"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 transition-colors text-sm min-h-[44px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-700 dark:text-zinc-300 uppercase">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or role opportunities..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 transition-colors text-sm resize-none min-h-[120px]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_20px_rgba(0,242,254,0.4)] disabled:opacity-50 cursor-pointer min-h-[44px]"
              >
                {status === "submitting" ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>Send Message Now</span>
                  </>
                )}
              </button>

              {/* Status Toast / Banner Feedback */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-sm flex items-start gap-3 shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-800 dark:text-emerald-200 mb-0.5">Success!</p>
                    <p>Thank you! Your message has been sent successfully. I will get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3 shadow-lg"
                >
                  <AlertCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-rose-800 dark:text-rose-200 mb-0.5">Submission Error</p>
                    <p>{errorMessage || "Failed to send message. Please try again later."}</p>
                  </div>
                </motion.div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
