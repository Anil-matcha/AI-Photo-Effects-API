// Node 18+ (built-in fetch). Run: MUAPI_API_KEY=... node submit_and_poll.mjs
const BASE = "https://api.muapi.ai/api/v1";
const headers = { "x-api-key": process.env.MUAPI_API_KEY, "Content-Type": "application/json" };
const payload = {
  "image_url": "https://example.com/replace-with-your-photo.jpg",
  "name": "Angel Figurine"
};

const submit = await fetch(`${BASE}/image-effects`, { method: "POST", headers, body: JSON.stringify(payload) });
if (!submit.ok) throw new Error(await submit.text());
const { request_id } = await submit.json();
console.log("request_id:", request_id);

while (true) {
  const res = await fetch(`${BASE}/predictions/${request_id}/result`, { headers });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  if (data.status === "completed" || data.status === "failed") {
    console.log(data);
    break;
  }
  await new Promise((r) => setTimeout(r, 3000));
}
