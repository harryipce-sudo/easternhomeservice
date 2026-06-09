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
const GST_RATE = 0.1;

const CLEANING_BASE_SERVICES = [
  { value: "apt-1b1b-indoor", label: "Apartment 1B1B - Indoor Cleaning Only", cost: 220 },
  { value: "apt-1b1b-carpet", label: "Apartment 1B1B - Incl. Carpet Steam Clean", cost: 330 },
  { value: "apt-2b1b-indoor", label: "Apartment 2B1B - Indoor Cleaning Only", cost: 270 },
  { value: "apt-2b1b-carpet", label: "Apartment 2B1B - Incl. Carpet Steam Clean", cost: 370 },
  { value: "apt-2b2b-indoor", label: "Apartment 2B2B - Indoor Cleaning Only", cost: 330 },
  { value: "apt-2b2b-carpet", label: "Apartment 2B2B - Incl. Carpet Steam Clean", cost: 430 },
  { value: "apt-3b1b-indoor", label: "Apartment 3B1B - Indoor Cleaning Only", cost: 350 },
  { value: "apt-3b1b-carpet", label: "Apartment 3B1B - Incl. Carpet Steam Clean", cost: 500 },
  { value: "apt-3b2b-indoor", label: "Apartment 3B2B - Indoor Cleaning Only", cost: 400 },
  { value: "apt-3b2b-carpet", label: "Apartment 3B2B - Incl. Carpet Steam Clean", cost: 550 },
  { value: "apt-4b2b-indoor", label: "Apartment 4B2B - Indoor Cleaning Only", cost: 500 },
  { value: "apt-4b2b-carpet", label: "Apartment 4B2B - Incl. Carpet Steam Clean", cost: 700 },
  { value: "standalone-carpet", label: "Standalone Steam Carpet Cleaning", costPerRoom: 65, minCharge: 150 }
];

const CLEANING_EXTRA_SERVICES = [
  { value: "wall-stains", label: "Wall Stains", defaultCost: 50, unit: "job" },
  { value: "microwave", label: "Microwave", defaultCost: 30, unit: "each" },
  { value: "windows-glass-doors", label: "Windows / Glass Doors", defaultCost: 17.5, unit: "each" },
  { value: "washing-machine-dryer", label: "Washing Machine / Dryer", defaultCost: 30, unit: "each" },
  { value: "refrigerator", label: "Refrigerator", defaultCost: 75, unit: "each" },
  { value: "pet-hair-removal", label: "Pet Hair Removal on Carpet", defaultCost: 100, unit: "room" },
  { value: "oven", label: "Oven", defaultCost: 115, unit: "each" },
  { value: "stairs", label: "Stairs", defaultCost: 60, unit: "flight" },
  { value: "mold-removal", label: "Mold Removal", defaultCost: 40, unit: "job" },
  { value: "aircon-filter", label: "Air Conditioner Filter", defaultCost: 20, unit: "each" },
  { value: "balcony", label: "Balcony (Standard)", defaultCost: 75, unit: "each" },
  { value: "rubbish-removal", label: "Rubbish Removal", defaultCost: 0, unit: "job" },
  { value: "extra-bathroom", label: "Extra Bathroom", defaultCost: 80, unit: "each" },
  { value: "blinds", label: "Blinds", defaultCost: 100, unit: "each" },
  { value: "weeding", label: "Weeding", defaultCost: 70, unit: "hour / person" },
  { value: "bedroom-mopping", label: "Bedroom Mopping", defaultCost: 25, unit: "each" },
  { value: "furniture-wiping", label: "Furniture Wiping", defaultCost: 100, unit: "apt." },
  { value: "garage", label: "Garage", defaultCost: 80, unit: "each" }
];

const state = {
  gstRate: GST_RATE,
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
    email: "",
    quoteNumber: ""
  },
  photos: [],
  records: [],
  lines: [],
  curtainLines: [],
  cleaning: {
    baseService: "apt-1b1b-indoor",
    standaloneRooms: 1,
    extras: []
  },
  recycleBin: [],
  historySearch: "",
  selectedRecordId: "",
  invoices: [],
  invoiceSearch: "",
  selectedInvoiceId: ""
};

const SECTOR_LABELS = {
  "blinds-curtains": "Blinds / Curtain",
  cleaning: "Cleaning",
  mixed: "Multi Service",
  general: "General"
};

const LOCAL_RECORDS_KEY = "ehs-dimension-records";
const LOCAL_PHOTOS_KEY = "ehs-house-photos";
const LOCAL_INVOICES_KEY = "ehs-invoices";
const LOCAL_RECYCLE_BIN_KEY = "ehs-recycle-bin";
const RECYCLE_RETENTION_DAYS = 15;

let els = {};
let initRecoveryAttempted = false;
let pendingFocus = null;

function getQuoteRecordsEndpoint() {
  const { hostname } = window.location;
  const isLocalHost = hostname === "127.0.0.1" || hostname === "localhost";
  const baseUrl = isLocalHost ? "https://easternhomeservice.vercel.app" : "";
  return `${baseUrl}/api/quote-records`;
}

function getSendDocumentEndpoint() {
  const { hostname } = window.location;
  const isLocalHost = hostname === "127.0.0.1" || hostname === "localhost";
  const baseUrl = isLocalHost ? "https://easternhomeservice.vercel.app" : "";
  return `${baseUrl}/api/send-document`;
}

function cacheElements() {
  els = {
    addLine: document.querySelector("#add-line"),
    addCurtainLine: document.querySelector("#add-curtain-line"),
    saveAllBlinds: document.querySelector("#save-all-blinds"),
    saveAllCurtains: document.querySelector("#save-all-curtains"),
    clearBlinds: document.querySelector("#clear-blinds"),
    clearCurtains: document.querySelector("#clear-curtains"),
    submitQuote: document.querySelector("#submit-quote"),
    sendQuote: document.querySelector("#send-quote"),
    draftQuote: document.querySelector("#draft-quote"),
    printQuote: document.querySelector("#print-quote"),
    supplyMarkup: document.querySelector("#supply-markup"),
    curtainMarkup: document.querySelector("#curtain-markup"),
    installCost: document.querySelector("#install-cost"),
    installRetail: document.querySelector("#install-retail"),
    customerName: document.querySelector("#customer-name"),
    customerPhone: document.querySelector("#customer-phone"),
    customerAddress: document.querySelector("#customer-address"),
    customerEmail: document.querySelector("#customer-email"),
    quoteNumber: document.querySelector("#quote-number"),
    airCustomerName: document.querySelector("#air-customer-name"),
    airCustomerPhone: document.querySelector("#air-customer-phone"),
    airCustomerAddress: document.querySelector("#air-customer-address"),
    airCustomerEmail: document.querySelector("#air-customer-email"),
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
    quoteSubnavLinks: Array.from(document.querySelectorAll(".subnav-link[data-quote-subnav]")),
    opsSubnavLinks: Array.from(document.querySelectorAll(".subnav-link[data-ops-subnav]")),
    summaryBlindsBody: document.querySelector("#summary-blinds-body"),
    summaryBlindsEmpty: document.querySelector("#summary-blinds-empty"),
    summaryCurtainsBody: document.querySelector("#summary-curtains-body"),
    summaryCurtainsEmpty: document.querySelector("#summary-curtains-empty"),
    cleaningCustomerName: document.querySelector("#cleaning-customer-name"),
    cleaningCustomerPhone: document.querySelector("#cleaning-customer-phone"),
    cleaningCustomerAddress: document.querySelector("#cleaning-customer-address"),
    cleaningCustomerEmail: document.querySelector("#cleaning-customer-email"),
    cleaningQuoteNumber: document.querySelector("#cleaning-quote-number"),
    cleaningBaseService: document.querySelector("#cleaning-base-service"),
    cleaningStandaloneFields: document.querySelector("#cleaning-standalone-fields"),
    cleaningStandaloneRooms: document.querySelector("#cleaning-standalone-rooms"),
    cleaningExtrasBody: document.querySelector("#cleaning-extras-body"),
    cleaningExtrasEmpty: document.querySelector("#cleaning-extras-empty"),
    addCleaningExtra: document.querySelector("#add-cleaning-extra"),
    saveCleaningQuote: document.querySelector("#save-cleaning-quote"),
    sendCleaningQuote: document.querySelector("#send-cleaning-quote"),
    draftCleaningQuote: document.querySelector("#draft-cleaning-quote"),
    cleaningFeedback: document.querySelector("#cleaning-feedback"),
    cleaningBaseCost: document.querySelector("#cleaning-base-cost"),
    cleaningBaseRetail: document.querySelector("#cleaning-base-retail"),
    cleaningExtrasCost: document.querySelector("#cleaning-extras-cost"),
    cleaningExtrasRetail: document.querySelector("#cleaning-extras-retail"),
    cleaningSubtotalCost: document.querySelector("#cleaning-subtotal-cost"),
    cleaningSubtotalRetail: document.querySelector("#cleaning-subtotal-retail"),
    cleaningCostGst: document.querySelector("#cleaning-cost-gst"),
    cleaningGst: document.querySelector("#cleaning-gst"),
    cleaningTotalCost: document.querySelector("#cleaning-total-cost"),
    cleaningTotal: document.querySelector("#cleaning-total"),
    cleaningProfit: document.querySelector("#cleaning-profit"),
    cleaningProfitPercent: document.querySelector("#cleaning-profit-percent"),
    historySearch: document.querySelector("#history-search"),
    recordsTableBody: document.querySelector("#records-table-body"),
    recordDetail: document.querySelector("#record-detail"),
    recordEmpty: document.querySelector("#record-empty"),
    invoiceSearch: document.querySelector("#invoice-search"),
    newInvoice: document.querySelector("#new-invoice"),
    saveInvoice: document.querySelector("#save-invoice"),
    printInvoice: document.querySelector("#print-invoice"),
    shareInvoice: document.querySelector("#share-invoice"),
    draftInvoice: document.querySelector("#draft-invoice"),
    previewInvoice: document.querySelector("#preview-invoice"),
    markInvoiceDraft: document.querySelector("#mark-invoice-draft"),
    markInvoiceSent: document.querySelector("#mark-invoice-sent"),
    markInvoicePaid: document.querySelector("#mark-invoice-paid"),
    savedPreviewInvoice: document.querySelector("#saved-preview-invoice"),
    savedPrintInvoice: document.querySelector("#saved-print-invoice"),
    savedShareInvoice: document.querySelector("#saved-share-invoice"),
    savedDraftInvoice: document.querySelector("#saved-draft-invoice"),
    savedInvoiceFeedback: document.querySelector("#saved-invoice-feedback"),
    invoiceListBody: document.querySelector("#invoice-list-body"),
    invoiceListEmpty: document.querySelector("#invoice-list-empty"),
    recycleListBody: document.querySelector("#recycle-list-body"),
    recycleListEmpty: document.querySelector("#recycle-list-empty"),
    recycleFeedback: document.querySelector("#recycle-feedback"),
    settingsClearQuotes: document.querySelector("#settings-clear-quotes"),
    settingsClearInvoices: document.querySelector("#settings-clear-invoices"),
    settingsClearRecycle: document.querySelector("#settings-clear-recycle"),
    settingsFeedback: document.querySelector("#settings-feedback"),
    invoiceDetailTitle: document.querySelector("#invoice-detail-title"),
    invoiceNumberDisplay: document.querySelector("#invoice-number-display"),
    invoiceStatusBadge: document.querySelector("#invoice-status-badge"),
    invoiceCustomerName: document.querySelector("#invoice-customer-name"),
    invoiceCustomerPhone: document.querySelector("#invoice-customer-phone"),
    invoiceCustomerAddress: document.querySelector("#invoice-customer-address"),
    invoiceCustomerEmail: document.querySelector("#invoice-customer-email"),
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
    els.recycleListBody &&
    els.cleaningBaseService &&
    els.cleaningExtrasBody &&
    els.invoiceCustomerName &&
    els.invoiceLinesBody &&
    els.clearBlinds &&
    els.clearCurtains &&
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
    id: partial.id || crypto.randomUUID(),
    description: partial.description || "",
    quantity: Number(partial.quantity) || 1,
    unitPrice: Number(partial.unitPrice) || 0,
    taxRate: Number.isFinite(Number(partial.taxRate)) ? Number(partial.taxRate) : 0.1
  };
}

