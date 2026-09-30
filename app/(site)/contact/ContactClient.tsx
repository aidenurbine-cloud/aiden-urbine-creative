"use client";

import { useState } from "react";
import { EMAIL, INSTAGRAM } from "@/lib/projects";

// No backend: the form opens the visitor's mail app with everything filled in.
export default function ContactClient() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project inquiry: ${f.get("type")}`);
    const body = encodeURIComponent(
      `Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\nProject type: ${f.get("type")}\n\n${f.get("message")}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="contact">
      <h1 className="caps page-title">Contact</h1>
      <p className="page-desc">
        Brand campaigns, product launches, and editorial shoots across the West. Tell me what you&apos;re making.
      </p>
      <p className="contact-direct">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <br />
        <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">
          @{INSTAGRAM}
        </a>
      </p>

      <form className="form" onSubmit={onSubmit}>
        <label>
          <span className="caps">Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span className="caps">Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span className="caps">What kind of work</span>
          <select name="type" defaultValue="Photo + Video">
            <option>Photo + Video</option>
            <option>Photo</option>
            <option>Video</option>
            <option>Something else</option>
          </select>
        </label>
        <label>
          <span className="caps">The project</span>
          <textarea name="message" rows={6} required />
        </label>
        <button type="submit" className="caps btn">
          Send it
        </button>
        {sent && <p className="note">Your mail app should be open. Talk soon.</p>}
      </form>
    </div>
  );
}
