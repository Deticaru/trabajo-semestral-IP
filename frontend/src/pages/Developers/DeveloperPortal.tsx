import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { NavLink } from "react-router-dom";

const DeveloperPortal = () => {
  const endpoints = [
    {
      method: "GET",
      url: "/api/public/productos/",
      description: "Lista todos los productos con detalles completos",
      params: "?categoria=1&marca=2",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      method: "GET",
      url: "/api/public/categorias/",
      description: "Lista todas las categorías disponibles",
      params: "",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      method: "GET",
      url: "/api/public/marcas/",
      description: "Lista todas las marcas de productos",
      params: "",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      method: "GET",
      url: "/api/public/sucursales/",
      description: "Lista todas las sucursales con direcciones",
      params: "",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const features = [
    {
      icon: "🔓",
      title: "Sin Autenticación",
      description: "Acceso libre sin necesidad de API keys o tokens",
    },
    {
      icon: "📊",
      title: "Datos Completos",
      description: "Productos con marca, categoría, imágenes y stock",
    },
    {
      icon: "🔍",
      title: "Filtros Avanzados",
      description: "Filtra por categoría, marca y otros parámetros",
    },
    {
      icon: "⚡",
      title: "Tiempo Real",
      description: "Información actualizada de stock y precios",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="mb-6">
              <span className="text-6xl">🔗</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              API de Ferremas para Desarrolladores
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Conecta tu aplicación o negocio a nuestro catálogo completo de
              productos. Acceso gratuito y sin restricciones a datos de
              productos, categorías, marcas y stock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/developers/docs"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                📚 Ver Documentación
              </NavLink>
              <NavLink
                to="/developers/docs"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                🚀 Probar API
              </NavLink>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              ¿Por qué usar nuestra API?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-4xl mb-4 text-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Endpoints Disponibles */}
        <div className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Endpoints Disponibles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {endpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-white font-medium bg-gradient-to-r ${endpoint.gradient}`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm bg-gray-200 px-3 py-1 rounded font-mono">
                      {endpoint.url}
                    </code>
                  </div>
                  <p className="text-gray-700 mb-3">{endpoint.description}</p>
                  {endpoint.params && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <span className="text-sm text-yellow-700 font-medium">
                        Parámetros opcionales:{" "}
                      </span>
                      <code className="text-yellow-800">{endpoint.params}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ejemplo de Respuesta */}
        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Ejemplo de Respuesta
            </h2>
            <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                {`{
  "results": [
    {
      "id": 1,
      "nom_producto": "Taladro Eléctrico Bosch",
      "desc_producto": "Taladro profesional de alta potencia...",
      "precio_producto": "89990.00",
      "categoria": {
        "id": 1,
        "nom_categoria": "Herramientas Eléctricas"
      },
      "marca": {
        "id": 1,
        "nom_marca": "Bosch"
      },
      "imagenes": [
        {
          "imagen_producto": "/media/productos/taladro.jpg",
          "puesto_imagen": 1
        }
      ],
      "stock_sucursales": [
        {
          "stock": 15,
          "sucursal": {
            "id": 1,
            "nom_sucursal": "Ferremas Mall Plaza",
            "direccion_sucursal": "Av. Kennedy 123"
          }
        }
      ]
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para integrar?</h2>
            <p className="text-xl mb-8">
              Empieza a usar nuestra API ahora mismo. Es completamente gratuita
              y no requiere registro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/developers/docs"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                📖 Leer Documentación
              </NavLink>
              <a
                href={`${import.meta.env.VITE_API_URL}/api/public/productos/`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                🔗 Probar Ahora
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeveloperPortal;
