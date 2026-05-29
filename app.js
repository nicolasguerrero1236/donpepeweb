'use strict';

/* ════════════════════════════════════
   DATOS DEL MENÚ
════════════════════════════════════ */
const categories = [
  { id: 'pollos',       name: 'Pollos a la Leña',    icon: '🔥' },
  { id: 'milanesas',    name: 'Milanesas',            icon: '🥩' },
  { id: 'fajitas',      name: 'Fajitas',              icon: '🌯' },
  { id: 'pizzas',       name: 'Pizzas',               icon: '🍕' },
  { id: 'lomitos',      name: 'Lomitos & Sándwiches', icon: '🥖' },
  { id: 'guarniciones', name: 'Guarniciones',         icon: '🍟' },
  { id: 'bebidas',      name: 'Bebidas',              icon: '🥤' },
];

const menu = [
  // Pollos
  { id: 'p1',  name: 'Pollo Entero a la Leña',           description: 'Nuestro clásico, dorado a la leña con su jugo natural.',          price: 12500, category: 'pollos',       badge: 'Más pedido' },
  { id: 'p2',  name: 'Medio Pollo a la Leña',            description: 'Ideal para 1 o 2 personas, con piel crocante.',                   price: 6800,  category: 'pollos' },
  { id: 'p3',  name: 'Pollo + Papas Fritas',             description: 'Pollo entero con porción generosa de papas.',                     price: 15500, category: 'pollos',       badge: 'Combo' },
  { id: 'p4',  name: 'Pollo + Ensalada Mixta',           description: 'Pollo entero con ensalada de lechuga, tomate y cebolla.',         price: 14800, category: 'pollos' },
  // Milanesas
  { id: 'm1',  name: 'Milanesa a la Napolitana',         description: 'Con jamón, queso y salsa. Acompañada con papas.',                 price: 11500, category: 'milanesas',    badge: 'Destacado' },
  { id: 'm2',  name: 'Milanesas de Pepe',                description: 'La especial de la casa: con huevo, panceta y queso.',             price: 12800, category: 'milanesas' },
  { id: 'm3',  name: 'Milanesa con Roquefort',           description: 'Bañada en salsa de queso roquefort cremosa.',                     price: 12200, category: 'milanesas' },
  { id: 'm4',  name: 'Milanesa Simple',                  description: 'Crocante, dorada y con limón.',                                   price: 8900,  category: 'milanesas' },
  // Fajitas
  { id: 'f1',  name: 'Fajitas Mixtas',                   description: 'Carne y pollo con vegetales salteados. Para 3-4 personas.',       price: 16500, category: 'fajitas',      badge: 'Las mejores de Córdoba' },
  { id: 'f2',  name: 'Fajitas de Pollo',                 description: 'Tiras de pollo con morrones y cebolla.',                          price: 14500, category: 'fajitas' },
  { id: 'f3',  name: 'Fajitas de Carne',                 description: 'Tiras de carne sellada con vegetales.',                           price: 15000, category: 'fajitas' },
  // Pizzas
  { id: 'pz1', name: 'Pizza Mitad Napo Mitad Fugazzeta', description: 'Lo mejor de dos mundos en una sola pizza.',                      price: 10500, category: 'pizzas',       badge: 'Combo' },
  { id: 'pz2', name: 'Pizza Muzzarella',                 description: 'Clásica, con muzza generosa y orégano.',                          price: 8500,  category: 'pizzas' },
  { id: 'pz3', name: 'Pizza Especial',                   description: 'Jamón, morrón, huevo y aceitunas.',                               price: 11200, category: 'pizzas' },
  // Lomitos
  { id: 'l1',  name: 'Lomito Completo',                  description: 'Bife de lomo, jamón, queso, huevo, lechuga y tomate.',            price: 9800,  category: 'lomitos',      badge: 'Abundante' },
  { id: 'l2',  name: 'Lomito Simple',                    description: 'Bife de lomo con lechuga y tomate.',                              price: 8200,  category: 'lomitos' },
  { id: 'l3',  name: 'Salame y Pan',                     description: 'Tabla de salame con pan casero.',                                 price: 4500,  category: 'lomitos' },
  // Guarniciones
  { id: 'g1',  name: 'Papas Fritas',                     description: 'Porción grande, recién hechas.',                                  price: 4200,  category: 'guarniciones' },
  { id: 'g2',  name: 'Papas con Cheddar y Panceta',      description: 'Cargadas con queso cheddar fundido.',                             price: 5800,  category: 'guarniciones' },
  { id: 'g3',  name: 'Empanadas (docena)',                description: 'Carne, pollo o jamón y queso.',                                  price: 7800,  category: 'guarniciones' },
  { id: 'g4',  name: 'Ensalada Mixta',                   description: 'Lechuga, tomate y cebolla.',                                      price: 3200,  category: 'guarniciones' },
  // Bebidas
  { id: 'b1',  name: 'Coca-Cola 1.5L',                   description: 'Bien fría.',                                                      price: 2800,  category: 'bebidas' },
  { id: 'b2',  name: 'Agua Mineral 1.5L',                description: 'Con o sin gas.',                                                  price: 1800,  category: 'bebidas' },
  { id: 'b3',  name: 'Cerveza Quilmes 1L',               description: 'Helada al toque.',                                                price: 2500,  category: 'bebidas' },
];

