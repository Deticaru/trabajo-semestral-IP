import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Martillo profesional",
      description: "Martillo de acero forjado con mango ergonómico.",
      price: "$15.99",
      image:
        "https://images.unsplash.com/photo-1586985289688-ca3cf06d435d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Juego de destornilladores",
      description: "Set de 6 piezas con puntas intercambiables.",
      price: "$22.50",
      image:
        "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Taladro inalámbrico",
      description: "20V con batería de litio y 15 ajustes de torque.",
      price: "$89.99",
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        {/* Nuevo componente Hero */}
        <Hero />

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
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-red-700">
                      {product.price}
                    </p>
                    <button className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-md transition-colors duration-200">
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/servicios"
              className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transition-colors"
            >
              Ver todos los productos
            </a>
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
      </main>
      <Footer />
    </>
  );
};

export default Home;
