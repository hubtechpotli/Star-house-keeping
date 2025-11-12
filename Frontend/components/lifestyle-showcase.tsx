import React from "react";

const photos = [
  { src: "/hero.jpg", caption: "More earnings, less waiting." },
  { src: "/Payment-img.jpg", caption: "Weekly payouts, instant recognition." },
  { src: "/contact.jpg", caption: "Flexible routes, happy partners." },
  { src: "/about.jpg", caption: " streets, real stories." }
];

export default function LifestyleShowcase() {
  return (
    <section className="py-16 bg-[#f5f0e8]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-center mb-10 font-montserrat text-[#111]">Life as a Partner</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {photos.map((photo, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-lg group">
              <img src={photo.src} alt={photo.caption} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="bg-white py-4 px-2 text-center text-sm font-inter text-[#232323]">{photo.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
