// js/app.js

// ---------- UTILITIES ----------

function formatPrice(num) {
  return `$${num.toFixed(2)}`;
}

function createTagElements(item) {
  const tags = [];

  if (item.glutenFree) tags.push("Gluten-free");
  if (item.type === "bar") tags.push("Bar / loaf");
  if (item.type === "mini") tags.push("Mini");
  if (item.type === "box") tags.push("Box");
  if (item.tags) tags.push(...item.tags);

  // de-dupe
  return [...new Set(tags)];
}

// ---------- SODA DATA ----------

const SODA_ITEMS = [
  {
    name: "Coconut Cove",
    price: 2.75,
    description: "Coke + coconut + fresh lime + cream."
  },
  {
    name: "The Study Buddy",
    price: 2.75,
    description: "Dr Pepper + raspberry + vanilla + cream."
  },
  {
    name: "BY-Who?",
    price: 2.75,
    description: "Mountain Dew + passionfruit + mango + fresh lime."
  },
  {
    name: "Idaho Sunset",
    price: 2.75,
    description: "Sprite + peach + strawberry purée + cream."
  },
  {
    name: "The Cottage Classic",
    price: 2.75,
    description: "Coke + cherry + vanilla + cream."
  },
  {
    name: "Midnight Oil",
    price: 3.0,
    description: "Cola + black cherry + coconut + cream."
  },
  {
    name: "Eternal Winter",
    price: 3.0,
    description: "Sprite + blue raspberry + coconut + whipped cream."
  },
  {
    name: "Dew Drop Dream",
    price: 3.0,
    description: "Mountain Dew + strawberry + kiwi + cream."
  },
  {
    name: "The Freshman 15",
    price: 3.0,
    description: "Root Beer + caramel + toasted marshmallow + heavy cream."
  },
  {
    name: "Gamma Burst (Energy)",
    price: 3.25,
    description: "Energy base + green apple + kiwi + fresh lime."
  },
  {
    name: "Pineapple Reactor (Energy)",
    price: 3.25,
    description: "Energy + pineapple + coconut + cream."
  },
  {
    name: "Gold Rush (Energy)",
    price: 3.25,
    description: "Energy + peach + strawberry purée + cream."
  },
  {
    name: "Warm Caramel Cottage Cider",
    price: 3.25,
    description: "Hot apple cider + caramel + whipped cream."
  },
  {
    name: "Toasty Vanilla Root Beer",
    price: 3.0,
    description: "Heated Root Beer + vanilla cream."
  },
  {
    name: "Sugar Cookie White Cocoa",
    price: 3.25,
    description: "White hot chocolate + almond + vanilla + whipped cream + sugar cookie crumble."
  },
  {
    name: "Fresh Squeeze Twist (Lighter)",
    price: 2.75,
    description: "Sprite Zero + fresh lime + fresh orange + sugar-free coconut."
  },
  {
    name: "Berry Breeze (Lighter)",
    price: 2.75,
    description: "Sparkling water + sugar-free raspberry + sugar-free vanilla."
  },
  {
    name: "CottageClean (Lighter)",
    price: 2.5,
    description: "Filtered sparkling water + lemon + mint + light sweetener."
  }
];

// ---------- MENU RENDERING (COOKIES / BARS / MINIS / BOXES) ----------

