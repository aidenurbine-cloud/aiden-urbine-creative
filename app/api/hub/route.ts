import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

// Personal FPV practice hub — passcode-gated key/value store.
// Not linked from the site nav; the URL is unlisted and the passcode is the gate.
const STORE_KEY = 'fpv-hub-data';

// Always run on the server per-request (reads a header, hits the store).
export const dynamic = 'force-dynamic';

// On Vercel the KV/Upstash integration provides these; when they're absent
// (local dev) we fall back to a JSON file so the hub still works locally.
const HAS_KV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const LOCAL_FILE = path.join(os.tmpdir(), 'fpv-hub-local.json');

async function readStore(): Promise<unknown> {
  if (HAS_KV) return (await kv.get(STORE_KEY)) ?? null;
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, 'utf8'));
  } catch {
    return null; // no file yet
  }
}

async function writeStore(body: unknown): Promise<void> {
  if (HAS_KV) {
    await kv.set(STORE_KEY, body);
    return;
  }
  await fs.writeFile(LOCAL_FILE, JSON.stringify(body), 'utf8');
}

function checkAuth(req: Request): NextResponse | null {
  const secret = process.env.HUB_SECRET;
  const provided = req.headers.get('x-hub-secret');

  if (!secret) {
    return NextResponse.json(
      { error: 'HUB_SECRET env var not set on the server' },
      { status: 500 },
    );
  }
  if (provided !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(req: Request) {
  const denied = checkAuth(req);
  if (denied) return denied;

  const data = await readStore();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const denied = checkAuth(req);
  if (denied) return denied;

  const body = await req.json().catch(() => ({}));
  await writeStore(body);
  return NextResponse.json({ ok: true });
}
