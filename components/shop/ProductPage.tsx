import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import YouTube from "@/components/YouTube";
import { BuyButton, GumroadScript } from "@/components/Gumroad";
import { type Product, beforeSrc, afterSrc, lookOf, inWords } from "@/lib/shop";

export default function ProductPage({ p }: { p: Product }) {
  const hero = lookOf(p, p.heroLook);
  return (
    <article className="shop">
      <GumroadScript />
      {/* TODO analytics: fire "presets_page_view" here once the site has analytics */}

      <header className="shop-head">
        <p className="caps shop-eyebrow">{p.eyebrow}</p>
        <h1 className="page-title">{p.title}</h1>
        <p className="page-desc">{p.sub}</p>
      </header>

      <BeforeAfter before={beforeSrc(hero.slug)} after={afterSrc(hero.slug)} alt={hero.name} priority />

      <section className="shop-buy">
        <div className="shop-price">
          <p className="shop-price-name">The full pack</p>
          <p className="shop-price-num">${p.price}</p>
          <p className="shop-price-note">All {inWords(p.looks.length)} looks.</p>
          <BuyButton href={p.packUrl} event="buy_click">
            Buy the pack, ${p.price}
          </BuyButton>
        </div>
        <div className="shop-price is-quiet">
          <p className="shop-price-name">One look</p>
          <p className="shop-price-num">${p.singlePrice}</p>
          <p className="shop-price-note">Any single look. Pick it below.</p>
        </div>
      </section>

      <section className="shop-looks" aria-labelledby="looks-h">
        <h2 id="looks-h" className="shop-h">The looks</h2>
        {p.looks.map((l) => (
          <div key={l.slug} className="look" id={l.slug}>
            <BeforeAfter before={beforeSrc(l.slug)} after={afterSrc(l.slug)} alt={l.name} />
            <div className="look-text">
              <h3 className="look-name">{l.name}</h3>
              <p className="look-line">{l.line}</p>
              <p className="look-buy">
                <span className="look-incl">Included in the pack</span>
                <BuyButton href={l.singleUrl} event="buy_click" variant="line">
                  Buy just this one, ${p.singlePrice}
                </BuyButton>
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="shop-sec">
        <h2 className="shop-h">What&apos;s included</h2>
        <ul className="shop-list">
          <li>All {inWords(p.looks.length)} looks as .cube LUTs (33-point) and .drx DaVinci Resolve Power Grades</li>
          <li>
            An install guide (<a href={p.installGuideUrl}>PDF</a>)
          </li>
          <li>A short video on how to apply the looks and how to expose for them</li>
          <li>Free updates to Volume 1</li>
        </ul>
        {p.howToVideo ? (
          <YouTube id={p.howToVideo} title="How to apply and expose for Field Grades" />
        ) : (
          <div className="shop-video-ph">How-to video coming (placeholder)</div>
        )}
      </section>

      <section className="shop-sec">
        <h2 className="shop-h">Compatibility</h2>
        <p>
          Built and tested on Sony S-Log3. The .cube files load on any LOG footage, but expect to adjust exposure and
          intensity on other camera systems.
        </p>
        <p>
          The .cube files also load in Premiere and other editors. The .drx files are Resolve-only.
        </p>
      </section>

      <section className="shop-sec">
        <h2 className="shop-h">Questions</h2>
        <details>
          <summary>What camera is it for?</summary>
          <p>
            Sony S-Log3. That&apos;s what I shoot, and it&apos;s what these were built and tested on. The .cube files
            load on any LOG footage, but on other camera systems expect to adjust exposure and intensity.
          </p>
        </details>
        <details>
          <summary>What software do I need?</summary>
          <p>
            For the .drx Power Grades, DaVinci Resolve. The free version is fine. The .cube LUTs load in Premiere and
            any other editor that takes .cube files.
          </p>
        </details>
        <details>
          <summary>How does delivery work?</summary>
          <p>Instant download right after checkout. You&apos;ll also get the files by email.</p>
        </details>
        <details>
          <summary>Refunds?</summary>
          <p className="is-placeholder-text">{p.refundPolicy}</p>
        </details>
        <details>
          <summary>Is this a client product?</summary>
          <p>
            No. Field Grades is my own product. The grades come from my paid work, but no client or brand I&apos;ve
            worked with is involved in it or endorses it.
          </p>
        </details>
      </section>

      <section className="shop-free">
        <p>Not sure yet? Start with the free one.</p>
        <Link href="/free-lut" className="buy buy-line">
          Get the free LUT
        </Link>
      </section>
    </article>
  );
}
