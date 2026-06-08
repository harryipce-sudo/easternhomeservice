const PRICING_TABLE = {
  widths: [630, 830, 1030, 1230, 1430, 1630, 1830, 2030, 2230, 2430, 2630, 2830, 3030],
  drops: [900, 1050, 1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400, 2550, 2700, 2850, 3000],
  groups: {
    G2: {
      label: "Group 2",
      values: {
        900: [62, 72, 76, 83, 89, 92, 99, 105, 112, 133, 144, 167, 186],
        1050: [64, 75, 79, 86, 92, 98, 104, 109, 118, 141, 150, 173, 196],
        1200: [67, 77, 82, 90, 95, 102, 108, 115, 124, 150, 155, 178, 201],
        1350: [69, 79, 85, 93, 99, 108, 113, 121, 130, 155, 161, 184, 207],
        1500: [71, 82, 89, 95, 104, 113, 117, 127, 132, 161, 167, 209, 236],
        1650: [74, 84, 92, 99, 108, 117, 122, 132, 138, 167, 173, 219, 245],
        1800: [76, 86, 95, 104, 113, 122, 127, 138, 144, 173, 199, 224, 256],
        1950: [78, 89, 99, 108, 117, 127, 131, 144, 150, 178, 207, 230, 265],
        2100: [81, 93, 102, 113, 121, 131, 136, 150, 155, 184, 216, 239, 274],
        2250: [83, 95, 106, 117, 127, 136, 140, 155, 161, 190, 224, 247, 282],
        2400: [85, 98, 109, 122, 132, 140, 145, 161, 167, 213, 236, 259, 293],
        2550: [87, 101, 113, 127, 138, 145, 150, 167, 173, 220, 242, 267, 301],
        2700: [90, 103, 115, 131, 143, 150, 155, 173, 178, 230, 247, 276, 311],
        2850: [92, 107, 118, 136, 147, 155, 161, 178, 184, 238, 253, 285, 320],
        3000: [94, 110, 122, 140, 152, 161, 167, 184, 190, 245, 259, 293, 328]
      }
    },
    G3: {
      label: "Group 3",
      values: {
        900: [78, 82, 89, 94, 96, 102, 105, 110, 115, 138, 150, 179, 199],
        1050: [77, 86, 90, 97, 100, 106, 110, 117, 120, 144, 155, 184, 206],
        1200: [79, 90, 93, 100, 103, 110, 115, 122, 124, 150, 162, 191, 214],
        1350: [82, 92, 96, 103, 106, 115, 118, 126, 130, 155, 167, 197, 221],
        1500: [84, 95, 99, 107, 110, 118, 122, 130, 133, 160, 172, 213, 230],
        1650: [86, 98, 102, 110, 114, 123, 126, 136, 139, 166, 179, 221, 237],
        1800: [89, 100, 104, 115, 118, 127, 131, 140, 146, 171, 199, 233, 246],
        1950: [91, 103, 107, 118, 122, 130, 135, 146, 149, 176, 207, 242, 253],
        2100: [93, 106, 109, 121, 125, 135, 139, 150, 155, 183, 216, 251, 262],
        2250: [95, 108, 114, 124, 129, 139, 145, 155, 159, 188, 223, 260, 283],
        2400: [98, 111, 117, 127, 132, 143, 149, 160, 164, 213, 230, 269, 293],
        2550: [100, 115, 120, 131, 136, 149, 152, 164, 169, 219, 239, 278, 301],
        2700: [102, 117, 122, 133, 139, 152, 156, 169, 174, 224, 247, 288, 308],
        2850: [105, 120, 126, 137, 144, 156, 161, 173, 179, 230, 253, 297, 315],
        3000: [107, 123, 127, 141, 147, 160, 165, 179, 184, 236, 259, 304, 324]
      }
    },
    G4: {
      label: "Group 4",
      values: {
        900: [90, 92, 100, 105, 105, 112, 114, 119, 123, 148, 162, 196, 216],
        1050: [88, 97, 101, 108, 110, 116, 120, 127, 128, 153, 167, 201, 224],
        1200: [90, 102, 104, 111, 113, 120, 125, 132, 131, 160, 175, 209, 234],
        1350: [93, 104, 107, 114, 116, 125, 128, 136, 139, 165, 180, 207, 232],
        1500: [95, 107, 110, 119, 120, 128, 132, 139, 142, 170, 185, 228, 242],
        1650: [97, 111, 113, 122, 124, 133, 136, 146, 148, 176, 185, 237, 248],
        1800: [101, 113, 115, 127, 128, 137, 141, 150, 156, 182, 211, 253, 258],
        1950: [103, 116, 118, 130, 132, 140, 146, 156, 158, 187, 220, 262, 264],
        2100: [105, 119, 119, 132, 134, 146, 150, 160, 165, 195, 230, 272, 274],
        2250: [107, 121, 125, 135, 138, 150, 157, 165, 168, 193, 235, 281, 301],
        2400: [110, 124, 128, 137, 140, 154, 161, 170, 173, 227, 243, 291, 313],
        2550: [112, 129, 132, 141, 144, 161, 163, 173, 179, 232, 254, 301, 321],
        2700: [114, 131, 133, 143, 147, 163, 166, 179, 184, 236, 264, 312, 327],
        2850: [118, 134, 138, 147, 152, 166, 171, 182, 189, 242, 271, 322, 335],
        3000: [118, 136, 136, 149, 153, 169, 174, 188, 193, 247, 276, 329, 345]
      }
    }
  }
};

const CURTAIN_MATERIALS = {
  Begonia: { price: 40.99, colors: ["Sand", "Silver", "Taupe", "Tea", "Pewter", "Charcoal", "Ink"] },
  Camellia: { price: 46.99, colors: ["White", "Sand", "Silver", "Taupe", "Tea", "Black"] },
  Daisy: { price: 49.99, colors: ["Sand", "Duck Egg", "Taupe", "Tea", "Charcoal", "Almond"] },
  Erica: { price: 34.99, colors: ["White", "Sand", "Taupe", "Granite", "Pewter"] },
  Freesia: { price: 42.99, colors: ["White", "Sand", "Taupe", "Duck Egg", "Granite", "Pewter", "Mist"] },
  Gardenia: { price: 34.99, colors: ["White", "Ivory", "Silver"] },
  Iris: { price: 34.99, colors: ["White", "Pewter", "Charcoal", "Black"] },
  Jasmine: { price: 34.99, colors: ["Ivory", "Pewter", "Charcoal"] },
  Kalmia: { price: 26.99, colors: ["White", "Ivory", "Silver", "Pewter", "Slate"] },
  Lewesia: { price: 26.99, colors: ["White", "Silver", "Pewter", "Slate"] }
};

const SERVICE_TYPES = [
  { value: "supply-install", label: "Supply + Install" },
  { value: "supply-only", label: "Supply Only" }
];

const CURTAIN_PRODUCTS = [
  { value: "curtain", label: "Curtain" },
  { value: "sheer", label: "Sheer" }
];

const FOLD_RATES = [2, 2.3];
const CURTAIN_STYLES = [
  "S-Fold Metal Hook",
  "S-Fold White Plastic Hook",
  "Double Pinch Pleat",
  "Triple Pinch Pleat",
  "Eyelet"
];
const STACKING_OPTIONS = ["Side Open", "Center Open"];
const SHEER_BOTTOM_STYLES = ["None", "With Base Weight", "80mm Hem"];
const BLOCKOUT_OPTIONS = ["Yes", "No"];
const TRACK_PRICE_PER_M = 60;

const state = {
  gstRate: 0.1,
  settings: {
    supplyMarkup: 40,
    curtainMarkup: 40,
    installCost: 20,
    installRetail: 35
  },
  customer: {
    name: "",
    phone: "",
    address: "",
    quoteNumber: ""
  },
  photos: [],
  records: [],
  lines: [],
  curtainLines: [],
  historySearch: "",
  selectedRecordId: "",
  invoices: [],
  invoiceSearch: "",
  selectedInvoiceId: ""
};

const LOCAL_RECORDS_KEY = "ehs-dimension-records";
const LOCAL_PHOTOS_KEY = "ehs-house-photos";
const LOCAL_INVOICES_KEY = "ehs-invoices";

let els = {};
let initRecoveryAttempted = false;
let pendingFocus = null;

function getQuoteRecordsEndpoint() {
  const { hostname } = window.location;
  const isLocalHost = hostname === "127.0.0.1" || hostname === "localhost";
  const baseUrl = isLocalHost ? "https://easternhomeservice.vercel.app" : "";
  return `${baseUrl}/api/quote-records`;
}

