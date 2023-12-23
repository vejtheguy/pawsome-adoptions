// Footer.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-psBlue text-white mt-16 px-16 pt-8 w-full text-center md:text-start absolute top-full">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold font-flower">
              Pawsome Adoptions
            </h1>
            <p className="text-sm ml-2">Find your perfect furry friend!</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p className="text-sm">Email: info@pawsomeadoptions.com</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-2">
              <a href="#/home" className="text-white" target="_blank">
                <FontAwesomeIcon icon={faFacebookSquare} size="2xl" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#/home" className="text-white" target="_blank">
                <FontAwesomeIcon icon={faTwitterSquare} size="2xl" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#/home" className="text-white" target="_blank">
                <FontAwesomeIcon icon={faInstagramSquare} size="2xl" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-20 pb-10">
          <p>&copy; {currentYear} Pawsome Adoptions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
