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
