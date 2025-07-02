// @ts-ignore
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Usa tu contexto real

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Usa el mismo hook/contexto que en Product/Catalog
  const [clickedId, setClickedId] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Inicio";
    fetch("http://localhost:8000/api/productos/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Últimos 3 productos (ordenados del más nuevo al más antiguo)
  const featuredProducts = products.slice(-3).reverse();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        <Hero />
        <div className="bg-gradient-to-r from-red-700 to-yellow-400 text-white py-4 px-6 rounded-lg shadow mb-8 text-center font-semibold text-lg">
          ¡Envío gratis por compras sobre $50.000! 🚚✨
        </div>
        {/* Productos destacados */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Productos Destacados
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Las herramientas más vendidas de nuestro catálogo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="col-span-3 text-center">Cargando productos...</p>
            ) : featuredProducts.length === 0 ? (
              <p className="col-span-3 text-center">No hay productos disponibles.</p>
            ) : (
              featuredProducts.map((product) => {
                const img =
                  product.imagenes && product.imagenes.length > 0
                    ? product.imagenes[0].imagen_producto.startsWith("http")
                      ? product.imagenes[0].imagen_producto
                      : `http://localhost:8000${product.imagenes[0].imagen_producto}`
                    : "";
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                      <img
                        src={img}
                        alt={product.nom_producto}
                        className="max-h-60 object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.nom_producto}
                      </h3>
                      <p className="text-gray-600 mb-4">{product.desc_producto}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-red-700">
                          ${Number(product.precio_producto).toLocaleString()}
                        </p>
                        <span className="relative">
                          <button
                            className={`bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-md transition-all duration-300
                              ${clickedId === product.id ? "ring-2 ring-green-400 scale-105 shadow-lg" : ""}
                            `}
                            onClick={e => {
                              e.stopPropagation();
                              addToCart({
                                id: product.id,
                                title: product.nom_producto,
                                image: img,
                                price: product.precio_producto,
                                quantity: 1,
                              });
                              setClickedId(product.id);
                              setTimeout(() => setClickedId(null), 700);
                            }}
                          >
                            Añadir al carrito
                          </button>
                          {clickedId === product.id && (
                            <span
                              style={{
                                position: "absolute",
                                top: "-2.2rem",
                                right: 0,
                                background: "#22c55e",
                                color: "white",
                                fontSize: "0.85rem",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "9999px",
                                boxShadow: "0 2px 8px rgba(34,197,94,0.15)",
                                opacity: 1,
                                animation: "fadeInUp .5s",
                                pointerEvents: "none",
                                zIndex: 10,
                              }}
                            >
                              ¡Agregado!
                            </span>
                          )}
                          {/* Animación inline */}
                          <style>
                            {`
                              @keyframes fadeInUp {
                                from { opacity: 0; transform: translateY(10px);}
                                to { opacity: 1; transform: translateY(0);}
                              }
                            `}
                          </style>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/catalog"
              className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transition-colors"
            >
              Ver todos los productos
            </a>
          </div>
        </section>
        <section className="py-8">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-8 overflow-x-auto">
            <img
              src="https://vgcibiza.com/templates/yootheme/cache/2a/bosch-2a28d282.jpeg"
              alt="Bosch"
              className="h-12 grayscale hover:grayscale-0 transition"
            />
            <img
              src="https://cdn.worldvectorlogo.com/logos/makita-logo-1.svg"
              alt="Makita"
              className="h-12 grayscale hover:grayscale-0 transition"
            />
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_707545-MLA74838866244_032024-F.jpg"
              alt="DeWalt"
              className="h-12 grayscale hover:grayscale-0 transition"
            />
            <img
              src="https://www.brandemia.org/wp-content/uploads/2013/06/stanley_logo_principal.jpg"
              alt="Stanley"
              className="h-12 grayscale hover:grayscale-0 transition"
            />
            {/* Agrega más marcas si quieres */}
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Nuestros clientes opinan
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 italic">
                  "Excelente atención y productos de calidad. ¡Volveré a
                  comprar!"
                </p>
                <div className="mt-4 font-semibold text-red-700">
                  - Camila R.
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 italic">
                  "El envío fue rapidísimo y el taladro funciona perfecto."
                </p>
                <div className="mt-4 font-semibold text-red-700">- Juan P.</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 italic">
                  "Muy recomendable, encontré todo lo que necesitaba."
                </p>
                <div className="mt-4 font-semibold text-red-700">
                  - Fernanda S.
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Sección de características */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                ¿Por qué elegir Ferremas?
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
                Las mejores herramientas con el mejor servicio
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Característica 1 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-red-100 text-red-700 mx-auto">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">
                    Calidad garantizada
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    Productos de las mejores marcas con garantía extendida
                  </p>
                </div>

                {/* Característica 2 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-red-100 text-red-700 mx-auto">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">
                    Entrega rápida
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    Recibe tus productos en 24-48 horas en tu domicilio
                  </p>
                </div>

                {/* Característica 3 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-red-100 text-red-700 mx-auto">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">
                    Pago seguro
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    Múltiples métodos de pago con seguridad SSL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              <details className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  ¿Cuánto demora el envío?
                </summary>
                <p className="mt-2 text-gray-600">
                  El envío demora entre 24 y 48 horas hábiles en todo Chile.
                </p>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  ¿Puedo pagar en cuotas?
                </summary>
                <p className="mt-2 text-gray-600">
                  Sí, aceptamos pagos en cuotas con tarjetas de crédito.
                </p>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  ¿Tienen garantía los productos?
                </summary>
                <p className="mt-2 text-gray-600">
                  Todos nuestros productos cuentan con garantía de 6 meses
                  mínimo.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
