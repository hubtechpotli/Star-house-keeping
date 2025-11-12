import React from "react";

const usps = [
  {
    icon: "💰",
    title: "High Earnings",
    desc: "Up to ₹60,000/month",
    color: "#ff6f2c"
  },
  {
    icon: "🕒",
    title: "Flexible Hours",
    desc: "Work on your terms",
    color: "#1abc9c"
  },
  {
    icon: "📈",
    title: "Growth Path",
    desc: "Opportunities & rewards",
    color: "#ff6f2c"
  },
  {
    icon: "🛡",
    title: "Insurance & Perks",
    desc: "₹10 Lakh cover + bonuses",
    color: "#1abc9c"
  }
];

export default function USPGrid() {
  return (
    <section id="benefits" className="py-16 bg-[#f5f0e8]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-center mb-10 font-montserrat text-[#111]">Why Work With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {usps.map((usp) => (
            <div key={usp.title} className="rounded-2xl bg-white shadow-lg p-8 flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-xl">
              <span className="text-5xl mb-4" style={{color: usp.color}}>{usp.icon}</span>
              <h3 className="font-bold text-lg uppercase tracking-wide mb-2 text-[#232323] font-montserrat">{usp.title}</h3>
              <p className="text-[#232323] text-sm font-inter text-center">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
