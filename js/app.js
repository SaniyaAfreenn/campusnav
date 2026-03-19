// ============================================================
// CampusNav — Main Application Controller
// ============================================================

const app = {
  currentScreen: 'welcome',
  currentRoute: null,
  currentStep: 0,
  selectedBuilding: null,
  activeCategory: 'all',
  theme: 'light',

  // ---- Initialization ----
  init() {
    this.detectTheme();
    this.renderCategories();
    this.renderBuildings();
    this.checkURLParams();
  },

  // ---- Theme ----
  detectTheme() {
    const saved = localStorage.getItem('campusnav-theme');
    if (saved) {
      this.theme = saved;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
    }
    this.applyTheme();
  },

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('campusnav-theme', this.theme);
    this.applyTheme();
  },

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const btn = document.getElementById('btn-theme');
    if (btn) btn.textContent = this.theme === 'dark' ? '☀️' : '🌙';
  },

  // ---- URL Params (for QR code entry) ----
  checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    const start = params.get('start');
    const dest = params.get('dest');
    if (start && dest) {
      this.navigateTo(dest);
    } else if (dest) {
      this.navigateTo(dest);
    }
  },

  // ---- Screen Navigation ----
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(`screen-${screenId}`);
    if (screen) screen.classList.add('active');
    this.currentScreen = screenId;

    // Update bottom nav
    const bottomNav = document.getElementById('bottom-nav');
    const navControls = document.getElementById('nav-controls');
    const hideBottomNav = ['welcome', 'nav', 'arrived'].includes(screenId);
    bottomNav.style.display = hideBottomNav ? 'none' : 'flex';

    // Update active bottom nav item
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screenId);
    });

    // Render map if map screen
    if (screenId === 'map') {
      this.renderFullMap();
    }

    // Generate QR if qr screen
    if (screenId === 'qr') {
      this.generateQR();
    }

    // Scroll to top
    window.scrollTo(0, 0);
  },

  // ---- Categories ----
  renderCategories() {
    const container = document.getElementById('categories');
    container.innerHTML = CATEGORIES.map(cat => `
      <button class="category-chip ${cat.id === this.activeCategory ? 'active' : ''}"
              onclick="app.setCategory('${cat.id}')">
        ${cat.icon} ${cat.name}
      </button>
    `).join('');
  },

  setCategory(categoryId) {
    this.activeCategory = categoryId;
    this.renderCategories();
    this.renderBuildings();
    const title = document.getElementById('building-list-title');
    const cat = CATEGORIES.find(c => c.id === categoryId);
    title.textContent = categoryId === 'all' ? 'All Destinations' : cat.name;
  },

  // ---- Buildings List ----
  renderBuildings(filter = '') {
    const container = document.getElementById('building-list');
    let buildings = BUILDINGS.filter(b => b.id !== 'main_gate');

    if (this.activeCategory !== 'all') {
      buildings = buildings.filter(b => b.category === this.activeCategory);
    }

    if (filter) {
      const q = filter.toLowerCase();
      buildings = buildings.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.shortName.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }

    if (buildings.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <p>No buildings found. Try a different search.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = buildings.map((b, i) => `
      <div class="building-card" style="animation-delay:${i * 0.05}s" onclick="app.navigateTo('${b.id}')">
        <div class="building-icon">${b.icon}</div>
        <div class="building-info">
          <div class="building-name">${b.shortName}</div>
          <div class="building-desc">${b.description}</div>
        </div>
        <span class="building-arrow">→</span>
      </div>
    `).join('');
  },

  filterBuildings(query) {
    this.renderBuildings(query);
  },

  // ---- Navigate To Building ----
  navigateTo(buildingId) {
    const building = BUILDINGS.find(b => b.id === buildingId);
    if (!building) return;

    this.selectedBuilding = building;

    // Find route from main_gate
    const route = ROUTES.find(r => r.from === 'main_gate' && r.to === buildingId);

    if (route) {
      this.currentRoute = route;
      this.showRoutePreview();
    } else {
      // No predefined route — show a basic placeholder
      this.currentRoute = this.generateBasicRoute(buildingId);
      this.showRoutePreview();
    }
  },

  generateBasicRoute(buildingId) {
    const building = BUILDINGS.find(b => b.id === buildingId);
    return {
      id: `gate_to_${buildingId}`,
      from: 'main_gate',
      to: buildingId,
      distance: '~400m',
      time: '~5 min',
      accessibility: true,
      steps: [
        {
          id: 1,
          instruction: "Enter through the Main Gate past Security",
          detail: "Walk past the grey security/reception booth.",
          landmark: "Security booth with LED display",
          direction: "straight",
          image: "step_gate_entry",
          distance: "50m"
        },
        {
          id: 2,
          instruction: "Follow campus direction signboards",
          detail: `Look for direction signs pointing to ${building.name}. The REVA University signboards are red and blue.`,
          landmark: "REVA direction signboard",
          direction: "straight",
          image: "step_signboard",
          distance: "200m"
        },
        {
          id: 3,
          instruction: `You've arrived at ${building.name}!`,
          detail: building.description,
          landmark: building.name,
          direction: "arrived",
          image: `step_${buildingId}_arrival`,
          distance: "0m"
        }
      ]
    };
  },

  // ---- Route Preview ----
  showRoutePreview() {
    const route = this.currentRoute;
    const building = this.selectedBuilding;

    document.getElementById('route-dest-name').textContent = building.name;
    document.getElementById('route-distance').textContent = route.distance;
    document.getElementById('route-time').textContent = route.time;

    const accBadge = document.getElementById('route-accessibility');
    accBadge.style.display = route.accessibility ? 'inline-flex' : 'none';

    this.renderRouteMap('route-map');
    this.renderRouteStepsPreview();
    this.showScreen('route');
  },

  renderRouteStepsPreview() {
    const container = document.getElementById('route-steps-preview');
    const steps = this.currentRoute.steps;

    let html = '<div class="route-steps-title">📋 Route Steps</div>';

    steps.forEach((step, i) => {
      const isFirst = i === 0;
      const isLast = i === steps.length - 1;
      const dotClass = isFirst ? 'start' : (isLast ? 'end' : '');

      html += `
        <div class="route-step-mini">
          <div class="step-dot-container">
            <div class="step-dot ${dotClass}"></div>
            ${!isLast ? '<div class="step-line"></div>' : ''}
          </div>
          <div class="step-mini-text">
            <strong>${step.instruction}</strong>
            ${step.distance !== '0m' ? `<br><span style="font-size:0.75rem;color:var(--text-muted)">${step.distance}</span>` : ''}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // ---- SVG Map Rendering ----
  renderRouteMap(containerId) {
    const container = document.getElementById(containerId);
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">`;

    // Draw all path connections (light lines)
    MAP_PATHS.forEach(path => {
      const from = MAP_POINTS[path.from];
      const to = MAP_POINTS[path.to];
      if (from && to) {
        svg += `<line class="map-path-line"
          x1="${from.x * width / 100}" y1="${from.y * height / 100}"
          x2="${to.x * width / 100}" y2="${to.y * height / 100}" />`;
      }
    });

    // Draw route highlight if we have one
    if (this.currentRoute) {
      const fromPt = MAP_POINTS[this.currentRoute.from];
      const toPt = MAP_POINTS[this.currentRoute.to];
      if (fromPt && toPt) {
        // Find path through waypoints
        const routePath = this.findMapPath(this.currentRoute.from, this.currentRoute.to);
        if (routePath.length > 1) {
          let pathD = `M ${routePath[0].x * width / 100} ${routePath[0].y * height / 100}`;
          for (let i = 1; i < routePath.length; i++) {
            pathD += ` L ${routePath[i].x * width / 100} ${routePath[i].y * height / 100}`;
          }
          svg += `<path class="map-route-line" d="${pathD}" />`;
        } else {
          svg += `<line class="map-route-line"
            x1="${fromPt.x * width / 100}" y1="${fromPt.y * height / 100}"
            x2="${toPt.x * width / 100}" y2="${toPt.y * height / 100}" />`;
        }
      }
    }

    // Draw building dots and labels
    Object.entries(MAP_POINTS).forEach(([id, point]) => {
      const isFrom = this.currentRoute && this.currentRoute.from === id;
      const isTo = this.currentRoute && this.currentRoute.to === id;
      const isOnRoute = isFrom || isTo;

      const cx = point.x * width / 100;
      const cy = point.y * height / 100;
      const r = isOnRoute ? 8 : 5;
      const fill = isFrom ? '#2E7D32' : (isTo ? '#E65100' : '#1A237E');
      const opacity = isOnRoute ? 1 : 0.6;

      svg += `<g class="map-building-dot ${isOnRoute ? 'map-building-highlight' : ''}"
                onclick="app.navigateTo('${id}')">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}" />
        ${isOnRoute ? `<circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="${fill}" opacity="0.2" />` : ''}
      </g>`;

      // Label
      const labelX = cx + (point.x > 70 ? -5 : 12);
      const anchor = point.x > 70 ? 'end' : 'start';
      svg += `<text class="map-building-label" x="${labelX}" y="${cy + 3}" text-anchor="${anchor}"
               fill="${isOnRoute ? fill : '#666'}" font-weight="${isOnRoute ? '700' : '500'}">
        ${point.label}
      </text>`;
    });

    // Legend
    svg += `
      <circle cx="15" cy="15" r="5" fill="#2E7D32" />
      <text x="25" y="18" style="font-size:9px;fill:#666">Start</text>
      <circle cx="60" cy="15" r="5" fill="#E65100" />
      <text x="70" y="18" style="font-size:9px;fill:#666">Destination</text>
    `;

    svg += '</svg>';
    container.innerHTML = svg;
  },

  // Simple BFS path finding on the map graph
  findMapPath(fromId, toId) {
    const adjList = {};
    MAP_PATHS.forEach(({ from, to }) => {
      if (!adjList[from]) adjList[from] = [];
      if (!adjList[to]) adjList[to] = [];
      adjList[from].push(to);
      adjList[to].push(from);
    });

    const visited = new Set();
    const queue = [[fromId]];
    visited.add(fromId);

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current === toId) {
        return path.map(id => MAP_POINTS[id]);
      }

      const neighbors = adjList[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    // Fallback: direct line
    return [MAP_POINTS[fromId], MAP_POINTS[toId]].filter(Boolean);
  },

  renderFullMap() {
    this.currentRoute = null; // no route highlighted
    this.renderRouteMap('full-map');
  },

  // ---- Step-by-Step Navigation ----
  startNavigation() {
    this.currentStep = 0;
    this.renderNavStep();
    this.showScreen('nav');
  },

  renderNavStep() {
    const route = this.currentRoute;
    const step = route.steps[this.currentStep];
    const totalSteps = route.steps.length;

    // Update header
    document.getElementById('nav-dest-name').textContent = this.selectedBuilding.shortName;
    document.getElementById('nav-progress-text').textContent = `Step ${this.currentStep + 1} of ${totalSteps}`;

    // Progress bar
    const progress = ((this.currentStep + 1) / totalSteps) * 100;
    document.getElementById('nav-progress-fill').style.width = `${progress}%`;

    // Direction icons
    const dirIcons = {
      straight: '⬆️',
      left: '↩️',
      right: '↪️',
      arrived: '📍'
    };

    const dirTexts = {
      straight: 'Go Straight',
      left: 'Turn Left',
      right: 'Turn Right',
      arrived: 'You\'ve Arrived!'
    };

    // Step card
    const container = document.getElementById('nav-step-container');
    container.innerHTML = `
      <div class="nav-step-card">
        <div class="step-image-container">
          <div class="step-image-placeholder direction-${step.direction}">
            <div class="step-direction-icon">${dirIcons[step.direction] || '⬆️'}</div>
            <div class="step-direction-text">${dirTexts[step.direction] || 'Continue'}</div>
          </div>
          <div class="step-number-badge">Step ${step.id}</div>
          ${step.distance !== '0m' ? `<div class="step-distance-badge">📏 ${step.distance}</div>` : ''}
        </div>
        <div class="step-content">
          <h3 class="step-instruction">${step.instruction}</h3>
          <p class="step-detail">${step.detail}</p>
          <div class="step-landmark">
            <span class="step-landmark-icon">📌</span>
            ${step.landmark}
          </div>
        </div>
      </div>
    `;

    // Update buttons
    const prevBtn = document.getElementById('nav-btn-prev');
    const nextBtn = document.getElementById('nav-btn-next');

    prevBtn.disabled = this.currentStep === 0;

    if (this.currentStep === totalSteps - 1) {
      nextBtn.innerHTML = '✅ Finish';
      nextBtn.classList.add('arrived');
    } else {
      nextBtn.innerHTML = 'Next →';
      nextBtn.classList.remove('arrived');
    }
  },

  nextStep() {
    const totalSteps = this.currentRoute.steps.length;
    if (this.currentStep < totalSteps - 1) {
      this.currentStep++;
      this.renderNavStep();
    } else {
      this.showArrived();
    }
  },

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderNavStep();
    }
  },

  exitNavigation() {
    if (confirm('Exit navigation? Your progress will be lost.')) {
      this.showScreen('search');
    }
  },

  // ---- Arrived Screen ----
  showArrived() {
    const building = this.selectedBuilding;
    document.getElementById('arrived-name').textContent = building.name;

    document.getElementById('arrived-info').innerHTML = `
      <div class="arrived-info-row">
        <span class="arrived-info-icon">${building.icon}</span>
        <div class="arrived-info-text">
          <strong>Building</strong>
          ${building.name}
        </div>
      </div>
      <div class="arrived-info-row">
        <span class="arrived-info-icon">📋</span>
        <div class="arrived-info-text">
          <strong>Description</strong>
          ${building.description}
        </div>
      </div>
      ${building.floors > 0 ? `
      <div class="arrived-info-row">
        <span class="arrived-info-icon">🏢</span>
        <div class="arrived-info-text">
          <strong>Floors</strong>
          ${building.floors} floors
        </div>
      </div>` : ''}
      <div class="arrived-info-row">
        <span class="arrived-info-icon">🚶</span>
        <div class="arrived-info-text">
          <strong>Route Walked</strong>
          ${this.currentRoute.distance} in ${this.currentRoute.time}
        </div>
      </div>
    `;

    this.showScreen('arrived');
  },

  // ---- QR Code Generation ----
  generateQR() {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 180;
    canvas.width = size;
    canvas.height = size;

    // Simple QR-like pattern (visual placeholder)
    // In production, use a QR library like qrcode.js
    const url = `${window.location.origin}${window.location.pathname}?start=main_gate`;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Draw a QR-like pattern
    const moduleSize = 6;
    const modules = Math.floor(size / moduleSize);
    const padding = 2;

    ctx.fillStyle = '#1A237E';

    // Corner markers
    this.drawQRCorner(ctx, padding, padding, moduleSize);
    this.drawQRCorner(ctx, size - 7 * moduleSize - padding, padding, moduleSize);
    this.drawQRCorner(ctx, padding, size - 7 * moduleSize - padding, moduleSize);

    // Random data modules (seeded from URL)
    let seed = 42;
    for (let i = 0; i < url.length; i++) seed += url.charCodeAt(i);

    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        // Skip corners
        if ((row < 9 && col < 9) || (row < 9 && col > modules - 9) || (row > modules - 9 && col < 9)) continue;

        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        if (seed % 3 === 0) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize - 1, moduleSize - 1);
        }
      }
    }

    // Center logo area
    const centerX = size / 2 - 15;
    const centerY = size / 2 - 15;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(centerX - 2, centerY - 2, 34, 34);
    ctx.fillStyle = '#1A237E';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧭', size / 2, size / 2);
  },

  drawQRCorner(ctx, x, y, s) {
    // Outer square
    ctx.fillRect(x, y, 7 * s, s);
    ctx.fillRect(x, y + 6 * s, 7 * s, s);
    ctx.fillRect(x, y, s, 7 * s);
    ctx.fillRect(x + 6 * s, y, s, 7 * s);
    // Inner square
    ctx.fillRect(x + 2 * s, y + 2 * s, 3 * s, 3 * s);
  }
};

// ---- Initialize on DOM load ----
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// ---- Keyboard navigation ----
document.addEventListener('keydown', (e) => {
  if (app.currentScreen === 'nav') {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      app.nextStep();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      app.prevStep();
    } else if (e.key === 'Escape') {
      app.exitNavigation();
    }
  }
});

// ---- Swipe gesture support ----
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;

  if (app.currentScreen === 'nav') {
    if (diff > 60) {
      app.nextStep(); // Swipe left = next
    } else if (diff < -60) {
      app.prevStep(); // Swipe right = previous
    }
  }
}, { passive: true });