function renderMenu(items) {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `<p>No cookies match that search (tragic). Try another flavor or remove filters.</p>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const header = document.createElement("div");
    header.className = "menu-card-header";

    const nameEl = document.createElement("h3");
    nameEl.className = "menu-name";
    nameEl.textContent = item.name;

    const priceEl = document.createElement("span");
    priceEl.className = "menu-price";
    priceEl.textContent = formatPrice(item.price);

    header.appendChild(nameEl);
    header.appendChild(priceEl);

    const tagWrap = document.createElement("div");
    tagWrap.className = "menu-tags";

    createTagElements(item).forEach(tag => {
      const t = document.createElement("span");
      t.className = "menu-tag";
      t.textContent = tag;
      tagWrap.appendChild(t);
    });

    card.appendChild(header);
    card.appendChild(tagWrap);

    // subtle qty controls at bottom
    const controls = document.createElement("div");
    controls.className = "menu-cart-controls";

    const label = document.createElement("span");
    label.className = "cart-qty-label";
    label.textContent = "Qty:";

    const minusBtn = document.createElement("button");
    minusBtn.className = "cart-qty-btn";
    minusBtn.textContent = "−";

    const qtySpan = document.createElement("span");
    qtySpan.className = "cart-qty-display";
    qtySpan.textContent = getCartQuantity(item.name);

    const plusBtn = document.createElement("button");
    plusBtn.className = "cart-qty-btn";
    plusBtn.textContent = "+";

    minusBtn.addEventListener("click", () => {
      removeOneFromCart(item.name);
      qtySpan.textContent = getCartQuantity(item.name);
    });

    plusBtn.addEventListener("click", () => {
      addToCart(item);
      qtySpan.textContent = getCartQuantity(item.name);
    });

    controls.appendChild(label);
    controls.appendChild(minusBtn);
    controls.appendChild(qtySpan);
    controls.appendChild(plusBtn);

    card.appendChild(controls);
    grid.appendChild(card);
  });
}

// ---------- SODA RENDERING ----------

function renderSodaMenu() {
  const grid = document.getElementById("soda-grid");
  if (!grid || !SODA_ITEMS.length) return;

  grid.innerHTML = "";

  SODA_ITEMS.forEach(item => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const header = document.createElement("div");
    header.className = "menu-card-header";

    const nameEl = document.createElement("h3");
    nameEl.className = "menu-name";
    nameEl.textContent = item.name;

    const priceEl = document.createElement("span");
    priceEl.className = "menu-price";
    priceEl.textContent = formatPrice(item.price);

    header.appendChild(nameEl);
    header.appendChild(priceEl);
    card.appendChild(header);

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "menu-note";
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    // subtle qty controls at bottom
    const controls = document.createElement("div");
    controls.className = "menu-cart-controls";

    const label = document.createElement("span");
    label.className = "cart-qty-label";
    label.textContent = "Qty:";

    const minusBtn = document.createElement("button");
    minusBtn.className = "cart-qty-btn";
    minusBtn.textContent = "−";

    const qtySpan = document.createElement("span");
    qtySpan.className = "cart-qty-display";
    qtySpan.textContent = getCartQuantity(item.name);

    const plusBtn = document.createElement("button");
    plusBtn.className = "cart-qty-btn";
    plusBtn.textContent = "+";

    minusBtn.addEventListener("click", () => {
      removeOneFromCart(item.name);
      qtySpan.textContent = getCartQuantity(item.name);
    });

    plusBtn.addEventListener("click", () => {
      addToCart(item);
      qtySpan.textContent = getCartQuantity(item.name);
    });

    controls.appendChild(label);
    controls.appendChild(minusBtn);
    controls.appendChild(qtySpan);
    controls.appendChild(plusBtn);

    card.appendChild(controls);
    grid.appendChild(card);
  });
}

// ---------- FILTERS / SEARCH (COOKIES) ----------

function applyFilters() {
  const activeBtn = document.querySelector(".filter-btn.active");
  const filter = activeBtn ? activeBtn.dataset.filter : "all";

  // supports multiple search inputs with class .menu-search-input
  const searchInputs = document.querySelectorAll(".menu-search-input, #menu-search-input");
  let query = "";
  searchInputs.forEach(input => {
    if (!input) return;
    const val = input.value.toLowerCase().trim();
    if (val) query = val; // last non-empty wins
  });

  let filtered = MENU_ITEMS.slice();

  if (filter !== "all") {
    if (filter === "gf") {
      filtered = filtered.filter(i => i.glutenFree);
    } else {
      filtered = filtered.filter(i => i.type === filter);
    }
  }

  if (query) {
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(query) ||
      (i.tags || []).some(tag => tag.toLowerCase().includes(query))
    );
  }

  renderMenu(filtered);
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  const searchInputs = document.querySelectorAll(".menu-search-input, #menu-search-input");
  searchInputs.forEach(input => {
    input.addEventListener("input", () => {
      applyFilters();
    });
  });
}

// ---------- DAILY FLAVOR ----------

function pickDailyFlavor() {
  const el = document.getElementById("daily-flavor");
  if (!el || !MENU_ITEMS.length) return;

  const index = new Date().getDate() % MENU_ITEMS.length;
  const item = MENU_ITEMS[index];

  el.innerHTML = `Today’s featured flavor: <strong>${item.name}</strong> · ${formatPrice(
    item.price
  )}`;
}

// ---------- NAV ----------

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });
}

function scrollToMenu() {
  const menuSection = document.getElementById("menu");
  if (!menuSection) return;
  menuSection.scrollIntoView({ behavior: "smooth" });
}

// ---------- FOOTER YEAR ----------

function initFooterYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// ---------- REXBURG PROMO POPUP ----------

let promoTimeoutId = null;

function showPromo() {
  const overlay = document.getElementById("promo-overlay");
  if (overlay) {
    overlay.classList.remove("hidden");
  }
}

function closePromo() {
  const overlay = document.getElementById("promo-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
  }

  if (promoTimeoutId !== null) {
    clearTimeout(promoTimeoutId);
    promoTimeoutId = null;
  }
}

// make closePromo usable from inline HTML
window.closePromo = closePromo;

function initPromoPopup() {
  promoTimeoutId = setTimeout(showPromo, 1500);
}

// ---------- SIMPLE CART (SIDEBAR) ----------

const cart = []; // array of { name, price, qty }

function findCartItem(name) {
  return cart.find(entry => entry.name === name);
}

function getCartQuantity(name) {
  const entry = findCartItem(name);
  return entry ? entry.qty : 0;
}

function addToCart(item) {
  const existing = findCartItem(item.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: item.name, price: item.price, qty: 1 });
  }
  updateCartDisplay();
}

function removeOneFromCart(name) {
  const existing = findCartItem(name);
  if (!existing) return;

  existing.qty -= 1;
  if (existing.qty <= 0) {
    const idx = cart.indexOf(existing);
    if (idx !== -1) cart.splice(idx, 1);
  }
  updateCartDisplay();
}

function buildOrderSummary() {
  if (!cart.length) return "";

  const lines = cart.map(entry => `${entry.qty} × ${entry.name}`);
  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return `${lines.join(", ")} (Total ${formatPrice(total)})`;
}

// ---------- CART UI UPDATE ----------

function updateCartDisplay() {
  const countEl = document.getElementById("cart-count");
  const itemsContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const summaryEl = document.getElementById("cart-summary-text");

  // item count in navbar
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  if (countEl) countEl.textContent = totalCount;

  const countWrap = document.getElementById("cart-count-wrap");
  if (countWrap) {
    if (totalCount > 0) {
      countWrap.classList.remove("hidden");
    } else {
      countWrap.classList.add("hidden");
    }
  }

  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "menu-note";
    empty.textContent = "Your cart is empty. Add some cookies from the menu. 🍪";
    itemsContainer.appendChild(empty);

    if (totalEl) totalEl.textContent = "$0.00";
    if (summaryEl) summaryEl.textContent = "";

    // refresh menus so quantities show 0
    applyFilters();
    renderSodaMenu();
    return;
  }

  let total = 0;

  cart.forEach(entry => {
    total += entry.price * entry.qty;

    const card = document.createElement("article");
    card.className = "menu-card";

    const header = document.createElement("div");
    header.className = "menu-card-header";

    const nameEl = document.createElement("h3");
    nameEl.className = "menu-name";
    nameEl.textContent = entry.name;

    const linePrice = document.createElement("span");
    linePrice.className = "menu-price";
    linePrice.textContent = `${entry.qty} × ${formatPrice(entry.price)}`;

    header.appendChild(nameEl);
    header.appendChild(linePrice);
    card.appendChild(header);

    const controls = document.createElement("div");
    controls.className = "menu-cart-controls";

    const label = document.createElement("span");
    label.className = "cart-qty-label";
    label.textContent = "Qty:";

    const minusBtn = document.createElement("button");
    minusBtn.className = "cart-qty-btn";
    minusBtn.textContent = "−";

    const qtySpan = document.createElement("span");
    qtySpan.className = "cart-qty-display";
    qtySpan.textContent = entry.qty;

    const plusBtn = document.createElement("button");
    plusBtn.className = "cart-qty-btn";
    plusBtn.textContent = "+";

    minusBtn.addEventListener("click", () => {
      removeOneFromCart(entry.name);
    });

    plusBtn.addEventListener("click", () => {
      addToCart({ name: entry.name, price: entry.price });
    });

    controls.appendChild(label);
    controls.appendChild(minusBtn);
    controls.appendChild(qtySpan);
    controls.appendChild(plusBtn);

    card.appendChild(controls);

    const totalLine = document.createElement("p");
    totalLine.className = "menu-note";
    totalLine.textContent = `Item total: ${formatPrice(entry.price * entry.qty)}`;
    card.appendChild(totalLine);

    itemsContainer.appendChild(card);
  });

  if (totalEl) totalEl.textContent = formatPrice(total);
  if (summaryEl) summaryEl.textContent = buildOrderSummary();

  // refresh cookie menu + soda qty to match cart
  applyFilters();
  renderSodaMenu();
}

// ---------- CART PANEL TOGGLING ----------

function toggleCartPanel(show) {
  const panel = document.getElementById("cart-panel");
  if (!panel) return;

  if (typeof show === "boolean") {
    if (show) {
      panel.classList.remove("hidden");
    } else {
      panel.classList.add("hidden");
    }
  } else {
    panel.classList.toggle("hidden");
  }
}

function initCartUI() {
  const toggle = document.getElementById("cart-toggle");
  const panel = document.getElementById("cart-panel");
  const closeBtn = panel ? panel.querySelector(".cart-close") : null;
  const phoneBtn = document.getElementById("phone-order-btn");
  const doordashBtn = document.getElementById("doordash-btn");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (toggle) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCartPanel();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleCartPanel(false));
  }

  if (phoneBtn) {
    phoneBtn.addEventListener("click", () => {
      const summary = buildOrderSummary();
      console.log("Order summary for phone call:", summary);
      window.location.href = "tel:+19862759314";
    });
  }

  if (doordashBtn) {
    doordashBtn.addEventListener("click", () => {
      window.open(
        "https://www.doordash.com/store/the-cookie-cottage-rigby-33696829/61183157/?srsltid=AfmBOopzQPMUwSbwQGu4HSewmCcM_Xl4qHdB5wFFmu-jeilkYeKdzmhK",
        "_blank"
      );
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Thanks! Show this cart to the Cottage crew at the window to finish your order.");
    });
  }
}

// ---------- INIT ----------

document.addEventListener("DOMContentLoaded", () => {
  renderMenu(MENU_ITEMS);     // from menu-data.js
  renderSodaMenu();           // builds drink cards + qty controls
  initFilters();              // filters + search for cookies
  pickDailyFlavor();
  initNavToggle();
  initFooterYear();
  initPromoPopup();
  initCartUI();
  updateCartDisplay();
});

// expose scrollToMenu globally for button onclick
window.scrollToMenu = scrollToMenu;
