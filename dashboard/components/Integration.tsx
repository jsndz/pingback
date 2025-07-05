import React from "react";
import { Code, Copy, Check } from "phosphor-react";

const Integration: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("html");
  const [copied, setCopied] = React.useState(false);

  const codeExamples = {
    html: `<script src="https://cdn.pingback.js"></script>
<script>
  pingback.init({ 
    projectId: 'abc123',
    theme: 'dark' 
  });
</script>`,
    react: `import { Pingback } from 'pingback-react';

function App() {
  return (
    <div>
      <Pingback projectId="abc123" />
      {/* Your app content */}
    </div>
  );
}`,
    vue: `<template>
  <div>
    <Pingback :project-id="'abc123'" />
    <!-- Your app content -->
  </div>
</template>

<script>
import { Pingback } from 'pingback-vue';
export default {
  components: { Pingback }
};
</script>`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(
      codeExamples[activeTab as keyof typeof codeExamples]
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#12132D]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 lowercase">
              integrate in minutes
            </h2>
            <p className="text-xl text-[#8891A5] mb-8 leading-relaxed">
              Add Pingback to any website or app with just a few lines of code.
              Works with vanilla HTML, React, Vue, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg px-4 py-2 flex items-center gap-2">
                <Code size={16} className="text-[#B8FF00]" />
                <span className="text-sm">lightweight</span>
              </div>
              <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg px-4 py-2 flex items-center gap-2">
                <Code size={16} className="text-[#B8FF00]" />
                <span className="text-sm">framework agnostic</span>
              </div>
              <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg px-4 py-2 flex items-center gap-2">
                <Code size={16} className="text-[#B8FF00]" />
                <span className="text-sm">zero config</span>
              </div>
            </div>
          </div>

          {/* Right Code Block */}
          <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg overflow-hidden">
            {/* Tab Header */}
            <div className="flex items-center justify-between border-b border-[#2B2D42] px-4 py-3">
              <div className="flex gap-2">
                {Object.keys(codeExamples).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-[#B8FF00] text-[#0A0A23]"
                        : "text-[#8891A5] hover:text-[#F2F2F2]"
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={copyCode}
                className="p-2 hover:bg-[#2B2D42] rounded transition-colors"
              >
                {copied ? (
                  <Check size={16} className="text-[#4CAF50]" />
                ) : (
                  <Copy size={16} className="text-[#8891A5]" />
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-4 font-mono text-sm">
              <pre className="text-[#F2F2F2] whitespace-pre-wrap">
                {codeExamples[activeTab as keyof typeof codeExamples]}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
