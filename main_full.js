// Clave de almacenamiento y usuarios por defecto
const PRODUCT_KEY = "emprendimientos";
const usuarios = [
  { nombre: "Emprendedor1", email: "user1@peque.com", password: "1234" },
  { nombre: "Emprendedor2", email: "user2@peque.com", password: "abcd" },
  { nombre: "Emprendedor3", email: "user3@peque.com", password: "pass" }
];

// Productos por defecto (3 por categoría)
const defaultProducts = [
  // COMIDA
  {
    nombre: "Arepas Doña Rosa",
    descripcion: "Arepas artesanales hechas en casa",
    elaboracion: "Masa de maíz amarilla molida y cocida en budare artesanal.",
    precio: 3500,
    cantidad: 40,
    vendedor: "Doña Rosa",
    pago: "Nequi, Daviplata",
    empresaDescripcion: "Negocio familiar con tradición de más de 20 años",
    categoria: "comida"
  },
  {
    nombre: "Empanadas El Valle",
    descripcion: "Empanadas de diversos rellenos",
    elaboracion: "Relleno de carne, pollo o queso envuelto en masa y fritas al momento.",
    precio: 2500,
    cantidad: 50,
    vendedor: "Empanadas El Valle",
    pago: "Nequi, Contra entrega",
    empresaDescripcion: "Pequeño emprendimiento local",
    categoria: "comida"
  },
  {
    nombre: "Jugos Naturales Uba",
    descripcion: "Jugos frescos preparados al momento",
    elaboracion: "Frutas locales licuadas y servidas sin azúcares añadidos.",
    precio: 3000,
    cantidad: 30,
    vendedor: "Jugos Naturales Uba",
    pago: "Daviplata, PSE",
    empresaDescripcion: "Bebidas saludables",
    categoria: "comida"
  },
  // ROPA
  {
    nombre: "Camiseta Artesanal",
    descripcion: "Camisetas con diseños bordados",
    elaboracion: "Tela de algodón con bordados hechos a mano.",
    precio: 45000,
    cantidad: 20,
    vendedor: "Bordados El Sol",
    pago: "Transferencia, Nequi",
    empresaDescripcion: "Marca de ropa	local",
    categoria: "ropa"
  },
  {
    nombre: "Bufandas Tejidas",
    descripcion: "Bufandas de lana tejidas a mano",
    elaboracion: "Hilo de lana natural tejido en diferentes patrones.",
    precio: 35000,
    cantidad: 15,
    vendedor: "Tejidos Ubaté",
    pago: "PSE, Contra entrega",
    empresaDescripcion: "Artesanía textil tradicional",
    categoria: "ropa"
  },
  {
    nombre: "Gorras Personalizadas",
    descripcion: "Gorras con logos variados",
    elaboracion: "Gorras de tela con estampados personalizados.",
    precio: 25000,
    cantidad: 25,
    vendedor: "Gorras Creativas",
    pago: "Tarjeta, Daviplata",
    empresaDescripcion: "Accesorios de moda local",
    categoria: "ropa"
  },
  // ARTESANÍAS
  {
    nombre: "Macetas de Barro",
    descripcion: "Macetas pintadas a mano",
    elaboracion: "Barro moldeado y pintado con diseños únicos.",
    precio: 20000,
    cantidad: 40,
    vendedor: "Arte en Barro",
    pago: "Nequi, PSE",
    empresaDescripcion: "Artesanía cerámica",
    categoria: "artesanias"
  },
  {
    nombre: "Figuritas Tejidas",
    descripcion: "Figuritas decorativas en crochet",
    elaboracion: "Crochet en hilo de algodón formando figuras pequeñas.",
    precio: 15000,
    cantidad: 60,
    vendedor: "Crochet Creativo",
    pago: "Daviplata, Contra entrega",
    empresaDescripcion: "Manualidades con hilo",
    categoria: "artesanias"
  },
  {
    nombre: "Cestería Tradicional",
    descripcion: "Cestas de materiales naturales",
    elaboracion: "Fibras naturales trenzadas con técnicas ancestrales.",
    precio: 50000,
    cantidad: 10,
    vendedor: "Cestería Ubaté",
    pago: "Transferencia",
    empresaDescripcion: "Técnicas ancestrales",
    categoria: "artesanias"
  }
];

// Inicializa por defecto si no hay datos
function initDefault() {
  const stored = JSON.parse(localStorage.getItem(PRODUCT_KEY));
  if (!stored || stored.length === 0) {
    const withExtras = defaultProducts.map(p => ({ ...p, rating: [], image: null }));
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(withExtras));
  }
}

