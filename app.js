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
  curtainLines: []
};

let els = {};
let initRecoveryAttempted = false;

function cacheElements() {
  els = {
    blindsBody: document.querySelector("#blinds-body"),
    curtainsBody: document.querySelector("#curtains-body"),
    addLine: document.querySelector("#add-line"),
    addCurtainLine: document.querySelector("#add-curtain-line"),
    clearItems: document.querySelector("#clear-items"),
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
    itemSummaryList: document.querySelector("#item-summary-list"),
    itemSummaryEmpty: document.querySelector("#item-summary-empty"),
    recordsList: document.querySelector("#records-list"),
    recordEmpty: document.querySelector("#record-empty")
  };
}

function hasRequiredElements() {
  return Boolean(
    els.blindsBody &&
    els.curtainsBody &&
    els.addLine &&
    els.addCurtainLine &&
    els.clearItems &&
    els.resetQuote &&
    els.submitQuote &&
    els.printQuote
  );
}

function createLine() {
  return {
    id: crypto.randomUUID(),
    location: "Living room",
    group: "G2",
    width: 1200,
    height: 2100,
    serviceType: "supply-install"
  };
}

function createCurtainLine() {
  return {
    id: crypto.randomUUID(),
    location: "Master bedroom",
    product: "sheer",
    material: "Begonia",
    color: "Sand",
    width: 3000,
    drop: 2400,
    foldRate: 2.3,
    style: "S-Fold Metal Hook",
    stacking: "Side Open",
    sheerBottomStyle: "With Base Weight",
    blockoutLining: "No"
  };
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

function renderBlindsTable() {
  els.blindsBody.innerHTML = "";

  state.lines.forEach((line, index) => {
    const row = document.createElement("tr");
    const computed = calculateBlindLine(line);
    row.innerHTML = `
      <td data-label="No."><span class="table-badge">${index + 1}</span></td>
      <td data-label="Location"><input data-id="${line.id}" data-field="location" type="text" value="${line.location}" placeholder="Living room"></td>
      <td data-label="Setup">
        <select data-id="${line.id}" data-field="group">
          ${Object.entries(PRICING_TABLE.groups).map(([value, group]) => `<option value="${value}" ${line.group === value ? "selected" : ""}>${group.label}</option>`).join("")}
        </select>
      </td>
      <td data-label="Finish">
        <select data-id="${line.id}" data-field="serviceType">
          ${SERVICE_TYPES.map((type) => `<option value="${type.value}" ${line.serviceType === type.value ? "selected" : ""}>${type.label}</option>`).join("")}
        </select>
      </td>
      <td data-label="Width (mm)"><input class="compact-input" data-id="${line.id}" data-field="width" type="text" inputmode="numeric" value="${line.width}" placeholder="1200+50"></td>
      <td data-label="Height (mm)"><input class="compact-input" data-id="${line.id}" data-field="height" type="text" inputmode="numeric" value="${line.height}" placeholder="2100-20"></td>
      <td data-label="Details">
        ${computed.matchedWidth && computed.matchedDrop
          ? `<span class="table-badge">${computed.matchedWidth} x ${computed.matchedDrop}</span>`
          : `<span class="error-text">${computed.error || "Enter width and height."}</span>`}
      </td>
      <td data-label="Cost"><span class="table-value">${formatCurrency(computed.blindCostTotal)}</span></td>
      <td data-label="Retail"><span class="table-value">${formatCurrency(computed.lineTotal)}</span></td>
    `;
    els.blindsBody.appendChild(row);
  });
}

function renderCurtainsTable() {
  els.curtainsBody.innerHTML = "";

  state.curtainLines.forEach((line, index) => {
    const computed = calculateCurtainLine(line);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="No."><span class="table-badge">${index + 1}</span></td>
      <td data-label="Type">
        <select data-curtain-id="${line.id}" data-curtain-field="product">
          ${CURTAIN_PRODUCTS.map((type) => `<option value="${type.value}" ${line.product === type.value ? "selected" : ""}>${type.label}</option>`).join("")}
        </select>
      </td>
      <td data-label="Location"><input data-curtain-id="${line.id}" data-curtain-field="location" type="text" value="${line.location}" placeholder="Master bedroom"></td>
      <td data-label="Material / Fold">
        <div class="cell-stack">
          <select data-curtain-id="${line.id}" data-curtain-field="material">
            ${Object.keys(CURTAIN_MATERIALS).map((material) => `<option value="${material}" ${line.material === material ? "selected" : ""}>${material}</option>`).join("")}
          </select>
          <select data-curtain-id="${line.id}" data-curtain-field="foldRate">
            ${FOLD_RATES.map((rate) => `<option value="${rate}" ${Number(line.foldRate) === rate ? "selected" : ""}>x${rate}</option>`).join("")}
          </select>
        </div>
      </td>
      <td data-label="Color / Stacking">
        <div class="cell-stack">
          <select data-curtain-id="${line.id}" data-curtain-field="color">
            ${curtainColorOptions(line.material, line.color)}
          </select>
          <select data-curtain-id="${line.id}" data-curtain-field="stacking">
            ${STACKING_OPTIONS.map((stack) => `<option value="${stack}" ${line.stacking === stack ? "selected" : ""}>${stack}</option>`).join("")}
          </select>
        </div>
      </td>
      <td data-label="Width (mm)"><input class="compact-input" data-curtain-id="${line.id}" data-curtain-field="width" type="text" inputmode="numeric" value="${line.width}" placeholder="3000+200"></td>
      <td data-label="Drop (mm)"><input class="compact-input" data-curtain-id="${line.id}" data-curtain-field="drop" type="text" inputmode="numeric" value="${line.drop}" placeholder="2400-100"></td>
      <td data-label="Details">
        <div class="cell-stack">
          <select data-curtain-id="${line.id}" data-curtain-field="style">
            ${CURTAIN_STYLES.map((style) => `<option value="${style}" ${line.style === style ? "selected" : ""}>${style}</option>`).join("")}
          </select>
          <select data-curtain-id="${line.id}" data-curtain-field="sheerBottomStyle">
            ${SHEER_BOTTOM_STYLES.map((style) => `<option value="${style}" ${line.sheerBottomStyle === style ? "selected" : ""}>${style}</option>`).join("")}
          </select>
          <select data-curtain-id="${line.id}" data-curtain-field="blockoutLining">
            ${BLOCKOUT_OPTIONS.map((value) => `<option value="${value}" ${line.blockoutLining === value ? "selected" : ""}>${value}</option>`).join("")}
          </select>
        </div>
      </td>
      <td data-label="Cost"><span class="table-value">${formatCurrency(computed.costExGst)}</span></td>
      <td data-label="Retail"><span class="table-value">${formatCurrency(computed.lineTotal)}</span></td>
    `;
    els.curtainsBody.appendChild(row);
  });
}

function renderItemSummary() {
  els.itemSummaryList.innerHTML = "";
  const items = [
    ...state.lines.map((line) => ({ kind: "blind", line })),
    ...state.curtainLines.map((line) => ({ kind: "curtain", line }))
  ];

  if (!items.length) {
    els.itemSummaryList.appendChild(els.itemSummaryEmpty);
    return;
  }

  items.forEach(({ kind, line }, index) => {
    const card = document.createElement("article");
    card.className = "item-summary-card";

    if (kind === "blind") {
      const computed = calculateBlindLine(line);
      card.innerHTML = `
        <h3>${index + 1}. Roller Blind - ${line.location || "Untitled Location"}</h3>
        <p>Group: ${PRICING_TABLE.groups[line.group]?.label || line.group}</p>
        <p>Size: ${evaluateCalculatorValue(line.width) || line.width}w x ${evaluateCalculatorValue(line.height) || line.height}h mm</p>
        <p>Service: ${SERVICE_TYPES.find((item) => item.value === line.serviceType)?.label || line.serviceType}</p>
        <p>Matched table: ${computed.matchedWidth && computed.matchedDrop ? `${computed.matchedWidth} x ${computed.matchedDrop}` : "-"}</p>
        <p>Cost: ${formatCurrency(computed.blindCostTotal)} | Retail: ${formatCurrency(computed.lineTotal)}</p>
      `;
    } else {
      const computed = calculateCurtainLine(line);
      card.innerHTML = `
        <h3>${index + 1}. ${CURTAIN_PRODUCTS.find((item) => item.value === line.product)?.label || line.product} - ${line.location || "Untitled Location"}</h3>
        <p>Material: ${line.material} | Color: ${line.color}</p>
        <p>Size: ${evaluateCalculatorValue(line.width) || line.width}w x ${evaluateCalculatorValue(line.drop) || line.drop}d mm</p>
        <p>Fold rate: x${line.foldRate} | Style: ${line.style}</p>
        <p>Stacking: ${line.stacking} | Sheer Bottom: ${line.sheerBottomStyle} | Blockout Lining: ${line.blockoutLining}</p>
        <p>Cost: ${formatCurrency(computed.costExGst)} | Retail: ${formatCurrency(computed.lineTotal)}</p>
      `;
    }

    els.itemSummaryList.appendChild(card);
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
    localStorage.setItem("ehs-house-photos", JSON.stringify(state.photos));
  } catch (error) {
    console.warn("Unable to persist photos", error);
  }
}

function loadPhotos() {
  try {
    const saved = localStorage.getItem("ehs-house-photos");
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

function persistRecords() {
  try {
    localStorage.setItem("ehs-dimension-records", JSON.stringify(state.records));
  } catch (error) {
    console.warn("Unable to persist records", error);
  }
}

function loadRecords() {
  try {
    const saved = localStorage.getItem("ehs-dimension-records");
    const parsed = saved ? JSON.parse(saved) : [];
    state.records = Array.isArray(parsed)
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
  } catch (error) {
    state.records = [];
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
    blindItems,
    curtainItems
  };
}

function submitQuoteRecord() {
  const record = createRecordSnapshot();
  state.records = [record, ...state.records];
  persistRecords();
  renderRecords();
  els.copyFeedback.textContent = "Quote submitted to Dimension Records.";
  document.querySelector("#dimension-records")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteRecord(id) {
  state.records = state.records.filter((record) => record.id !== id);
  persistRecords();
  renderRecords();
}

function renderRecords() {
  els.recordsList.innerHTML = "";

  if (!state.records.length) {
    els.recordsList.appendChild(els.recordEmpty);
    return;
  }

  state.records.forEach((record) => {
    const blindItems = Array.isArray(record.blindItems) ? record.blindItems : [];
    const curtainItems = Array.isArray(record.curtainItems) ? record.curtainItems : [];
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <div class="record-top">
        <div>
          <h3>${record.customerName}</h3>
          <p>${record.quoteNumber !== "-" ? `Quote ${record.quoteNumber}` : "Submitted quote"}</p>
        </div>
        <strong>${record.totalQuote}</strong>
      </div>
      <div class="record-meta">
        <span>${new Date(record.submittedAt).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}</span>
        <span>${record.phone}</span>
        <span>${record.address}</span>
      </div>
      <div class="record-grid">
        <section class="record-section">
          <h4>Roller Blinds</h4>
          ${blindItems.length ? `
            <div class="record-lines">
              ${blindItems.map((item) => `
                <div class="record-line">
                  <strong>${item.location}</strong>
                  <p>${item.group} | ${item.width}w x ${item.height}h | ${item.serviceType}</p>
                  <p>Matched table: ${item.matchedSize}</p>
                </div>
              `).join("")}
            </div>
          ` : `<p>No roller blinds saved in this quote.</p>`}
        </section>
        <section class="record-section">
          <h4>Curtains & Sheers</h4>
          ${curtainItems.length ? `
            <div class="record-lines">
              ${curtainItems.map((item) => `
                <div class="record-line">
                  <strong>${item.location}</strong>
                  <p>${item.product} | ${item.width}w x ${item.drop}d mm</p>
                  <p>${item.style} | ${item.stacking}</p>
                </div>
              `).join("")}
            </div>
          ` : `<p>No curtains or sheers saved in this quote.</p>`}
        </section>
      </div>
      <div class="record-actions">
        <button class="danger-button" data-delete-record="${record.id}" type="button">Delete Record</button>
      </div>
    `;

    els.recordsList.appendChild(card);
  });
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
  renderBlindsTable();
  renderCurtainsTable();
  renderItemSummary();
  updateSummary();
}

function bindEvents() {
  els.addLine.addEventListener("click", () => {
    state.lines.push(createLine());
    renderAll();
  });

  els.addCurtainLine.addEventListener("click", () => {
    state.curtainLines.push(createCurtainLine());
    renderAll();
  });

  els.blindsBody.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.id && target.dataset.field) {
      setBlindValue(target.dataset.id, target.dataset.field, target.value);
      updateSummary();
    }
  });

  els.blindsBody.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.id && target.dataset.field) {
      setBlindValue(target.dataset.id, target.dataset.field, target.value);
      if (target.dataset.field === "width" || target.dataset.field === "height") {
        setBlindValue(target.dataset.id, target.dataset.field, normalizeCalculatorField(target.value));
      }
      renderAll();
    }
  });

  els.curtainsBody.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.curtainId && target.dataset.curtainField) {
      setCurtainValue(target.dataset.curtainId, target.dataset.curtainField, target.value);
      updateSummary();
    }
  });

  els.curtainsBody.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.curtainId && target.dataset.curtainField) {
      setCurtainValue(target.dataset.curtainId, target.dataset.curtainField, target.value);
      if (target.dataset.curtainField === "width" || target.dataset.curtainField === "drop") {
        setCurtainValue(target.dataset.curtainId, target.dataset.curtainField, normalizeCalculatorField(target.value));
      }
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

  els.clearItems.addEventListener("click", () => {
    state.lines = [];
    state.curtainLines = [];
    renderAll();
  });

  els.recordsList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.deleteRecord) {
      deleteRecord(target.dataset.deleteRecord);
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
    ["quoteNumber", els.quoteNumber]
  ].forEach(([field, element]) => {
    element.addEventListener("input", () => {
      state.customer[field] = element.value;
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
    state.lines = [createLine()];
    state.curtainLines = [createCurtainLine()];
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
}

function init() {
  try {
    cacheElements();
    if (!hasRequiredElements()) {
      console.error("Quote builder failed to initialize because required controls were not found.");
      return;
    }

    loadPhotos();
    loadRecords();
    state.lines = [createLine()];
    state.curtainLines = [createCurtainLine()];
    hydrateInputs();
    bindEvents();
    renderPhotos();
    renderRecords();
    renderAll();
  } catch (error) {
    console.error("Quote builder failed to initialize.", error);
    if (!initRecoveryAttempted) {
      initRecoveryAttempted = true;
      try {
        localStorage.removeItem("ehs-house-photos");
        localStorage.removeItem("ehs-dimension-records");
      } catch (storageError) {
        console.warn("Unable to clear saved quote builder data during recovery.", storageError);
      }
      state.photos = [];
      state.records = [];
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
