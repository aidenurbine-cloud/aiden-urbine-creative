import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import { BuyButton, GumroadScript } from "@/components/Gumroad";
import { type Product, beforeSrc, afterSrc, lookOf, inWords } from "@/lib/shop";

export default function FreePage({ p }: { p: Product }) {
  const free = lookOf(p, p.freeLook);
  return (
    <article className="shop">
      <GumroadScript />

      <header className="shop-head">
        <h1 className="page-title">Start with one. It&apos;s free.</h1>
        <p className="page-desc">
          {free.name}, one look from {p.name}, delivered by email.
        </p>
        <BuyButton href={p.freeUrl} event="free_lut_click">
          Send me the free LUT
        </BuyButton>
        <p className="shop-fine">Gumroad handles the email and the download. Nothing is stored on this site.</p>
      </header>

      <BeforeAfter before={beforeSrc(free.slug)} after={afterSrc(free.slug)} alt={free.name} priority />

      <section className="shop-free">
        <p>
          Like it? The full pack is ${p.price}, all {inWords(p.looks.length)} looks.
        </p>
        <Link href="/presets" className="buy buy-solid">
          See the full pack
        </Link>
      </section>
    </article>
  );
}
