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

const SERVICE_TYPES = [
  { value: "supply-install", label: "Supply + Install" },
  { value: "supply-only", label: "Supply Only" }
];

const state = {
  gstRate: 0.1,
  settings: {
    supplyMarkup: 40,
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
  lines: []
};

const els = {
  lines: document.querySelector("#quote-lines"),
  addLine: document.querySelector("#add-line"),
  resetQuote: document.querySelector("#reset-quote"),
  printQuote: document.querySelector("#print-quote"),
  supplyMarkup: document.querySelector("#supply-markup"),
  installCost: document.querySelector("#install-cost"),
  installRetail: document.querySelector("#install-retail"),
  customerName: document.querySelector("#customer-name"),
  customerPhone: document.querySelector("#customer-phone"),
  customerAddress: document.querySelector("#customer-address"),
  quoteNumber: document.querySelector("#quote-number"),
  housePhotos: document.querySelector("#house-photos"),
  photoGrid: document.querySelector("#photo-grid"),
  photoEmpty: document.querySelector("#photo-empty"),
  photoCount: document.querySelector("#photo-count"),
  widthGuide: document.querySelector("#width-guide"),
  dropGuide: document.querySelector("#drop-guide"),
  materialsCostTotal: document.querySelector("#materials-cost-total"),
  supplyRetailTotal: document.querySelector("#supply-retail-total"),
  installCostTotal: document.querySelector("#install-cost-total"),
  installRetailTotal: document.querySelector("#install-retail-total"),
  subtotalExGst: document.querySelector("#subtotal-ex-gst"),
  gstTotal: document.querySelector("#gst-total"),
  grandTotal: document.querySelector("#grand-total"),
  grossProfit: document.querySelector("#gross-profit"),
  profitPercent: document.querySelector("#profit-percent"),
  profitExplainer: document.querySelector("#profit-explainer"),
  previewQuoteNumber: document.querySelector("#preview-quote-number"),
  previewDate: document.querySelector("#preview-date"),
  previewCustomer: document.querySelector("#preview-customer"),
  previewPhone: document.querySelector("#preview-phone"),
  previewAddress: document.querySelector("#preview-address"),
  previewPhotos: document.querySelector("#preview-photos"),
  previewLines: document.querySelector("#preview-lines"),
  previewSubtotal: document.querySelector("#preview-subtotal"),
  previewGst: document.querySelector("#preview-gst"),
  previewTotal: document.querySelector("#preview-total")
};

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

function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD"
  }).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(1)}%`;
}

function findBracket(value, list) {
  const numericValue = Number(value);
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

function calculateLine(line) {
  const quote = lookupBlindCost(line);
  const supplyUnitRetail = quote.cost * (1 + state.settings.supplyMarkup / 100);
  const installUnitRetail = line.serviceType === "supply-install" ? state.settings.installRetail : 0;
  const installUnitCost = line.serviceType === "supply-install" ? state.settings.installCost : 0;
  const lineSubtotalExGst = supplyUnitRetail + installUnitRetail;
  const lineGst = lineSubtotalExGst * state.gstRate;

  return {
    ...quote,
    supplyUnitRetail,
    installUnitRetail,
    installUnitCost,
    blindCostTotal: quote.cost,
    supplyRetailTotal: supplyUnitRetail,
    installRetailTotal: installUnitRetail,
    installCostTotal: installUnitCost,
    lineSubtotalExGst,
    lineGst,
    lineTotal: lineSubtotalExGst + lineGst
  };
}

function renderTable() {
  els.lines.innerHTML = "";

  state.lines.forEach((line, index) => {
    const computed = calculateLine(line);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><span class="table-badge">${index + 1}</span></td>
      <td><input data-id="${line.id}" data-field="location" type="text" value="${line.location}" placeholder="Living room"></td>
      <td>
        <select data-id="${line.id}" data-field="group">
          ${Object.entries(PRICING_TABLE.groups)
            .map(([value, group]) => `<option value="${value}" ${line.group === value ? "selected" : ""}>${group.label}</option>`)
            .join("")}
        </select>
      </td>
      <td><input class="compact-input" data-id="${line.id}" data-field="width" type="number" min="1" step="1" value="${line.width}" placeholder="1200"></td>
      <td><input class="compact-input" data-id="${line.id}" data-field="height" type="number" min="1" step="1" value="${line.height}" placeholder="2100"></td>
      <td>
        <select data-id="${line.id}" data-field="serviceType">
          ${SERVICE_TYPES.map((type) => `<option value="${type.value}" ${line.serviceType === type.value ? "selected" : ""}>${type.label}</option>`).join("")}
        </select>
      </td>
      <td>
        ${computed.matchedWidth && computed.matchedDrop
          ? `<span class="table-badge">${computed.matchedWidth} x ${computed.matchedDrop}</span>`
          : `<span class="error-text">${computed.error || "Enter width and height."}</span>`}
      </td>
      <td><span class="table-value">${formatCurrency(computed.cost)}</span></td>
      <td><span class="table-value">${formatCurrency(computed.lineTotal)}</span></td>
      <td><button class="danger-button" data-delete="${line.id}" type="button">×</button></td>
    `;

    els.lines.appendChild(row);
  });

  updateSummary();
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
          <button class="danger-button" data-delete-photo="${photo.id}" type="button">×</button>
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
    state.photos = saved ? JSON.parse(saved) : [];
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
    updateSummary();
  });
}

function removePhoto(id) {
  state.photos = state.photos.filter((photo) => photo.id !== id);
  persistPhotos();
  renderPhotos();
  updateSummary();
}

