# Invoice builder design QA

- Source visual truth: user-supplied `25255.pdf` (rendered page 1)
- Implementation: `https://easternhomeservice.vercel.app/tracker.html?v=20260911-invoice-builder`
- State: existing invoice opened from the invoice list, then **Create invoice** selected. No invoice was saved during testing.
- Viewport: desktop browser, approximately 1260 x 710 CSS pixels.

## Comparison

The live invoice preview follows the supplied A4 tax-invoice layout: business details at upper left, Eastern branding at upper right, a centred invoice title, client and two-date block, muted green table header, payment terms, totals and bank details. The newly supplied Eastern logo asset is used rather than a drawn substitute. The builder keeps its editable left-side setup panel for managing invoice information before saving or printing.

### Fidelity surfaces

- Fonts and typography: Inter provides clear hierarchy for the invoice title, date labels and totals.
- Spacing and layout rhythm: desktop layout separates editing controls from the printable invoice; the invoice remains readable on smaller screens in a single-column layout.
- Colours and visual tokens: navy headings, muted green table header, white paper surface and soft grey secondary labels match the supplied PDF.
- Image quality and asset fidelity: the newly supplied Eastern Home Services logo appears in the preview.
- Copy and content: payment communication, GST line, default 30-day payment terms, editable due date, note and bank details are present.

## Interaction checks

- Opening an invoice row opens its job details, then **Create invoice** opens the invoice builder.
- The next invoice number is populated automatically (`INV-25261` in the tested record).
- Default payment terms are 30 days; changing the terms to 15 updated the displayed due date from 10/10/2026 to 25/09/2026.
- GST and total calculations rendered correctly for the tested $450.00 ex-GST line: $45.00 GST and $495.00 total.
- Print / Save PDF and Save invoice actions are available. The save action was deliberately not triggered during QA.
- Browser console: no warnings or errors.

## Findings

No actionable P0, P1 or P2 visual issues found in the tested desktop state. Existing records without a client name will prefill the Client field as `-`; this reflects the existing tracker data and can be edited before saving the invoice.

## Comparison history

1. The initial implementation did not recalculate the due date while typing a new payment-term value. The payment-term input now updates the due date immediately.
2. The initial preview used a text-only brand. It now uses the supplied Eastern Home Services logo and the PDF's header, dates, payment terms and totals layout.

final result: passed

## Trello board refresh QA — 21 November 2026

- Source visual truth: selected board concept shown in the user's image attachment (`codex-clipboard-33afb23c-cffc-4108-9f2a-e67289be9d9f.png`), corresponding to the second displayed Trello-inspired board concept.
- Implementation source: `tracker.html`, `tracker.css`, and `tracker.js` in this project.
- Intended desktop viewport: 1440 × 1024 CSS pixels.
- Required state: Jobs / Board view with draggable cards, then a card move between lanes.

### Implementation checks completed

- `node --check tracker.js` passed after the board-card and activity updates.
- Existing drag-and-drop, lane reordering, custom boards, saved positions, and card menus were preserved in the implementation.
- A moved job now records an activity entry naming its source and destination workflow stage.

### Visual comparison status

Browser-rendered capture is blocked: the desktop browser's managed policy denied access to the local preview origin `http://127.0.0.1:4173`. This prevents the required same-viewport visual comparison and interaction test. No alternate browser or indirect browser method was used.

### Required fidelity surfaces

- Fonts and typography: blocked from visual verification.
- Spacing and layout rhythm: blocked from visual verification.
- Colours and visual tokens: blocked from visual verification.
- Image quality and asset fidelity: no new image asset was added; blocked from visual verification.
- Copy and content: implemented board labels, client initials, amount, due date, payment state, markup and action controls; visual verification blocked.

### Findings

- [P1] Local visual verification unavailable.
  Location: local preview.
  Evidence: browser policy rejected the local origin before capture.
  Impact: the refreshed board cannot be certified against the selected design until a permitted preview origin is available.
  Fix: open the preview in an approved browser/origin, capture the same Jobs / Board state, and run the drag/drop interaction test.

### Comparison history

1. Initial QA attempt: blocked before local page capture by managed browser-origin policy.

final result: blocked

## Separate editor and preview QA — 19 October 2026

- Source intent: the user requested direct invoice-line entry, with the editable invoice and the A4 preview in separate windows.
- Live verification: opened tracker invoice 25228, selected **Create A4 invoice**, then **Preview invoice**. No changes were saved.
- Result: passed. The edit window shows client, dates, note, and separate Description / Qty / Unit price / GST / Amount line rows. The A4 paper opens only in the separate **Invoice preview** window, where the three line items and their individual prices remain readable.
