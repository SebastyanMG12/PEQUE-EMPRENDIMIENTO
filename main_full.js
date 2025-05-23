// Clave de almacenamiento
const PRODUCT_KEY = "emprendimientos";

// Emprendimientos por defecto
const defaultProducts = [
  { nombre: "Arepas Doña Rosa", descripcion: "Arepas artesanales hechas en casa", elaboracion: "Masa de maíz amarilla molida y cocida en budare artesanal.", precio: "3500", cantidad: 40, vendedor: "Doña Rosa", pago: "Nequi, Daviplata, PSE, Tarjeta débito/crédito", empresaDescripcion: "Negocio familiar con tradición de más de 20 años", categoria: "comida" },
  { nombre: "Empanadas El Valle", descripcion: "Empanadas de diversos rellenos", elaboracion: "Relleno de carne, pollo o queso envuelto en masa y fritas al momento.", precio: "2500", cantidad: 50, vendedor: "Empanadas El Valle", pago: "Nequi, Contra entrega", empresaDescripcion: "Pequeño emprendimiento local", categoria: "comida" },
  { nombre: "Jugos Naturales Uba", descripcion: "Jugos frescos preparados al momento", elaboracion: "Frutas locales licuadas y servidas sin azúcares añadidos.", precio: "3000", cantidad: 30, vendedor: "Jugos Naturales Uba", pago: "Daviplata, PSE", empresaDescripcion: "Bebidas saludables", categoria: "comida" },
  { nombre: "Camiseta Artesanal", descripcion: "Camisetas con diseños bordados", elaboracion: "Tela de algodón con bordados hechos a mano.", precio: "45000", cantidad: 20, vendedor: "Bordados El Sol", pago: "Transferencia, Nequi", empresaDescripcion: "Marca de ropa local", categoria: "ropa" },
  { nombre: "Bufandas Tejidas", descripcion: "Bufandas de lana tejidas a mano", elaboracion: "Hilo de lana natural tejido en diferentes patrones.", precio: "35000", cantidad: 15, vendedor: "Tejidos Ubaté", pago: "PSE, Contra entrega", empresaDescripcion: "Artesanía textil tradicional", categoria: "ropa" },
  { nombre: "Gorras Personalizadas", descripcion: "Gorras con logos variados", elaboracion: "Gorras de tela con estampados personalizados.", precio: "25000", cantidad: 25, vendedor: "Gorras Creativas", pago: "Tarjeta, Daviplata", empresaDescripcion: "Accesorios de moda local", categoria: "ropa" },
  { nombre: "Macetas de Barro", descripcion: "Macetas pintadas a mano", elaboracion: "Barro moldeado y pintado con diseños únicos.", precio: "20000", cantidad: 40, vendedor: "Arte en Barro", pago: "Nequi, PSE", empresaDescripcion: "Artesanía cerámica", categoria: "artesanias" },
  { nombre: "Figuritas Tejidas", descripcion: "Figuritas decorativas en crochet", elaboracion: "Crochet en hilo de algodón formando figuras pequeñas.", precio: "15000", cantidad: 60, vendedor: "Crochet Creativo", pago: "Daviplata, Contra entrega", empresaDescripcion: "Manualidades con hilo", categoria: "artesanias" },
  { nombre: "Cestería Tradicional", descripcion: "Cestas de materiales naturales", elaboracion: "Fibras naturales trenzadas con técnicas ancestrales.", precio: "50000", cantidad: 10, vendedor: "Cestería Ubaté", pago: "Transferencia", empresaDescripcion: "Técnicas ancestrales", categoria: "artesanias" }
];

// Inicializa por defecto si no hay datos
function initDefault() {
  const stored = JSON.parse(localStorage.getItem(PRODUCT_KEY));
  if (!stored || stored.length === 0) {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(defaultProducts));
  }
}

// Cambia de sección
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Mostrar modal de detalles
function showProductDetails(productInfo) {
  const existing = document.getElementById("modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${productInfo.nombre}</h2>
      <p><strong>Empresa/Vendedor:</strong> ${productInfo.vendedor}</p>
      <p><strong>Cómo se elabora:</strong> ${productInfo.elaboracion}</p>
      <p><strong>Sobre la Empresa:</strong> ${productInfo.empresaDescripcion}</p>
      <p><strong>Descripción del Producto:</strong> ${productInfo.descripcion}</p>
      <p><strong>Precio:</strong> $${productInfo.precio}</p>
      <p><strong>Unidades Disponibles:</strong> ${productInfo.cantidad}</p>
      <p><strong>Medios de Pago:</strong> ${productInfo.pago}</p>
      <div class="rating-stars">
        <span onclick="rateProduct(1, this)">★</span>
        <span onclick="rateProduct(2, this)">★</span>
        <span onclick="rateProduct(3, this)">★</span>
        <span onclick="rateProduct(4, this)">★</span>
        <span onclick="rateProduct(5, this)">★</span>
      </div>
      <button onclick="document.getElementById('modal').remove()" class="order-btn">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Puntuación por estrellas
function rateProduct(rating, el) {
  const stars = el.parentElement.querySelectorAll("span");
  stars.forEach((star, i) => star.classList.toggle("selected", i < rating));
}

// Crear / guardar producto
function submitProductForm() {
  const producto = {
    nombre: document.getElementById("nombreProducto").value,
    descripcion: document.getElementById("descripcionProducto").value,
    elaboracion: document.getElementById("elaboracionProducto").value,
    precio: document.getElementById("precioProducto").value,
    cantidad: document.getElementById("cantidadProducto").value,
    vendedor: document.getElementById("vendedorProducto").value,
    pago: document.getElementById("pagoProducto").value,
    empresaDescripcion: "Nuevo emprendimiento registrado por el usuario",
    categoria: document.getElementById("categoriaProducto").value
  };
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  productos.push(producto);
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(productos));
  loadProducts();
  showSection("inicio");
  return false;
}

// Carga productos en lista
function loadProducts() {
  const cont = document.getElementById("listaProductos");
  if (!cont) return;
  cont.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => showProductDetails(p);
    card.innerHTML = `
      <h2 class="product-title">${p.nombre}</h2>
      <p>${p.descripcion}</p>
      <p><em>${p.elaboracion}</em></p>
      <p class="stars">★★★★★</p>
      <button class="order-btn">Ordenar</button>
    `;
    cont.appendChild(card);
  });
}

// Filtrar por categoría en INICIO
function filterByCategory(value) {
  const cont = document.getElementById("listaProductos");
  if (!cont) return;
  cont.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  productos
    .filter(p => value === "all" || p.categoria === value)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.onclick = () => showProductDetails(p);
      card.innerHTML = `
        <h2 class="product-title">${p.nombre}</h2>
        <p>${p.descripcion}</p>
        <p><em>${p.elaboracion}</em></p>
        <p class="stars">★★★★★</p>
        <button class="order-btn">Ordenar</button>
      `;
      cont.appendChild(card);
    });
}

// Hover en CATEGORÍAS
function showCategoryItems(cat, id) {
  const tgt = document.getElementById(id);
  tgt.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  productos
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

// Cerrar ventana
function closeApp() {
  window.close();
}

// Al arrancar
window.onload = () => {
  initDefault();
  loadProducts();
  document.getElementById("category")
    .addEventListener("change", e => filterByCategory(e.target.value));
};