import Image from "next/image";
import { type FeedItem } from "@/components/Feed";
import ReelRow from "@/components/pitch/ReelRow";
import { EMAIL, INSTAGRAM } from "@/lib/projects";
import { STATS, liveFollowers } from "@/lib/pitch";

// the one pitch template. /gfc and /roughcountry are both just configs for this,
// so a new brand pitch is one small page file. film up top, print below:
// a full-screen title card on a photo, then everything else on the site's cream paper.

export type Row = [string, string];

export type Pitch = {
  brand: string;
  hero: { src: string; alt: string; pos?: string };
  lede: string;
  numbers: Row[]; // followers get added as the first cell automatically
  workNote?: string;
  reels: { url: string; label: string }[];
  deal?: { rate: string; rows: Row[] };
  ask?: { heading: string; body: string };
  terms?: Row[];
  ideas?: { rows: Row[]; shown: number };
  photosMid?: FeedItem[];
  photos: FeedItem[];
  note?: string;
  next?: string[];
};

function Photos({ items }: { items: FeedItem[] }) {
  return (
    <div className={`pc-photos${items.length % 3 === 0 ? " is-3" : ""}`}>
      {items.map((ph) => (
        <div key={ph.src} className="pc-photo" style={{ background: ph.c }}>
          <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 800px) 360px, 50vw" />
        </div>
      ))}
    </div>
  );
}

function Rows({ rows }: { rows: Row[] }) {
  return (
    <ul className="pc-rows">
      {rows.map(([title, line]) => (
        <li key={title}>
          <b>{title}</b>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function PitchPage({ p }: { p: Pitch }) {
  const live = await liveFollowers();

  return (
    <>
      <section className="pc-hero">
        <a className="pc-home" href="/">
          aidenurbine.com
        </a>
        <Image
          src={p.hero.src}
          alt={p.hero.alt}
          fill
          priority
          sizes="100vw"
          style={p.hero.pos ? { objectPosition: p.hero.pos } : undefined}
        />
        <div className="pc-hero-text">
          <p className="pc-name">Aiden Urbine</p>
          <h1>The 200K Mile Home</h1>
          <p className="pc-for">For {p.brand}</p>
        </div>
      </section>

      <main className="pc">
        <p className="pc-lede">{p.lede}</p>

        <section className="pc-sec">
          <h2>The numbers</h2>
          <div className="pc-nums">
            <div>
              <b>
                {live ?? STATS.followers}
                {live && <i className="pc-dot" title="Live from Instagram" />}
              </b>
              <span>{live ? "followers right now" : "followers"}</span>
            </div>
            {p.numbers.map(([n, label]) => (
              <div key={label}>
                <b>{n}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pc-sec">
          <h2>The work</h2>
          {p.workNote && <p className="pc-body">{p.workNote}</p>}
          <ReelRow reels={p.reels} />
        </section>

        {p.photosMid && (
          <section className="pc-sec">
            <Photos items={p.photosMid} />
          </section>
        )}

        {p.deal && (
          <section className="pc-sec">
            <h2>The deal</h2>
            <p className="pc-price">
              {p.deal.rate} <span>a month</span>
            </p>
            <Rows rows={p.deal.rows} />
          </section>
        )}

        {p.ask && (
          <section className="pc-sec">
            <h2>The ask</h2>
            <p className="pc-ask">{p.ask.heading}</p>
            <p className="pc-body">{p.ask.body}</p>
          </section>
        )}

        {p.terms && (
          <section className="pc-sec">
            <h2>Terms</h2>
            <Rows rows={p.terms} />
          </section>
        )}

        {p.ideas && (
          <section className="pc-sec">
            <h2>Long-form ideas</h2>
            <Rows rows={p.ideas.rows.slice(0, p.ideas.shown)} />
            <details className="pc-more">
              <summary>
                <span className="is-closed">See the whole list</span>
                <span className="is-open">Show less</span>
              </summary>
              <Rows rows={p.ideas.rows.slice(p.ideas.shown)} />
            </details>
          </section>
        )}

        <section className="pc-sec">
          <Photos items={p.photos} />
        </section>

        <section className="pc-sec pc-end">
          {p.next && (
            <>
              <h2>Next steps</h2>
              <ul className="pc-next">
                {p.next.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          )}
          {p.note && <p className="pc-body">{p.note}</p>}
          <p className="pc-contact">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={`https://instagram.com/${INSTAGRAM}`}>@{INSTAGRAM}</a>
          </p>
        </section>
      </main>
    </>
  );
}