// Mostrar/ocultar secciones
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Cargar productos en sección INICIO (imagen + info)
function loadProducts() {
  const cont = document.getElementById("listaProductos");
  cont.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  productos.forEach(p => {
    const promedio = p.rating.length
      ? (p.rating.reduce((a, b) => a + b, 0) / p.rating.length).toFixed(1)
      : "Sin calificaciones";

    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => showProductDetails(p);

    const imgHTML = p.image
      ? `<div class="image-container"><img src="${p.image}" alt="${p.nombre}"></div>`
      : `<div class="image-container"><img src="https://via.placeholder.com/150" alt="sin imagen"></div>`;

    const infoHTML = `
      <div class="info">
        <h2 class="product-title">${p.nombre}</h2>
        <p><strong>Descripción:</strong> ${p.descripcion}</p>
        <p><strong>Elaboración:</strong> ${p.elaboracion}</p>
        <p class="stars">⭐ ${promedio}</p>
        <button class="order-btn">Ordenar</button>
      </div>`;

    card.innerHTML = imgHTML + infoHTML;
    cont.appendChild(card);
  });
}

// Mostrar modal con detalles, calificación y pedido
function showProductDetails(p) {
  const existing = document.getElementById("modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modal";

  const starsHTML = [1,2,3,4,5]
    .map(n => `<span onclick="calificarProducto('${p.nombre}',${n})">★</span>`)
    .join("");

  modal.innerHTML = `
    <div class="modal-content">
      <h2>${p.nombre}</h2>
      <p><strong>Vendedor:</strong> ${p.vendedor}</p>
      <p><strong>Elaboración:</strong> ${p.elaboracion}</p>
      <p><strong>Descripción:</strong> ${p.descripcion}</p>
      <p><strong>Precio:</strong> $${p.precio}</p>
      <p><strong>Unidades Disponibles:</strong> ${p.cantidad}</p>
      <p><strong>Pago:</strong> ${p.pago}</p>
      <div class="rating-stars">${starsHTML}</div>
      <button class="order-btn" onclick="showOrderForm('${p.nombre}')">Tomar Pedido</button>
      <button class="order-btn" onclick="document.getElementById('modal').remove()">Cerrar</button>
      <div id="orderFormContainer"></div>
    </div>`;

  document.body.appendChild(modal);
}

// Mostrar formulario de pedido dentro del modal
function showOrderForm(nombre) {
  const container = document.getElementById("orderFormContainer");
  container.innerHTML = `
    <form class="order-form" onsubmit="handleOrder(event,'${nombre}')">
      <label>Nombre Cliente:</label>
      <input type="text" name="cliente" required>
      <label>Número de Celular:</label>
      <input type="tel" name="telefono" required>
      <label>Dirección:</label>
      <input type="text" name="direccion" required>
      <label>Cantidad:</label>
      <input type="number" name="cantidad" min="1" required>
      <label>Detalle Pedido:</label>
      <textarea name="detalle"></textarea>
      <label>Método de Pago:</label>
      <select name="metodoPago">
        <option>Transferencia Nequi</option>
        <option>Transferencia Daviplata</option>
        <option>Bancolombia</option>
        <option>PSE</option>
        <option>Débito/Crédito</option>
      </select>
      <button type="submit" class="order-btn">Guardar Pedido</button>
    </form>`;
}

// Procesar envío de pedido
function handleOrder(e, nombre) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  const idx = productos.findIndex(p => p.nombre === nombre);
  let success = false;

  if (idx > -1 && parseInt(data.cantidad, 10) <= productos[idx].cantidad) {
    productos[idx].cantidad -= parseInt(data.cantidad, 10);
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(productos));
    loadProducts();
    success = true;
  }

  const resDiv = document.createElement("div");
  resDiv.className = `order-result ${success ? 'success' : 'failure'}`;
  resDiv.innerHTML = success
    ? `<div class="icon">✓</div>Pedido Exitoso`
    : `<div class="icon">✖</div>Pedido Fallido`;
  form.replaceWith(resDiv);
}

// Guardar calificación en localStorage
function calificarProducto(nombre, rating) {
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  const idx = productos.findIndex(p => p.nombre === nombre);
  if (idx > -1) {
    productos[idx].rating.push(rating);
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(productos));
    alert(`Gracias por tu calificación de ${rating} estrella(s)!`);
    document.getElementById("modal").remove();
    loadProducts();
  }
}