const WHATSAPP = '5493512208096';

const STORE = {
  address: 'Cacheuta 3750, Cordoba, Argentina',
  lat: -31.450806,
  lng: -64.212966,
};

const DELIVERY_RULES = {
  upTo3km: 1500,
  upTo6km: 2500,
};

const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

let deliveryMap = null;
let deliveryStoreMarker = null;
let deliveryClientMarker = null;
let addressInputDebounce = null;

/** Formatea un número como moneda ARS */
const fmt = n =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

/** Escapa caracteres HTML para inserción segura en innerHTML */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ════════════════════════════════════
   ESTADO DEL CARRITO
════════════════════════════════════ */
const cart = {
  lines:   [],        // [{ id, name, price, qty }]
  mode:    'retiro',  // 'retiro' | 'delivery'
  name:    '',
  phone:   '',
  address: '',
  notes:   '',

  deliveryDistanceKm: null,
  deliveryFee: 0,
  deliveryStatus: 'idle', // 'idle' | 'pending' | 'ok' | 'out' | 'error'
  deliveryMessage: '',
  deliveryCoords: null,   // { lat, lng }

  get count()    { return this.lines.reduce((s, l) => s + l.qty, 0); },
  get subtotal() { return this.lines.reduce((s, l) => s + l.price * l.qty, 0); },
  get total()    {
    return this.subtotal + (this.mode === 'delivery' && this.deliveryStatus === 'ok' ? this.deliveryFee : 0);
  },

  add(item) {
    const found = this.lines.find(l => l.id === item.id);
    if (found) {
      found.qty++;
    } else {
      this.lines.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    }
    openDrawer();
    update();
  },

  setQty(id, qty) {
    if (qty <= 0) { this.remove(id); return; }
    const line = this.lines.find(l => l.id === id);
    if (line) line.qty = qty;
    update();
  },

  remove(id) {
    this.lines = this.lines.filter(l => l.id !== id);
    update();
  },

  clear() {
    this.lines = [];
    update();
  },
};


/* ════════════════════════════════════
   DRAWER — ABRIR / CERRAR
════════════════════════════════════ */
const drawerEl  = document.getElementById('cart-drawer');
const overlayEl = document.getElementById('drawer-overlay');

function openDrawer() {
  drawerEl.classList.add('open');
  overlayEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawerEl.classList.remove('open');
  overlayEl.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('btn-open-cart').addEventListener('click', openDrawer);
document.getElementById('btn-close-cart').addEventListener('click', closeDrawer);
overlayEl.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });


/* ════════════════════════════════════
   TOASTS
════════════════════════════════════ */
function toast(msg, type = 'default') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast${type !== 'default' ? ' ' + type : ''}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.3s ease forwards';
    el.addEventListener('animationend', () => el.remove());
  }, 3200);
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

