import { EMAIL } from "@/lib/projects";

export const metadata = {
  title: "Privacy",
  description: "Privacy policy for aidenurbine.com.",
};

const UPDATED = "October 1, 2026";

export default function Privacy() {
  return (
    <article className="legal">
      <h1 className="page-title">Privacy</h1>
      <p className="page-meta">Last updated {UPDATED}</p>

      <p>
        This is my portfolio site. I don&apos;t run ads, I don&apos;t use cookies, and I don&apos;t use analytics or
        tracking tools of any kind.
      </p>

      <h2>What gets collected</h2>
      <p>
        The site is hosted by Vercel. Like any web host, their servers keep standard request logs (things like IP
        address, browser type, and the page requested) for security and to keep the site running. I don&apos;t use
        those logs to identify anyone. You can read Vercel&apos;s privacy policy at{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          vercel.com/legal/privacy-policy
        </a>
        .
      </p>

      <h2>If you contact me</h2>
      <p>
        The contact form doesn&apos;t send anything to a server. It opens your own email app with the message filled in,
        and nothing is saved until you hit send. When you email me, I get your name, email address and whatever you
        write. I only use that to reply to you and to work with you on a project. I don&apos;t sell it, share it, or add
        you to a mailing list.
      </p>

      <h2>Links</h2>
      <p>
        Links to Instagram and other sites take you off this site, and their own privacy policies apply there.
      </p>

      <h2>Your info</h2>
      <p>
        You can ask me what I have from you, or ask me to delete it, any time. Just email{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <p>
        This site isn&apos;t meant for kids under 13, and I don&apos;t knowingly collect anything from them. If this
        policy changes, I&apos;ll update it here and change the date at the top.
      </p>
    </article>
  );
}
