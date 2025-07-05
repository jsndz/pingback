import React from "react";
import { ArrowRight, GithubLogo, Terminal } from "phosphor-react";

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 lowercase">
            collect feedback.
            <br />
            <span className="text-[#B8FF00]">improve faster.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#8891A5] max-w-3xl mx-auto mb-8 leading-relaxed">
            Pingback helps developers gather anonymous feedback in seconds — so
            you can fix what matters, fast.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-[#B8FF00] text-[#0A0A23] px-8 py-4 rounded-lg font-semibold hover:bg-[#A3E600] transition-all flex items-center justify-center gap-2 group">
              get started
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="border border-[#2B2D42] text-[#F2F2F2] px-8 py-4 rounded-lg font-semibold hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all flex items-center justify-center gap-2">
              <GithubLogo size={20} />
              view github
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
