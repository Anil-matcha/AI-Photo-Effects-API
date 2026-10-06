# AI Photo Effects API

Apply viral photo effects and AI filters to any image through one REST API. This guide covers all 48 supported photo effect presets across three endpoints — 3D figurines, comic and pixel styles, decade looks, landmarks, famous-art scenes and edit-style effects — with request fields, pricing and runnable curl, Python and JavaScript examples.

[Muapi AI Photo Effects API landing page](https://muapi.ai/ai-photo-effects-api) · [API reference](https://muapi.ai/docs/api-reference) · [Playground](https://muapi.ai/playground/image-effects) · [Create an API key](https://muapi.ai/access-keys)

## Related Projects

- [MuAPI](https://muapi.ai) — Unified API for image, video, and audio generation across hundreds of AI models.
- [AI-Video-Effects-API](https://github.com/Anil-matcha/AI-Video-Effects-API) — Companion guide for 160+ video effect, VFX and camera-move presets.
- [AI-Image-Editing-API](https://github.com/Anil-matcha/AI-Image-Editing-API) — Prompt-based image editing, restyling and object changes.
- [Virtual-Try-On-API](https://github.com/Anil-matcha/Virtual-Try-On-API) — Put a garment on a person in an existing photo.
- [Nano-Banana-3-API](https://github.com/Anil-matcha/Nano-Banana-3-API) — Nano Banana API guide with Python, JavaScript and curl examples.
- [awesome-ai-image-models](https://github.com/Anil-matcha/awesome-ai-image-models) — Model, API and price comparison list for AI image generation.
- [Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) — Open-source generative media studio built on MuAPI.
- [muapi-cli](https://github.com/SamurAIGPT/muapi-cli) — Terminal interface for the MuAPI endpoints used here.

## What this API covers

Three effect endpoints share one authentication scheme and the same submit-and-poll flow. A separate single-style endpoint, `ai-ghibli-style` (`image_url` only, $0.05 per image), applies a Studio Ghibli look.

| Endpoint | What it does | Presets | Price |
|---|---|---|---|
| `image-effects` | AI Image Effects | 18 | $0.03 per image |
| `nano-banana-effects` | Nano Banana Effects | 17 | $0.03 per image |
| `flux-kontext-effects` | Flux Kontext Effects | 13 | $0.04 per image |

The effect is chosen with the `name` parameter. Effects are fixed, tuned templates, so output is repeatable — unlike a free-form prompt edit.

## Request fields

| Field | Endpoints | Requirement | Notes |
|---|---|---|---|
| `image_url` | all | Required | Public URL of the input image (or upload with `POST /api/v1/upload_file`). |
| `name` | all | Required | Effect preset, exactly as listed below (case-sensitive). |
| `prompt` | `flux-kontext-effects` | Required | Text describing the change. Not used by the other two. |
| `aspect_ratio` | `nano-banana-effects` | Optional | `Auto` (default), `1:1`, `3:4`, `4:3`, `9:16`, `16:9`, `3:2`, `2:3`, `5:4`, `4:5`, `21:9`. |
| `webhook_url` | all | Optional | Receive the result by callback instead of polling. |

Verify current pricing on the [landing page](https://muapi.ai/ai-photo-effects-api) before production use.

## Choosing an endpoint

- **Cheapest viral looks (figurines, plush, comics, pixel characters, miniature worlds)** → `image-effects`.
- **Decade looks, landmarks, famous-art scenes, figurines with aspect-ratio control** → `nano-banana-effects`.
- **Edit-style changes (age, hair, expression, background, weather, time of day, object removal)** → `flux-kontext-effects`.
- **Bespoke edits described in words** → use a prompt-based editor; see [AI-Image-Editing-API](https://github.com/Anil-matcha/AI-Image-Editing-API).


## Quick start

Muapi uses an asynchronous REST contract. Submit a JSON request with your API key, save the returned `request_id`, then poll the result endpoint (or pass a `webhook_url`). Replace sample URLs with files you control.

```bash
export MUAPI_API_KEY=your_key_here
bash examples/submit.sh                 # curl
pip install -r requirements.txt && python examples/submit_and_poll.py
node examples/submit_and_poll.mjs       # Node 18+
```

Poll for the result:

```bash
curl "https://api.muapi.ai/api/v1/predictions/$REQUEST_ID/result" \
  -H "x-api-key: $MUAPI_API_KEY"
```

A completed response looks like:

```json
{
  "id": "abc123xyz",
  "status": "completed",
  "outputs": ["https://cdn.muapi.ai/...output"],
  "cost": { "amount_usd": 0.3, "amount_credits": 30, "refunded": false }
}
```

Poll until `status` is `completed` or `failed`. Download outputs you need to keep, since hosted URLs can expire. Sandbox API keys return mock results instantly without spending credits, which is handy for building your integration first.

## Errors and production notes

- Keep the API key in an environment variable; never commit credentials.
- `name` is case-sensitive and must match a preset in the lists below exactly; an unrecognised name is rejected or fails the task.
- Handle non-2xx responses and `failed` task states explicitly; check the `cost.refunded` field on failed tasks.
- Do not resubmit after a timeout without checking the original `request_id`, to avoid duplicate billable jobs.
- Only submit images of people who have agreed to be used this way.
- Confirm current pricing and availability on the Muapi page before estimating production cost.

## Supported photo effects

Pass any name below as `name` on its endpoint.

### AI Image Effects — `image-effects` (18 effects)

`Acryclic Ornaments`, `Advanced Photography`, `American Comic Style`, `Angel Figurine`, `Blurry Selfie`, `Cyberpunk`, `Exotic Charm`, `Felt 3D Polaroid`, `Felt Keychain`, `Furry Dream Doll`, `Futuristic American Comics`, `Glass Ball`, `In The Stadium`, `Lofi Pixel Character`, `Lying On Fluffy Belly`, `Landscape Mini World`, `My World`, `Plastic Bubble Figure`

### Nano Banana Effects — `nano-banana-effects` (17 effects)

`3D Figurine`, `16bit Game Character`, `1920s Decade`, `1950s Decade`, `1970s Decade`, `1980s Decade`, `Action Figure`, `American Gothic Art`, `Egypts Landmark`, `Eiffel Tower Landmark`, `Famous Art`, `Great Wall of China Landmark`, `Mona Lisa Art`, `Persistent Memory Art`, `Statue of Liberty Landmark`, `Taj Mahal Landmark`, `Vincent Van Gogh Art`

### Flux Kontext Effects — `flux-kontext-effects` (13 effects)

`Age Progression`, `Background Change`, `Cartoonify`, `Color Correction`, `Expression Change`, `Face Enhancement`, `Hair Change`, `Object Removal`, `Professional Photo`, `Scene Composition`, `Style Transfer`, `Time of Day`, `Weather Effect`