function getAllDocumentNumbers() {
  return [
    ...state.invoices.flatMap((invoice) => [invoice.invoiceNumber, invoice.sourceQuoteNumber]),
    ...state.records.map((record) => record.quoteNumber)
  ];
}

function generateDocumentNumber() {
  const numericParts = getAllDocumentNumbers()
    .map((value) => Number(String(value || "").replace(/\D/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
  const nextNumber = (numericParts.length ? Math.max(...numericParts) : 3000) + 1;
  return `INV-${nextNumber}`;
}

function generateInvoiceNumber() {
  return generateDocumentNumber();
}

function ensureQuoteNumber() {
  if (!String(state.customer.quoteNumber || "").trim()) {
    state.customer.quoteNumber = generateDocumentNumber();
  }
  return state.customer.quoteNumber;
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
  const invoiceNumber = partial.invoiceNumber || generateDocumentNumber();
  const invoiceDate = partial.invoiceDate || today;
  const paymentTermsDays = parsePaymentTermsDays(partial.paymentTerms || "7 Days") || 7;
  const dueDate = partial.dueDate || addDaysToIsoDate(invoiceDate, paymentTermsDays);
  return {
    id: partial.id || crypto.randomUUID(),
    invoiceNumber,
    sourceQuoteNumber: partial.sourceQuoteNumber || invoiceNumber,
    sector: partial.sector || "General",
    status: partial.status || "draft",
    customerName: partial.customerName || "",
    customerPhone: partial.customerPhone || "",
    customerAddress: partial.customerAddress || "",
    customerEmail: partial.customerEmail || "",
    invoiceDate,
    dueDate,
    paymentTerms: partial.paymentTerms || formatPaymentTerms(paymentTermsDays),
    amountPaid: Number(partial.amountPaid) || 0,
    notes: partial.notes || "Thank you for choosing Eastern Home Service.",
    bankDetails: partial.bankDetails || "",
    lastSentAt: partial.lastSentAt || "",
    lastSentTo: partial.lastSentTo || "",
    sendCount: Number(partial.sendCount) || 0,
    lines: Array.isArray(partial.lines) && partial.lines.length
      ? partial.lines.map((line) => createInvoiceLine(line))
      : [createInvoiceLine()]
  };
}

function getCleaningBaseServiceOption(value) {
  return CLEANING_BASE_SERVICES.find((item) => item.value === value) || CLEANING_BASE_SERVICES[0];
}

function getCleaningExtraServiceOption(value) {
  return CLEANING_EXTRA_SERVICES.find((item) => item.value === value) || CLEANING_EXTRA_SERVICES[0];
}

function createCleaningExtraLine(partial = {}) {
  const service = getCleaningExtraServiceOption(partial.service || CLEANING_EXTRA_SERVICES[0].value);
  return {
    id: partial.id || crypto.randomUUID(),
    service: service.value,
    quantity: Number(partial.quantity) || 1,
    unitCost: Number.isFinite(Number(partial.unitCost)) ? Number(partial.unitCost) : service.defaultCost
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
  if (hash === "#cleaning-quote") {
    return "cleaning";
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
  if (hash === "#recycle") {
    return "recycle";
  }
  if (hash === "#settings") {
    return "settings";
  }
  return "builder";
}

function syncQuoteSubnav() {
  const currentHash = window.location.hash || "#quote-builder";
  const subnavView = currentHash === "#air-mode"
    ? "air"
    : currentHash === "#quote-preview"
      ? "preview"
      : "builder";

  els.quoteSubnavLinks.forEach((item) => {
    item.classList.toggle("active", item.dataset.quoteSubnav === subnavView);
  });
}

function syncOpsSubnav() {
  const currentHash = window.location.hash || "#quote-history";
  const subnavView = currentHash === "#invoices"
    ? "invoices"
    : currentHash === "#saved-invoices"
      ? "saved"
      : currentHash === "#recycle"
        ? "recycle"
        : currentHash === "#settings"
          ? "settings"
        : "history";

  els.opsSubnavLinks.forEach((item) => {
    item.classList.toggle("active", item.dataset.opsSubnav === subnavView);
  });
}

function syncPageNavigation() {
  const activePage = getActivePageFromHash();

  els.appPages.forEach((page) => {
    page.classList.toggle("app-page-active", page.dataset.page === activePage);
  });

  els.navItems.forEach((item) => {
    const href = item.getAttribute("href");
    const isQuotesMain = (activePage === "builder" || activePage === "airMode") && href === "#quote-builder";
    const isQuoteInvoiceMain = ["history", "invoices", "savedInvoices", "recycle", "settings"].includes(activePage) && href === "#quote-history";
    const isCleaningMain = activePage === "cleaning" && href === "#cleaning-quote";
    item.classList.toggle("active", isQuotesMain || isQuoteInvoiceMain || isCleaningMain);
  });

  syncQuoteSubnav();
  syncOpsSubnav();
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

function confirmAction(message) {
  return window.confirm(message);
}

function getLogoAssetUrl() {
  return new URL("./assets/eastern-home-service-logo.jpg", window.location.href).href;
}

function buildDocumentHeaderMarkup(title, subtitle = "") {
  return `
    <div class="print-header">
      <div class="print-brand-block">
        <img class="print-logo" src="${getLogoAssetUrl()}" alt="Eastern Home Service logo">
        <div class="print-brand-copy">
          <p class="print-brand-name">Eastern Home Service</p>
          <p class="print-brand-subtitle">${escapeHtml(subtitle || "One Call. All Sorted.")}</p>
        </div>
      </div>
      <div class="print-title-block">
        <h1>${escapeHtml(title)}</h1>
      </div>
    </div>
  `;
}

function getRecycleExpiryDate(value) {
  return addDaysToIsoDate(value, RECYCLE_RETENTION_DAYS);
}

function createRecycleEntry(itemType, payload) {
  const deletedAt = new Date().toISOString();
  const reference = itemType === "quote"
    ? (payload.quoteNumber || "Saved Quote")
    : (payload.invoiceNumber || "Saved Invoice");
  const customerName = itemType === "quote"
    ? (payload.customerName || "-")
    : (payload.customerName || "-");

  return {
    id: crypto.randomUUID(),
    itemType,
    reference,
    customerName,
    deletedAt,
    expiresAt: getRecycleExpiryDate(deletedAt),
    payload
  };
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
          <button class="danger-button" data-delete-photo="${photo.id}" type="button">Delete</button>
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
        recordType: record.recordType || "blinds-curtains",
        sector: record.sector || SECTOR_LABELS[record.recordType || "blinds-curtains"] || "General",
        submittedAt: record.submittedAt || new Date().toISOString(),
        customerName: record.customerName || "-",
        phone: record.phone || "-",
        address: record.address || "-",
        email: record.email || "",
        quoteNumber: record.quoteNumber || "-",
        totalQuote: record.totalQuote || formatCurrency(0),
        subtotalExGst: record.subtotalExGst || formatCurrency(0),
        gstTotal: record.gstTotal || formatCurrency(0),
        lastSentAt: record.lastSentAt || "",
        lastSentTo: record.lastSentTo || "",
        sendCount: Number(record.sendCount) || 0,
        blindCount: Number(record.blindCount) || 0,
        curtainCount: Number(record.curtainCount) || 0,
        sheerCount: Number(record.sheerCount) || 0,
        blindItems: Array.isArray(record.blindItems) ? record.blindItems : [],
        curtainItems: Array.isArray(record.curtainItems) ? record.curtainItems : [],
        cleaningSummary: record.cleaningSummary && typeof record.cleaningSummary === "object" ? record.cleaningSummary : null
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

function parseStoredRecycleBin(rawValue) {
  const parsed = JSON.parse(rawValue || "[]");
  return Array.isArray(parsed)
    ? parsed
        .filter((entry) => entry && typeof entry === "object" && entry.payload && typeof entry.payload === "object")
        .map((entry) => ({
          id: entry.id || crypto.randomUUID(),
          itemType: entry.itemType === "invoice" ? "invoice" : "quote",
          reference: entry.reference || (entry.itemType === "invoice" ? "Saved Invoice" : "Saved Quote"),
          customerName: entry.customerName || "-",
          deletedAt: entry.deletedAt || new Date().toISOString(),
          expiresAt: entry.expiresAt || getRecycleExpiryDate(entry.deletedAt || new Date().toISOString()),
          payload: entry.payload
        }))
    : [];
}

function persistRecycleBin() {
  try {
    localStorage.setItem(LOCAL_RECYCLE_BIN_KEY, JSON.stringify(state.recycleBin));
  } catch (error) {
    console.warn("Unable to persist recycle bin", error);
  }
}

function purgeExpiredRecycleItems() {
  const now = Date.now();
  const nextItems = state.recycleBin.filter((entry) => new Date(entry.expiresAt).getTime() > now);
  if (nextItems.length !== state.recycleBin.length) {
    state.recycleBin = nextItems;
    persistRecycleBin();
  }
}

function loadRecycleBin() {
  try {
    state.recycleBin = parseStoredRecycleBin(localStorage.getItem(LOCAL_RECYCLE_BIN_KEY));
  } catch (error) {
    state.recycleBin = [];
  }
  purgeExpiredRecycleItems();
}

function addToRecycleBin(itemType, payload) {
  state.recycleBin = [createRecycleEntry(itemType, payload), ...state.recycleBin];
  persistRecycleBin();
  renderRecycleBin();
}

function calculateCleaningBaseService() {
  const baseService = getCleaningBaseServiceOption(state.cleaning.baseService);
  const quantity = baseService.value === "standalone-carpet"
    ? Math.max(1, Number(state.cleaning.standaloneRooms) || 1)
    : 1;
  const rawCost = baseService.value === "standalone-carpet"
    ? Math.max(quantity * baseService.costPerRoom, baseService.minCharge || 0)
    : baseService.cost;
  const retailExGst = rawCost * 1.4;

  return {
    label: baseService.label,
    quantity,
    rawCost,
    retailExGst,
    lineTotal: retailExGst * (1 + state.gstRate),
    detail: baseService.value === "standalone-carpet"
      ? `${quantity} room${quantity === 1 ? "" : "s"} at ${formatCurrency(baseService.costPerRoom)} each (minimum ${formatCurrency(baseService.minCharge || 0)})`
      : "Apartment package pricing from subcontractor cost list"
  };
}

function calculateCleaningExtraLine(line) {
  const service = getCleaningExtraServiceOption(line.service);
  const quantity = Math.max(1, Number(line.quantity) || 1);
  const unitCost = Math.max(0, Number(line.unitCost) || 0);
  const costExGst = quantity * unitCost;
  const retailExGst = costExGst * 1.2;
  return {
    label: service.label,
    unit: service.unit,
    quantity,
    unitCost,
    costExGst,
    retailExGst,
    lineTotal: retailExGst * (1 + state.gstRate)
  };
}

function calculateCleaningTotals() {
  const base = calculateCleaningBaseService();
  const extras = state.cleaning.extras.map((line) => ({
    ...line,
    ...calculateCleaningExtraLine(line)
  }));
  const extrasCost = extras.reduce((sum, line) => sum + line.costExGst, 0);
  const extrasRetail = extras.reduce((sum, line) => sum + line.retailExGst, 0);
  const subtotalCost = base.rawCost + extrasCost;
  const subtotalRetail = base.retailExGst + extrasRetail;
  const costGst = subtotalCost * state.gstRate;
  const gst = subtotalRetail * state.gstRate;
  const totalCost = subtotalCost + costGst;
  const total = subtotalRetail + gst;
  const profit = subtotalRetail - subtotalCost;
  const profitPercent = subtotalRetail > 0 ? (profit / subtotalRetail) * 100 : 0;

  return {
    base,
    extras,
    extrasCost,
    extrasRetail,
    subtotalCost,
    subtotalRetail,
    costGst,
    gst,
    totalCost,
    total,
    profit,
    profitPercent
  };
}

function createCleaningRecordSnapshot() {
  ensureQuoteNumber();
  const totals = calculateCleaningTotals();

  return {
    id: crypto.randomUUID(),
    recordType: "cleaning",
    sector: SECTOR_LABELS.cleaning,
    submittedAt: new Date().toISOString(),
    customerName: state.customer.name || "-",
    phone: state.customer.phone || "-",
    address: state.customer.address || "-",
    email: state.customer.email || "",
    quoteNumber: state.customer.quoteNumber || "-",
    totalQuote: formatCurrency(totals.total),
    subtotalExGst: formatCurrency(totals.subtotalRetail),
    gstTotal: formatCurrency(totals.gst),
    lastSentAt: "",
    lastSentTo: "",
    sendCount: 0,
    blindCount: 0,
    curtainCount: 0,
    sheerCount: 0,
    blindItems: [],
    curtainItems: [],
    cleaningSummary: {
      baseServiceLabel: totals.base.label,
      baseDetail: totals.base.detail,
      baseCost: totals.base.rawCost,
      baseRetail: totals.base.retailExGst,
      extras: totals.extras.map((line) => ({
        service: line.label,
        unit: line.unit,
        quantity: line.quantity,
        unitCost: line.unitCost,
        costExGst: line.costExGst,
        retailExGst: line.retailExGst
      })),
      extrasCost: totals.extrasCost,
      extrasRetail: totals.extrasRetail,
      subtotalCost: totals.subtotalCost,
      subtotalRetail: totals.subtotalRetail,
      costGst: totals.costGst,
      gst: totals.gst,
      totalCost: totals.totalCost,
      total: totals.total,
      profit: totals.profit,
      profitPercent: totals.profitPercent
    }
  };
}

function createRecordSnapshot() {
  ensureQuoteNumber();
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
    recordType: "blinds-curtains",
    sector: SECTOR_LABELS["blinds-curtains"],
    submittedAt: new Date().toISOString(),
    customerName: state.customer.name || "-",
    phone: state.customer.phone || "-",
    address: state.customer.address || "-",
    email: state.customer.email || "",
    quoteNumber: state.customer.quoteNumber || "-",
    totalQuote: els.grandTotal.textContent,
    subtotalExGst: els.subtotalExGst.textContent,
    gstTotal: els.gstTotal.textContent,
    lastSentAt: "",
    lastSentTo: "",
    sendCount: 0,
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
          <button class="danger-button table-action-button" data-air-delete-photo="${photo.id}" type="button">Delete</button>
        </div>
      `;
      els.airPhotoGrid.appendChild(card);
    });
  }

  els.airPhotoCount.textContent = `${state.photos.length} photo${state.photos.length === 1 ? "" : "s"}`;
}

function renderCleaningQuote() {
  const baseOptions = CLEANING_BASE_SERVICES
    .map((service) => `<option value="${service.value}" ${service.value === state.cleaning.baseService ? "selected" : ""}>${service.label}</option>`)
    .join("");
  els.cleaningBaseService.innerHTML = baseOptions;
  const isStandalone = state.cleaning.baseService === "standalone-carpet";
  els.cleaningStandaloneFields.style.display = isStandalone ? "grid" : "none";
  els.cleaningStandaloneRooms.value = state.cleaning.standaloneRooms;

  els.cleaningExtrasBody.innerHTML = "";
  if (!state.cleaning.extras.length) {
    els.cleaningExtrasEmpty.style.display = "grid";
  } else {
    els.cleaningExtrasEmpty.style.display = "none";
    state.cleaning.extras.forEach((line) => {
      const computed = calculateCleaningExtraLine(line);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-label="Service">
          <select data-cleaning-extra-id="${line.id}" data-cleaning-extra-field="service">
            ${CLEANING_EXTRA_SERVICES.map((service) => `<option value="${service.value}" ${service.value === line.service ? "selected" : ""}>${service.label}</option>`).join("")}
          </select>
        </td>
        <td data-label="Qty"><input class="compact-input" data-cleaning-extra-id="${line.id}" data-cleaning-extra-field="quantity" type="number" min="1" step="1" value="${line.quantity}"></td>
        <td data-label="Unit">${escapeHtml(computed.unit)}</td>
        <td data-label="Cost"><input class="compact-input" data-cleaning-extra-id="${line.id}" data-cleaning-extra-field="unitCost" type="number" min="0" step="0.01" value="${line.unitCost}"></td>
        <td data-label="Retail">${formatCurrency(computed.retailExGst)}</td>
        <td data-label="Action"><button class="danger-button table-action-button" data-delete-cleaning-extra="${line.id}" type="button">Delete</button></td>
      `;
      els.cleaningExtrasBody.appendChild(row);
    });
  }

  const totals = calculateCleaningTotals();
  els.cleaningBaseCost.textContent = formatCurrency(totals.base.rawCost);
  els.cleaningBaseRetail.textContent = formatCurrency(totals.base.retailExGst);
  els.cleaningExtrasCost.textContent = formatCurrency(totals.extrasCost);
  els.cleaningExtrasRetail.textContent = formatCurrency(totals.extrasRetail);
  els.cleaningSubtotalCost.textContent = formatCurrency(totals.subtotalCost);
  els.cleaningSubtotalRetail.textContent = formatCurrency(totals.subtotalRetail);
  els.cleaningCostGst.textContent = formatCurrency(totals.costGst);
  els.cleaningGst.textContent = formatCurrency(totals.gst);
  els.cleaningTotalCost.textContent = formatCurrency(totals.totalCost);
  els.cleaningTotal.textContent = formatCurrency(totals.total);
  els.cleaningProfit.textContent = formatCurrency(totals.profit);
  els.cleaningProfitPercent.textContent = `${formatPercent(totals.profitPercent)} profit margin`;
}

function addCleaningExtraLine() {
  state.cleaning.extras.push(createCleaningExtraLine());
}

function setCleaningExtraValue(id, field, value) {
  state.cleaning.extras = state.cleaning.extras.map((line) => {
    if (line.id !== id) {
      return line;
    }

    if (field === "service") {
      const service = getCleaningExtraServiceOption(value);
      return {
        ...line,
        service: service.value,
        unitCost: service.defaultCost
      };
    }

    if (field === "quantity") {
      return { ...line, quantity: Math.max(1, Number(value) || 1) };
    }

    if (field === "unitCost") {
      return { ...line, unitCost: Math.max(0, Number(value) || 0) };
    }

    return line;
  });
}

function deleteCleaningExtraLine(id) {
  state.cleaning.extras = state.cleaning.extras.filter((line) => line.id !== id);
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

  ensureQuoteNumber();
  hydrateInputs();
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

async function submitCleaningQuoteRecord() {
  ensureQuoteNumber();
  hydrateInputs();
  const record = createCleaningRecordSnapshot();
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
    els.cleaningFeedback.textContent = "Cleaning quote saved to your cloud records.";
  } catch (error) {
    console.warn("Unable to sync cleaning quote record to cloud storage.", error);
    els.cleaningFeedback.textContent = "Cleaning quote saved locally. Cloud sync is unavailable right now.";
  }
}

async function deleteRecord(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record) {
    return;
  }

  const previousRecords = [...state.records];
  addToRecycleBin("quote", record);
  state.records = state.records.filter((item) => item.id !== id);
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
    state.recycleBin = state.recycleBin.filter((entry) => !(entry.itemType === "quote" && entry.payload.id === id));
    persistRecycleBin();
    renderRecycleBin();
    if (!state.selectedRecordId && previousRecords.length) {
      state.selectedRecordId = previousRecords[0].id;
    }
    persistRecords();
    renderRecords();
    els.copyFeedback.textContent = "Unable to delete the cloud record right now.";
    return;
  }

  els.copyFeedback.textContent = "Quote moved to recycle for 15 days.";
}

async function clearAllQuoteRecords() {
  const recordsToDelete = [...state.records];
  state.records = [];
  state.selectedRecordId = "";
  persistRecords();
  renderRecords();

  if (!recordsToDelete.length) {
    return { hadRemoteErrors: false, deletedCount: 0 };
  }

  const deleteResults = await Promise.allSettled(recordsToDelete.map((record) => (
    requestQuoteRecords(`?id=${encodeURIComponent(record.id)}`, {
      method: "DELETE"
    })
  )));

  return {
    hadRemoteErrors: deleteResults.some((result) => result.status === "rejected"),
    deletedCount: recordsToDelete.length
  };
}

function getSelectedRecord() {
  return state.records.find((record) => record.id === state.selectedRecordId) || null;
}

function getSelectedInvoice() {
  return state.invoices.find((invoice) => invoice.id === state.selectedInvoiceId) || null;
}

function applySendMetadata(item, recipient) {
  return {
    ...item,
    lastSentAt: new Date().toISOString(),
    lastSentTo: recipient,
    sendCount: (Number(item.sendCount) || 0) + 1
  };
}

function findRecordByQuoteNumber(recordType, quoteNumber) {
  return state.records.find((record) => (
    record.recordType === recordType && String(record.quoteNumber || "").trim() === String(quoteNumber || "").trim()
  )) || null;
}

async function saveQuoteRecord(record) {
  const existingRecord = record.id ? state.records.find((item) => item.id === record.id) : null;
  const nextRecord = {
    ...record,
    id: existingRecord?.id || record.id || crypto.randomUUID()
  };

  if (existingRecord) {
    state.records = state.records.map((item) => (item.id === nextRecord.id ? nextRecord : item));
  } else {
    state.records = [nextRecord, ...state.records.filter((item) => item.id !== nextRecord.id)];
  }

  state.selectedRecordId = nextRecord.id;
  persistRecords();
  renderRecords();

  try {
    const savedRecord = existingRecord
      ? await requestQuoteRecords(`?id=${encodeURIComponent(nextRecord.id)}`, {
          method: "PATCH",
          body: JSON.stringify(nextRecord)
        })
      : await requestQuoteRecords("", {
          method: "POST",
          body: JSON.stringify(nextRecord)
        });

    state.records = state.records.map((item) => (item.id === nextRecord.id ? savedRecord : item));
    state.selectedRecordId = savedRecord.id;
    persistRecords();
    renderRecords();
    return savedRecord;
  } catch (error) {
    console.warn("Unable to sync quote record update to cloud storage.", error);
    return nextRecord;
  }
}

function markInvoiceSent(invoiceId, recipient) {
  const sentAt = new Date().toISOString();
  state.invoices = state.invoices.map((invoice) => (
    invoice.id === invoiceId
      ? {
          ...invoice,
          status: "sent",
          lastSentAt: sentAt,
          lastSentTo: recipient,
          sendCount: (Number(invoice.sendCount) || 0) + 1
        }
      : invoice
  ));
  persistInvoices();
  renderInvoices();
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
  if (record.recordType === "cleaning" && record.cleaningSummary) {
    const extraCount = Array.isArray(record.cleaningSummary.extras) ? record.cleaningSummary.extras.length : 0;
    return `${record.cleaningSummary.baseServiceLabel}${extraCount ? ` + ${extraCount} extra service${extraCount === 1 ? "" : "s"}` : ""}`;
  }

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
    invoiceNumber: record.quoteNumber !== "-" ? record.quoteNumber : generateDocumentNumber(),
    sourceQuoteNumber: record.quoteNumber !== "-" ? record.quoteNumber : "",
    sector: record.sector || SECTOR_LABELS[record.recordType || "blinds-curtains"] || "General",
    customerName: record.customerName !== "-" ? record.customerName : "",
    customerPhone: record.phone !== "-" ? record.phone : "",
    customerAddress: record.address !== "-" ? record.address : "",
    customerEmail: record.email || "",
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
  ensureQuoteNumber();
  const totals = {
    subtotalExGst: parseCurrency(els.subtotalExGst.textContent),
    total: parseCurrency(els.grandTotal.textContent)
  };
  const invoice = createInvoice({
    invoiceNumber: state.customer.quoteNumber,
    sourceQuoteNumber: state.customer.quoteNumber,
    sector: SECTOR_LABELS["blinds-curtains"],
    customerName: state.customer.name,
    customerPhone: state.customer.phone,
    customerAddress: state.customer.address,
    customerEmail: state.customer.email,
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

function createInvoiceFromCurrentCleaningQuote() {
  ensureQuoteNumber();
  const totals = calculateCleaningTotals();
  const invoice = createInvoice({
    invoiceNumber: state.customer.quoteNumber,
    sourceQuoteNumber: state.customer.quoteNumber,
    sector: SECTOR_LABELS.cleaning,
    customerName: state.customer.name,
    customerPhone: state.customer.phone,
    customerAddress: state.customer.address,
    customerEmail: state.customer.email,
    notes: "Invoice created from the current cleaning quote.",
    lines: [
      createInvoiceLine({
        description: calculateCleaningBaseService().label,
        quantity: 1,
        unitPrice: totals.subtotalRetail,
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
  els.invoiceFeedback.textContent = "Invoice created from the current cleaning quote.";
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
  const invoice = state.invoices.find((item) => item.id === id);
  if (!invoice) {
    return;
  }

  addToRecycleBin("invoice", invoice);
  state.invoices = state.invoices.filter((item) => item.id !== id);
  if (state.selectedInvoiceId === id) {
    state.selectedInvoiceId = state.invoices[0]?.id || "";
  }
  persistInvoices();
  renderInvoices();
  els.invoiceFeedback.textContent = "Invoice moved to recycle for 15 days.";
}

async function recoverRecycleEntry(id) {
  const entry = state.recycleBin.find((item) => item.id === id);
  if (!entry) {
    return;
  }

  if (entry.itemType === "quote") {
    const restoredRecord = {
      ...entry.payload,
      submittedAt: entry.payload.submittedAt || new Date().toISOString()
    };
    state.records = [restoredRecord, ...state.records.filter((record) => record.id !== restoredRecord.id)];
    state.selectedRecordId = restoredRecord.id;
    persistRecords();
    renderRecords();

    try {
      const savedRecord = await requestQuoteRecords("", {
        method: "POST",
        body: JSON.stringify(restoredRecord)
      });
      state.records = state.records.map((record) => (record.id === restoredRecord.id ? savedRecord : record));
      state.selectedRecordId = savedRecord.id;
      persistRecords();
      renderRecords();
    } catch (error) {
      console.warn("Unable to restore cloud quote record.", error);
      els.recycleFeedback.textContent = "Quote recovered locally. Cloud sync is unavailable right now.";
    }
  } else {
    const restoredInvoice = createInvoice(entry.payload);
    state.invoices = [restoredInvoice, ...state.invoices.filter((invoice) => invoice.id !== restoredInvoice.id)];
    state.selectedInvoiceId = restoredInvoice.id;
    persistInvoices();
    renderInvoices();
  }

  state.recycleBin = state.recycleBin.filter((item) => item.id !== id);
  persistRecycleBin();
  renderRecycleBin();
  els.recycleFeedback.textContent = `${entry.itemType === "quote" ? "Quote" : "Invoice"} recovered.`;
}

function permanentlyDeleteRecycleEntry(id) {
  const entry = state.recycleBin.find((item) => item.id === id);
  if (!entry) {
    return;
  }

  state.recycleBin = state.recycleBin.filter((item) => item.id !== id);
  persistRecycleBin();
  renderRecycleBin();
  els.recycleFeedback.textContent = `${entry.itemType === "quote" ? "Quote" : "Invoice"} permanently deleted.`;
}

function buildQuotePrintMarkup() {
  const blindLines = state.lines.map((line, index) => {
    const computed = calculateBlindLine(line);
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(line.location || "Untitled Location")}</td>
        <td>Roller Blind</td>
        <td>${escapeHtml(String(evaluateCalculatorValue(line.width) || line.width || "-"))} x ${escapeHtml(String(evaluateCalculatorValue(line.height) || line.height || "-"))} mm</td>
        <td>${escapeHtml(SERVICE_TYPES.find((item) => item.value === line.serviceType)?.label || line.serviceType)}</td>
        <td>${formatCurrency(computed.lineTotal)}</td>
      </tr>
    `;
  }).join("");

  const curtainLines = state.curtainLines.map((line, index) => {
    const computed = calculateCurtainLine(line);
    return `
      <tr>
        <td>${state.lines.length + index + 1}</td>
        <td>${escapeHtml(line.location || "Untitled Location")}</td>
        <td>${escapeHtml(CURTAIN_PRODUCTS.find((item) => item.value === line.product)?.label || line.product)}</td>
        <td>${escapeHtml(String(evaluateCalculatorValue(line.width) || line.width || "-"))} x ${escapeHtml(String(evaluateCalculatorValue(line.drop) || line.drop || "-"))} mm</td>
        <td>${escapeHtml(line.material)} / ${escapeHtml(line.color)}</td>
        <td>${formatCurrency(computed.lineTotal)}</td>
      </tr>
    `;
  }).join("");

  return `
    ${buildDocumentHeaderMarkup("Quote", "One Call. All Sorted.")}
    <p><strong>Customer:</strong> ${escapeHtml(state.customer.name || "-")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(state.customer.phone || "-")}</p>
    <p><strong>Address:</strong> ${escapeHtml(state.customer.address || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(state.customer.email || "-")}</p>
    <p><strong>Quote Number:</strong> ${escapeHtml(state.customer.quoteNumber || "-")}</p>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Location</th>
          <th>Type</th>
          <th>Size</th>
          <th>Detail</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${blindLines}${curtainLines}</tbody>
    </table>
    <div class="totals">
      <p><strong>Subtotal Ex GST:</strong> ${els.subtotalExGst.textContent}</p>
      <p><strong>GST:</strong> ${els.gstTotal.textContent}</p>
      <p><strong>Total Incl GST:</strong> ${els.grandTotal.textContent}</p>
    </div>
  `;
}

function buildCleaningQuotePrintMarkup() {
  const totals = calculateCleaningTotals();
  const extrasRows = totals.extras.map((line, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(line.label)}</td>
      <td>${escapeHtml(String(line.quantity))}</td>
      <td>${escapeHtml(line.unit)}</td>
      <td>${formatCurrency(line.costExGst)}</td>
      <td>${formatCurrency(line.retailExGst)}</td>
    </tr>
  `).join("");

  return `
    ${buildDocumentHeaderMarkup("Cleaning Quote", "One Call. All Sorted.")}
    <p><strong>Customer:</strong> ${escapeHtml(state.customer.name || "-")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(state.customer.phone || "-")}</p>
    <p><strong>Address:</strong> ${escapeHtml(state.customer.address || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(state.customer.email || "-")}</p>
    <p><strong>Quote Number:</strong> ${escapeHtml(state.customer.quoteNumber || "-")}</p>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Detail</th>
          <th>Cost Ex GST</th>
          <th>Retail Ex GST</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Base Service</td>
          <td>${escapeHtml(totals.base.detail)}</td>
          <td>${formatCurrency(totals.base.rawCost)}</td>
          <td>${formatCurrency(totals.base.retailExGst)}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Additional Service</th>
          <th>Qty</th>
          <th>Unit</th>
          <th>Cost Ex GST</th>
          <th>Retail Ex GST</th>
        </tr>
      </thead>
      <tbody>${extrasRows || '<tr><td colspan="6">No additional services added.</td></tr>'}</tbody>
    </table>
    <div class="totals">
      <p><strong>Total Cost Incl GST:</strong> ${formatCurrency(totals.totalCost)}</p>
      <p><strong>Subtotal Ex GST:</strong> ${formatCurrency(totals.subtotalRetail)}</p>
      <p><strong>GST:</strong> ${formatCurrency(totals.gst)}</p>
      <p><strong>Total Incl GST:</strong> ${formatCurrency(totals.total)}</p>
    </div>
  `;
}

function buildInvoicePrintMarkup(invoice) {
  if (!invoice) {
    return "<p>No invoice selected.</p>";
  }

  const totals = calculateInvoiceTotals(invoice);
  const lineRows = invoice.lines.map((line, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(line.description || "-")}</td>
      <td>${escapeHtml(String(line.quantity))}</td>
      <td>${formatCurrency(line.unitPrice)}</td>
      <td>${Number(line.taxRate) === 0.1 ? "10% GST" : "No GST"}</td>
      <td>${formatCurrency(calculateInvoiceLineAmount(line))}</td>
    </tr>
  `).join("");

  return `
    ${buildDocumentHeaderMarkup(`Invoice ${invoice.invoiceNumber}`, "One Call. All Sorted.")}
    <p><strong>Customer:</strong> ${escapeHtml(invoice.customerName || "-")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(invoice.customerPhone || "-")}</p>
    <p><strong>Address:</strong> ${escapeHtml(invoice.customerAddress || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(invoice.customerEmail || "-")}</p>
    <p><strong>Quote Number:</strong> ${escapeHtml(invoice.sourceQuoteNumber || "-")}</p>
    <p><strong>Invoice Date:</strong> ${escapeHtml(invoice.invoiceDate || "-")}</p>
    <p><strong>Due Date:</strong> ${escapeHtml(invoice.dueDate || "-")}</p>
    <p><strong>Status:</strong> ${escapeHtml(formatInvoiceStatus(invoice.status))}</p>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Description</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Tax</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>${lineRows}</tbody>
    </table>
    <div class="totals">
      <p><strong>Subtotal:</strong> ${formatCurrency(totals.subtotal)}</p>
      <p><strong>GST:</strong> ${formatCurrency(totals.gst)}</p>
      <p><strong>Total:</strong> ${formatCurrency(totals.total)}</p>
      <p><strong>Amount Paid:</strong> ${formatCurrency(totals.amountPaid)}</p>
      <p><strong>Amount Due:</strong> ${formatCurrency(totals.amountDue)}</p>
    </div>
    <div class="notes">
      <p><strong>Notes / Terms:</strong></p>
      <p>${escapeHtml(invoice.notes || "-").replace(/\n/g, "<br>")}</p>
      <p><strong>Bank Details:</strong></p>
      <p>${escapeHtml(invoice.bankDetails || "-").replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

function openPrintDocument(title, bodyMarkup) {
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    return false;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${escapeHtml(title)}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; color: #111; background: #eef3f8; }
          .print-page { max-width: 980px; margin: 0 auto; background: #fff; min-height: 100vh; padding: 24px; }
          h1 { margin: 0; }
          p { margin: 6px 0; line-height: 1.45; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; vertical-align: top; }
          .totals, .notes { margin-top: 24px; }
          .print-toolbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: #0f1a25; color: #fff; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.16); }
          .print-toolbar button { border: none; border-radius: 999px; padding: 10px 16px; font-weight: 700; cursor: pointer; }
          .print-toolbar .primary { background: #1f7aec; color: #fff; }
          .print-toolbar .secondary { background: #dce7f5; color: #0b1117; }
          .print-toolbar span { opacity: 0.82; }
          .print-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 2px solid #d7e5f5; }
          .print-brand-block { display: flex; align-items: center; gap: 16px; }
          .print-logo { width: 110px; height: auto; display: block; }
          .print-brand-copy p { margin: 0; }
          .print-brand-name { font-size: 20px; font-weight: 800; color: #092654; }
          .print-brand-subtitle { margin-top: 6px; color: #236fcb; }
          .print-title-block { text-align: right; }
          @media print {
            body { background: #fff; }
            .print-toolbar { display: none; }
            .print-page { max-width: none; margin: 0; min-height: auto; padding: 18px; }
            .print-logo { width: 96px; }
          }
        </style>
      </head>
      <body>
        <div class="print-toolbar">
          <button class="primary" type="button" onclick="window.print()">Print / Save PDF</button>
          <button class="secondary" type="button" onclick="window.close()">Close</button>
          <span>Use your browser print dialog and choose "Save as PDF" to download.</span>
        </div>
        <div class="print-page">${bodyMarkup}</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  return true;
}

function getPdfFilename(title) {
  return `${String(title || "document").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "document"}.pdf`;
}

function downloadBlob(blob, filename) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

async function buildPdfBlob(title, bodyMarkup) {
  if (typeof html2pdf === "undefined") {
    throw new Error("PDF library is unavailable.");
  }

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = "900px";
  container.style.background = "#ffffff";
  container.innerHTML = `
    <div style="font-family: Arial, sans-serif; color: #111; background: #fff; padding: 24px;">
      ${bodyMarkup}
    </div>
  `;
  document.body.append(container);

  try {
    const worker = html2pdf().set({
      margin: 10,
      filename: getPdfFilename(title),
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }).from(container.firstElementChild).toPdf();

    const pdf = await worker.get("pdf");
    return pdf.output("blob");
  } finally {
    container.remove();
  }
}

async function sharePdfDocument(title, bodyMarkup) {
  const blob = await buildPdfBlob(title, bodyMarkup);
  const filename = getPdfFilename(title);
  const file = new File([blob], filename, { type: "application/pdf" });

  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      title,
      files: [file]
    });
    return { mode: "share" };
  }

  downloadBlob(blob, filename);
  return { mode: "download" };
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = String(reader.result || "");
      const [, base64 = ""] = result.split(",");
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error || new Error("Unable to encode attachment."));
    reader.readAsDataURL(blob);
  });
}

async function requestSendDocument(payload) {
  const response = await fetch(getSendDocumentEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Send request failed with status ${response.status}`);
  }

  return response.json();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function formatSendLog(item) {
  if (!item?.lastSentAt) {
    return "Not sent";
  }

  const recipient = String(item.lastSentTo || "").trim() || "Unknown recipient";
  const count = Math.max(1, Number(item.sendCount) || 1);
  return `${formatRecordDate(item.lastSentAt)} to ${recipient}${count > 1 ? ` (${count}x)` : ""}`;
}

function confirmDirectSend(documentLabel, recipient, amountText = "") {
  const recipientLabel = String(recipient || "").trim() || "no email";
  const amountLine = amountText ? `\nAmount: ${amountText}` : "";
  return confirmAction(`Send ${documentLabel} now?\nRecipient: ${recipientLabel}${amountLine}`);
}

function buildQuoteEmailContent() {
  const summary = buildOrderSummaryText({
    grandTotal: parseCurrency(els.grandTotal.textContent)
  });
  const subject = `${state.customer.quoteNumber || "Quote"} from Eastern Home Service`;
  const text = [
    `Hi ${summary.customerName},`,
    "",
    "Thank you for your enquiry with Eastern Home Service.",
    "",
    `${summary.quoteNumber} is attached as a PDF.`,
    `Order summary: ${summary.productSummary}`,
    `Total incl. GST: ${summary.totalText}`,
    "",
    "Please let us know if you would like to proceed.",
    "",
    "Kind regards,",
    "Eastern Home Service"
  ].join("\n");
  const html = `
    <p>Hi ${escapeHtml(summary.customerName)},</p>
    <p>Thank you for your enquiry with Eastern Home Service.</p>
    <p><strong>${escapeHtml(summary.quoteNumber)}</strong> is attached as a PDF.</p>
    <p>Order summary: ${escapeHtml(summary.productSummary)}<br>Total incl. GST: ${escapeHtml(summary.totalText)}</p>
    <p>Please let us know if you would like to proceed.</p>
    <p>Kind regards,<br>Eastern Home Service</p>
  `;

  return { subject, text, html };
}

function buildCleaningQuoteEmailContent() {
  const totals = calculateCleaningTotals();
  const subject = `${state.customer.quoteNumber || "Cleaning Quote"} from Eastern Home Service`;
  const text = [
    `Hi ${state.customer.name || "there"},`,
    "",
    "Thank you for your enquiry with Eastern Home Service.",
    "",
    `Quote ${state.customer.quoteNumber || ""} is attached as a PDF.`,
    `Service: ${totals.base.detail}`,
    `Total incl. GST: ${formatCurrency(totals.total)}`,
    "",
    "Please let us know if you would like to proceed.",
    "",
    "Kind regards,",
    "Eastern Home Service"
  ].join("\n");
  const html = `
    <p>Hi ${escapeHtml(state.customer.name || "there")},</p>
    <p>Thank you for your enquiry with Eastern Home Service.</p>
    <p><strong>Quote ${escapeHtml(state.customer.quoteNumber || "-")}</strong> is attached as a PDF.</p>
    <p>Service: ${escapeHtml(totals.base.detail)}<br>Total incl. GST: ${escapeHtml(formatCurrency(totals.total))}</p>
    <p>Please let us know if you would like to proceed.</p>
    <p>Kind regards,<br>Eastern Home Service</p>
  `;

  return { subject, text, html };
}

function buildInvoiceEmailContent(invoice) {
  const totals = calculateInvoiceTotals(invoice);
  const subject = `Invoice ${invoice.invoiceNumber} from Eastern Home Service`;
  const text = [
    `Hi ${invoice.customerName || "there"},`,
    "",
    `Invoice ${invoice.invoiceNumber} is attached as a PDF.`,
    `Amount due: ${formatCurrency(totals.amountDue)}`,
    `Due date: ${invoice.dueDate || "-"}`,
    "",
    "Please contact us if you need anything else.",
    "",
    "Kind regards,",
    "Eastern Home Service"
  ].join("\n");
  const html = `
    <p>Hi ${escapeHtml(invoice.customerName || "there")},</p>
    <p><strong>Invoice ${escapeHtml(invoice.invoiceNumber)}</strong> is attached as a PDF.</p>
    <p>Amount due: ${escapeHtml(formatCurrency(totals.amountDue))}<br>Due date: ${escapeHtml(invoice.dueDate || "-")}</p>
    <p>Please contact us if you need anything else.</p>
    <p>Kind regards,<br>Eastern Home Service</p>
  `;

  return { subject, text, html };
}

async function sendPdfEmail({ to, subject, bodyMarkup, fileTitle, html, text }) {
  const pdfBlob = await buildPdfBlob(fileTitle, bodyMarkup);
  const attachmentContent = await blobToBase64(pdfBlob);

  return requestSendDocument({
    to,
    subject,
    html,
    text,
    attachment: {
      filename: getPdfFilename(fileTitle),
      content: attachmentContent
    }
  });
}

async function openMailDraftWithPdf({ to, subject, text, bodyMarkup, fileTitle, feedbackElement }) {
  if (!isValidEmail(to)) {
    feedbackElement.textContent = "Enter a valid customer email first.";
    return;
  }

  try {
    const pdfBlob = await buildPdfBlob(fileTitle, bodyMarkup);
    const filename = getPdfFilename(fileTitle);
    downloadBlob(pdfBlob, filename);

    const draftBody = `${text}\n\nPDF download: ${filename}\nPlease attach the downloaded PDF before sending.`;
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draftBody)}`;
    window.location.href = mailtoUrl;
    feedbackElement.textContent = `Email draft opened and ${filename} downloaded for attachment.`;
  } catch (error) {
    console.warn("Unable to open email draft with PDF.", error);
    feedbackElement.textContent = error instanceof Error ? error.message : "Unable to open the email draft right now.";
  }
}

async function fallbackToMailDraft({
  to,
  subject,
  text,
  bodyMarkup,
  fileTitle,
  feedbackElement,
  failureMessage
}) {
  try {
    await openMailDraftWithPdf({
      to,
      subject,
      text,
      bodyMarkup,
      fileTitle,
      feedbackElement
    });
    feedbackElement.textContent = `${failureMessage} Opened your email draft instead.`;
  } catch (fallbackError) {
    console.warn("Unable to open fallback mail draft.", fallbackError);
    feedbackElement.textContent = failureMessage;
  }
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
      invoice.sector,
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
  els.invoiceCustomerEmail.value = fallbackInvoice.customerEmail || "";
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
      <td data-label="Sector">${escapeHtml(invoice.sector || "General")}</td>
      <td data-label="Customer">${escapeHtml(invoice.customerName || "-")}</td>
      <td data-label="Status"><span class="invoice-status-pill status-${invoice.status}">${formatInvoiceStatus(invoice.status)}</span></td>
      <td data-label="Due Date">${formatRecordDate(invoice.dueDate)}</td>
      <td data-label="Send Log">${escapeHtml(formatSendLog(invoice))}</td>
      <td data-label="Total">${formatCurrency(totals.total)}</td>
      <td data-label="Amount Due">${formatCurrency(totals.amountDue)}</td>
      <td data-label="Action" class="table-actions-cell">
        <button class="secondary-button table-action-button" data-edit-invoice="${invoice.id}" type="button">Edit</button>
        <button class="danger-button table-action-button" data-delete-invoice="${invoice.id}" type="button">Delete</button>
      </td>
    `;
    els.invoiceListBody.appendChild(row);
  });

  renderInvoiceEditor(getSelectedInvoice());
}

function renderRecycleBin() {
  purgeExpiredRecycleItems();
  els.recycleListBody.innerHTML = "";

  if (!state.recycleBin.length) {
    els.recycleListEmpty.style.display = "grid";
    return;
  }

  els.recycleListEmpty.style.display = "none";

  state.recycleBin.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Type">${entry.itemType === "quote" ? "Quote" : "Invoice"}</td>
      <td data-label="Reference"><strong>${escapeHtml(entry.reference)}</strong></td>
      <td data-label="Customer">${escapeHtml(entry.customerName || "-")}</td>
      <td data-label="Deleted">${formatRecordDate(entry.deletedAt)}</td>
      <td data-label="Expires">${formatRecordDate(entry.expiresAt)}</td>
      <td data-label="Action" class="table-actions-cell">
        <button class="secondary-button table-action-button" data-recover-recycle="${entry.id}" type="button">Recover</button>
        <button class="danger-button table-action-button" data-delete-recycle="${entry.id}" type="button">Permanent Delete</button>
      </td>
    `;
    els.recycleListBody.appendChild(row);
  });
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

  if (record.recordType === "cleaning" && record.cleaningSummary) {
    const extras = Array.isArray(record.cleaningSummary.extras) ? record.cleaningSummary.extras : [];
    const extraRows = extras.length
      ? extras.map((item, index) => `
        <tr>
          <td data-label="No.">${index + 1}</td>
          <td data-label="Service">${escapeHtml(item.service)}</td>
          <td data-label="Qty">${escapeHtml(String(item.quantity))}</td>
          <td data-label="Unit Cost">${formatCurrency(item.unitCost)}</td>
          <td data-label="Cost">${formatCurrency(item.costExGst)}</td>
          <td data-label="Retail">${formatCurrency(item.retailExGst)}</td>
        </tr>
      `).join("")
      : `
        <tr>
          <td colspan="6" class="detail-empty-cell">No additional cleaning services saved in this quote.</td>
        </tr>
      `;

    els.recordDetail.innerHTML = `
      <div class="record-detail-top">
        <div>
          <p class="section-kicker">Selected Cleaning Quote</p>
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
          <h3>Base Cleaning Service</h3>
          <p>${escapeHtml(record.cleaningSummary.baseDetail || "")}</p>
        </div>
        <div class="records-cleaning-base">
          <div><strong>Service:</strong> ${escapeHtml(record.cleaningSummary.baseServiceLabel)}</div>
          <div><strong>Cost:</strong> ${formatCurrency(record.cleaningSummary.baseCost)}</div>
          <div><strong>Retail:</strong> ${formatCurrency(record.cleaningSummary.baseRetail)}</div>
        </div>
      </div>
      <div class="record-detail-section">
        <div class="summary-table-head">
          <h3>Additional Services</h3>
          <p>Extra cleaning services priced from the subcontractor cost list.</p>
        </div>
        <div class="table-wrap">
          <table class="quote-table records-detail-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Service</th>
                <th>Qty</th>
                <th>Unit Cost</th>
                <th>Cost</th>
                <th>Retail</th>
              </tr>
            </thead>
            <tbody>${extraRows}</tbody>
          </table>
        </div>
      </div>
    `;
    return;
  }

  if ((record.recordType === "cleaning" || record.sector === SECTOR_LABELS.cleaning) && !record.cleaningSummary) {
    els.recordDetail.innerHTML = `
      <div class="record-detail-top">
        <div>
          <p class="section-kicker">Selected Cleaning Quote</p>
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
      <div class="record-detail-empty">
        This cleaning quote was saved before the full cleaning breakdown was added, so only the total summary is available here.
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
      <td data-label="Sector">${escapeHtml(record.sector || SECTOR_LABELS[record.recordType || "blinds-curtains"] || "General")}</td>
      <td data-label="Customer Detail">
        <button class="record-link-button" data-select-record="${record.id}" type="button">
          <strong>${escapeHtml(record.customerName)}</strong>
          <span>${escapeHtml(record.phone)}</span>
        </button>
      </td>
      <td data-label="Address">${escapeHtml(record.address)}</td>
      <td data-label="Saved">${formatRecordDate(record.submittedAt)}</td>
      <td data-label="Send Log">${escapeHtml(formatSendLog(record))}</td>
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

async function sendCurrentBlindCurtainQuote() {
  if (!state.lines.length && !state.curtainLines.length) {
    els.copyFeedback.textContent = "Add at least one blind, curtain, or sheer item before sending the quote.";
    return;
  }

  const recipient = String(state.customer.email || "").trim();
  if (!isValidEmail(recipient)) {
    els.copyFeedback.textContent = "Enter a valid customer email before sending the quote.";
    return;
  }

  if (!confirmDirectSend(`quote ${state.customer.quoteNumber || ""}`.trim(), recipient, els.grandTotal.textContent)) {
    els.copyFeedback.textContent = "Quote send cancelled.";
    return;
  }

  ensureQuoteNumber();
  hydrateInputs();
  const existingRecord = findRecordByQuoteNumber("blinds-curtains", state.customer.quoteNumber);
  const snapshot = createRecordSnapshot();
  const record = applySendMetadata({
    ...(existingRecord || snapshot),
    ...snapshot,
    id: existingRecord?.id || snapshot.id
  }, recipient);
  const emailContent = buildQuoteEmailContent();

  try {
    await sendPdfEmail({
      to: recipient,
      subject: emailContent.subject,
      bodyMarkup: buildQuotePrintMarkup(),
      fileTitle: `Quote ${state.customer.quoteNumber}`,
      html: emailContent.html,
      text: emailContent.text
    });
    await saveQuoteRecord(record);
    els.copyFeedback.textContent = `Quote sent to ${recipient}.`;
  } catch (error) {
    console.warn("Unable to send quote email.", error);
    const failureMessage = error instanceof Error ? error.message : "Unable to send the quote right now.";
    await fallbackToMailDraft({
      to: recipient,
      subject: emailContent.subject,
      text: emailContent.text,
      bodyMarkup: buildQuotePrintMarkup(),
      fileTitle: `Quote ${state.customer.quoteNumber}`,
      feedbackElement: els.copyFeedback,
      failureMessage
    });
  }
}

async function sendCurrentCleaningQuote() {
  const recipient = String(state.customer.email || "").trim();
  if (!isValidEmail(recipient)) {
    els.cleaningFeedback.textContent = "Enter a valid customer email before sending the quote.";
    return;
  }

  if (!confirmDirectSend(`cleaning quote ${state.customer.quoteNumber || ""}`.trim(), recipient, formatCurrency(calculateCleaningTotals().total))) {
    els.cleaningFeedback.textContent = "Quote send cancelled.";
    return;
  }

  ensureQuoteNumber();
  hydrateInputs();
  const existingRecord = findRecordByQuoteNumber("cleaning", state.customer.quoteNumber);
  const snapshot = createCleaningRecordSnapshot();
  const record = applySendMetadata({
    ...(existingRecord || snapshot),
    ...snapshot,
    id: existingRecord?.id || snapshot.id
  }, recipient);
  const emailContent = buildCleaningQuoteEmailContent();

  try {
    await sendPdfEmail({
      to: recipient,
      subject: emailContent.subject,
      bodyMarkup: buildCleaningQuotePrintMarkup(),
      fileTitle: `Cleaning Quote ${state.customer.quoteNumber}`,
      html: emailContent.html,
      text: emailContent.text
    });
    await saveQuoteRecord(record);
    els.cleaningFeedback.textContent = `Quote sent to ${recipient}.`;
  } catch (error) {
    console.warn("Unable to send cleaning quote email.", error);
    const failureMessage = error instanceof Error ? error.message : "Unable to send the cleaning quote right now.";
    await fallbackToMailDraft({
      to: recipient,
      subject: emailContent.subject,
      text: emailContent.text,
      bodyMarkup: buildCleaningQuotePrintMarkup(),
      fileTitle: `Cleaning Quote ${state.customer.quoteNumber}`,
      feedbackElement: els.cleaningFeedback,
      failureMessage
    });
  }
}

async function openCurrentBlindCurtainQuoteDraft() {
  if (!state.lines.length && !state.curtainLines.length) {
    els.copyFeedback.textContent = "Add at least one blind, curtain, or sheer item before opening the draft.";
    return;
  }

  ensureQuoteNumber();
  hydrateInputs();
  const recipient = String(state.customer.email || "").trim();
  const emailContent = buildQuoteEmailContent();
  await openMailDraftWithPdf({
    to: recipient,
    subject: emailContent.subject,
    text: emailContent.text,
    bodyMarkup: buildQuotePrintMarkup(),
    fileTitle: `Quote ${state.customer.quoteNumber}`,
    feedbackElement: els.copyFeedback
  });
}

async function openCurrentCleaningQuoteDraft() {
  ensureQuoteNumber();
  hydrateInputs();
  const recipient = String(state.customer.email || "").trim();
  const emailContent = buildCleaningQuoteEmailContent();
  await openMailDraftWithPdf({
    to: recipient,
    subject: emailContent.subject,
    text: emailContent.text,
    bodyMarkup: buildCleaningQuotePrintMarkup(),
    fileTitle: `Cleaning Quote ${state.customer.quoteNumber}`,
    feedbackElement: els.cleaningFeedback
  });
}

async function sendSelectedInvoice() {
  const invoice = getSelectedInvoice();
  if (!invoice) {
    els.invoiceFeedback.textContent = "Select an invoice first.";
    els.savedInvoiceFeedback.textContent = "Select an invoice first.";
    return;
  }

  const recipient = String(invoice.customerEmail || "").trim();
  if (!isValidEmail(recipient)) {
    els.invoiceFeedback.textContent = "Enter a valid customer email before sending the invoice.";
    els.savedInvoiceFeedback.textContent = "Enter a valid customer email before sending the invoice.";
    return;
  }

  if (!confirmDirectSend(`invoice ${invoice.invoiceNumber}`, recipient, formatCurrency(calculateInvoiceTotals(invoice).amountDue))) {
    els.invoiceFeedback.textContent = "Invoice send cancelled.";
    els.savedInvoiceFeedback.textContent = "Invoice send cancelled.";
    return;
  }

  const emailContent = buildInvoiceEmailContent(invoice);

  try {
    await sendPdfEmail({
      to: recipient,
      subject: emailContent.subject,
      bodyMarkup: buildInvoicePrintMarkup(invoice),
      fileTitle: `Invoice ${invoice.invoiceNumber}`,
      html: emailContent.html,
      text: emailContent.text
    });
    markInvoiceSent(invoice.id, recipient);
    els.invoiceFeedback.textContent = `Invoice sent to ${recipient}.`;
    els.savedInvoiceFeedback.textContent = `Invoice sent to ${recipient}.`;
  } catch (error) {
    console.warn("Unable to send invoice email.", error);
    const message = error instanceof Error ? error.message : "Unable to send the invoice right now.";
    await fallbackToMailDraft({
      to: recipient,
      subject: emailContent.subject,
      text: emailContent.text,
      bodyMarkup: buildInvoicePrintMarkup(invoice),
      fileTitle: `Invoice ${invoice.invoiceNumber}`,
      feedbackElement: els.invoiceFeedback,
      failureMessage: message
    });
    els.savedInvoiceFeedback.textContent = els.invoiceFeedback.textContent;
  }
}

async function openSelectedInvoiceDraft() {
  const invoice = getSelectedInvoice();
  if (!invoice) {
    els.invoiceFeedback.textContent = "Select an invoice first.";
    els.savedInvoiceFeedback.textContent = "Select an invoice first.";
    return;
  }

  const recipient = String(invoice.customerEmail || "").trim();
  const emailContent = buildInvoiceEmailContent(invoice);
  await openMailDraftWithPdf({
    to: recipient,
    subject: emailContent.subject,
    text: emailContent.text,
    bodyMarkup: buildInvoicePrintMarkup(invoice),
    fileTitle: `Invoice ${invoice.invoiceNumber}`,
    feedbackElement: els.invoiceFeedback
  });
  els.savedInvoiceFeedback.textContent = els.invoiceFeedback.textContent;
}

function renderAll() {
  renderBlindSummaryTable();
  renderCurtainSummaryTable();
  updateSummary();
  renderAirMode();
  renderCleaningQuote();
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

  els.cleaningBaseService.addEventListener("change", () => {
    state.cleaning.baseService = els.cleaningBaseService.value;
    renderCleaningQuote();
  });

  els.cleaningStandaloneRooms.addEventListener("input", () => {
    state.cleaning.standaloneRooms = Math.max(1, Number(els.cleaningStandaloneRooms.value) || 1);
    renderCleaningQuote();
  });

  els.addCleaningExtra.addEventListener("click", () => {
    addCleaningExtraLine();
    renderCleaningQuote();
  });

  els.saveCleaningQuote.addEventListener("click", async () => {
    await submitCleaningQuoteRecord();
  });

  els.sendCleaningQuote.addEventListener("click", async () => {
    await sendCurrentCleaningQuote();
  });

  els.draftCleaningQuote.addEventListener("click", async () => {
    await openCurrentCleaningQuoteDraft();
  });

  els.cleaningExtrasBody.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.cleaningExtraId && target.dataset.cleaningExtraField) {
      setCleaningExtraValue(target.dataset.cleaningExtraId, target.dataset.cleaningExtraField, target.value);
      renderCleaningQuote();
    }
  });

  els.cleaningExtrasBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.deleteCleaningExtra) {
      if (!confirmAction("Delete this cleaning extra service?")) {
        return;
      }
      deleteCleaningExtraLine(target.dataset.deleteCleaningExtra);
      renderCleaningQuote();
    }
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
      if (!confirmAction("Delete this photo?")) {
        return;
      }
      removePhoto(target.dataset.airDeletePhoto);
      renderAirMode();
      els.airFeedback.textContent = "Photo removed.";
    }
  });

  els.airItemsList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.airDeleteBlind) {
      if (!confirmAction("Delete this blind row?")) {
        return;
      }
      deleteBlindLine(target.dataset.airDeleteBlind);
      renderAll();
      return;
    }

    if (target.dataset.airDeleteCurtain) {
      if (!confirmAction("Delete this curtain or sheer row?")) {
        return;
      }
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
      if (!confirmAction("Delete this blind row?")) {
        return;
      }
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
      if (!confirmAction("Delete this curtain or sheer row?")) {
        return;
      }
      deleteCurtainLine(target.dataset.deleteCurtain);
      renderAll();
    }
  });

  els.photoGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.deletePhoto) {
      if (!confirmAction("Delete this photo?")) {
        return;
      }
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
      if (!confirmAction("Move this quote to recycle? You can recover it within 15 days.")) {
        return;
      }
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

  els.saveInvoice.addEventListener("click", () => {
    if (!getSelectedInvoice()) {
      createNewInvoice();
      return;
    }
    persistInvoices();
    renderInvoices();
    els.invoiceFeedback.textContent = "Invoice confirmed.";
  });

  els.previewInvoice.addEventListener("click", () => {
    const invoice = getSelectedInvoice();
    if (!invoice) {
      els.invoiceFeedback.textContent = "Select an invoice first.";
      return;
    }

    const opened = openPrintDocument(`Invoice ${invoice.invoiceNumber}`, buildInvoicePrintMarkup(invoice));
    els.invoiceFeedback.textContent = opened
      ? "Invoice preview opened in a new tab."
      : "Unable to open the preview window. Please allow pop-ups and try again.";
  });

  els.printInvoice.addEventListener("click", () => {
    const invoice = getSelectedInvoice();
    if (!invoice) {
      els.invoiceFeedback.textContent = "Select an invoice first.";
      return;
    }

    const opened = openPrintDocument(`Invoice ${invoice.invoiceNumber}`, buildInvoicePrintMarkup(invoice));
    els.invoiceFeedback.textContent = opened
      ? "Invoice document opened. Use Print / Save PDF in the new tab."
      : "Unable to open the print window. Please allow pop-ups and try again.";
  });

  els.shareInvoice.addEventListener("click", async () => {
    await sendSelectedInvoice();
  });

  els.draftInvoice.addEventListener("click", async () => {
    await openSelectedInvoiceDraft();
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

  els.settingsClearQuotes.addEventListener("click", async () => {
    if (!confirmAction("Clear all saved quotes? This will remove quote records from Search Quote.")) {
      return;
    }

    const result = await clearAllQuoteRecords();
    els.settingsFeedback.textContent = result.hadRemoteErrors
      ? "Saved quotes cleared locally. Some cloud quote records may need another sync to fully remove."
      : `Saved quotes cleared${result.deletedCount ? ` (${result.deletedCount})` : ""}.`;
  });

  els.settingsClearInvoices.addEventListener("click", () => {
    if (!confirmAction("Clear all saved invoices? This cannot be undone.")) {
      return;
    }

    state.invoices = [];
    state.selectedInvoiceId = "";
    persistInvoices();
    renderInvoices();
    els.settingsFeedback.textContent = "Saved invoices cleared.";
  });

  els.settingsClearRecycle.addEventListener("click", () => {
    if (!confirmAction("Clear everything in recycle? This cannot be undone.")) {
      return;
    }

    state.recycleBin = [];
    persistRecycleBin();
    renderRecycleBin();
    els.settingsFeedback.textContent = "Recycle bin cleared.";
  });

  els.savedPreviewInvoice.addEventListener("click", () => {
    const invoice = getSelectedInvoice();
    if (!invoice) {
      els.savedInvoiceFeedback.textContent = "Select an invoice first.";
      return;
    }

    const opened = openPrintDocument(`Invoice ${invoice.invoiceNumber}`, buildInvoicePrintMarkup(invoice));
    els.savedInvoiceFeedback.textContent = opened
      ? "Invoice preview opened in a new tab."
      : "Unable to open the preview window. Please allow pop-ups and try again.";
  });

  els.savedPrintInvoice.addEventListener("click", () => {
    const invoice = getSelectedInvoice();
    if (!invoice) {
      els.savedInvoiceFeedback.textContent = "Select an invoice first.";
      return;
    }

    const opened = openPrintDocument(`Invoice ${invoice.invoiceNumber}`, buildInvoicePrintMarkup(invoice));
    els.savedInvoiceFeedback.textContent = opened
      ? "Invoice document opened. Use Print / Save PDF in the new tab."
      : "Unable to open the print window. Please allow pop-ups and try again.";
  });

  els.savedShareInvoice.addEventListener("click", async () => {
    await sendSelectedInvoice();
  });

  els.savedDraftInvoice.addEventListener("click", async () => {
    await openSelectedInvoiceDraft();
  });

  els.invoiceListBody.addEventListener("click", (event) => {
    const target = event.target;
    const selectButton = target.closest("[data-select-invoice]");
    if (selectButton) {
      state.selectedInvoiceId = selectButton.dataset.selectInvoice;
      renderInvoices();
      return;
    }

    if (target.dataset.editInvoice) {
      state.selectedInvoiceId = target.dataset.editInvoice;
      renderInvoices();
      window.location.hash = "#invoices";
      syncPageNavigation();
      return;
    }

    if (target.dataset.deleteInvoice) {
      if (!confirmAction("Move this invoice to recycle? You can recover it within 15 days.")) {
        return;
      }
      deleteInvoice(target.dataset.deleteInvoice);
    }
  });

  els.recycleListBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.recoverRecycle) {
      recoverRecycleEntry(target.dataset.recoverRecycle);
      return;
    }

    if (target.dataset.deleteRecycle) {
      if (!confirmAction("Permanently delete this item from recycle? This cannot be undone.")) {
        return;
      }
      permanentlyDeleteRecycleEntry(target.dataset.deleteRecycle);
    }
  });

  els.addInvoiceLine.addEventListener("click", () => {
    addInvoiceLineToSelected();
  });

  [
    ["customerName", els.invoiceCustomerName],
    ["customerPhone", els.invoiceCustomerPhone],
    ["customerAddress", els.invoiceCustomerAddress],
    ["customerEmail", els.invoiceCustomerEmail],
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
      if (!confirmAction("Delete this invoice line?")) {
        return;
      }
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
    ["email", els.customerEmail],
    ["name", els.airCustomerName],
    ["phone", els.airCustomerPhone],
    ["address", els.airCustomerAddress],
    ["email", els.airCustomerEmail],
    ["name", els.cleaningCustomerName],
    ["phone", els.cleaningCustomerPhone],
    ["address", els.cleaningCustomerAddress],
    ["email", els.cleaningCustomerEmail]
  ].forEach(([field, element]) => {
    element.addEventListener("input", () => {
      state.customer[field] = element.value;
      hydrateInputs();
      updateSummary();
    });
  });

  els.printQuote.addEventListener("click", () => {
    const opened = openPrintDocument("Quote", buildQuotePrintMarkup());
    els.copyFeedback.textContent = opened
      ? "Quote document opened. Use Print / Save PDF in the new tab."
      : "Unable to open the print window. Please allow pop-ups and try again.";
  });

  els.submitQuote.addEventListener("click", () => {
    submitQuoteRecord();
  });

  els.sendQuote.addEventListener("click", async () => {
    await sendCurrentBlindCurtainQuote();
  });

  els.draftQuote.addEventListener("click", async () => {
    await openCurrentBlindCurtainQuoteDraft();
  });

  els.copyEmail.addEventListener("click", () => {
    copyText(els.emailDraft.value, "Email draft");
  });

  els.copyMessage.addEventListener("click", () => {
    copyText(els.messageDraft.value, "Message draft");
  });
}

function hydrateInputs() {
  ensureQuoteNumber();
  els.supplyMarkup.value = state.settings.supplyMarkup;
  els.curtainMarkup.value = state.settings.curtainMarkup;
  els.installCost.value = state.settings.installCost;
  els.installRetail.value = state.settings.installRetail;
  els.customerName.value = state.customer.name;
  els.customerPhone.value = state.customer.phone;
  els.customerAddress.value = state.customer.address;
  els.customerEmail.value = state.customer.email;
  els.quoteNumber.value = state.customer.quoteNumber;
  els.airCustomerName.value = state.customer.name;
  els.airCustomerPhone.value = state.customer.phone;
  els.airCustomerAddress.value = state.customer.address;
  els.airCustomerEmail.value = state.customer.email;
  els.airQuoteNumber.value = state.customer.quoteNumber;
  els.cleaningCustomerName.value = state.customer.name;
  els.cleaningCustomerPhone.value = state.customer.phone;
  els.cleaningCustomerAddress.value = state.customer.address;
  els.cleaningCustomerEmail.value = state.customer.email;
  els.cleaningQuoteNumber.value = state.customer.quoteNumber;
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
    loadRecycleBin();
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
    renderRecycleBin();
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
        localStorage.removeItem(LOCAL_RECYCLE_BIN_KEY);
      } catch (storageError) {
        console.warn("Unable to clear saved quote builder data during recovery.", storageError);
      }
      state.photos = [];
      state.records = [];
      state.invoices = [];
      state.recycleBin = [];
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
