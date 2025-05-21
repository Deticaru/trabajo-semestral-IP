import ContactForm from "../../components/ContactForm/ContactForm";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            ¿Tienes alguna duda o consulta?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Completa el formulario y nos pondremos en contacto contigo lo antes
            posible.
          </p>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </>
  );
}
