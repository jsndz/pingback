import React from "react";
import { Shield, BellZ, Users, Palette } from "phosphor-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "privacy first",
      description:
        "Anonymous feedback collection with no tracking or personal data storage",
    },
    {
      icon: BellZ,
      title: "lightning fast",
      description:
        "Sub-100ms response times with global CDN and edge computing",
    },
    {
      icon: Users,
      title: "oss friendly",
      description: "Free tier for open source projects and indie developers",
    },
    {
      icon: Palette,
      title: "dark mode native",
      description:
        "Built for developers who live in the terminal and dark themes",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 lowercase">
            built for developers
          </h2>
          <p className="text-xl text-[#8891A5] max-w-2xl mx-auto">
            Everything you need to collect feedback without the bloat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-6 hover:border-[#00F0FF] transition-all group-hover:translate-y-[-4px]">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#B8FF00]/10 rounded-lg mb-4">
                  <feature.icon size={24} className="text-[#B8FF00]" />
                </div>
                <h3 className="text-lg font-semibold mb-3 lowercase">
                  {feature.title}
                </h3>
                <p className="text-[#8891A5] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
