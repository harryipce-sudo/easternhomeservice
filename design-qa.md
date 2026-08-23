# Design QA — Job Tracker

## Comparison target

- Source visual truth: `C:\Users\Harry\AppData\Local\Temp\codex-clipboard-2333e02e-35de-4012-8b2b-55c533936d81.png`
- Implementation: browser-rendered local root route `http://127.0.0.1:4173/` (the same entry point that will become the production root)
- Viewport: 1280 × 720 CSS px; browser density was not overridden.
- State: empty shared register, Board selected, four lanes visible.

## Full-view comparison evidence

The browser-rendered implementation was captured and visually inspected at the target desktop state. It has a navy left navigation, header actions, search and filters, and four coloured, labelled columns in the requested order. The local preview reports offline because the local static server does not run the production API.

## Focused interaction evidence

- Per-lane **Add job** opens the job detail drawer.
- **Quotes** navigation switches to the quote register rather than returning to the removed homepage.
- The drag/drop targets are rendered in every lane; production persistence still needs a live API smoke test.

## Required fidelity surfaces

- Fonts and typography: Inter with a bold navy title and compact utility controls; close to the supplied professional tracker reference.
- Spacing and layout rhythm: fixed 232 px sidebar, compact tool row, evenly spaced board lanes and card gutters.
- Colours and visual tokens: navy navigation/card headers; blue, amber, blue-dashed, and green stage lanes mirror the reference hierarchy.
- Image quality and asset fidelity: the reference contains only typographic branding and standard UI icons; no source photographic or illustrative assets are required for the tracker view.
- Copy and content: lanes, job number, address, job detail, quote, payment, referral, search, filter, sort, calendar, clients, quotes, invoices, tasks, reports, and settings are present.

## Findings

- [P1] Live-cloud persistence cannot be verified locally.
  Evidence: the local preview has no Vercel serverless route, so it correctly displays `Offline — unable to sync`.
  Fix: deploy to the existing production Vercel project and verify `GET`/`PATCH` against the configured Supabase-backed `/api/quote-records` route.

## Implementation checklist

1. Deploy the current replacement to `easternhomeservice.vercel.app`.
2. Add a test job, move it between lanes, then load the same link in a second device/session and confirm the update appears.
3. Check the production runtime log for errors after the smoke test.

final result: blocked
