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

          {/* Terminal Demo */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#12132D] rounded-lg border border-[#2B2D42] p-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#FF5F56] rounded-full"></div>
                <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                <div className="w-3 h-3 bg-[#27CA3F] rounded-full"></div>
                <Terminal size={16} className="ml-2 text-[#8891A5]" />
              </div>
              <div className="font-mono text-sm">
                <div className="text-[#8891A5]">$ npm install pingback</div>
                <div className="text-[#B8FF00] mt-2">
                  ✓ Installed successfully
                </div>
                <div className="text-[#8891A5] mt-2">$ pingback init</div>
                <div className="text-[#00F0FF] mt-2">
                  → Project created: myapp-feedback
                </div>
                <div className="text-[#8891A5] mt-2">$ pingback deploy</div>
                <div className="text-[#B8FF00] mt-2 animate-pulse">
                  ⚡ Live at: https://fb.pingback.dev/abc123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
