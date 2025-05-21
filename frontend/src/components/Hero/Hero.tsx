// components/Hero/Hero.tsx
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Ferretería profesional"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Contenido del Hero */}
      <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Herramientas profesionales para tus proyectos
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Encuentra todo lo que necesitas en nuestra ferretería con los
            mejores precios y calidad garantizada
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/catalog"
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-700 hover:bg-red-800 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Ver productos
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
