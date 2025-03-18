
import { FaFacebook, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaArrowUp } from "react-icons/fa";
import React from "react";

const ClientFooter = () => {
  return (
    <footer className="bg-green-900 text-white py-8 font-sans">
      <div className="w-4/5 mx-auto flex flex-col items-center">
        {/* Phần trên: Giới thiệu + Social Media */}
        <div className="text-center mb-4">
          <p className="max-w-lg text-sm opacity-80 leading-relaxed">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Elusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua
          </p>
          <div className="flex justify-center gap-4 mt-2">
            {[
              { icon: <FaFacebook />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaYoutube />, link: "#" },
              { icon: <FaInstagram />, link: "#" }
            ].map((social, index) => (
              <a key={index} href={social.link} className="text-xl hover:text-gray-300 transition">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Phần giữa: Các cột liên kết */}
        <div className="flex flex-wrap justify-between w-full mt-5 px-5 gap-6">
          {[
            { title: "Um", links: ["Kontaktiere Uns", "Über Uns", "Karriere", "Unternehmensinformationen"] },
            { title: "Hilfe", links: ["Unsere Produkten", "Zahlung", "Versand", "Stornierung & Rückgabe", "Verstoß Melden"] },
            { title: "Politik", links: ["Rücknahmegarantie", "Nutzungsbedingungen", "Sicherheit", "Privatsphäre", "Seitenverzeichnis"] }
          ].map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-2">{column.title}</h4>
              {column.links.map((link, i) => (
                <a key={i} href="#" className="block text-sm opacity-80 hover:underline transition">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Phần dưới: Bản quyền & Phương thức thanh toán */}
      <div className="bg-green-950 flex flex-col md:flex-row justify-between items-center py-4 mt-5 w-4/5 mx-auto gap-4">
        <p className="text-sm text-center md:text-left">© 2023 hood.de, Inc.</p>
        <img src="./img/icons_payment 1.png" alt="Payment Methods" className="w-40" />
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="flex items-center gap-2 text-sm hover:underline transition"
        >
          Scroll to top <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default ClientFooter;
