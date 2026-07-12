"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactScene } from "@/components/scene-bg/contact-scene";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";
import { contactFormSchema, ContactFormValues } from "@/schema/contact-form.schema";

const easeExpo = [0.16, 1, 0.3, 1] as const;

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeExpo, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const LINKS = [
  { label: "EMAIL", value: "hasanmunir406@gmail.com", href: "mailto:hasanmunir406@gmail.com" },
  { label: "LINKEDIN", value: "/in/hasanmunir-dev", href: "https://www.linkedin.com/in/hasanmunir-dev/" },
  { label: "GITHUB", value: "github.com/hasanmunir-dev", href: "https://github.com/hasanmunir-dev" },
];

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ContactFormValues) {
    if (isSubmitting) return;
    try {
      await api.post("/contact", values);
      toast({ title: "Sent.", description: "I'll get back to you shortly." });
      form.reset();
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Failed to send",
        description: msg ?? "Please try again or email directly.",
      });
    }
  }

  return (
    <section id="contact" className="section section-bg relative">
      <ContactScene />
      <div className="grid-overlay opacity-50" />
      <div className="section-inner">

        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-label text-fire">05</span>
          <div className="h-px flex-1 bg-stroke" />
          <span className="text-label text-ink-3">SIGNAL</span>
        </div>

        {/* Big CTA headline */}
        <div className="mb-16">
          <FadeIn>
            <h2 className="text-section text-ink leading-none">LET'S</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-section text-outlined leading-none">BUILD</h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <h2 className="text-section text-ink leading-none">SOMETHING.</h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Left: links + statement */}
          <div>
            <FadeIn>
              <p className="text-sm text-ink-2 leading-relaxed mb-12 max-w-sm">
                Available for full-time roles, freelance projects, and technical consultations.
                Fast response, clear communication, zero ghosting.
              </p>
            </FadeIn>

            <div className="space-y-0">
              {LINKS.map(({ label, value, href }, i) => (
                <FadeIn key={label} delay={i * 0.08}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    data-hover
                    className="group flex items-center justify-between border-b border-stroke py-5 hover:border-fire transition-colors duration-300"
                  >
                    <span className="text-label text-ink-3 group-hover:text-fire transition-colors duration-300">
                      {label}
                    </span>
                    <span className="text-sm text-ink-2 group-hover:text-ink transition-colors duration-300 flex items-center gap-2">
                      {value}
                      <span className="text-fire opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                    </span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <FadeIn delay={0.1}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label text-ink-2" htmlFor="name">NAME</label>
                  <input
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm border-b border-stroke"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <span className="text-xs text-red-500">{form.formState.errors.name.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label text-ink-2" htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-sm border-b border-stroke"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label text-ink-2" htmlFor="message">MESSAGE</label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 text-sm resize-none border-b border-stroke"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <span className="text-xs text-red-500">{form.formState.errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-accent w-full justify-center disabled:opacity-50"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE →"}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
