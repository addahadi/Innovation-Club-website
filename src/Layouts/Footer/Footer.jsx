import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-neutral-300  mb-4 p-10 md:p-16   w-full">
      <div className="absolute inset-0 pointer-events-none mb-6 "></div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-12">
        {/* Location */}
        <div className="flex flex-col gap-5">
          <h3 className="text-white font-semibold text-xl">Location</h3>
          <p className="text-neutral-400 leading-relaxed">
            Tiaret, Algeria <br />
            University Ibn Khaldoun
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">Get in touch</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:+1234567890"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="phone">📞</span> +1 (234) 567-890
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@graphy.com"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="mail">✉️</span> hello@graphy.com
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">Navigation</h3>
          <ul className="space-y-3">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">Socials</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="instagram">📸</span> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="tiktok">🎵</span> TikTok
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="linkedin">💼</span> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-neutral-800/70 mb-6"></div>

      {/* Bottom Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
        <div>
          © {currentYear} <span className="text-white font-medium">Graphy</span>. All rights reserved.
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="/cookies" className="hover:text-white transition-colors">
            Cookies Settings
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
