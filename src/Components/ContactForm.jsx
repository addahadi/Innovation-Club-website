import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function ContactForm({
  language
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {

      gsap.registerPlugin(ScrollTrigger);

      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate description
      gsap.from(descRef.current, {
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Animate form
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      ref={containerRef}
      className=" px-4 sm:px-6 lg:px-8 pt-20 max-w-7xl mx-auto w-full"
    >
      <div className="mb-12">
        <h1 ref={titleRef} className="text-7xl font-bold text-white mb-4">
          {language.title}{" "}
          <span className="text-green-600">{language.subtitle}</span>
        </h1>
        <p ref={descRef} className="text-neutral-400 text-lg">
          {language.description}
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-neutral-900 py-10 rounded-2xl p-6 shadow-2xl border border-neutral-800"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-neutral-300 text-sm font-medium mb-2"
          >
            {language.form.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-neutral-950  rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            placeholder={language.placeholders.name}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-neutral-300 text-sm font-medium mb-2"
          >
            {language.form.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-neutral-950 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            placeholder={language.placeholders.email}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-neutral-300 text-sm font-medium mb-2"
          >
            {language.form.message}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 bg-neutral-950  rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
            placeholder={language.placeholders.message}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          {language.button.send}
        </button>
      </form>
    </div>
  );
}
