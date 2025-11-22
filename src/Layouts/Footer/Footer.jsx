const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-neutral-300  mb-4 p-10 md:p-16 w-full">
      <div className="absolute inset-0 pointer-events-none mb-6"></div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-12">
        <div className="flex flex-col gap-5">
          <h3 className="text-white font-semibold text-xl">
            {language.location.title}
          </h3>
          <p className="text-neutral-400 leading-relaxed">
            {language.location.address} <br />
            {language.location.university}
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold text-xl mb-4">
            {language.contact.title}
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href={`tel:${language.contact.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="phone">
                  📞
                </span>{" "}
                {language.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${language.contact.email}`}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="mail">
                  ✉️
                </span>{" "}
                {language.contact.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">
            {language.navigation.title}
          </h3>
          <ul className="space-y-3">
            {language.navigation.links.map((link, index) => (
              <li key={index}>
                <a
                  href={index === 0 ? "/" : `/${link.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-xl mb-4">
            {language.socials.title}
          </h3>
          <ul className="space-y-3">
            {language.socials.platforms.map((platform, index) => {
              const platformData = {
                Instagram: { icon: "📸", url: "https://instagram.com" },
                TikTok: { icon: "🎵", url: "https://tiktok.com" },
                LinkedIn: { icon: "💼", url: "https://linkedin.com" },
              };

              const data = platformData[platform];

              return (
                <li key={index}>
                  <a
                    href={data?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span role="img" aria-label={platform.toLowerCase()}>
                      {data?.icon}
                    </span>{" "}
                    {platform}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="h-px w-full bg-neutral-800/70 mb-6"></div>

      {/* Bottom Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
        <div>{language.copyright}</div>

        <div className="flex flex-wrap justify-center gap-6">
          {language.legal_links.map((link, index) => (
            <a
              key={index}
              href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