function setLineValue(id, field, value) {
  state.lines = state.lines.map((line) => {
    if (line.id !== id) {
      return line;
    }

    return {
      ...line,
      [field]: field === "width" || field === "height"
        ? value === "" ? "" : Number(value)
        : value
    };
  });
}

function updateSummary() {
  const totals = state.lines.reduce((acc, line) => {
    const computed = calculateLine(line);
    acc.materialsCostTotal += computed.blindCostTotal;
    acc.supplyRetailTotal += computed.supplyRetailTotal;
    acc.installCostTotal += computed.installCostTotal;
    acc.installRetailTotal += computed.installRetailTotal;
    acc.subtotalExGst += computed.lineSubtotalExGst;
    acc.gstTotal += computed.lineGst;
    acc.grandTotal += computed.lineTotal;
    return acc;
  }, {
    materialsCostTotal: 0,
    supplyRetailTotal: 0,
    installCostTotal: 0,
    installRetailTotal: 0,
    subtotalExGst: 0,
    gstTotal: 0,
    grandTotal: 0
  });

  const grossProfit = (totals.supplyRetailTotal + totals.installRetailTotal) - (totals.materialsCostTotal + totals.installCostTotal);
  const profitPercent = totals.grandTotal > 0 ? (grossProfit / totals.grandTotal) * 100 : 0;

  els.materialsCostTotal.textContent = formatCurrency(totals.materialsCostTotal);
  els.supplyRetailTotal.textContent = formatCurrency(totals.supplyRetailTotal);
  els.installCostTotal.textContent = formatCurrency(totals.installCostTotal);
  els.installRetailTotal.textContent = formatCurrency(totals.installRetailTotal);
  els.subtotalExGst.textContent = formatCurrency(totals.subtotalExGst);
  els.gstTotal.textContent = formatCurrency(totals.gstTotal);
  els.grandTotal.textContent = formatCurrency(totals.grandTotal);
  els.grossProfit.textContent = formatCurrency(grossProfit);
  els.profitPercent.textContent = `${formatPercent(profitPercent)} profit margin`;
  els.profitExplainer.textContent = "Gross profit = supply retail + install retail - blind cost - install cost baseline.";

  syncPreview(totals);
}

function syncPreview(totals) {
  els.previewQuoteNumber.textContent = `Quote: ${state.customer.quoteNumber || "Draft"}`;
  els.previewDate.textContent = new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  els.previewCustomer.textContent = `Customer: ${state.customer.name || "-"}`;
  els.previewPhone.textContent = `Phone: ${state.customer.phone || "-"}`;
  els.previewAddress.textContent = `Address: ${state.customer.address || "-"}`;
  els.previewPhotos.textContent = `House photos: ${state.photos.length}`;
  els.previewSubtotal.textContent = formatCurrency(totals.subtotalExGst);
  els.previewGst.textContent = formatCurrency(totals.gstTotal);
  els.previewTotal.textContent = formatCurrency(totals.grandTotal);

  els.previewLines.innerHTML = "";

  if (!state.lines.length) {
    els.previewLines.innerHTML = `<span class="error-text">Add a blind line item to build the quote.</span>`;
    return;
  }

  state.lines.forEach((line, index) => {
    const computed = calculateLine(line);
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
}

function updateLine(id, field, value) {
  setLineValue(id, field, value);
  renderTable();
}

function removeLine(id) {
  state.lines = state.lines.filter((line) => line.id !== id);

  if (!state.lines.length) {
    state.lines.push(createLine());
  }

  renderTable();
}

function bindEvents() {
  els.addLine.addEventListener("click", () => {
    state.lines.push(createLine());
    renderTable();
  });

  els.lines.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.id && target.dataset.field) {
      if (target.dataset.field === "width" || target.dataset.field === "height") {
        setLineValue(target.dataset.id, target.dataset.field, target.value);
        updateSummary();
        return;
      }

      updateLine(target.dataset.id, target.dataset.field, target.value);
    }
  });

  els.lines.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.id && target.dataset.field) {
      updateLine(target.dataset.id, target.dataset.field, target.value);
    }
  });

  els.lines.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.delete) {
      removeLine(target.dataset.delete);
    }
  });

  els.photoGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.deletePhoto) {
      removePhoto(target.dataset.deletePhoto);
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
    ["installCost", els.installCost],
    ["installRetail", els.installRetail]
  ].forEach(([field, element]) => {
    element.addEventListener("input", () => {
      state.settings[field] = Number(element.value) || 0;
      renderTable();
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
    hydrateInputs();
    renderTable();
    renderPhotos();
  });

  els.printQuote.addEventListener("click", () => {
    window.print();
  });
}

function hydrateInputs() {
  els.supplyMarkup.value = state.settings.supplyMarkup;
  els.installCost.value = state.settings.installCost;
  els.installRetail.value = state.settings.installRetail;
  els.customerName.value = state.customer.name;
  els.customerPhone.value = state.customer.phone;
  els.customerAddress.value = state.customer.address;
  els.quoteNumber.value = state.customer.quoteNumber;
}

function init() {
  loadPhotos();
  state.lines = [createLine()];
  els.widthGuide.textContent = PRICING_TABLE.widths.map((value) => `${value}mm`).join(", ");
  els.dropGuide.textContent = PRICING_TABLE.drops.map((value) => `${value}mm`).join(", ");
  hydrateInputs();
  bindEvents();
  renderTable();
  renderPhotos();
}

init();
