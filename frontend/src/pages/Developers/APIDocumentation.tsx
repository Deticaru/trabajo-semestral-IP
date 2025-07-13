import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

type EndpointKey = "productos" | "categorias" | "marcas" | "sucursales";
type CodeLanguage = "javascript" | "python" | "curl";

const APIDocumentation = () => {
  const [activeEndpoint, setActiveEndpoint] =
    useState<EndpointKey>("productos");

  const endpoints = {
    productos: {
      title: "Productos",
      method: "GET",
      url: "/api/public/productos/",
      description:
        "Obtiene la lista completa de productos con información detallada incluyendo marca, categoría, imágenes y stock por sucursal.",
      parameters: [
        {
          name: "categoria",
          type: "integer",
          description: "Filtrar por ID de categoría",
          example: "?categoria=1",
        },
        {
          name: "marca",
          type: "integer",
          description: "Filtrar por ID de marca",
          example: "?marca=2",
        },
        {
          name: "page",
          type: "integer",
          description: "Número de página para paginación",
          example: "?page=2",
        },
      ],
      response: {
        count: 25,
        next: "http://localhost:8000/api/public/productos/?page=2",
        previous: null,
        results: [
          {
            id: 1,
            nom_producto: "Taladro Eléctrico Bosch GSB 13 RE",
            desc_producto:
              "Taladro percutor profesional de 650W con portabrocas de 13mm...",
            precio_producto: "89990.00",
            categoria: {
              id: 1,
              nom_categoria: "Herramientas Eléctricas",
            },
            marca: {
              id: 1,
              nom_marca: "Bosch",
            },
            imagenes: [
              {
                imagen_producto: "/media/productos/taladro_bosch.jpg",
                puesto_imagen: 1,
              },
            ],
            stock_sucursales: [
              {
                stock: 15,
                sucursal: {
                  id: 1,
                  nom_sucursal: "Ferremas Mall Plaza",
                  direccion_sucursal: "Av. Kennedy 123, Las Condes",
                },
              },
            ],
          },
        ],
      },
    },
    categorias: {
      title: "Categorías",
      method: "GET",
      url: "/api/public/categorias/",
      description:
        "Obtiene la lista de todas las categorías de productos disponibles.",
      parameters: [],
      response: [
        {
          id: 1,
          nom_categoria: "Herramientas Eléctricas",
        },
        {
          id: 2,
          nom_categoria: "Ferretería",
        },
        {
          id: 3,
          nom_categoria: "Pinturas",
        },
      ],
    },
    marcas: {
      title: "Marcas",
      method: "GET",
      url: "/api/public/marcas/",
      description: "Obtiene la lista de todas las marcas de productos.",
      parameters: [],
      response: [
        {
          id: 1,
          nom_marca: "Bosch",
        },
        {
          id: 2,
          nom_marca: "Stanley",
        },
        {
          id: 3,
          nom_marca: "DeWalt",
        },
      ],
    },
    sucursales: {
      title: "Sucursales",
      method: "GET",
      url: "/api/public/sucursales/",
      description:
        "Obtiene la lista de todas las sucursales con sus direcciones.",
      parameters: [],
      response: [
        {
          id: 1,
          nom_sucursal: "Ferremas Mall Plaza",
          direccion_sucursal: "Av. Kennedy 123, Las Condes",
        },
        {
          id: 2,
          nom_sucursal: "Ferremas Centro",
          direccion_sucursal: "Huérfanos 456, Santiago Centro",
        },
      ],
    },
  };

  const codeExamples: Record<CodeLanguage, string> = {
    javascript: `// Ejemplo con JavaScript/Node.js
fetch('${import.meta.env.VITE_API_URL}/api/public/productos/')
  .then(response => response.json())
  .then(data => {
    console.log('Productos:', data.results);
    data.results.forEach(producto => {
      console.log(\`\${producto.nom_producto} - $\${producto.precio_producto}\`);
    });
  })
  .catch(error => console.error('Error:', error));`,

    python: `# Ejemplo con Python
import requests

response = requests.get('${import.meta.env.VITE_API_URL}/api/public/productos/')
data = response.json()

for producto in data['results']:
    print(f"{producto['nom_producto']} - {producto['precio_producto']}")`,

    curl: `# Ejemplo con cURL
curl -X GET "${import.meta.env.VITE_API_URL}/api/public/productos/" \\
     -H "Accept: application/json"

# Filtrar por categoría
curl -X GET "${
      import.meta.env.VITE_API_URL
    }/api/public/productos/?categoria=1" \\
     -H "Accept: application/json"`,
  };

  const [activeCodeTab, setActiveCodeTab] =
    useState<CodeLanguage>("javascript");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">
              📚 Documentación de la API
            </h1>
            <p className="text-xl">
              Guía completa para integrar la API de Ferremas en tu aplicación
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Endpoints
                </h3>
                <nav className="space-y-2">
                  {Object.entries(endpoints).map(([key, endpoint]) => (
                    <button
                      key={key}
                      onClick={() => setActiveEndpoint(key as EndpointKey)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeEndpoint === key
                          ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {endpoint.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Información Base */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  🌐 Información General
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      URL Base
                    </h4>
                    <code className="bg-gray-100 px-3 py-2 rounded-lg block text-sm">
                      {import.meta.env.VITE_API_URL}/api/public/
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Formato
                    </h4>
                    <code className="bg-gray-100 px-3 py-2 rounded-lg block text-sm">
                      JSON
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Autenticación
                    </h4>
                    <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                      ✓ No requerida
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Rate Limit
                    </h4>
                    <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                      ∞ Sin límites
                    </span>
                  </div>
                </div>
              </div>

              {/* Endpoint Específico */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-lg font-medium text-sm">
                    {endpoints[activeEndpoint].method}
                  </span>
                  <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm">
                    {endpoints[activeEndpoint].url}
                  </code>
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {endpoints[activeEndpoint].title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {endpoints[activeEndpoint].description}
                </p>

                {/* Parámetros */}
                {endpoints[activeEndpoint].parameters.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Parámetros de Query
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                              Parámetro
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                              Tipo
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                              Descripción
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                              Ejemplo
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoints[activeEndpoint].parameters.map(
                            (param, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-4 py-2 font-mono text-sm">
                                  {param.name}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-600">
                                  {param.type}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                  {param.description}
                                </td>
                                <td className="px-4 py-2 font-mono text-sm text-blue-600">
                                  {param.example}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Respuesta de Ejemplo */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Respuesta de Ejemplo
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      {JSON.stringify(
                        endpoints[activeEndpoint].response,
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Ejemplos de Código */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  🔧 Ejemplos de Código
                </h3>

                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                  {Object.keys(codeExamples).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveCodeTab(lang as CodeLanguage)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeCodeTab === lang
                          ? "bg-white text-gray-900 shadow"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {lang === "javascript"
                        ? "JavaScript"
                        : lang === "python"
                        ? "Python"
                        : "cURL"}
                    </button>
                  ))}
                </div>

                {/* Code Content */}
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    {codeExamples[activeCodeTab]}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default APIDocumentation;
