import React from "react";
import { Plus, Share, Circle } from "phosphor-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Plus,
      title: "create project",
      description:
        "Set up your feedback collection in seconds with our CLI or dashboard",
    },
    {
      icon: Share,
      title: "share link",
      description:
        "Get a simple URL to embed anywhere or share with your users",
    },
    {
      icon: Circle,
      title: "read & respond",
      description:
        "Anonymous feedback flows directly to your dashboard in real-time",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 lowercase">
            how it works
          </h2>
          <p className="text-xl text-[#8891A5] max-w-2xl mx-auto">
            Three simple steps to start collecting meaningful feedback from your
            users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-8 hover:border-[#00F0FF] transition-all group-hover:translate-y-[-4px]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B8FF00]/10 rounded-lg mb-6">
                  <step.icon size={32} className="text-[#B8FF00]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 lowercase">
                  {step.title}
                </h3>
                <p className="text-[#8891A5] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