// Distancia geodésica entre dos coordenadas usando fórmula de Haversine.
function haversineKm(a, b) {
  const R = 6371;
  const dLat = degToRad(b.lat - a.lat);
  const dLng = degToRad(b.lng - a.lng);
  const lat1 = degToRad(a.lat);
  const lat2 = degToRad(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  return 2 * R * Math.asin(Math.sqrt(h));
}

function resolveDeliveryByDistance(distanceKm) {
  if (distanceKm <= 3) {
    return { status: 'ok', fee: DELIVERY_RULES.upTo3km, message: 'Hasta 3 km' };
  }
  if (distanceKm <= 6) {
    return { status: 'ok', fee: DELIVERY_RULES.upTo6km, message: 'Entre 3 y 6 km' };
  }
  return { status: 'out', fee: 0, message: 'Zona fuera de reparto' };
}

function buildGoogleMapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

async function geocodeAddress(address) {
  const params = new URLSearchParams({
    q: address,
    format: 'jsonv2',
    limit: '1',
    countrycodes: 'ar',
    addressdetails: '1',
  });

  const response = await fetch(`${NOMINATIM_SEARCH_URL}?${params.toString()}`, {
    headers: { 'Accept-Language': 'es-AR,es;q=0.9' },
  });

  if (!response.ok) {
    throw new Error('No se pudo consultar Nominatim');
  }

  const results = await response.json();
  if (!Array.isArray(results) || results.length === 0) {
    return null;
  }

  const first = results[0];
  return {
    lat: Number(first.lat),
    lng: Number(first.lon),
    label: first.display_name || address,
  };
}

async function reverseGeocode(lat, lng) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lng),
    format: 'jsonv2',
    zoom: '18',
    addressdetails: '1',
  });

  const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
    headers: { 'Accept-Language': 'es-AR,es;q=0.9' },
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener la direccion');
  }

  const result = await response.json();
  return result && result.display_name ? result.display_name : '';
}

function resetDeliveryState() {
  cart.deliveryDistanceKm = null;
  cart.deliveryFee = 0;
  cart.deliveryStatus = 'idle';
  cart.deliveryMessage = '';
  cart.deliveryCoords = null;
}

function applyDeliveryFromCoords(coords, resolvedAddress) {
  const distanceKm = haversineKm({ lat: STORE.lat, lng: STORE.lng }, coords);
  const delivery = resolveDeliveryByDistance(distanceKm);

  cart.deliveryDistanceKm = distanceKm;
  cart.deliveryFee = delivery.fee;
  cart.deliveryStatus = delivery.status;
  cart.deliveryMessage = delivery.message;
  cart.deliveryCoords = coords;
  cart.address = resolvedAddress || cart.address;

  const addressInput = document.getElementById('f-address');
  if (addressInput && resolvedAddress) {
    addressInput.value = resolvedAddress;
  }

  update();
}

function moveClientMarker(coords) {
  if (!deliveryMap) return;

  if (!deliveryClientMarker) {
    deliveryClientMarker = L.marker([coords.lat, coords.lng]).addTo(deliveryMap);
  } else {
    deliveryClientMarker.setLatLng([coords.lat, coords.lng]);
  }

  const bounds = L.latLngBounds([
    [STORE.lat, STORE.lng],
    [coords.lat, coords.lng],
  ]);
  deliveryMap.fitBounds(bounds.pad(0.1));
}

function destroyDeliveryMap() {
  if (!deliveryMap) return;
  deliveryMap.remove();
  deliveryMap = null;
  deliveryStoreMarker = null;
  deliveryClientMarker = null;
}

