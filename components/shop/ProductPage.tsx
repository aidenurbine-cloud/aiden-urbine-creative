import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import { BuyButton, GumroadScript } from "@/components/Gumroad";
import { type Product, beforeSrc, afterSrc, inWords, hasFree, isLive } from "@/lib/shop";

// a look only gets a slider once both of its stills are in public/field-grades
const exists = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src));
const hasStills = (slug: string) => exists(beforeSrc(slug)) && exists(afterSrc(slug));

export default function ProductPage({ p }: { p: Product }) {
  const count = inWords(p.looks.length);
  return (
    <article className="shop fg">
      <GumroadScript />
      {/* TODO analytics: fire "presets_page_view" here once the site has analytics */}

      <h1 className="sr-only">{p.name}</h1>

      <div className="fg-intro">
        <p className="fg-title">{p.title}</p>
        <p className="page-desc">{p.sub}</p>
        <p className="fg-buyline">
          <span>
            {count[0].toUpperCase() + count.slice(1)} looks. ${p.price}.
          </span>
          <BuyButton href={p.packUrl} event="buy_click" variant="line">
            Buy, ${p.price}
          </BuyButton>
        </p>
      </div>

      <section className="fg-looks" aria-label="The looks">
        {p.looks.map((l) => (
          <div key={l.slug} className="fg-look" id={l.slug}>
            <div className="fg-look-head">
              <h2 className="fg-look-name">{l.name}</h2>
              <p className="fg-look-line">{l.line}</p>
            </div>
            {hasStills(l.slug) && <BeforeAfter before={beforeSrc(l.slug)} after={afterSrc(l.slug)} alt={l.name} />}
            {isLive(l.singleUrl) && (
              <BuyButton href={l.singleUrl} event="buy_click" variant="line">
                Just this one, ${p.singlePrice}
              </BuyButton>
            )}
          </div>
        ))}
      </section>

      <section className="fg-box">
        {exists(p.art.cover) && (
          <div className="fg-box-art">
            <Image src={p.art.cover} alt={`${p.name} cover`} fill sizes="(min-width: 900px) 32vw, 100vw" />
          </div>
        )}
        <div className="fg-box-text">
          <p className="fg-vol">- Volume 1 -</p>
          <h2 className="shop-h">What&apos;s in the pack</h2>
          <ul className="shop-list">
            <li>All {count} looks as .cube LUTs (33-point). They load in Resolve, Premiere and most editors.</li>
            <li>A .drx Power Grade for DaVinci Resolve: my base node tree. Swap any of the looks into its LUT node.</li>
            <li>An install guide (PDF)</li>
            <li>Free updates to Volume 1</li>
          </ul>
          <BuyButton href={p.packUrl} event="buy_click">
            Buy Field Grades, ${p.price}
          </BuyButton>
        </div>
      </section>

      <section className="shop-sec">
        <h2 className="shop-h">Compatibility</h2>
        <p>
          Built and tested on Sony S-Log3 / S-Gamut3.Cine. The .cube files load on any LOG footage, but they&apos;re tuned
          for S-Log3. On other cameras, expect to adjust exposure and intensity. The .drx Power Grade is Resolve-only.
        </p>
        <p>
          They&apos;re made for correctly exposed footage. If a shot is two stops under, no LUT saves it. White balance
          your camera before shooting. Too strong? Pull the Key Output Gain down on the LUT node. That&apos;s how I use
          them.
        </p>
      </section>

      <section className="shop-sec">
        <h2 className="shop-h">Questions</h2>
        <details>
          <summary>What software do I need?</summary>
          <p>
            For the Power Grade, DaVinci Resolve. The free version is fine. The .cube LUTs load in Premiere and any other
            editor that takes .cube files.
          </p>
        </details>
        <details>
          <summary>How does delivery work?</summary>
          <p>Instant download after checkout. The files are emailed to you too.</p>
        </details>
        <details>
          <summary>Is this a client product?</summary>
          <p>No. This is my personal product. It&apos;s not affiliated with or endorsed by any of the brands I film for.</p>
        </details>
      </section>

      <p className="fg-contact">
        Questions or a file misbehaving: <a href="mailto:aiden@aidenurbine.com">aiden@aidenurbine.com</a>
      </p>

      {hasFree(p) && (
        <section className="shop-free">
          <p>Not sure yet? Start with the free one.</p>
          <Link href="/free-lut" className="buy buy-line">
            Get the free LUT
          </Link>
        </section>
      )}
    </article>
  );
}
