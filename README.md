# Eastern Home Service Quote Builder

A browser-based quoting app for Eastern Home Service that handles roller blinds, curtains, and sheers in one workflow.

## Current Features

- Uses Wintex Group 2, 3, and 4 pricing tables for roller blinds
- Supports roller blind, curtain, and sheer quoting in one shared `Items` table
- Accepts calculator-style size entry such as `1200+50` or `2400-20`
- Rounds blind sizes up to the next matching pricing bracket
- Calculates cost, retail, GST, total quote, and gross profit
- Supports supply-only and supply-plus-install blind quotes
- Calculates curtain and sheer pricing from material, fold rate, and track cost
- Shows a detailed internal `Item Summary` for measurements and setup details
- Generates a cleaner customer quote preview and printable PDF layout
- Creates copy-ready email and message drafts for customer follow-up
- Lets you attach house photos during measurement
- Saves submitted quotes into local `Dimension Records` for later lookup

## Local Preview

- Local app: `http://127.0.0.1:4173/index.html`
- Live app: `https://easternhomeservice.vercel.app`

## Main Files

- `index.html` - structure, sections, quote preview, records, and message UI
- `styles.css` - dark theme, responsive layout, print styling, and component styling
- `app.js` - pricing logic, item rendering, records, photo handling, and customer message generation

## Storage Notes

- Quotes, records, and photos are currently stored in browser local storage
- Data does not sync between devices yet
- The app can run locally or as a static hosted site
