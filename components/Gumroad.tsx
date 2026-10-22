"use client";

import Script from "next/script";
import { isLive } from "@/lib/shop";

// gumroad.js turns links to gumroad product URLs into the on-page checkout overlay.
// don't add data-gumroad-overlay-checkout: in the current script that skips the overlay and goes full page.
// only rendered on the preset pages, never site-wide.
export function GumroadScript() {
  return <Script src="https://gumroad.com/js/gumroad.js" strategy="lazyOnload" />;
}

export function BuyButton({
  href,
  children,
  event,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  event: "buy_click" | "free_lut_click";
  variant?: "solid" | "line";
}) {
  const live = isLive(href);
  return (
    <a
      href={live ? href : "#"}
      className={`buy buy-${variant}${live ? "" : " is-placeholder"}`}
      onClick={(e) => {
        // TODO analytics: no analytics on the site yet. fire `event` here once there is one.
        void event;
        if (!live) e.preventDefault();
      }}
      title={live ? undefined : "Gumroad link not set yet"}
    >
      {children}
    </a>
  );
}