function cacheElements() {
  els = {
    addLine: document.querySelector("#add-line"),
    addCurtainLine: document.querySelector("#add-curtain-line"),
    saveAllBlinds: document.querySelector("#save-all-blinds"),
    saveAllCurtains: document.querySelector("#save-all-curtains"),
    clearBlinds: document.querySelector("#clear-blinds"),
    clearCurtains: document.querySelector("#clear-curtains"),
    resetQuote: document.querySelector("#reset-quote"),
    submitQuote: document.querySelector("#submit-quote"),
    printQuote: document.querySelector("#print-quote"),
    supplyMarkup: document.querySelector("#supply-markup"),
    curtainMarkup: document.querySelector("#curtain-markup"),
    installCost: document.querySelector("#install-cost"),
    installRetail: document.querySelector("#install-retail"),
    customerName: document.querySelector("#customer-name"),
    customerPhone: document.querySelector("#customer-phone"),
    customerAddress: document.querySelector("#customer-address"),
    quoteNumber: document.querySelector("#quote-number"),
    airCustomerName: document.querySelector("#air-customer-name"),
    airCustomerPhone: document.querySelector("#air-customer-phone"),
    airCustomerAddress: document.querySelector("#air-customer-address"),
    airQuoteNumber: document.querySelector("#air-quote-number"),
    airProductType: document.querySelector("#air-product-type"),
    airLocation: document.querySelector("#air-location"),
    airBlindFields: document.querySelector("#air-blind-fields"),
    airBlindGroup: document.querySelector("#air-blind-group"),
    airBlindService: document.querySelector("#air-blind-service"),
    airBlindWidth: document.querySelector("#air-blind-width"),
    airBlindHeight: document.querySelector("#air-blind-height"),
    airCurtainFields: document.querySelector("#air-curtain-fields"),
    airCurtainMaterial: document.querySelector("#air-curtain-material"),
    airCurtainColor: document.querySelector("#air-curtain-color"),
    airCurtainWidth: document.querySelector("#air-curtain-width"),
    airCurtainDrop: document.querySelector("#air-curtain-drop"),
    airCurtainFoldRate: document.querySelector("#air-curtain-fold-rate"),
    airCurtainStyle: document.querySelector("#air-curtain-style"),
    airAddItem: document.querySelector("#air-add-item"),
    airClearForm: document.querySelector("#air-clear-form"),
    airSaveQuote: document.querySelector("#air-save-quote"),
    airFeedback: document.querySelector("#air-feedback"),
    airCameraPhotos: document.querySelector("#air-camera-photos"),
    airHousePhotos: document.querySelector("#air-house-photos"),
    airPhotoGrid: document.querySelector("#air-photo-grid"),
    airPhotoEmpty: document.querySelector("#air-photo-empty"),
    airPhotoCount: document.querySelector("#air-photo-count"),
    airItemsList: document.querySelector("#air-items-list"),
    airItemsEmpty: document.querySelector("#air-items-empty"),
    airTotal: document.querySelector("#air-total"),
    cameraPhotos: document.querySelector("#camera-photos"),
    housePhotos: document.querySelector("#house-photos"),
    photoGrid: document.querySelector("#photo-grid"),
    photoEmpty: document.querySelector("#photo-empty"),
    photoCount: document.querySelector("#photo-count"),
    materialsCostTotal: document.querySelector("#materials-cost-total"),
    curtainCostTotal: document.querySelector("#curtain-cost-total"),
    blindRetailTotal: document.querySelector("#blind-retail-total"),
    curtainRetailTotal: document.querySelector("#curtain-retail-total"),
    installCostTotal: document.querySelector("#install-cost-total"),
    installRetailTotal: document.querySelector("#install-retail-total"),
    costExGstTotal: document.querySelector("#cost-ex-gst-total"),
    subtotalExGst: document.querySelector("#subtotal-ex-gst"),
    gstTotal: document.querySelector("#gst-total"),
    grandTotal: document.querySelector("#grand-total"),
    grossProfit: document.querySelector("#gross-profit"),
    profitPercent: document.querySelector("#profit-percent"),
    profitExplainer: document.querySelector("#profit-explainer"),
    previewCustomer: document.querySelector("#preview-customer"),
    previewPhone: document.querySelector("#preview-phone"),
    previewAddress: document.querySelector("#preview-address"),
    previewLines: document.querySelector("#preview-lines"),
    previewSubtotal: document.querySelector("#preview-subtotal"),
    previewGst: document.querySelector("#preview-gst"),
    previewTotal: document.querySelector("#preview-total"),
    emailDraft: document.querySelector("#email-draft"),
    messageDraft: document.querySelector("#message-draft"),
    copyEmail: document.querySelector("#copy-email"),
    copyMessage: document.querySelector("#copy-message"),
    copyFeedback: document.querySelector("#copy-feedback"),
    navItems: Array.from(document.querySelectorAll(".nav-item[data-page-link]")),
    appPages: Array.from(document.querySelectorAll(".app-page[data-page]")),
    summaryBlindsBody: document.querySelector("#summary-blinds-body"),
    summaryBlindsEmpty: document.querySelector("#summary-blinds-empty"),
    summaryCurtainsBody: document.querySelector("#summary-curtains-body"),
    summaryCurtainsEmpty: document.querySelector("#summary-curtains-empty"),
    historySearch: document.querySelector("#history-search"),
    recordsTableBody: document.querySelector("#records-table-body"),
    recordDetail: document.querySelector("#record-detail"),
    recordEmpty: document.querySelector("#record-empty"),
    invoiceSearch: document.querySelector("#invoice-search"),
    newInvoice: document.querySelector("#new-invoice"),
    createInvoiceFromQuote: document.querySelector("#create-invoice-from-quote"),
    saveInvoice: document.querySelector("#save-invoice"),
    markInvoiceDraft: document.querySelector("#mark-invoice-draft"),
    markInvoiceSent: document.querySelector("#mark-invoice-sent"),
    markInvoicePaid: document.querySelector("#mark-invoice-paid"),
    invoiceListBody: document.querySelector("#invoice-list-body"),
    invoiceListEmpty: document.querySelector("#invoice-list-empty"),
    invoiceDetailTitle: document.querySelector("#invoice-detail-title"),
    invoiceNumberDisplay: document.querySelector("#invoice-number-display"),
    invoiceStatusBadge: document.querySelector("#invoice-status-badge"),
    invoiceCustomerName: document.querySelector("#invoice-customer-name"),
    invoiceCustomerPhone: document.querySelector("#invoice-customer-phone"),
    invoiceCustomerAddress: document.querySelector("#invoice-customer-address"),
    invoiceReference: document.querySelector("#invoice-reference"),
    invoiceDate: document.querySelector("#invoice-date"),
    invoiceDueDate: document.querySelector("#invoice-due-date"),
    invoicePaymentTerms: document.querySelector("#invoice-payment-terms"),
    invoiceAmountPaidInput: document.querySelector("#invoice-amount-paid-input"),
    invoiceLinesBody: document.querySelector("#invoice-lines-body"),
    addInvoiceLine: document.querySelector("#add-invoice-line"),
    invoiceNotes: document.querySelector("#invoice-notes"),
    invoiceBankDetails: document.querySelector("#invoice-bank-details"),
    invoiceSubtotal: document.querySelector("#invoice-subtotal"),
    invoiceGst: document.querySelector("#invoice-gst"),
    invoiceTotal: document.querySelector("#invoice-total"),
    invoiceAmountPaid: document.querySelector("#invoice-amount-paid"),
    invoiceAmountDue: document.querySelector("#invoice-amount-due"),
    invoiceFeedback: document.querySelector("#invoice-feedback")
  };
}

function hasRequiredElements() {
  return Boolean(
    els.summaryBlindsBody &&
    els.summaryCurtainsBody &&
    els.addLine &&
    els.addCurtainLine &&
    els.airCustomerName &&
    els.airProductType &&
    els.airPhotoGrid &&
    els.airItemsList &&
    els.saveAllBlinds &&
    els.saveAllCurtains &&
    els.recordsTableBody &&
    els.recordDetail &&
    els.invoiceListBody &&
    els.invoiceCustomerName &&
    els.invoiceLinesBody &&
    els.clearBlinds &&
    els.clearCurtains &&
    els.resetQuote &&
    els.submitQuote &&
    els.printQuote
  );
}

function createLine() {
  return {
    id: crypto.randomUUID(),
    location: "",
    group: "G2",
    width: "",
    height: "",
    serviceType: "supply-install",
    isEditing: true
  };
}

function createCurtainLine() {
  return {
    id: crypto.randomUUID(),
    location: "",
    product: "sheer",
    material: "Begonia",
    color: "Sand",
    width: "",
    drop: "",
    foldRate: 2.3,
    style: "S-Fold Metal Hook",
    stacking: "Side Open",
    sheerBottomStyle: "With Base Weight",
    blockoutLining: "No",
    isEditing: true
  };
}

function createInvoiceLine(partial = {}) {
  return {
    id: crypto.randomUUID(),
    description: partial.description || "",
    quantity: Number(partial.quantity) || 1,
    unitPrice: Number(partial.unitPrice) || 0,
    taxRate: Number.isFinite(Number(partial.taxRate)) ? Number(partial.taxRate) : 0.1
  };
}

