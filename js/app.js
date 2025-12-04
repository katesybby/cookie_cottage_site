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

// ---------- MENU RENDERING ----------

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
    grid.appendChild(card);
  });
}

// ---------- FILTERS / SEARCH ----------

function applyFilters() {
  const activeBtn = document.querySelector(".filter-btn.active");
  const filter = activeBtn ? activeBtn.dataset.filter : "all";
  const searchInput = document.getElementById("menu-search-input");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

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

  const searchInput = document.getElementById("menu-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applyFilters();
    });
  }
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

// store the timeout id so we can cancel it
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

  // if a timer was set to (re)open it, cancel that
  if (promoTimeoutId !== null) {
    clearTimeout(promoTimeoutId);
    promoTimeoutId = null;
  }
}

// make closePromo usable from inline HTML
window.closePromo = closePromo;

function initPromoPopup() {
  // show the popup 1.5s after page load
  promoTimeoutId = setTimeout(showPromo, 1500);
}


// ---------- INIT ----------

document.addEventListener("DOMContentLoaded", () => {
  renderMenu(MENU_ITEMS);
  initFilters();
  pickDailyFlavor();
  initNavToggle();
  initFooterYear();
  initPromoPopup();
});

// expose scrollToMenu globally for button onclick
window.scrollToMenu = scrollToMenu;
