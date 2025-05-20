const Footer = () => {
  return (
    <footer className="bg-red-800 text-gray-300 text-center py-10">
      <p className="text-lg font-semibold mb-2">
        © {new Date().getFullYear()} Ferremas. Todos los derechos reservados.
      </p>
      <p className="text-sm">
        Tu ferretería de confianza. Encuentra todo lo que necesitas para tus
        proyectos.
      </p>
    </footer>
  );
};

export default Footer;