function generateInvoiceNumber() {
  const numericParts = state.invoices
    .map((invoice) => Number(String(invoice.invoiceNumber || "").replace(/\D/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
  const nextNumber = (numericParts.length ? Math.max(...numericParts) : 3000) + 1;
  return `INV-${nextNumber}`;
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysToIsoDate(dateString, days) {
  const date = new Date(dateString || getTodayIsoDate());
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function parsePaymentTermsDays(value) {
  const match = String(value ?? "").match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function formatPaymentTerms(days) {
  const normalizedDays = Math.max(0, Number(days) || 0);
  return `${normalizedDays} Day${normalizedDays === 1 ? "" : "s"}`;
}

function calculateDayDifference(fromDateString, toDateString) {
  const fromDate = new Date(fromDateString);
  const toDate = new Date(toDateString);
  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return 0;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.round((toDate - fromDate) / msPerDay));
}

function createInvoice(partial = {}) {
  const today = getTodayIsoDate();
  const invoiceNumber = partial.invoiceNumber || generateInvoiceNumber();
  const invoiceDate = partial.invoiceDate || today;
  const paymentTermsDays = parsePaymentTermsDays(partial.paymentTerms || "7 Days") || 7;
  const dueDate = partial.dueDate || addDaysToIsoDate(invoiceDate, paymentTermsDays);
  return {
    id: crypto.randomUUID(),
    invoiceNumber,
    sourceQuoteNumber: partial.sourceQuoteNumber || invoiceNumber,
    status: partial.status || "draft",
    customerName: partial.customerName || "",
    customerPhone: partial.customerPhone || "",
    customerAddress: partial.customerAddress || "",
    invoiceDate,
    dueDate,
    paymentTerms: partial.paymentTerms || formatPaymentTerms(paymentTermsDays),
    amountPaid: Number(partial.amountPaid) || 0,
    notes: partial.notes || "Thank you for choosing Eastern Home Service.",
    bankDetails: partial.bankDetails || "",
    lines: Array.isArray(partial.lines) && partial.lines.length
      ? partial.lines.map((line) => createInvoiceLine(line))
      : [createInvoiceLine()]
  };
}

function queueFocus(selector, cursorToEnd = false) {
  pendingFocus = { selector, cursorToEnd };
}

function applyPendingFocus() {
  if (!pendingFocus) {
    return;
  }

  const focusRequest = pendingFocus;

  const focusTarget = () => {
    if (pendingFocus !== focusRequest) {
      return;
    }

    const target = document.querySelector(focusRequest.selector);
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    target.focus();
    target.scrollIntoView({ block: "nearest", inline: "nearest" });

    if (focusRequest.cursorToEnd && target instanceof HTMLInputElement) {
      const valueLength = target.value.length;
      target.setSelectionRange(valueLength, valueLength);
    } else if (typeof target.select === "function" && target instanceof HTMLInputElement) {
      target.select();
    }

    pendingFocus = null;
  };

  requestAnimationFrame(() => {
    focusTarget();

    if (pendingFocus === focusRequest) {
      requestAnimationFrame(() => {
        focusTarget();
      });
    }
  });
}

function getActivePageFromHash(hash = window.location.hash) {
  if (hash === "#air-mode") {
    return "airMode";
  }
  if (hash === "#quote-history") {
    return "history";
  }
  if (hash === "#invoices") {
    return "invoices";
  }
  if (hash === "#saved-invoices") {
    return "savedInvoices";
  }
  return "builder";
}

function syncPageNavigation() {
  const activePage = getActivePageFromHash();
  const currentHash = window.location.hash || "#quote-builder";

  els.appPages.forEach((page) => {
    page.classList.toggle("app-page-active", page.dataset.page === activePage);
  });

  els.navItems.forEach((item) => {
    const href = item.getAttribute("href");
    const isBuilderDefault = activePage === "builder" && currentHash !== "#quote-preview" && href === "#quote-builder";
    const isBuilderPreview = activePage === "builder" && currentHash === "#quote-preview" && href === "#quote-preview";
    const isAirMode = activePage === "airMode" && href === "#air-mode";
    const isHistory = activePage === "history" && href === "#quote-history";
    const isInvoices = activePage === "invoices" && href === "#invoices";
    const isSavedInvoices = activePage === "savedInvoices" && href === "#saved-invoices";
    item.classList.toggle("active", isBuilderDefault || isBuilderPreview || isAirMode || isHistory || isInvoices || isSavedInvoices);
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD"
  }).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(1)}%`;
}

function parseCurrency(value) {
  const numeric = Number(String(value ?? "").replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatRecordDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function evaluateCalculatorValue(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : NaN;
  }

  const normalized = String(value ?? "")
    .replace(/,/g, "")
    .replace(/\s+/g, "");

  if (!normalized) {
    return NaN;
  }

  if (!/^[+]?\d*\.?\d+(?:[+-]\d*\.?\d+)*$/.test(normalized)) {
    return NaN;
  }

  const parts = normalized.match(/[+-]?\d*\.?\d+/g) ?? [];
  const total = parts.reduce((sum, part) => sum + Number(part), 0);

  return Number.isFinite(total) ? total : NaN;
}

function normalizeCalculatorField(value) {
  const calculated = evaluateCalculatorValue(value);
  return Number.isFinite(calculated) ? calculated : value;
}

function findBracket(value, list) {
  const numericValue = evaluateCalculatorValue(value);
  if (!numericValue || numericValue < 1) {
    return null;
  }

  return list.find((size) => numericValue <= size) ?? null;
}

function lookupBlindCost(line) {
  const matchedWidth = findBracket(line.width, PRICING_TABLE.widths);
  const matchedDrop = findBracket(line.height, PRICING_TABLE.drops);

  if (!matchedWidth || !matchedDrop) {
    return {
      matchedWidth,
      matchedDrop,
      cost: 0,
      error: "Size is outside the loaded pricing table."
    };
  }

  const groupTable = PRICING_TABLE.groups[line.group];
  const widthIndex = PRICING_TABLE.widths.indexOf(matchedWidth);
  const cost = groupTable.values[matchedDrop][widthIndex];

  return {
    matchedWidth,
    matchedDrop,
    cost,
    error: ""
  };
}

function calculateBlindLine(line) {
  const quote = lookupBlindCost(line);
  const supplyUnitRetail = quote.cost * (1 + state.settings.supplyMarkup / 100);
  const installUnitRetail = line.serviceType === "supply-install" ? state.settings.installRetail : 0;
  const installUnitCost = line.serviceType === "supply-install" ? state.settings.installCost : 0;
  const blindCostGstTotal = quote.cost * (1 + state.gstRate);
  const lineSubtotalExGst = supplyUnitRetail + installUnitRetail;
  const lineGst = lineSubtotalExGst * state.gstRate;

  return {
    ...quote,
    supplyUnitRetail,
    installUnitRetail,
    installUnitCost,
    blindCostTotal: quote.cost,
    blindCostGstTotal,
    lineSubtotalExGst,
    lineGst,
    lineTotal: lineSubtotalExGst + lineGst
  };
}

function calculateCurtainLine(line) {
  const material = CURTAIN_MATERIALS[line.material];
  const widthMm = Math.max(0, evaluateCalculatorValue(line.width) || 0);
  const widthM = widthMm / 1000;
  const foldRate = Math.max(0, Number(line.foldRate) || 0);
  const fabricMeters = widthM * foldRate;
  const fabricCost = fabricMeters * material.price;
  const trackCost = widthM * TRACK_PRICE_PER_M;
  const costExGst = fabricCost + trackCost;
  const costWithGst = costExGst * (1 + state.gstRate);
  const retailExGst = costExGst * (1 + state.settings.curtainMarkup / 100);
  const gst = retailExGst * state.gstRate;

  return {
    materialRate: material.price,
    fabricMeters,
    fabricCost,
    trackCost,
    costExGst,
    costWithGst,
    retailExGst,
    gst,
    lineTotal: retailExGst + gst
  };
}

function curtainColorOptions(materialName, selectedColor) {
  return CURTAIN_MATERIALS[materialName].colors
    .map((color) => `<option value="${color}" ${selectedColor === color ? "selected" : ""}>${color}</option>`)
    .join("");
}

function renderBlindSummaryTable() {
  els.summaryBlindsBody.innerHTML = "";

  if (!state.lines.length) {
    els.summaryBlindsEmpty.style.display = "grid";
    return;
  }

  els.summaryBlindsEmpty.style.display = "none";

  state.lines.forEach((line, index) => {
    const computed = calculateBlindLine(line);
    const row = document.createElement("tr");

    row.innerHTML = line.isEditing ? `
      <td data-label="No."><span class="table-badge">${index + 1}</span></td>
      <td data-label="Location"><input data-id="${line.id}" data-field="location" type="text" value="${line.location}" placeholder="Living room"></td>
      <td data-label="Group">
        <select data-id="${line.id}" data-field="group">
          ${Object.entries(PRICING_TABLE.groups).map(([value, group]) => `<option value="${value}" ${line.group === value ? "selected" : ""}>${group.label}</option>`).join("")}
        </select>
      </td>
      <td data-label="Service">
        <select data-id="${line.id}" data-field="serviceType">
          ${SERVICE_TYPES.map((type) => `<option value="${type.value}" ${line.serviceType === type.value ? "selected" : ""}>${type.label}</option>`).join("")}
        </select>
      </td>
      <td data-label="Width (mm)"><input class="compact-input" data-id="${line.id}" data-field="width" type="text" inputmode="numeric" value="${line.width}" placeholder="1200+50"></td>
      <td data-label="Height (mm)"><input class="compact-input" data-id="${line.id}" data-field="height" type="text" inputmode="numeric" value="${line.height}" placeholder="2100-20"></td>
      <td data-label="Matched">${computed.matchedWidth && computed.matchedDrop ? `${computed.matchedWidth} x ${computed.matchedDrop}` : "-"}</td>
      <td data-label="Cost">${formatCurrency(computed.blindCostTotal)}</td>
      <td data-label="Retail">${formatCurrency(computed.lineTotal)}</td>
      <td data-label="Action" class="table-actions-cell">
        <button class="ghost-button table-action-button" data-save-blind="${line.id}" type="button">Save</button>
        <button class="danger-button table-action-button" data-delete-blind="${line.id}" type="button">Delete</button>
      </td>
    ` : `
      <td data-label="No."><span class="table-badge">${index + 1}</span></td>
      <td data-label="Location">${line.location || "-"}</td>
      <td data-label="Group">${PRICING_TABLE.groups[line.group]?.label || line.group}</td>
      <td data-label="Service">${SERVICE_TYPES.find((item) => item.value === line.serviceType)?.label || line.serviceType}</td>
      <td data-label="Width (mm)">${evaluateCalculatorValue(line.width) || line.width}</td>
      <td data-label="Height (mm)">${evaluateCalculatorValue(line.height) || line.height}</td>
      <td data-label="Matched">${computed.matchedWidth && computed.matchedDrop ? `${computed.matchedWidth} x ${computed.matchedDrop}` : "-"}</td>
      <td data-label="Cost">${formatCurrency(computed.blindCostTotal)}</td>
      <td data-label="Retail">${formatCurrency(computed.lineTotal)}</td>
      <td data-label="Action" class="table-actions-cell">
        <button class="secondary-button table-action-button" data-edit-blind="${line.id}" type="button">Edit</button>
        <button class="danger-button table-action-button" data-delete-blind="${line.id}" type="button">Delete</button>
      </td>
    `;

    els.summaryBlindsBody.appendChild(row);
  });
}

function renderCurtainSummaryTable() {
  els.summaryCurtainsBody.innerHTML = "";

  if (!state.curtainLines.length) {
    els.summaryCurtainsEmpty.style.display = "grid";
    return;
  }

  els.summaryCurtainsEmpty.style.display = "none";

  state.curtainLines.forEach((line, index) => {
    const computed = calculateCurtainLine(line);
    const row = document.createElement("tr");

    row.innerHTML = line.isEditing ? `
      <td data-label="No."><span class="table-badge">${index + 1}</span></td>
      <td data-label="Type">
        <select data-curtain-id="${line.id}" data-curtain-field="product">
          ${CURTAIN_PRODUCTS.map((type) => `<option value="${type.value}" ${line.product === type.value ? "selected" : ""}>${type.label}</option>`).join("")}
        </select>
      </td>
      <td data-label="Location"><input data-curtain-id="${line.id}" data-curtain-field="location" type="text" value="${line.location}" placeholder="Master bedroom"></td>
      <td data-label="Material">
        <select data-curtain-id="${line.id}" data-curtain-field="material">
          ${Object.keys(CURTAIN_MATERIALS).map((material) => `<option value="${material}" ${line.material === material ? "selected" : ""}>${material}</option>`).join("")}
        </select>
      </td>
      <td data-label="Color">
        <select data-curtain-id="${line.id}" data-curtain-field="color">
          ${curtainColorOptions(line.material, line.color)}
        </select>
      </td>
      <td data-label="Width (mm)"><input class="compact-input" data-curtain-id="${line.id}" data-curtain-field="width" type="text" inputmode="numeric" value="${line.width}" placeholder="3000+200"></td>
      <td data-label="Drop (mm)"><input class="compact-input" data-curtain-id="${line.id}" data-curtain-field="drop" type="text" inputmode="numeric" value="${line.drop}" placeholder="2400-100"></td>
      <td data-label="Fold">
        <select data-curtain-id="${line.id}" data-curtain-field="foldRate">
          ${FOLD_RATES.map((rate) => `<option value="${rate}" ${Number(line.foldRate) === rate ? "selected" : ""}>x${rate}</option>`).join("")}
        </select>
      </td>
      <td data-label="Style">
        <select data-curtain-id="${line.id}" data-curtain-field="style">
          ${CURTAIN_STYLES.map((style) => `<option value="${style}" ${line.style === style ? "selected" : ""}>${style}</option>`).join("")}
        </select>
      </td>
      <td data-label="Stacking">
        <select data-curtain-id="${line.id}" data-curtain-field="stacking">
          ${STACKING_OPTIONS.map((stack) => `<option value="${stack}" ${line.stacking === stack ? "selected" : ""}>${stack}</option>`).join("")}
        </select>
      </td>
      <td data-label="Bottom">
        <select data-curtain-id="${line.id}" data-curtain-field="sheerBottomStyle">
          ${SHEER_BOTTOM_STYLES.map((style) => `<option value="${style}" ${line.sheerBottomStyle === style ? "selected" : ""}>${style}</option>`).join("")}
        </select>
      </td>
      <td data-label="Lining">
        <select data-curtain-id="${line.id}" data-curtain-field="blockoutLining">
          ${BLOCKOUT_OPTIONS.map((value) => `<option value="${value}" ${line.blockoutLining === value ? "selected" : ""}>${value}</option>`).join("")}
        </select>
      </td>
      <td data-label="Cost">${formatCurrency(computed.costExGst)}</td>
      <td data-label="Retail">${formatCurrency(computed.lineTotal)}</td>
      <td data-label="Action" class="table-actions-cell">
        <button class="ghost-button table-action-button" data-save-curtain="${line.id}" type="button">Save</button>
        <button class="danger-button table-action-button" data-delete-curtain="${line.id}" type="button">Delete</button>
      </td>
    ` : `
      <td data-label="No."><span class="table-badge">${index + 1}</span></td>
      <td data-label="Type">${CURTAIN_PRODUCTS.find((item) => item.value === line.product)?.label || line.product}</td>
      <td data-label="Location">${line.location || "-"}</td>
      <td data-label="Material">${line.material}</td>
      <td data-label="Color">${line.color}</td>
      <td data-label="Width (mm)">${evaluateCalculatorValue(line.width) || line.width}</td>
      <td data-label="Drop (mm)">${evaluateCalculatorValue(line.drop) || line.drop}</td>
      <td data-label="Fold">x${line.foldRate}</td>
      <td data-label="Style">${line.style}</td>
      <td data-label="Stacking">${line.stacking}</td>
      <td data-label="Bottom">${line.sheerBottomStyle}</td>
      <td data-label="Lining">${line.blockoutLining}</td>
      <td data-label="Cost">${formatCurrency(computed.costExGst)}</td>
      <td data-label="Retail">${formatCurrency(computed.lineTotal)}</td>
      <td data-label="Action" class="table-actions-cell">
        <button class="secondary-button table-action-button" data-edit-curtain="${line.id}" type="button">Edit</button>
        <button class="danger-button table-action-button" data-delete-curtain="${line.id}" type="button">Delete</button>
      </td>
    `;

    els.summaryCurtainsBody.appendChild(row);
  });
}

function renderPhotos() {
  els.photoGrid.innerHTML = "";

  if (!state.photos.length) {
    els.photoGrid.appendChild(els.photoEmpty);
    els.photoEmpty.style.display = "grid";
  } else {
    els.photoEmpty.style.display = "none";
    state.photos.forEach((photo) => {
      const card = document.createElement("div");
      card.className = "photo-card";
      card.innerHTML = `
        <img src="${photo.dataUrl}" alt="${photo.name}">
        <div class="photo-card-footer">
          <span title="${photo.name}">${photo.name}</span>
          <button class="danger-button" data-delete-photo="${photo.id}" type="button">Remove</button>
        </div>
      `;
      els.photoGrid.appendChild(card);
    });
  }

  els.photoCount.textContent = `${state.photos.length} photo${state.photos.length === 1 ? "" : "s"} added`;
}

function persistPhotos() {
  try {
    localStorage.setItem(LOCAL_PHOTOS_KEY, JSON.stringify(state.photos));
  } catch (error) {
    console.warn("Unable to persist photos", error);
  }
}

function loadPhotos() {
  try {
    const saved = localStorage.getItem(LOCAL_PHOTOS_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    state.photos = Array.isArray(parsed)
      ? parsed.filter((photo) => photo && typeof photo === "object" && typeof photo.dataUrl === "string")
      : [];
  } catch (error) {
    state.photos = [];
  }
}

function addPhotos(files) {
  const readers = Array.from(files).map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      id: crypto.randomUUID(),
      name: file.name,
      dataUrl: String(reader.result)
    });
    reader.readAsDataURL(file);
  }));

  Promise.all(readers).then((photos) => {
    state.photos = [...state.photos, ...photos];
    persistPhotos();
    renderPhotos();
  });
}

function removePhoto(id) {
  state.photos = state.photos.filter((photo) => photo.id !== id);
  persistPhotos();
  renderPhotos();
}

function parseStoredRecords(value) {
  const parsed = value ? JSON.parse(value) : [];
  return Array.isArray(parsed)
    ? parsed.filter((record) => record && typeof record === "object").map((record) => ({
        id: record.id || crypto.randomUUID(),
        submittedAt: record.submittedAt || new Date().toISOString(),
        customerName: record.customerName || "-",
        phone: record.phone || "-",
        address: record.address || "-",
        quoteNumber: record.quoteNumber || "-",
        totalQuote: record.totalQuote || formatCurrency(0),
        blindItems: Array.isArray(record.blindItems) ? record.blindItems : [],
        curtainItems: Array.isArray(record.curtainItems) ? record.curtainItems : []
      }))
    : [];
}

function hydrateRecordCache(records) {
  state.records = records;
  persistRecords();
}

function persistRecords() {
  try {
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(state.records));
  } catch (error) {
    console.warn("Unable to persist records", error);
  }
}

function loadRecordsFromLocalStorage() {
  try {
    return parseStoredRecords(localStorage.getItem(LOCAL_RECORDS_KEY));
  } catch (error) {
    return [];
  }
}

async function requestQuoteRecords(path = "", options = {}) {
  const response = await fetch(`${getQuoteRecordsEndpoint()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function loadRecords() {
  const fallbackRecords = loadRecordsFromLocalStorage();
  state.records = fallbackRecords;
  if (!state.selectedRecordId && fallbackRecords.length) {
    state.selectedRecordId = fallbackRecords[0].id;
  }

  try {
    const remoteRecords = await requestQuoteRecords();
    const normalizedRecords = Array.isArray(remoteRecords) ? remoteRecords : [];
    hydrateRecordCache(normalizedRecords);
    if (!state.selectedRecordId && normalizedRecords.length) {
      state.selectedRecordId = normalizedRecords[0].id;
    }
  } catch (error) {
    console.warn("Unable to load cloud records, using local records instead.", error);
  }
}

function parseStoredInvoices(rawValue) {
  const parsed = JSON.parse(rawValue || "[]");
  return Array.isArray(parsed)
    ? parsed.map((invoice) => createInvoice({
        ...invoice,
        id: invoice.id || crypto.randomUUID(),
        lines: Array.isArray(invoice.lines) ? invoice.lines : []
      }))
    : [];
}

function persistInvoices() {
  try {
    localStorage.setItem(LOCAL_INVOICES_KEY, JSON.stringify(state.invoices));
  } catch (error) {
    console.warn("Unable to persist invoices", error);
  }
}

function loadInvoices() {
  try {
    state.invoices = parseStoredInvoices(localStorage.getItem(LOCAL_INVOICES_KEY));
  } catch (error) {
    state.invoices = [];
  }

  if (!state.selectedInvoiceId && state.invoices.length) {
    state.selectedInvoiceId = state.invoices[0].id;
  }
}

function createRecordSnapshot() {
  const blindItems = state.lines.map((line) => {
    const computed = calculateBlindLine(line);
    return {
      location: line.location || "Untitled Location",
      group: PRICING_TABLE.groups[line.group]?.label || line.group,
      width: evaluateCalculatorValue(line.width) || line.width,
      height: evaluateCalculatorValue(line.height) || line.height,
      matchedSize: computed.matchedWidth && computed.matchedDrop ? `${computed.matchedWidth} x ${computed.matchedDrop}` : "-",
      serviceType: SERVICE_TYPES.find((item) => item.value === line.serviceType)?.label || line.serviceType
    };
  });

  const curtainItems = state.curtainLines.map((line) => ({
    location: line.location || "Untitled Location",
    product: CURTAIN_PRODUCTS.find((item) => item.value === line.product)?.label || line.product,
    width: evaluateCalculatorValue(line.width) || line.width,
    drop: evaluateCalculatorValue(line.drop) || line.drop,
    style: line.style,
    stacking: line.stacking
  }));

  return {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    customerName: state.customer.name || "-",
    phone: state.customer.phone || "-",
    address: state.customer.address || "-",
    quoteNumber: state.customer.quoteNumber || "-",
    totalQuote: els.grandTotal.textContent,
    subtotalExGst: els.subtotalExGst.textContent,
    gstTotal: els.gstTotal.textContent,
    blindCount: blindItems.length,
    curtainCount: state.curtainLines.filter((line) => line.product === "curtain").length,
    sheerCount: state.curtainLines.filter((line) => line.product === "sheer").length,
    blindItems,
    curtainItems
  };
}

function populateAirCurtainColors(selectedColor = "") {
  const materialName = els.airCurtainMaterial.value || "Begonia";
  const material = CURTAIN_MATERIALS[materialName];
  if (!material) {
    return;
  }

  els.airCurtainColor.innerHTML = material.colors
    .map((color) => `<option value="${color}" ${color === selectedColor ? "selected" : ""}>${color}</option>`)
    .join("");

  if (!selectedColor || !material.colors.includes(selectedColor)) {
    els.airCurtainColor.value = material.colors[0];
  }
}

function updateAirModeFields() {
  const isBlind = els.airProductType.value === "blind";
  els.airBlindFields.style.display = isBlind ? "block" : "none";
  els.airCurtainFields.style.display = isBlind ? "none" : "block";
  if (!isBlind) {
    populateAirCurtainColors(els.airCurtainColor.value);
  }
}

function clearAirModeForm() {
  els.airLocation.value = "";
  els.airBlindGroup.value = "G2";
  els.airBlindService.value = "supply-install";
  els.airBlindWidth.value = "";
  els.airBlindHeight.value = "";
  els.airCurtainMaterial.value = "Begonia";
  populateAirCurtainColors("Sand");
  els.airCurtainWidth.value = "";
  els.airCurtainDrop.value = "";
  els.airCurtainFoldRate.value = "2.3";
  els.airCurtainStyle.value = "S-Fold Metal Hook";
}

function queueAirModeEntryFocus() {
  const selector = els.airProductType.value === "blind" ? "#air-blind-width" : "#air-curtain-width";
  queueFocus(selector, true);
  renderAll();
}

function handleAirModeEnterFlow(field) {
  const productType = els.airProductType.value;

  if (productType === "blind") {
    if (field === "width") {
      queueFocus("#air-blind-height", true);
      renderAll();
      return;
    }

    if (field === "height") {
      if (addAirModeItem()) {
        queueAirModeEntryFocus();
      }
    }
    return;
  }

  if (field === "width") {
    queueFocus("#air-curtain-drop", true);
    renderAll();
    return;
  }

  if (field === "drop") {
    if (addAirModeItem()) {
      queueAirModeEntryFocus();
    }
  }
}

function renderAirMode() {
  updateAirModeFields();
  els.airItemsList.innerHTML = "";

  const airCards = [];

  state.lines.forEach((line) => {
    const computed = calculateBlindLine(line);
    airCards.push(`
      <article class="air-item-card">
        <div class="air-item-top">
          <div>
            <p class="section-kicker">Roller Blind</p>
            <h3>${escapeHtml(line.location || "Untitled Location")}</h3>
          </div>
          <strong>${formatCurrency(computed.lineTotal)}</strong>
        </div>
        <p>${PRICING_TABLE.groups[line.group]?.label || line.group} | ${SERVICE_TYPES.find((item) => item.value === line.serviceType)?.label || line.serviceType}</p>
        <p>${escapeHtml(String(evaluateCalculatorValue(line.width) || line.width || "-"))}w x ${escapeHtml(String(evaluateCalculatorValue(line.height) || line.height || "-"))}h mm</p>
        <div class="summary-table-actions">
          <button class="danger-button table-action-button" data-air-delete-blind="${line.id}" type="button">Delete</button>
        </div>
      </article>
    `);
  });

  state.curtainLines.forEach((line) => {
    const computed = calculateCurtainLine(line);
    airCards.push(`
      <article class="air-item-card">
        <div class="air-item-top">
          <div>
            <p class="section-kicker">${line.product === "curtain" ? "Curtain" : "Sheer"}</p>
            <h3>${escapeHtml(line.location || "Untitled Location")}</h3>
          </div>
          <strong>${formatCurrency(computed.lineTotal)}</strong>
        </div>
        <p>${escapeHtml(line.material)} | ${escapeHtml(line.color)} | x${escapeHtml(String(line.foldRate))}</p>
        <p>${escapeHtml(String(evaluateCalculatorValue(line.width) || line.width || "-"))}w x ${escapeHtml(String(evaluateCalculatorValue(line.drop) || line.drop || "-"))}d mm</p>
        <div class="summary-table-actions">
          <button class="danger-button table-action-button" data-air-delete-curtain="${line.id}" type="button">Delete</button>
        </div>
      </article>
    `);
  });

  if (!airCards.length) {
    els.airItemsList.appendChild(els.airItemsEmpty);
    els.airItemsEmpty.style.display = "grid";
  } else {
    els.airItemsEmpty.style.display = "none";
    els.airItemsList.innerHTML = airCards.join("");
  }

  els.airTotal.textContent = els.grandTotal.textContent;

  els.airPhotoGrid.innerHTML = "";
  if (!state.photos.length) {
    els.airPhotoGrid.appendChild(els.airPhotoEmpty);
    els.airPhotoEmpty.style.display = "grid";
  } else {
    els.airPhotoEmpty.style.display = "none";
    state.photos.forEach((photo) => {
      const card = document.createElement("div");
      card.className = "air-photo-card";
      card.innerHTML = `
        <img src="${photo.dataUrl}" alt="${escapeHtml(photo.name)}">
        <div class="air-photo-card-footer">
          <span title="${escapeHtml(photo.name)}">${escapeHtml(photo.name)}</span>
          <button class="danger-button table-action-button" data-air-delete-photo="${photo.id}" type="button">Remove</button>
        </div>
      `;
      els.airPhotoGrid.appendChild(card);
    });
  }

  els.airPhotoCount.textContent = `${state.photos.length} photo${state.photos.length === 1 ? "" : "s"}`;
}

function addAirModeItem() {
  const productType = els.airProductType.value;
  const location = els.airLocation.value.trim();

  if (productType === "blind") {
    const width = els.airBlindWidth.value.trim();
    const height = els.airBlindHeight.value.trim();
    if (!width || !height) {
      els.airFeedback.textContent = "Enter width and height before adding the blind.";
      return false;
    }

    const line = createLine();
    line.location = location;
    line.group = els.airBlindGroup.value;
    line.serviceType = els.airBlindService.value;
    line.width = width;
    line.height = height;
    line.isEditing = false;
    state.lines.push(line);
    clearAirModeForm();
    renderAll();
    els.airFeedback.textContent = "Blind item added.";
    return true;
  }

  const width = els.airCurtainWidth.value.trim();
  const drop = els.airCurtainDrop.value.trim();
  if (!width || !drop) {
    els.airFeedback.textContent = "Enter width and drop before adding the item.";
    return false;
  }

  const line = createCurtainLine();
  line.location = location;
  line.product = productType;
  line.material = els.airCurtainMaterial.value;
  line.color = els.airCurtainColor.value;
  line.width = width;
  line.drop = drop;
  line.foldRate = Number(els.airCurtainFoldRate.value) || 2.3;
  line.style = els.airCurtainStyle.value;
  line.isEditing = false;
  state.curtainLines.push(line);
  clearAirModeForm();
  renderAll();
  els.airFeedback.textContent = `${productType === "curtain" ? "Curtain" : "Sheer"} item added.`;
  return true;
}

async function submitQuoteRecord() {
  if (!state.lines.length && !state.curtainLines.length) {
    els.copyFeedback.textContent = "Add at least one blind, curtain, or sheer item before saving the quote.";
    return;
  }

  const record = createRecordSnapshot();
  state.records = [record, ...state.records];
  state.selectedRecordId = record.id;
  persistRecords();
  renderRecords();

  try {
    const savedRecord = await requestQuoteRecords("", {
      method: "POST",
      body: JSON.stringify(record)
    });
    state.records = state.records.map((item) => (item.id === record.id ? savedRecord : item));
    state.selectedRecordId = savedRecord.id;
    persistRecords();
    renderRecords();
    els.copyFeedback.textContent = "Quote saved to your cloud records.";
  } catch (error) {
    console.warn("Unable to sync quote record to cloud storage.", error);
    els.copyFeedback.textContent = "Quote saved locally. Cloud sync is unavailable right now.";
  }

  document.querySelector("#dimension-records")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function deleteRecord(id) {
  const previousRecords = [...state.records];
  state.records = state.records.filter((record) => record.id !== id);
  if (state.selectedRecordId === id) {
    state.selectedRecordId = state.records[0]?.id || "";
  }
  persistRecords();
  renderRecords();

  try {
    await requestQuoteRecords(`?id=${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
  } catch (error) {
    console.warn("Unable to delete cloud quote record.", error);
    state.records = previousRecords;
    if (!state.selectedRecordId && previousRecords.length) {
      state.selectedRecordId = previousRecords[0].id;
    }
    persistRecords();
    renderRecords();
    els.copyFeedback.textContent = "Unable to delete the cloud record right now.";
  }
}

function getSelectedRecord() {
  return state.records.find((record) => record.id === state.selectedRecordId) || null;
}

function getSelectedInvoice() {
  return state.invoices.find((invoice) => invoice.id === state.selectedInvoiceId) || null;
}

function calculateInvoiceLineAmount(line) {
  const quantity = Number(line.quantity) || 0;
  const unitPrice = Number(line.unitPrice) || 0;
  return quantity * unitPrice;
}

function calculateInvoiceTotals(invoice) {
  if (!invoice) {
    return {
      subtotal: 0,
      gst: 0,
      total: 0,
      amountPaid: 0,
      amountDue: 0
    };
  }

  const subtotal = invoice.lines.reduce((sum, line) => sum + calculateInvoiceLineAmount(line), 0);
  const gst = invoice.lines.reduce((sum, line) => sum + calculateInvoiceLineAmount(line) * (Number(line.taxRate) || 0), 0);
  const total = subtotal + gst;
  const amountPaid = Number(invoice.amountPaid) || 0;

  return {
    subtotal,
    gst,
    total,
    amountPaid,
    amountDue: Math.max(total - amountPaid, 0)
  };
}

function formatInvoiceStatus(status) {
  const labels = {
    draft: "Draft",
    sent: "Sent",
    paid: "Paid"
  };
  return labels[status] || "Draft";
}

function buildInvoiceSummaryFromRecord(record) {
  const parts = [];
  if ((record.blindCount || 0) > 0) {
    parts.push(`${record.blindCount} blind${record.blindCount === 1 ? "" : "s"}`);
  }
  if ((record.curtainCount || 0) > 0) {
    parts.push(`${record.curtainCount} curtain${record.curtainCount === 1 ? "" : "s"}`);
  }
  if ((record.sheerCount || 0) > 0) {
    parts.push(`${record.sheerCount} sheer${record.sheerCount === 1 ? "" : "s"}`);
  }
  return parts.join(", ") || "quoted works";
}

function createInvoiceFromRecord(record) {
  if (!record) {
    els.invoiceFeedback.textContent = "Select a saved quote first.";
    return;
  }

  const invoice = createInvoice({
    sourceQuoteNumber: record.quoteNumber !== "-" ? record.quoteNumber : "",
    customerName: record.customerName !== "-" ? record.customerName : "",
    customerPhone: record.phone !== "-" ? record.phone : "",
    customerAddress: record.address !== "-" ? record.address : "",
    invoiceDate: getTodayIsoDate(),
    dueDate: addDaysToIsoDate(getTodayIsoDate(), 7),
    paymentTerms: "7 Days",
    notes: `Invoice created from saved quote ${record.quoteNumber !== "-" ? record.quoteNumber : ""}.`,
    lines: [
      createInvoiceLine({
        description: `Quote ${record.quoteNumber !== "-" ? record.quoteNumber : ""} - ${buildInvoiceSummaryFromRecord(record)}`.trim().replace(/\s+-\s+$/, ""),
        quantity: 1,
        unitPrice: parseCurrency(record.subtotalExGst || record.totalQuote),
        taxRate: 0.1
      })
    ]
  });

  state.invoices = [invoice, ...state.invoices];
  state.selectedInvoiceId = invoice.id;
  persistInvoices();
  renderInvoices();
  window.location.hash = "#invoices";
  syncPageNavigation();
  els.invoiceFeedback.textContent = "Invoice created from selected quote.";
}

function createInvoiceFromCurrentQuote() {
  const totals = {
    subtotalExGst: parseCurrency(els.subtotalExGst.textContent),
    total: parseCurrency(els.grandTotal.textContent)
  };
  const invoice = createInvoice({
    sourceQuoteNumber: state.customer.quoteNumber,
    customerName: state.customer.name,
    customerPhone: state.customer.phone,
    customerAddress: state.customer.address,
    notes: "Invoice created from the current quote builder.",
    lines: [
      createInvoiceLine({
        description: `${state.customer.quoteNumber ? `Quote ${state.customer.quoteNumber} - ` : ""}${buildOrderSummaryText({ grandTotal: totals.total }).productSummary}`,
        quantity: 1,
        unitPrice: totals.subtotalExGst,
        taxRate: 0.1
      })
    ]
  });

  state.invoices = [invoice, ...state.invoices];
  state.selectedInvoiceId = invoice.id;
  persistInvoices();
  renderInvoices();
  window.location.hash = "#invoices";
  syncPageNavigation();
  els.invoiceFeedback.textContent = "Invoice created from the current quote.";
}

function createNewInvoice() {
  const invoice = createInvoice();
  state.invoices = [invoice, ...state.invoices];
  state.selectedInvoiceId = invoice.id;
  persistInvoices();
  renderInvoices();
  els.invoiceFeedback.textContent = "New draft invoice created.";
}

function deleteInvoice(id) {
  state.invoices = state.invoices.filter((invoice) => invoice.id !== id);
  if (state.selectedInvoiceId === id) {
    state.selectedInvoiceId = state.invoices[0]?.id || "";
  }
  persistInvoices();
  renderInvoices();
  els.invoiceFeedback.textContent = "Invoice deleted.";
}

function setInvoiceValue(field, value) {
  state.invoices = state.invoices.map((invoice) => (
    invoice.id === state.selectedInvoiceId
      ? (() => {
          const nextInvoice = {
            ...invoice,
            [field]: field === "amountPaid" ? Number(value) || 0 : value
          };

          if (field === "invoiceDate") {
            const currentDays = parsePaymentTermsDays(nextInvoice.paymentTerms) || calculateDayDifference(invoice.invoiceDate, invoice.dueDate) || 7;
            nextInvoice.paymentTerms = formatPaymentTerms(currentDays);
            nextInvoice.dueDate = addDaysToIsoDate(nextInvoice.invoiceDate, currentDays);
          }

          if (field === "dueDate") {
            const nextDays = calculateDayDifference(nextInvoice.invoiceDate, nextInvoice.dueDate);
            nextInvoice.paymentTerms = formatPaymentTerms(nextDays);
          }

          if (field === "paymentTerms") {
            const termDays = parsePaymentTermsDays(value);
            if (termDays > 0) {
              nextInvoice.paymentTerms = formatPaymentTerms(termDays);
              nextInvoice.dueDate = addDaysToIsoDate(nextInvoice.invoiceDate, termDays);
            }
          }

          if (field === "sourceQuoteNumber" && !String(value).trim()) {
            nextInvoice.sourceQuoteNumber = nextInvoice.invoiceNumber;
          }

          return nextInvoice;
        })()
      : invoice
  ));
  persistInvoices();
}

function setInvoiceStatus(status) {
  const selectedInvoice = getSelectedInvoice();
  if (!selectedInvoice) {
    els.invoiceFeedback.textContent = "Create or select an invoice first.";
    return;
  }

  const totals = calculateInvoiceTotals(selectedInvoice);
  state.invoices = state.invoices.map((invoice) => (
    invoice.id === selectedInvoice.id
      ? {
          ...invoice,
          status,
          amountPaid: status === "paid" ? totals.total : invoice.amountPaid
        }
      : invoice
  ));
  persistInvoices();
  renderInvoices();
  els.invoiceFeedback.textContent = `Invoice marked as ${formatInvoiceStatus(status).toLowerCase()}.`;
}

function addInvoiceLineToSelected() {
  const selectedInvoice = getSelectedInvoice();
  if (!selectedInvoice) {
    createNewInvoice();
    return;
  }

  state.invoices = state.invoices.map((invoice) => (
    invoice.id === selectedInvoice.id
      ? { ...invoice, lines: [...invoice.lines, createInvoiceLine()] }
      : invoice
  ));
  persistInvoices();
  renderInvoices();
}

function setInvoiceLineValue(lineId, field, value) {
  state.invoices = state.invoices.map((invoice) => {
    if (invoice.id !== state.selectedInvoiceId) {
      return invoice;
    }

    return {
      ...invoice,
      lines: invoice.lines.map((line) => (
        line.id === lineId
          ? {
              ...line,
              [field]: field === "description" ? value : Number(value) || 0
            }
          : line
      ))
    };
  });
  persistInvoices();
}

function removeInvoiceLine(lineId) {
  state.invoices = state.invoices.map((invoice) => {
    if (invoice.id !== state.selectedInvoiceId) {
      return invoice;
    }

    const nextLines = invoice.lines.filter((line) => line.id !== lineId);
    return {
      ...invoice,
      lines: nextLines.length ? nextLines : [createInvoiceLine()]
    };
  });
  persistInvoices();
  renderInvoices();
}

function getFilteredInvoices() {
  const searchTerm = state.invoiceSearch.trim().toLowerCase();
  if (!searchTerm) {
    return state.invoices;
  }

  return state.invoices.filter((invoice) => (
    [
      invoice.invoiceNumber,
      invoice.sourceQuoteNumber,
      invoice.customerName,
      invoice.customerAddress
    ].some((field) => String(field ?? "").toLowerCase().includes(searchTerm))
  ));
}

function renderInvoiceLines(invoice) {
  els.invoiceLinesBody.innerHTML = "";
  if (!invoice) {
    return;
  }

  invoice.lines.forEach((line) => {
    const amount = calculateInvoiceLineAmount(line);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Description"><input data-invoice-line-id="${line.id}" data-invoice-line-field="description" type="text" value="${escapeHtml(line.description)}" placeholder="Supply and install curtains"></td>
      <td data-label="Qty"><input class="compact-input" data-invoice-line-id="${line.id}" data-invoice-line-field="quantity" type="number" min="0" step="1" value="${line.quantity}"></td>
      <td data-label="Unit Price"><input class="compact-input" data-invoice-line-id="${line.id}" data-invoice-line-field="unitPrice" type="number" min="0" step="0.01" value="${line.unitPrice}"></td>
      <td data-label="Tax">
        <select data-invoice-line-id="${line.id}" data-invoice-line-field="taxRate">
          <option value="0.1" ${Number(line.taxRate) === 0.1 ? "selected" : ""}>10% GST</option>
          <option value="0" ${Number(line.taxRate) === 0 ? "selected" : ""}>No GST</option>
        </select>
      </td>
      <td data-label="Amount">${formatCurrency(amount)}</td>
      <td data-label="Action"><button class="danger-button table-action-button" data-delete-invoice-line="${line.id}" type="button">Delete</button></td>
    `;
    els.invoiceLinesBody.appendChild(row);
  });
}

function renderInvoiceEditor(invoice) {
  const fallbackInvoice = invoice || createInvoice({ invoiceNumber: "INV-0000", lines: [createInvoiceLine()] });
  const totals = calculateInvoiceTotals(invoice);

  els.invoiceDetailTitle.textContent = invoice ? `${formatInvoiceStatus(invoice.status)} Invoice` : "Draft Invoice";
  els.invoiceNumberDisplay.textContent = fallbackInvoice.invoiceNumber;
  els.invoiceStatusBadge.textContent = formatInvoiceStatus(fallbackInvoice.status);
  els.invoiceStatusBadge.className = `invoice-status-pill status-${fallbackInvoice.status}`;
  els.invoiceCustomerName.value = fallbackInvoice.customerName;
  els.invoiceCustomerPhone.value = fallbackInvoice.customerPhone;
  els.invoiceCustomerAddress.value = fallbackInvoice.customerAddress;
  els.invoiceReference.value = fallbackInvoice.sourceQuoteNumber;
  els.invoiceDate.value = fallbackInvoice.invoiceDate;
  els.invoiceDueDate.value = fallbackInvoice.dueDate;
  els.invoicePaymentTerms.value = fallbackInvoice.paymentTerms;
  els.invoiceAmountPaidInput.value = fallbackInvoice.amountPaid || 0;
  els.invoiceNotes.value = fallbackInvoice.notes || "";
  els.invoiceBankDetails.value = fallbackInvoice.bankDetails || "";
  els.invoiceSubtotal.textContent = formatCurrency(totals.subtotal);
  els.invoiceGst.textContent = formatCurrency(totals.gst);
  els.invoiceTotal.textContent = formatCurrency(totals.total);
  els.invoiceAmountPaid.textContent = formatCurrency(totals.amountPaid);
  els.invoiceAmountDue.textContent = formatCurrency(totals.amountDue);
  renderInvoiceLines(fallbackInvoice);
}

function renderInvoices() {
  const filteredInvoices = getFilteredInvoices();
  els.invoiceListBody.innerHTML = "";

  if (!filteredInvoices.length) {
    els.invoiceListEmpty.style.display = "grid";
  } else {
    els.invoiceListEmpty.style.display = "none";
  }

  if (!filteredInvoices.some((invoice) => invoice.id === state.selectedInvoiceId)) {
    state.selectedInvoiceId = filteredInvoices[0]?.id || "";
  }

  filteredInvoices.forEach((invoice) => {
    const totals = calculateInvoiceTotals(invoice);
    const row = document.createElement("tr");
    row.className = invoice.id === state.selectedInvoiceId ? "records-row is-selected" : "records-row";
    row.innerHTML = `
      <td data-label="Invoice No."><button class="record-link-button" data-select-invoice="${invoice.id}" type="button"><strong>${escapeHtml(invoice.invoiceNumber)}</strong></button></td>
      <td data-label="Customer">${escapeHtml(invoice.customerName || "-")}</td>
      <td data-label="Quote Ref">${escapeHtml(invoice.sourceQuoteNumber || "-")}</td>
      <td data-label="Status"><span class="invoice-status-pill status-${invoice.status}">${formatInvoiceStatus(invoice.status)}</span></td>
      <td data-label="Due Date">${formatRecordDate(invoice.dueDate)}</td>
      <td data-label="Total">${formatCurrency(totals.total)}</td>
      <td data-label="Amount Due">${formatCurrency(totals.amountDue)}</td>
    `;
    els.invoiceListBody.appendChild(row);
  });

  renderInvoiceEditor(getSelectedInvoice());
}

function getFilteredRecords() {
  const searchTerm = state.historySearch.trim().toLowerCase();
  if (!searchTerm) {
    return state.records;
  }

  return state.records.filter((record) => {
    const searchFields = [
      record.quoteNumber,
      record.customerName,
      record.phone,
      record.address,
      record.totalQuote
    ];

    return searchFields.some((field) => String(field ?? "").toLowerCase().includes(searchTerm));
  });
}

function renderRecordDetail(record) {
  if (!record) {
    els.recordDetail.innerHTML = `
      <div class="record-detail-empty">
        Select a customer detail to view the full quote and order summary.
      </div>
    `;
    return;
  }

  const blindItems = Array.isArray(record.blindItems) ? record.blindItems : [];
  const curtainItems = Array.isArray(record.curtainItems) ? record.curtainItems : [];

  const blindRows = blindItems.length
    ? blindItems.map((item, index) => `
      <tr>
        <td data-label="No.">${index + 1}</td>
        <td data-label="Location">${escapeHtml(item.location)}</td>
        <td data-label="Group">${escapeHtml(item.group)}</td>
        <td data-label="Service">${escapeHtml(item.serviceType)}</td>
        <td data-label="Width">${escapeHtml(item.width)}</td>
        <td data-label="Height">${escapeHtml(item.height)}</td>
        <td data-label="Matched">${escapeHtml(item.matchedSize)}</td>
      </tr>
    `).join("")
    : `
      <tr>
        <td colspan="7" class="detail-empty-cell">No roller blinds saved in this quote.</td>
      </tr>
    `;

  const curtainRows = curtainItems.length
    ? curtainItems.map((item, index) => `
      <tr>
        <td data-label="No.">${index + 1}</td>
        <td data-label="Type">${escapeHtml(item.product)}</td>
        <td data-label="Location">${escapeHtml(item.location)}</td>
        <td data-label="Width">${escapeHtml(item.width)}</td>
        <td data-label="Drop">${escapeHtml(item.drop)}</td>
        <td data-label="Style">${escapeHtml(item.style)}</td>
        <td data-label="Stacking">${escapeHtml(item.stacking)}</td>
      </tr>
    `).join("")
    : `
      <tr>
        <td colspan="7" class="detail-empty-cell">No curtains or sheers saved in this quote.</td>
      </tr>
    `;

  els.recordDetail.innerHTML = `
    <div class="record-detail-top">
      <div>
        <p class="section-kicker">Selected Quote</p>
        <h3>${escapeHtml(record.quoteNumber !== "-" ? record.quoteNumber : "Saved Quote")}</h3>
        <p class="record-detail-subtitle">${escapeHtml(record.customerName)} | ${escapeHtml(record.phone)}</p>
      </div>
      <div class="record-detail-top-actions">
        <strong>${escapeHtml(record.totalQuote)}</strong>
        <button class="secondary-button table-action-button" data-create-invoice-record="${record.id}" type="button">Create Invoice</button>
      </div>
    </div>
    <div class="record-detail-meta">
      <span><strong>Address:</strong> ${escapeHtml(record.address)}</span>
      <span><strong>Saved:</strong> ${formatRecordDate(record.submittedAt)}</span>
      <span><strong>Subtotal:</strong> ${escapeHtml(record.subtotalExGst || formatCurrency(0))}</span>
      <span><strong>GST:</strong> ${escapeHtml(record.gstTotal || formatCurrency(0))}</span>
    </div>
    <div class="record-detail-section">
      <div class="summary-table-head">
        <h3>Roller Blinds</h3>
        <p>Saved blind measurements and matched pricing brackets.</p>
      </div>
      <div class="table-wrap">
        <table class="quote-table records-detail-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Location</th>
              <th>Group</th>
              <th>Service</th>
              <th>Width</th>
              <th>Height</th>
              <th>Matched</th>
            </tr>
          </thead>
          <tbody>${blindRows}</tbody>
        </table>
      </div>
    </div>
    <div class="record-detail-section">
      <div class="summary-table-head">
        <h3>Curtains & Sheers</h3>
        <p>Saved fabric setup and finished dimensions.</p>
      </div>
      <div class="table-wrap">
        <table class="quote-table records-detail-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Type</th>
              <th>Location</th>
              <th>Width</th>
              <th>Drop</th>
              <th>Style</th>
              <th>Stacking</th>
            </tr>
          </thead>
          <tbody>${curtainRows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderRecords() {
  const filteredRecords = getFilteredRecords();
  els.recordsTableBody.innerHTML = "";

  if (!filteredRecords.length) {
    els.recordEmpty.style.display = "grid";
    renderRecordDetail(null);
    return;
  }

  els.recordEmpty.style.display = "none";

  if (!filteredRecords.some((record) => record.id === state.selectedRecordId)) {
    state.selectedRecordId = filteredRecords[0].id;
  }

  filteredRecords.forEach((record) => {
    const row = document.createElement("tr");
    row.className = record.id === state.selectedRecordId ? "records-row is-selected" : "records-row";
    row.innerHTML = `
      <td data-label="Quote No.">${escapeHtml(record.quoteNumber)}</td>
      <td data-label="Customer Detail">
        <button class="record-link-button" data-select-record="${record.id}" type="button">
          <strong>${escapeHtml(record.customerName)}</strong>
          <span>${escapeHtml(record.phone)}</span>
        </button>
      </td>
      <td data-label="Address">${escapeHtml(record.address)}</td>
      <td data-label="Saved">${formatRecordDate(record.submittedAt)}</td>
      <td data-label="Total">${escapeHtml(record.totalQuote)}</td>
      <td data-label="Action">
        <button class="danger-button table-action-button" data-delete-record="${record.id}" type="button">Delete</button>
      </td>
    `;
    els.recordsTableBody.appendChild(row);
  });

  const selectedRecord = filteredRecords.find((record) => record.id === state.selectedRecordId) || filteredRecords[0];
  renderRecordDetail(selectedRecord);
}

function setBlindValue(id, field, value) {
  state.lines = state.lines.map((line) => {
    if (line.id !== id) {
      return line;
    }

    return {
      ...line,
      [field]: field === "width" || field === "height"
        ? value
        : value
    };
  });
}

function setBlindEditing(id, isEditing) {
  state.lines = state.lines.map((line) => (
    line.id === id ? { ...line, isEditing } : line
  ));
}

function deleteBlindLine(id) {
  state.lines = state.lines.filter((line) => line.id !== id);
}

function saveAllBlindLines() {
  state.lines = state.lines.map((line) => ({
    ...line,
    isEditing: false
  }));
}

function setCurtainValue(id, field, value) {
  state.curtainLines = state.curtainLines.map((line) => {
    if (line.id !== id) {
      return line;
    }

    const next = {
      ...line,
      [field]: ["width", "drop", "foldRate"].includes(field)
        ? (field === "foldRate" ? (value === "" ? "" : Number(value)) : value)
        : value
    };

    if (field === "material") {
      next.color = CURTAIN_MATERIALS[value].colors[0];
    }

    return next;
  });
}

function setCurtainEditing(id, isEditing) {
  state.curtainLines = state.curtainLines.map((line) => (
    line.id === id ? { ...line, isEditing } : line
  ));
}

function deleteCurtainLine(id) {
  state.curtainLines = state.curtainLines.filter((line) => line.id !== id);
}

function saveAllCurtainLines() {
  state.curtainLines = state.curtainLines.map((line) => ({
    ...line,
    isEditing: false
  }));
}

function addBlindLineAndFocus() {
  const line = createLine();
  state.lines.push(line);
  queueFocus(`input[data-id="${line.id}"][data-field="width"]`, true);
  renderAll();
}

function addCurtainLineAndFocus() {
  const line = createCurtainLine();
  state.curtainLines.push(line);
  queueFocus(`input[data-curtain-id="${line.id}"][data-curtain-field="width"]`, true);
  renderAll();
}

function updateSummary() {
  const blindTotals = state.lines.reduce((acc, line) => {
    const computed = calculateBlindLine(line);
    acc.materialsCostTotal += computed.blindCostTotal;
    acc.materialsCostGstTotal += computed.blindCostGstTotal;
    acc.supplyRetailTotal += computed.supplyUnitRetail;
    acc.installCostTotal += computed.installUnitCost;
    acc.installRetailTotal += computed.installUnitRetail;
    acc.subtotalExGst += computed.lineSubtotalExGst;
    acc.gstTotal += computed.lineGst;
    acc.grandTotal += computed.lineTotal;
    return acc;
  }, {
    materialsCostTotal: 0,
    materialsCostGstTotal: 0,
    supplyRetailTotal: 0,
    installCostTotal: 0,
    installRetailTotal: 0,
    subtotalExGst: 0,
    gstTotal: 0,
    grandTotal: 0
  });

  const curtainTotals = state.curtainLines.reduce((acc, line) => {
    const computed = calculateCurtainLine(line);
    acc.curtainCostTotal += computed.costExGst;
    acc.curtainCostGstTotal += computed.costWithGst;
    acc.supplyRetailTotal += computed.retailExGst;
    acc.subtotalExGst += computed.retailExGst;
    acc.gstTotal += computed.gst;
    acc.grandTotal += computed.lineTotal;
    return acc;
  }, {
    curtainCostTotal: 0,
    curtainCostGstTotal: 0,
    supplyRetailTotal: 0,
    subtotalExGst: 0,
    gstTotal: 0,
    grandTotal: 0
  });

  const grossProfit = (blindTotals.supplyRetailTotal + blindTotals.installRetailTotal + curtainTotals.supplyRetailTotal) - (blindTotals.materialsCostTotal + blindTotals.installCostTotal + curtainTotals.curtainCostTotal);
  const grandTotal = blindTotals.grandTotal + curtainTotals.grandTotal;
  const profitPercent = grandTotal > 0 ? (grossProfit / grandTotal) * 100 : 0;
  const costExGstTotal = blindTotals.materialsCostTotal + blindTotals.installCostTotal + curtainTotals.curtainCostTotal;

  els.materialsCostTotal.textContent = formatCurrency(blindTotals.materialsCostTotal);
  els.curtainCostTotal.textContent = formatCurrency(curtainTotals.curtainCostTotal);
  els.blindRetailTotal.textContent = formatCurrency(blindTotals.supplyRetailTotal + blindTotals.installRetailTotal + blindTotals.gstTotal);
  els.curtainRetailTotal.textContent = formatCurrency(curtainTotals.grandTotal);
  els.installCostTotal.textContent = formatCurrency(blindTotals.installCostTotal);
  els.installRetailTotal.textContent = formatCurrency(blindTotals.installRetailTotal);
  els.costExGstTotal.textContent = formatCurrency(costExGstTotal);
  els.subtotalExGst.textContent = formatCurrency(blindTotals.subtotalExGst + curtainTotals.subtotalExGst);
  els.gstTotal.textContent = formatCurrency(blindTotals.gstTotal + curtainTotals.gstTotal);
  els.grandTotal.textContent = formatCurrency(grandTotal);
  els.grossProfit.textContent = formatCurrency(grossProfit);
  els.profitPercent.textContent = `${formatPercent(profitPercent)} profit margin`;
  els.profitExplainer.textContent = "Gross profit after material costs, track costs, and install cost baseline.";

  syncPreview({
    blind: blindTotals,
    curtain: curtainTotals,
    subtotalExGst: blindTotals.subtotalExGst + curtainTotals.subtotalExGst,
    gstTotal: blindTotals.gstTotal + curtainTotals.gstTotal,
    grandTotal
  });

  syncMessageDrafts({
    subtotalExGst: blindTotals.subtotalExGst + curtainTotals.subtotalExGst,
    gstTotal: blindTotals.gstTotal + curtainTotals.gstTotal,
    grandTotal
  });
}

function syncPreview(totals) {
  els.previewCustomer.textContent = `Customer: ${state.customer.name || "-"}`;
  els.previewPhone.textContent = `Phone: ${state.customer.phone || "-"}`;
  els.previewAddress.textContent = `Address: ${state.customer.address || "-"}`;
  els.previewSubtotal.textContent = formatCurrency(totals.subtotalExGst);
  els.previewGst.textContent = formatCurrency(totals.gstTotal);
  els.previewTotal.textContent = formatCurrency(totals.grandTotal);

  els.previewLines.innerHTML = "";

  state.lines.forEach((line, index) => {
    const computed = calculateBlindLine(line);
    const previewLine = document.createElement("div");
    previewLine.className = "preview-line";
    previewLine.innerHTML = `
      <div>
        <strong>Blind ${index + 1} - ${line.location || "Untitled Location"}</strong>
      </div>
      <strong>${formatCurrency(computed.lineTotal)}</strong>
    `;
    els.previewLines.appendChild(previewLine);
  });

  state.curtainLines.forEach((line, index) => {
    const computed = calculateCurtainLine(line);
    const previewLine = document.createElement("div");
    previewLine.className = "preview-line";
    previewLine.innerHTML = `
      <div>
        <strong>No. ${index + 1} - ${line.location || "Untitled Location"}</strong>


      </div>
      <strong>${formatCurrency(computed.lineTotal)}</strong>
    `;
    els.previewLines.appendChild(previewLine);
  });

  if (!state.lines.length && !state.curtainLines.length) {
    els.previewLines.innerHTML = `<span class="error-text">Add a product line to build the quote.</span>`;
  }
}

function buildOrderSummaryText(totals) {
  const blindCount = state.lines.length;
  const curtainCount = state.curtainLines.filter((line) => line.product === "curtain").length;
  const sheerCount = state.curtainLines.filter((line) => line.product === "sheer").length;
  const customerName = state.customer.name || "there";
  const quoteNumber = state.customer.quoteNumber ? `Quote ${state.customer.quoteNumber}` : "your quote";
  const summaryParts = [];

  if (blindCount) {
    summaryParts.push(`${blindCount} roller blind${blindCount === 1 ? "" : "s"}`);
  }

  if (curtainCount) {
    summaryParts.push(`${curtainCount} curtain${curtainCount === 1 ? "" : "s"}`);
  }

  if (sheerCount) {
    summaryParts.push(`${sheerCount} sheer${sheerCount === 1 ? "" : "s"}`);
  }

  return {
    productSummary: summaryParts.join(", ") || "0 items",
    customerName,
    quoteNumber,
    totalText: formatCurrency(totals.grandTotal)
  };
}

function syncMessageDrafts(totals) {
  const summary = buildOrderSummaryText(totals);
  const emailLines = [
    `Hi ${summary.customerName},`,
    "",
    "Thank you for your enquiry with Eastern Home Service.",
    "",
    `${summary.quoteNumber} is ready.`,
    `Order summary: ${summary.productSummary}`,
    `Total amount incl. GST: ${summary.totalText}`,
    "",
    "Please note:",
    "- 50% deposit is required once you decide to place the order.",
    "- Roller blinds lead time: 5-7 days.",
    "- Curtains and sheers lead time: 4-6 weeks.",
    "",
    "Please let us know if you would like to proceed.",
    "",
    "Kind regards,",
    "Eastern Home Service"
  ];

  const messageParts = [
    `Hi ${summary.customerName},`,
    `${summary.quoteNumber} is ready.`,
    `Order summary: ${summary.productSummary}.`,
    `Total incl. GST: ${summary.totalText}.`,
    "50% deposit is required to confirm the order.",
    "Roller blinds lead time: 5-7 days.",
    "Curtains and sheers lead time: 4-6 weeks.",
    "Please let us know if you would like to proceed.",
    "Eastern Home Service"
  ];

  els.emailDraft.value = emailLines.join("\n");
  els.messageDraft.value = messageParts.join(" ");
}

async function copyText(text, label) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "absolute";
      helper.style.left = "-9999px";
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
    }

    els.copyFeedback.textContent = `${label} copied.`;
  } catch (error) {
    els.copyFeedback.textContent = `Unable to copy ${label.toLowerCase()}.`;
  }
}

function renderAll() {
  renderBlindSummaryTable();
  renderCurtainSummaryTable();
  updateSummary();
  renderAirMode();
  applyPendingFocus();
}

function focusNextBlindField(id, field) {
  const currentIndex = state.lines.findIndex((line) => line.id === id);
  if (currentIndex === -1) {
    return;
  }

  if (field === "width") {
    queueFocus(`input[data-id="${id}"][data-field="height"]`, true);
    renderAll();
    return;
  }

  const nextLine = state.lines[currentIndex + 1];
  if (nextLine) {
    queueFocus(`input[data-id="${nextLine.id}"][data-field="width"]`, true);
    renderAll();
    return;
  }

  addBlindLineAndFocus();
}

function focusNextCurtainField(id, field) {
  const currentIndex = state.curtainLines.findIndex((line) => line.id === id);
  if (currentIndex === -1) {
    return;
  }

  if (field === "width") {
    queueFocus(`input[data-curtain-id="${id}"][data-curtain-field="drop"]`, true);
    renderAll();
    return;
  }

  const nextLine = state.curtainLines[currentIndex + 1];
  if (nextLine) {
    queueFocus(`input[data-curtain-id="${nextLine.id}"][data-curtain-field="width"]`, true);
    renderAll();
    return;
  }

  addCurtainLineAndFocus();
}

function bindEvents() {
  window.addEventListener("hashchange", () => {
    syncPageNavigation();
  });

  els.airProductType.addEventListener("change", () => {
    updateAirModeFields();
  });

  els.airCurtainMaterial.addEventListener("change", () => {
    populateAirCurtainColors();
  });

  els.airAddItem.addEventListener("click", () => {
    if (addAirModeItem()) {
      queueAirModeEntryFocus();
    }
  });

  els.airClearForm.addEventListener("click", () => {
    clearAirModeForm();
    renderAirMode();
    els.airFeedback.textContent = "";
  });

  els.airSaveQuote.addEventListener("click", async () => {
    await submitQuoteRecord();
    els.airFeedback.textContent = els.copyFeedback.textContent;
  });

  els.airCameraPhotos.addEventListener("change", (event) => {
    const { files } = event.target;
    if (files && files.length) {
      addPhotos(files);
      event.target.value = "";
      renderAirMode();
      els.airFeedback.textContent = "Photo added.";
    }
  });

  els.airHousePhotos.addEventListener("change", (event) => {
    const { files } = event.target;
    if (files && files.length) {
      addPhotos(files);
      event.target.value = "";
      renderAirMode();
      els.airFeedback.textContent = "Photo added.";
    }
  });

  els.airPhotoGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.airDeletePhoto) {
      removePhoto(target.dataset.airDeletePhoto);
      renderAirMode();
      els.airFeedback.textContent = "Photo removed.";
    }
  });

  els.airItemsList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.airDeleteBlind) {
      deleteBlindLine(target.dataset.airDeleteBlind);
      renderAll();
      return;
    }

    if (target.dataset.airDeleteCurtain) {
      deleteCurtainLine(target.dataset.airDeleteCurtain);
      renderAll();
    }
  });

  [
    [els.airBlindWidth, "width"],
    [els.airBlindHeight, "height"],
    [els.airCurtainWidth, "width"],
    [els.airCurtainDrop, "drop"]
  ].forEach(([element, field]) => {
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      handleAirModeEnterFlow(field);
    });
  });

  els.addLine.addEventListener("click", () => {
    addBlindLineAndFocus();
  });

  els.addCurtainLine.addEventListener("click", () => {
    addCurtainLineAndFocus();
  });

  els.summaryBlindsBody.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.id && target.dataset.field) {
      setBlindValue(target.dataset.id, target.dataset.field, target.value);
      updateSummary();
    }
  });

  els.summaryBlindsBody.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.id && target.dataset.field) {
      setBlindValue(target.dataset.id, target.dataset.field, target.value);
      if (target.dataset.field === "width" || target.dataset.field === "height") {
        setBlindValue(target.dataset.id, target.dataset.field, normalizeCalculatorField(target.value));
      }
      renderAll();
    }
  });

  els.summaryBlindsBody.addEventListener("keydown", (event) => {
    const target = event.target;
    if (event.key !== "Enter" || !target.dataset.id || !target.dataset.field) {
      return;
    }

    if (!["width", "height"].includes(target.dataset.field)) {
      return;
    }

    event.preventDefault();
    setBlindValue(target.dataset.id, target.dataset.field, normalizeCalculatorField(target.value));
    focusNextBlindField(target.dataset.id, target.dataset.field);
  });

  els.summaryBlindsBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.editBlind) {
      queueFocus(`input[data-id="${target.dataset.editBlind}"][data-field="width"]`, true);
      setBlindEditing(target.dataset.editBlind, true);
      renderAll();
    }
    if (target.dataset.saveBlind) {
      const id = target.dataset.saveBlind;
      const line = state.lines.find((item) => item.id === id);
      if (line) {
        setBlindValue(id, "width", normalizeCalculatorField(line.width));
        setBlindValue(id, "height", normalizeCalculatorField(line.height));
      }
      setBlindEditing(id, false);
      renderAll();
    }
    if (target.dataset.deleteBlind) {
      deleteBlindLine(target.dataset.deleteBlind);
      renderAll();
    }
  });

  els.summaryCurtainsBody.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.curtainId && target.dataset.curtainField) {
      setCurtainValue(target.dataset.curtainId, target.dataset.curtainField, target.value);
      updateSummary();
    }
  });

  els.summaryCurtainsBody.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.curtainId && target.dataset.curtainField) {
      setCurtainValue(target.dataset.curtainId, target.dataset.curtainField, target.value);
      if (target.dataset.curtainField === "width" || target.dataset.curtainField === "drop") {
        setCurtainValue(target.dataset.curtainId, target.dataset.curtainField, normalizeCalculatorField(target.value));
      }
      renderAll();
    }
  });

  els.summaryCurtainsBody.addEventListener("keydown", (event) => {
    const target = event.target;
    if (event.key !== "Enter" || !target.dataset.curtainId || !target.dataset.curtainField) {
      return;
    }

    if (!["width", "drop"].includes(target.dataset.curtainField)) {
      return;
    }

    event.preventDefault();
    setCurtainValue(target.dataset.curtainId, target.dataset.curtainField, normalizeCalculatorField(target.value));
    focusNextCurtainField(target.dataset.curtainId, target.dataset.curtainField);
  });

  els.summaryCurtainsBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.editCurtain) {
      queueFocus(`input[data-curtain-id="${target.dataset.editCurtain}"][data-curtain-field="width"]`, true);
      setCurtainEditing(target.dataset.editCurtain, true);
      renderAll();
    }
    if (target.dataset.saveCurtain) {
      const id = target.dataset.saveCurtain;
      const line = state.curtainLines.find((item) => item.id === id);
      if (line) {
        setCurtainValue(id, "width", normalizeCalculatorField(line.width));
        setCurtainValue(id, "drop", normalizeCalculatorField(line.drop));
      }
      setCurtainEditing(id, false);
      renderAll();
    }
    if (target.dataset.deleteCurtain) {
      deleteCurtainLine(target.dataset.deleteCurtain);
      renderAll();
    }
  });

  els.photoGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.deletePhoto) {
      removePhoto(target.dataset.deletePhoto);
    }
  });

  els.cameraPhotos.addEventListener("change", (event) => {
    const { files } = event.target;
    if (files && files.length) {
      addPhotos(files);
      event.target.value = "";
    }
  });

  els.clearBlinds.addEventListener("click", () => {
    state.lines = [];
    renderAll();
  });

  els.saveAllBlinds.addEventListener("click", () => {
    saveAllBlindLines();
    renderAll();
    els.copyFeedback.textContent = "All blind rows saved.";
  });

  els.clearCurtains.addEventListener("click", () => {
    state.curtainLines = [];
    renderAll();
  });

  els.saveAllCurtains.addEventListener("click", () => {
    saveAllCurtainLines();
    renderAll();
    els.copyFeedback.textContent = "All curtain and sheer rows saved.";
  });

  els.recordsTableBody.addEventListener("click", (event) => {
    const target = event.target;
    const selectButton = target.closest("[data-select-record]");
    if (selectButton) {
      state.selectedRecordId = selectButton.dataset.selectRecord;
      renderRecords();
      return;
    }

    if (target.dataset.deleteRecord) {
      deleteRecord(target.dataset.deleteRecord);
    }
  });

  els.recordDetail.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.createInvoiceRecord) {
      const record = state.records.find((item) => item.id === target.dataset.createInvoiceRecord);
      createInvoiceFromRecord(record);
    }
  });

  els.historySearch.addEventListener("input", () => {
    state.historySearch = els.historySearch.value;
    renderRecords();
  });

  els.invoiceSearch.addEventListener("input", () => {
    state.invoiceSearch = els.invoiceSearch.value;
    renderInvoices();
  });

  els.newInvoice.addEventListener("click", () => {
    createNewInvoice();
  });

  els.createInvoiceFromQuote.addEventListener("click", () => {
    const selectedRecord = getSelectedRecord();
    if (selectedRecord) {
      createInvoiceFromRecord(selectedRecord);
      return;
    }

    if (state.lines.length || state.curtainLines.length) {
      createInvoiceFromCurrentQuote();
      return;
    }

    els.invoiceFeedback.textContent = "Select a saved quote or build a current quote first.";
  });

  els.saveInvoice.addEventListener("click", () => {
    if (!getSelectedInvoice()) {
      createNewInvoice();
      return;
    }
    persistInvoices();
    renderInvoices();
    els.invoiceFeedback.textContent = "Invoice saved.";
  });

  els.markInvoiceDraft.addEventListener("click", () => {
    setInvoiceStatus("draft");
  });

  els.markInvoiceSent.addEventListener("click", () => {
    setInvoiceStatus("sent");
  });

  els.markInvoicePaid.addEventListener("click", () => {
    setInvoiceStatus("paid");
  });

  els.invoiceListBody.addEventListener("click", (event) => {
    const target = event.target;
    const selectButton = target.closest("[data-select-invoice]");
    if (selectButton) {
      state.selectedInvoiceId = selectButton.dataset.selectInvoice;
      renderInvoices();
      window.location.hash = "#invoices";
      syncPageNavigation();
    }
  });

  els.addInvoiceLine.addEventListener("click", () => {
    addInvoiceLineToSelected();
  });

  [
    ["customerName", els.invoiceCustomerName],
    ["customerPhone", els.invoiceCustomerPhone],
    ["customerAddress", els.invoiceCustomerAddress],
    ["sourceQuoteNumber", els.invoiceReference],
    ["invoiceDate", els.invoiceDate],
    ["dueDate", els.invoiceDueDate],
    ["paymentTerms", els.invoicePaymentTerms],
    ["amountPaid", els.invoiceAmountPaidInput],
    ["notes", els.invoiceNotes],
    ["bankDetails", els.invoiceBankDetails]
  ].forEach(([field, element]) => {
    element.addEventListener("change", () => {
      setInvoiceValue(field, element.value);
      renderInvoices();
    });
  });

  els.invoiceLinesBody.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.invoiceLineId && target.dataset.invoiceLineField) {
      setInvoiceLineValue(target.dataset.invoiceLineId, target.dataset.invoiceLineField, target.value);
      renderInvoices();
    }
  });

  els.invoiceLinesBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.deleteInvoiceLine) {
      removeInvoiceLine(target.dataset.deleteInvoiceLine);
    }
  });

  els.housePhotos.addEventListener("change", (event) => {
    const { files } = event.target;
    if (files && files.length) {
      addPhotos(files);
      event.target.value = "";
    }
  });

  [
    ["supplyMarkup", els.supplyMarkup],
    ["curtainMarkup", els.curtainMarkup],
    ["installCost", els.installCost],
    ["installRetail", els.installRetail]
  ].forEach(([field, element]) => {
    element.addEventListener("input", () => {
      state.settings[field] = Number(element.value) || 0;
      renderAll();
    });
  });

  [
    ["name", els.customerName],
    ["phone", els.customerPhone],
    ["address", els.customerAddress],
    ["quoteNumber", els.quoteNumber],
    ["name", els.airCustomerName],
    ["phone", els.airCustomerPhone],
    ["address", els.airCustomerAddress],
    ["quoteNumber", els.airQuoteNumber]
  ].forEach(([field, element]) => {
    element.addEventListener("input", () => {
      state.customer[field] = element.value;
      hydrateInputs();
      updateSummary();
    });
  });

  els.resetQuote.addEventListener("click", () => {
    state.settings = {
      supplyMarkup: 40,
      curtainMarkup: 40,
      installCost: 20,
      installRetail: 35
    };
    state.customer = {
      name: "",
      phone: "",
      address: "",
      quoteNumber: ""
    };
    state.photos = [];
    persistPhotos();
    state.lines = [];
    state.curtainLines = [];
    els.copyFeedback.textContent = "";
    els.airFeedback.textContent = "";
    clearAirModeForm();
    hydrateInputs();
    renderPhotos();
    renderAll();
  });

  els.printQuote.addEventListener("click", () => {
    window.print();
  });

  els.submitQuote.addEventListener("click", () => {
    submitQuoteRecord();
  });

  els.copyEmail.addEventListener("click", () => {
    copyText(els.emailDraft.value, "Email draft");
  });

  els.copyMessage.addEventListener("click", () => {
    copyText(els.messageDraft.value, "Message draft");
  });
}

function hydrateInputs() {
  els.supplyMarkup.value = state.settings.supplyMarkup;
  els.curtainMarkup.value = state.settings.curtainMarkup;
  els.installCost.value = state.settings.installCost;
  els.installRetail.value = state.settings.installRetail;
  els.customerName.value = state.customer.name;
  els.customerPhone.value = state.customer.phone;
  els.customerAddress.value = state.customer.address;
  els.quoteNumber.value = state.customer.quoteNumber;
  els.airCustomerName.value = state.customer.name;
  els.airCustomerPhone.value = state.customer.phone;
  els.airCustomerAddress.value = state.customer.address;
  els.airQuoteNumber.value = state.customer.quoteNumber;
  if (els.historySearch) {
    els.historySearch.value = state.historySearch;
  }
  if (els.invoiceSearch) {
    els.invoiceSearch.value = state.invoiceSearch;
  }
}

async function init() {
  try {
    cacheElements();
    if (!hasRequiredElements()) {
      console.error("Quote builder failed to initialize because required controls were not found.");
      return;
    }

    loadPhotos();
    await loadRecords();
    loadInvoices();
    els.airCurtainMaterial.innerHTML = Object.keys(CURTAIN_MATERIALS)
      .map((material) => `<option value="${material}" ${material === "Begonia" ? "selected" : ""}>${material}</option>`)
      .join("");
    clearAirModeForm();
    state.lines = [];
    state.curtainLines = [];
    hydrateInputs();
    bindEvents();
    renderPhotos();
    renderRecords();
    renderInvoices();
    renderAll();
    syncPageNavigation();
  } catch (error) {
    console.error("Quote builder failed to initialize.", error);
    if (!initRecoveryAttempted) {
      initRecoveryAttempted = true;
      try {
        localStorage.removeItem(LOCAL_PHOTOS_KEY);
        localStorage.removeItem(LOCAL_RECORDS_KEY);
        localStorage.removeItem(LOCAL_INVOICES_KEY);
      } catch (storageError) {
        console.warn("Unable to clear saved quote builder data during recovery.", storageError);
      }
      state.photos = [];
      state.records = [];
      state.invoices = [];
      init();
      return;
    }
    const fallback = document.createElement("div");
    fallback.style.padding = "16px";
    fallback.style.margin = "16px";
    fallback.style.borderRadius = "12px";
    fallback.style.background = "rgba(182, 59, 59, 0.14)";
    fallback.style.border = "1px solid rgba(182, 59, 59, 0.35)";
    fallback.style.color = "#ffd9d9";
    fallback.textContent = "The quote builder hit a startup error. Reload the page to retry. If it still fails, saved browser data may need to be cleared.";
    document.body.prepend(fallback);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
