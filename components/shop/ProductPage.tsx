import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import YouTube from "@/components/YouTube";
import { BuyButton, GumroadScript } from "@/components/Gumroad";
import { type Product, beforeSrc, afterSrc, lookOf, inWords, hasSingles, hasFree, isLive } from "@/lib/shop";

export default function ProductPage({ p }: { p: Product }) {
  const hero = lookOf(p, p.heroLook);
  const singles = hasSingles(p);
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

      <section className={`shop-buy${singles ? "" : " is-single"}`}>
        <div className="shop-price">
          <p className="shop-price-name">The full pack</p>
          <p className="shop-price-num">${p.price}</p>
          <p className="shop-price-note">All {inWords(p.looks.length)} looks.</p>
          <BuyButton href={p.packUrl} event="buy_click">
            Buy the pack, ${p.price}
          </BuyButton>
        </div>
        {singles && (
          <div className="shop-price is-quiet">
            <p className="shop-price-name">One look</p>
            <p className="shop-price-num">${p.singlePrice}</p>
            <p className="shop-price-note">Any single look. Pick it below.</p>
          </div>
        )}
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
                {isLive(l.singleUrl) && (
                  <BuyButton href={l.singleUrl} event="buy_click" variant="line">
                    Buy just this one, ${p.singlePrice}
                  </BuyButton>
                )}
              </p>
            </div>
          </div>
        ))}
      </section>

      {!singles && (
        <p className="shop-again">
          <BuyButton href={p.packUrl} event="buy_click">
            Get all {inWords(p.looks.length)}, ${p.price}
          </BuyButton>
        </p>
      )}

      <section className="shop-sec">
        <h2 className="shop-h">What&apos;s included</h2>
        <ul className="shop-list">
          <li>All {inWords(p.looks.length)} looks as .cube LUTs (33-point)</li>
          <li>A .drx Power Grade for DaVinci Resolve: my base node tree. Swap any of the looks into its LUT node.</li>
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
          Built and tested on Sony S-Log3 / S-Gamut3.Cine. The .cube files load on any LOG footage, but they&apos;re tuned
          for S-Log3. On other cameras, expect to adjust exposure and intensity.
        </p>
        <p>
          The .cube files load in Resolve, Premiere and most other editors. The .drx Power Grade is Resolve-only.
        </p>
        <p>
          They&apos;re made for correctly exposed footage. If a shot is two stops under, no LUT saves it. White balance
          your camera before shooting.
        </p>
        <p>
          Too strong? Put the look on its own node and pull the Key Output Gain down to taste. That&apos;s how I use
          them.
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
            For the .drx Power Grade, DaVinci Resolve. The free version is fine. The .cube LUTs load in Premiere and
            any other editor that takes .cube files.
          </p>
        </details>
        <details>
          <summary>How does delivery work?</summary>
          <p>Instant download after checkout. The files are emailed to you too.</p>
        </details>
        <details>
          <summary>Refunds?</summary>
          <p className="is-placeholder-text">{p.refundPolicy}</p>
        </details>
        <details>
          <summary>Is this a client product?</summary>
          <p>
            No. This is my personal product. The grades come from my paid work, but it&apos;s not affiliated with or
            endorsed by any of the brands I film for.
          </p>
        </details>
      </section>

      <p className="shop-contact">
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
