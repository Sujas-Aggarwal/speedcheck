import { performance } from "perf_hooks";
import crypto from "crypto";

/* -------------------------
   CLOUDFLARE ENDPOINTS
-------------------------- */
const CF_PING_URL = "https://speed.cloudflare.com/cdn-cgi/trace";
const CF_DOWNLOAD_URL =
  "https://speed.cloudflare.com/__down?bytes=";
const CF_UPLOAD_URL =
  "https://speed.cloudflare.com/__up";

/* -------------------------
   PING (LATENCY)
-------------------------- */
export async function pingTest() {
  const start = performance.now();
  const res = await fetch(CF_PING_URL, {
    method: "GET",
    cache: "no-store"
  });
  const ping = +(performance.now() - start).toFixed(2);
  const text = await res.text();
  const data = {};

  for (const line of text.split("\n")) {
    const [key, value] = line.split("=");
    if (key && value) data[key] = value;
  }
  return {
    ip: data.ip,
    colo: data.colo,
    country: data.loc,
    http: data.http,
    tls: data.tls,
    ping: ping
  };
}

/* -------------------------
   DOWNLOAD SPEED
-------------------------- */
export async function downloadTest(sizeMB = 5) {
  const start = performance.now();
  const res = await fetch(CF_DOWNLOAD_URL + sizeMB*1000*1000);
  const reader = res.body.getReader();

  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
  }

  const seconds = (performance.now() - start) / 1000;
  return +((bytes * 8) / seconds / 1e6).toFixed(2);
}

/* -------------------------
   UPLOAD SPEED
-------------------------- */
export async function uploadTest(sizeMB = 5) {
  const buffer = crypto.randomBytes(sizeMB * 1024 * 1024);

  const start = performance.now();
  await fetch(CF_UPLOAD_URL, {
    method: "POST",
    body: buffer,
    headers: {
      "Content-Type": "application/octet-stream"
    }
  });

  const seconds = (performance.now() - start) / 1000;
  return +((buffer.length * 8) / seconds / 1e6).toFixed(2);
}

/* -------------------------
   PUBLIC API
-------------------------- */
export async function runSpeedTest() {
  const cfInfo = await pingTest();
  const download = await downloadTest();
  const upload = await uploadTest();

  return {
    ping:cfInfo?.ping ?? "Error",
    download,
    upload,
    server: {
      name: "Cloudflare",
      location: `${cfInfo?.colo}-${cfInfo?.country}`
    },
    timestamp: new Date().toISOString()
  };
}
