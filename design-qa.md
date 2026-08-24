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

No remaining P0, P1, or P2 visual or interaction findings.

## Implementation checklist

1. Use the shared production link on a second device to confirm the current register is visible.
2. Drag a card to a new lane; the status is stored in the shared cloud data.
3. Use **Refresh** for an immediate manual update; automatic refresh runs every 30 seconds.

## Production verification

- Live root and tracker pages returned HTTP 200 from Vercel.
- The live shared-data route returned HTTP 200 with saved records.
- The production page rendered four lanes and saved job cards, showing `Shared data is up to date`.

final result: passed
