import { useState, useEffect } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import db from "../../../db/firebase";

import {
  Phone,
  Mail,
  Instagram,
  Zap,
  Linkedin,
  Facebook,
  MapPin,
} from "lucide-react";

const defaultSettings = {
  email: "contact@example.com",
  facebook: "",
  instagram: "",
  location: "404 Street, Default City, NA",
  phone: "+1 555 123 4567",
  tiktok: "",
  linkedin: "",
};

const socialIconMap = {
  instagram: { icon: Instagram, name: "Instagram" },
  facebook: { icon: Facebook, name: "Facebook" },
  tiktok: { icon: Zap, name: "TikTok" },
  linkedin: { icon: Linkedin, name: "LinkedIn" },
};

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const [clubSettings, setClubSettings] = useState(defaultSettings);

  useEffect(() => {
    fetchSettingsData();
  }, []);

  async function fetchSettingsData() {
    try {
      const settingsDocRef = doc(db, "clubSettings", "settings");
      const docSnap = await getDoc(settingsDocRef);

      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        setClubSettings({ ...defaultSettings, ...fetchedData });
      } else {
        console.log("No such document!");}
    } catch (error) {
      console.error("Error fetching club settings:", error);
    }
  }

  const socialLinks = Object.keys(socialIconMap)
    .map((key) => ({
      key,
      url: clubSettings[key],
      ...socialIconMap[key],
    }))
    .filter((link) => link.url);

  return (
    <footer className="relative overflow-hidden text-neutral-300 mb-4 p-10 md:p-16 w-full">
      <div className="absolute inset-0 pointer-events-none mb-6"></div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-12 max-w-7xl mx-auto">
        {/* Location Section */}
        <div className="flex flex-col gap-5">
          <h3 className="text-white font-semibold text-xl flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-400" />
            {language.location.title}
          </h3>
          <p className="text-neutral-400 leading-relaxed">
            {clubSettings.location || language.location.address}
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">
            {language.contact.title}
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href={`tel:${clubSettings.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5 text-green-400" />
                {clubSettings.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${clubSettings.email}`}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5 text-green-400" />
                {clubSettings.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation Section */}
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

        {/* Socials Section */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">
            {language.socials.title}
          </h3>
          <ul className="space-y-3">
            {socialLinks.map(({ key, url, icon: Icon, name }) => (
              <li key={key}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Icon className="w-5 h-5 text-green-400" />
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="h-px w-full bg-neutral-800/70 mb-6"></div>

        {/* Bottom Section */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <div>
            {language.copyright} {currentYear}
          </div>

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
      </div>
    </footer>
  );
};

export default Footer;