function initDeliveryMap() {
  if (cart.mode !== 'delivery') return;
  const mapContainer = document.getElementById('delivery-map');
  if (!mapContainer || typeof L === 'undefined') return;

  destroyDeliveryMap();

  deliveryMap = L.map(mapContainer, {
    center: [STORE.lat, STORE.lng],
    zoom: 15,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(deliveryMap);

  deliveryStoreMarker = L.marker([STORE.lat, STORE.lng]).addTo(deliveryMap)
    .bindPopup('Don Pepe - Local')
    .openPopup();

  deliveryMap.on('click', async e => {
    if (cart.mode !== 'delivery') return;

    cart.deliveryStatus = 'pending';
    cart.deliveryMessage = 'Calculando envio...';
    update();

    const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
    moveClientMarker(coords);

    try {
      const resolvedAddress = await reverseGeocode(coords.lat, coords.lng);
      applyDeliveryFromCoords(coords, resolvedAddress || cart.address);
    } catch (_) {
      cart.deliveryStatus = 'error';
      cart.deliveryMessage = 'No se pudo obtener direccion para ese punto';
      cart.deliveryCoords = coords;
      update();
      toast('No se pudo leer la direccion del punto seleccionado', 'error');
    }
  });

  if (cart.deliveryCoords) {
    moveClientMarker(cart.deliveryCoords);
  } else {
    deliveryMap.setView([STORE.lat, STORE.lng], 15);
  }

  setTimeout(() => {
    if (deliveryMap) deliveryMap.invalidateSize();
  }, 30);
}

function bindDeliveryAddressInput() {
  if (cart.mode !== 'delivery') return;
  const input = document.getElementById('f-address');
  if (!input) return;

  const runGeocode = async () => {
    const address = input.value.trim();
    cart.address = address;

    if (!address) {
      resetDeliveryState();
      update();
      return;
    }

    cart.deliveryStatus = 'pending';
    cart.deliveryMessage = 'Calculando envio...';
    update();

    try {
      const point = await geocodeAddress(address);
      if (!point) {
        cart.deliveryStatus = 'error';
        cart.deliveryMessage = 'No encontramos esa direccion';
        cart.deliveryDistanceKm = null;
        cart.deliveryFee = 0;
        cart.deliveryCoords = null;
        update();
        return;
      }

      const coords = { lat: point.lat, lng: point.lng };
      moveClientMarker(coords);
      applyDeliveryFromCoords(coords, point.label);
    } catch (_) {
      cart.deliveryStatus = 'error';
      cart.deliveryMessage = 'Error consultando Nominatim';
      cart.deliveryDistanceKm = null;
      cart.deliveryFee = 0;
      cart.deliveryCoords = null;
      update();
      toast('Error al consultar direcciones, intenta nuevamente', 'error');
    }
  };

  input.addEventListener('input', () => {
    clearTimeout(addressInputDebounce);
    addressInputDebounce = setTimeout(runGeocode, 1500);
  });

  input.addEventListener('blur', () => {
    clearTimeout(addressInputDebounce);
    runGeocode();
  });
}

function getDeliverySummaryText() {
  if (cart.mode !== 'delivery') return '';

  if (cart.deliveryStatus === 'pending') {
    return 'Calculando envio segun distancia...';
  }

  if (cart.deliveryStatus === 'error') {
    return cart.deliveryMessage || 'No se pudo calcular el delivery';
  }

  if (cart.deliveryStatus === 'out') {
    const kmText = cart.deliveryDistanceKm != null ? `${cart.deliveryDistanceKm.toFixed(2)} km` : '';
    return kmText ? `${kmText} - Zona fuera de reparto` : 'Zona fuera de reparto';
  }

  if (cart.deliveryStatus === 'ok') {
    return `${cart.deliveryDistanceKm.toFixed(2)} km - Envio ${fmt(cart.deliveryFee)}`;
  }

  return 'Escribe tu direccion o marca un punto en el mapa';
}


/* ════════════════════════════════════
   ENVIAR PEDIDO POR WHATSAPP
════════════════════════════════════ */
document.getElementById('btn-send').addEventListener('click', () => {
  const name    = document.getElementById('f-name').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const address = document.getElementById('f-address').value.trim();
  const notes   = document.getElementById('f-notes').value.trim();

  if (!name || !phone)                       { toast('Ingresá tu nombre y teléfono', 'error'); return; }
  if (cart.mode === 'delivery' && !address)  { toast('Ingresá la dirección de entrega', 'error'); return; }
  if (cart.lines.length === 0)               { toast('Tu carrito está vacío', 'error'); return; }

  if (cart.mode === 'delivery') {
    if (!cart.deliveryCoords) {
      toast('Marcá una ubicacion en el mapa o espera el calculo por direccion', 'error');
      return;
    }
    if (cart.deliveryStatus === 'out') {
      toast('La direccion esta fuera de la zona de reparto', 'error');
      return;
    }
    if (cart.deliveryStatus !== 'ok') {
      toast('Aun no pudimos calcular el delivery', 'error');
      return;
    }
  }

  cart.name    = name;
  cart.phone   = phone;
  cart.address = address;
  cart.notes   = notes;

  const itemsTxt = cart.lines
    .map(l => `• ${l.qty}x ${l.name} — ${fmt(l.qty * l.price)}`)
    .join('\n');

  const mapsLink = cart.deliveryCoords
    ? buildGoogleMapsLink(cart.deliveryCoords.lat, cart.deliveryCoords.lng)
    : '';

  const msg =
`*🍗 Nuevo pedido — Don Pepe*

👤 *Cliente:* ${name}
📞 *Tel:* ${phone}
📦 *Modalidad:* ${cart.mode === 'retiro' ? 'Retiro en local' : 'Delivery'}${cart.mode === 'delivery' ? `\n📍 *Dirección:* ${address}` : ''}${cart.mode === 'delivery' && cart.deliveryDistanceKm != null ? `\n📏 *Distancia:* ${cart.deliveryDistanceKm.toFixed(2)} km` : ''}${cart.mode === 'delivery' ? `\n🛵 *Delivery:* ${cart.deliveryStatus === 'ok' ? fmt(cart.deliveryFee) : 'Zona fuera de reparto'}` : ''}${cart.mode === 'delivery' && mapsLink ? `\n🗺️ *Ubicación:* ${mapsLink}` : ''}

*Pedido:*
${itemsTxt}

Subtotal: ${fmt(cart.subtotal)}${cart.mode === 'delivery' ? `\nEnvío: ${cart.deliveryStatus === 'ok' ? fmt(cart.deliveryFee) : 'Zona fuera de reparto'}` : ''}
*Total: ${fmt(cart.total)}*
${notes ? `\n📝 *Notas:* ${notes}` : ''}`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  toast('Abriendo WhatsApp para enviar tu pedido 🎉', 'success');
});

document.getElementById('btn-clear').addEventListener('click', () => cart.clear());


/* ════════════════════════════════════
   RENDER — CARRITO
════════════════════════════════════ */

/** Guarda los valores actuales de los campos del formulario en el estado */
function persistFields() {
  const n  = document.getElementById('f-name');
  const p  = document.getElementById('f-phone');
  const a  = document.getElementById('f-address');
  const no = document.getElementById('f-notes');
  if (n)  cart.name    = n.value;
  if (p)  cart.phone   = p.value;
  if (a)  cart.address = a.value;
  if (no) cart.notes   = no.value;
}

function renderCartBody() {
  const body   = document.getElementById('drawer-body');
  const footer = document.getElementById('drawer-footer');
  const badge  = document.getElementById('cart-badge');
  const count  = document.getElementById('drawer-count');

  // Badge del header
  if (cart.count > 0) {
    badge.textContent = cart.count;
    badge.classList.add('visible');
  } else {
    badge.classList.remove('visible');
  }

  // Cantidad en el título del drawer
  count.textContent = cart.count > 0 ? `(${cart.count})` : '';

  // Estado vacío
  if (cart.lines.length === 0) {
    destroyDeliveryMap();
    body.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>Tu carrito está vacío</p>
        <p class="hint">Agregá algo rico del menú 🔥</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  destroyDeliveryMap();

  // Items + formulario
  body.innerHTML = `
    <div class="cart-items">
      ${cart.lines.map(l => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${escHtml(l.name)}</div>
            <div class="cart-item-unit">${fmt(l.price)}</div>
            <div class="qty-controls">
              <button class="btn-qty btn-minus" data-id="${l.id}" aria-label="Restar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <span class="qty-val">${l.qty}</span>
              <button class="btn-qty btn-plus" data-id="${l.id}" aria-label="Sumar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <button class="btn-qty btn-remove" data-id="${l.id}" aria-label="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="cart-item-subtotal">${fmt(l.price * l.qty)}</div>
        </div>`).join('')}
    </div>

    <div class="form-section">
      <div>
        <span class="form-label">Modalidad</span>
        <div class="mode-grid">
          <div class="mode-option ${cart.mode === 'retiro' ? 'active' : ''}" data-mode="retiro">
            <div class="mode-title">Retiro</div>
            <div class="mode-sub">En el local</div>
          </div>
          <div class="mode-option ${cart.mode === 'delivery' ? 'active' : ''}" data-mode="delivery">
            <div class="mode-title">Delivery</div>
            <div class="mode-sub">Según distancia</div>
          </div>
        </div>
      </div>
      <div>
        <label class="form-label" for="f-name">Nombre</label>
        <input id="f-name" type="text" maxlength="60" placeholder="Tu nombre" value="${escHtml(cart.name)}" />
      </div>
      <div>
        <label class="form-label" for="f-phone">Teléfono</label>
        <input id="f-phone" type="tel" maxlength="20" placeholder="351..." value="${escHtml(cart.phone)}" />
      </div>
      <div id="field-address" class="${cart.mode === 'delivery' ? '' : 'field-hidden'}">
        <label class="form-label" for="f-address">Dirección</label>
        <input id="f-address" type="text" maxlength="120" placeholder="Calle, altura, depto" value="${escHtml(cart.address)}" />
        <p class="delivery-status ${cart.deliveryStatus === 'out' || cart.deliveryStatus === 'error' ? 'warn' : ''}">${escHtml(getDeliverySummaryText())}</p>
        <div class="delivery-map-wrap">
          <div id="delivery-map" aria-label="Mapa para seleccionar direccion"></div>
        </div>
        <p class="delivery-map-help">También podés hacer click en el mapa para elegir la ubicación exacta.</p>
      </div>
      <div>
        <label class="form-label" for="f-notes">Notas (opcional)</label>
        <textarea id="f-notes" maxlength="300" rows="2" placeholder="Sin sal, extra picante…">${escHtml(cart.notes)}</textarea>
      </div>
    </div>`;

  // Selector de modalidad
  body.querySelectorAll('.mode-option').forEach(opt => {
    opt.addEventListener('click', () => {
      persistFields();
      cart.mode = opt.dataset.mode;
      if (cart.mode !== 'delivery') {
        resetDeliveryState();
      }
      update();
    });
  });

  // Controles de cantidad / eliminar
  body.querySelectorAll('.btn-minus').forEach(btn =>
    btn.addEventListener('click', () => {
      persistFields();
      cart.setQty(btn.dataset.id, cart.lines.find(l => l.id === btn.dataset.id).qty - 1);
    }));

  body.querySelectorAll('.btn-plus').forEach(btn =>
    btn.addEventListener('click', () => {
      persistFields();
      cart.setQty(btn.dataset.id, cart.lines.find(l => l.id === btn.dataset.id).qty + 1);
    }));

  body.querySelectorAll('.btn-remove').forEach(btn =>
    btn.addEventListener('click', () => {
      persistFields();
      cart.remove(btn.dataset.id);
    }));

  // Totales en el pie del drawer
  footer.style.display = '';
  document.getElementById('val-subtotal').textContent = fmt(cart.subtotal);

  const rowDelivery = document.getElementById('row-delivery');
  if (cart.mode === 'delivery') {
    rowDelivery.style.display = '';
    const deliveryValue = document.getElementById('val-delivery');
    if (cart.deliveryStatus === 'ok') {
      deliveryValue.textContent = fmt(cart.deliveryFee);
    } else if (cart.deliveryStatus === 'out') {
      deliveryValue.textContent = 'Zona fuera de reparto';
    } else if (cart.deliveryStatus === 'pending') {
      deliveryValue.textContent = 'Calculando...';
    } else {
      deliveryValue.textContent = 'Completa direccion';
    }
  } else {
    rowDelivery.style.display = 'none';
  }

  document.getElementById('val-total').textContent = fmt(cart.total);

  if (cart.mode === 'delivery') {
    bindDeliveryAddressInput();
    initDeliveryMap();
    if (cart.deliveryCoords) {
      moveClientMarker(cart.deliveryCoords);
    }
  }
}

function update() {
  renderCartBody();
}


/* ════════════════════════════════════
   RENDER — MENÚ
════════════════════════════════════ */
let activeCategory = categories[0].id;

function renderTabs() {
  const container = document.getElementById('category-tabs');
  container.innerHTML = categories.map(c => `
    <button class="tab-btn${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">
      <span>${c.icon}</span> ${c.name}
    </button>`).join('');

  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderTabs();
      renderMenuGrid();
    });
  });
}

function renderMenuGrid() {
  const grid  = document.getElementById('menu-grid');
  const items = menu.filter(i => i.category === activeCategory);

  grid.innerHTML = items.map((item, idx) => `
    <article class="menu-card" style="animation-delay:${idx * 50}ms">
      ${item.badge ? `<span class="card-badge">${escHtml(item.badge)}</span>` : ''}
      <h3 class="card-title">${escHtml(item.name)}</h3>
      <p class="card-desc">${escHtml(item.description)}</p>
      <div class="card-footer">
        <span class="card-price">${fmt(item.price)}</span>
        <button class="btn-add" data-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Agregar
        </button>
      </div>
    </article>`).join('');

  grid.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = menu.find(i => i.id === btn.dataset.id);
      if (item) cart.add(item);
    });
  });
}


/* ════════════════════════════════════
   INICIALIZACIÓN
════════════════════════════════════ */
document.getElementById('footer-year').textContent = new Date().getFullYear();
renderTabs();
renderMenuGrid();
update();
