const Footer = () => {
  return (
    <footer className="bg-red-800 text-gray-200 pt-10 pb-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-red-700">
        {/* Marca y descripción */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Ferremas</h2>
          <p className="text-sm">
            Tu ferretería de confianza. Encuentra todo lo que necesitas para tus
            proyectos, con la mejor atención y calidad.
          </p>
        </div>
        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <a href="/catalog" className="hover:text-yellow-300 transition">
                Catálogo
              </a>
            </li>
            <li>
              <a href="/#faq" className="hover:text-yellow-300 transition">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a href="/#contacto" className="hover:text-yellow-300 transition">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        {/* Para Desarrolladores */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Desarrolladores
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/developers"
                className="hover:text-blue-300 transition flex items-center gap-1"
              >
                🔗 API Pública
              </a>
            </li>
            <li>
              <a
                href="/developers/docs"
                className="hover:text-blue-300 transition flex items-center gap-1"
              >
                📚 Documentación
              </a>
            </li>
            <li>
              <a
                href="/developers"
                className="hover:text-blue-300 transition flex items-center gap-1"
              >
                🚀 Integración
              </a>
            </li>
          </ul>
        </div>
        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Síguenos</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-yellow-300 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.006 3.676 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.128 22 17.006 22 12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-yellow-300 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <a
              href="mailto:contacto@ferremas.cl"
              aria-label="Email"
              className="hover:text-yellow-300 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 17.25V6.75zm1.5 0v.638l8.25 5.512 8.25-5.512V6.75a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75zm16.5 1.862-7.728 5.167a1.5 1.5 0 0 1-1.544 0L3.75 8.612v8.638c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V8.612z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} Ferremas. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
