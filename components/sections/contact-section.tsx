"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Linkedin, Github, Send } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/schema/contact-form.schema";

export function ContactSection() {
  const { toast } = useToast();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   setTimeout(() => {
  //     toast({
  //       title: "Message sent!",
  //       description: "Thank you for reaching out. I'll get back to you soon.",
  //     });
  //     setFormData({ name: "", email: "", message: "" });
  //     setIsSubmitting(false);
  //   }, 1000);
  // };
  async function onSubmit(values: ContactFormValues) {
    if (isSubmitting) return;
    try {
      await api.post("/contact/portfolio", values);

      toast({
        title: "Message sent 🚀",
        description: "Thanks for reaching out. I’ll get back to you shortly.",
      });

      form.reset();
    } catch (error: any) {
      console.error("Contact form error:", error);

      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          error?.response?.data?.message ||
          "Failed to send message. Please try again later.",
      });
    }
  }

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects and
            opportunities. Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <a href="mailto:hasanmunir406@gmail.com">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <span
                // href="mailto:hasanmunir406@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                hasanmunir406@gmail.com
              </span>
            </Card>
          </a>

          <a
            href="https://www.linkedin.com/in/muhammad-hasan-munir-b9a50b394/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <span
                // href="https://www.linkedin.com/in/muhammad-hasan-munir-b9a50b394/"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Connect with me
              </span>
            </Card>
          </a>

          <a
            href="https://github.com/hasanm4-6"
            target="_blank"
            rel="noopener noreferrer"
            // className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {/* View my code */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">GitHub</h3>
              <span
                // href="https://github.com/hasanm4-6"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                View my code
              </span>
            </Card>
          </a>
        </div>

        <Card className="p-8">
          <Form {...form}>
            {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {/* <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label> 
                  <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                /> */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="bg-transparent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label> 
                  <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                /> */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-transparent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                {/* <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label> 
                <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows={6}
                required
              /> */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Tell me about your project or opportunity..."
                          className="bg-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
