import React from "react";

const steps = [
  {
    icon: "📝",
    title: "Apply",
    desc: "Submit details"
  },
  {
    icon: "🔎",
    title: "Verify",
    desc: "Quick onboarding"
  },
  {
    icon: "🎓",
    title: "Train",
    desc: "Short orientation"
  },
  {
    icon: "🏍️",
    title: "Deliver",
    desc: "Start earning"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#f5f0e8]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-center mb-10 font-montserrat text-[#111]">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex flex-col items-center flex-1 relative">
              <span className="text-4xl mb-4" style={{color: '#1abc9c'}}>{step.icon}</span>
              <h3 className="font-bold text-lg uppercase tracking-wide mb-2 text-[#232323] font-montserrat">{step.title}</h3>
              <p className="text-[#232323] text-sm font-inter text-center mb-2">{step.desc}</p>
              {idx < steps.length - 1 && (
                <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-16 h-2 bg-[#1abc9c] rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