// Filtrar productos por categoría
function filterByCategory(val) {
  const cont = document.getElementById("listaProductos");
  cont.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  productos
    .filter(p => val === "all" || p.categoria === val)
    .forEach(p => {
      const promedio = p.rating.length
        ? (p.rating.reduce((a, b) => a + b, 0) / p.rating.length).toFixed(1)
        : "Sin calificaciones";

      const card = document.createElement("div");
      card.className = "product-card";
      card.onclick = () => showProductDetails(p);

      const imgHTML = p.image
        ? `<div class="image-container"><img src="${p.image}" alt="${p.nombre}"></div>`
        : `<div class="image-container"><img src="https://via.placeholder.com/150" alt="sin imagen"></div>`;

      const infoHTML = `
        <div class="info">
          <h2 class="product-title">${p.nombre}</h2>
          <p><strong>Descripción:</strong> ${p.descripcion}</p>
          <p><strong>Elaboración:</strong> ${p.elaboracion}</p>
          <p class="stars">⭐ ${promedio}</p>
          <button class="order-btn">Ordenar</button>
        </div>`;

      card.innerHTML = imgHTML + infoHTML;
      cont.appendChild(card);
    });
}

// Autenticación de login
function autenticarUsuario(email, pass) {
  const u = usuarios.find(u => u.email === email && u.password === pass);
  if (u) {
    localStorage.setItem("userName", u.nombre);
    localStorage.setItem("userEmail", u.email);
    mostrarPerfil();
    showSection("perfil");
    return true;
  }
  return false;
}

// Mostrar perfil y formulario de creación
function mostrarPerfil() {
  const nombre = localStorage.getItem("userName");
  const perfil = document.getElementById("perfil");
  if (!nombre) {
    perfil.innerHTML = `<div class="product-card"><p>Debes iniciar sesión para ver tu perfil.</p></div>`;
    return;
  }

  perfil.innerHTML = `
    <div class="product-card">
      <h2 class="product-title">Mi Perfil</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${localStorage.getItem("userEmail")}</p>
      <button onclick="logout()" class="order-btn">Cerrar sesión</button>
    </div>
    <div class="product-card">
      <h2 class="product-title">Crear Producto</h2>
      <form id="productFormPerfil">
        <input type="text" id="nombreProducto" placeholder="Nombre del Producto" required>
        <textarea id="descripcionProducto" placeholder="Descripción" required></textarea>
        <textarea id="elaboracionProducto" placeholder="Cómo se elabora" required></textarea>
        <input type="number" id="precioProducto" placeholder="Precio" required>
        <input type="number" id="cantidadProducto" placeholder="Cantidad Disponible" required>
        <input type="text" id="vendedorProducto" placeholder="Vendedor o Empresa" required>
        <input type="text" id="pagoProducto" placeholder="Medios de Pago" required>
        <select id="categoriaProducto" required>
          <option value="comida">Comida</option>
          <option value="ropa">Ropa</option>
          <option value="artesanias">Artesanías</option>
        </select>
        <label for="imagenProducto">Imagen del producto:</label>
        <input type="file" id="imagenProducto" accept="image/*">
        <button type="submit" class="order-btn">Publicar Producto</button>
      </form>
    </div>`;

  document.getElementById("productFormPerfil")
    .addEventListener("submit", handlePerfilForm);
}

// Manejar envío de creación de producto
function handlePerfilForm(e) {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = () => {
    const producto = {
      nombre: document.getElementById("nombreProducto").value,
      descripcion: document.getElementById("descripcionProducto").value,
      elaboracion: document.getElementById("elaboracionProducto").value,
      precio: Number(document.getElementById("precioProducto").value),
      cantidad: Number(document.getElementById("cantidadProducto").value),
      vendedor: document.getElementById("vendedorProducto").value,
      pago: document.getElementById("pagoProducto").value,
      categoria: document.getElementById("categoriaProducto").value,
      empresaDescripcion: "Registrado por usuario",
      rating: [],
      image: reader.result
    };
    const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
    productos.unshift(producto);
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(productos));
    alert("¡Producto publicado!");
    loadProducts();
    showSection("inicio");
  };

  const file = document.getElementById("imagenProducto").files[0];
  if (file) reader.readAsDataURL(file);
  else reader.onload();
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  mostrarPerfil();
  showSection("inicio");
}

// Mostrar items al pasar cursor en CATEGORÍAS
function showCategoryItems(cat, id) {
  const tgt = document.getElementById(id);
  tgt.innerHTML = "";
  (JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [])
    .filter(p => p.categoria === cat)
    .forEach(p => {
      const d = document.createElement("div");
      d.textContent = p.nombre;
      tgt.appendChild(d);
    });
}

function clearCategoryItems(id) {
  document.getElementById(id).innerHTML = "";
}

// Cerrar aplicación
function closeApp() {
  window.close();
}

// Listener para login
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm")
    .addEventListener("submit", e => {
      e.preventDefault();
      const ok = autenticarUsuario(
        document.getElementById("loginEmail").value,
        document.getElementById("loginPassword").value
      );
      document.getElementById("loginError").textContent = ok ? "" : "Usuario o contraseña inválidos.";
    });
});

// Inicialización
window.onload = () => {
  initDefault();
  loadProducts();
  mostrarPerfil();
  document.getElementById("category")
    .addEventListener("change", e => filterByCategory(e.target.value));
};
