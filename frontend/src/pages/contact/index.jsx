import React, { useState, useRef } from "react";
import { Section } from "../../components/section.jsx";
import api from "../../api/api.js";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(formRef.current);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      await api.postContact(payload);
      setStatus("success");
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
    }
  }

  return (
    <main className="bg-background dark:bg-neutral-900 min-h-screen text-foreground dark:text-white">
      <Section title="Contact" subtitle="Reach out for collaborations or questions.">
        <form ref={formRef} onSubmit={onSubmit} className="grid gap-4 max-w-xl">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="h-10 rounded-md border border-border bg-card dark:bg-neutral-800 text-foreground dark:text-white px-3 placeholder:text-muted-foreground dark:placeholder:text-gray-400"
              placeholder="Your Name"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="h-10 rounded-md border border-border bg-card dark:bg-neutral-800 text-foreground dark:text-white px-3 placeholder:text-muted-foreground dark:placeholder:text-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="rounded-md border border-border bg-card dark:bg-neutral-800 text-foreground dark:text-white px-3 py-2 placeholder:text-muted-foreground dark:placeholder:text-gray-400"
              placeholder="How can I help?"
            />
          </div>

          <button
            type="submit"
            className="h-10 rounded-md border border-border bg-primary dark:bg-blue-500 text-white dark:text-black px-4 hover:bg-accent dark:hover:bg-blue-600 transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400">Thanks! I’ll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
          )}
        </form>
      </Section>
    </main>
  );
}
