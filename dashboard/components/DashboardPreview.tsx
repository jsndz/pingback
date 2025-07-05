import React from "react";
import { MessengerLogo, Check, Trash, Clock } from "phosphor-react";

const DashboardPreview: React.FC = () => {
  const mockFeedback = [
    {
      id: 1,
      message:
        "Love the new dark mode! The contrast is perfect for long coding sessions.",
      timestamp: "2 hours ago",
      project: "myapp-frontend",
      resolved: false,
    },
    {
      id: 2,
      message:
        "The search function is super fast but could use better keyboard shortcuts.",
      timestamp: "5 hours ago",
      project: "myapp-frontend",
      resolved: true,
    },
    {
      id: 3,
      message:
        "Great work on the mobile responsiveness. Everything looks smooth!",
      timestamp: "1 day ago",
      project: "myapp-mobile",
      resolved: false,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#12132D]/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 lowercase">
            dashboard preview
          </h2>
          <p className="text-xl text-[#8891A5] max-w-2xl mx-auto">
            See all your feedback in one place with powerful filtering and
            management tools
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg overflow-hidden">
            {/* Dashboard Header */}
            <div className="border-b border-[#2B2D42] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessengerLogo size={24} className="text-[#B8FF00]" />
                  <h3 className="text-xl font-semibold lowercase">
                    recent feedback
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8891A5]">
                  <Clock size={16} />
                  <span>live updates</span>
                </div>
              </div>
            </div>

            {/* Feedback List */}
            <div className="divide-y divide-[#2B2D42]">
              {mockFeedback.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-[#0A0A23]/50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-[#00F0FF] font-medium">
                          {item.project}
                        </span>
                        <span className="text-sm text-[#8891A5]">
                          {item.timestamp}
                        </span>
                        {item.resolved && (
                          <span className="text-xs bg-[#4CAF50]/20 text-[#4CAF50] px-2 py-1 rounded">
                            resolved
                          </span>
                        )}
                      </div>
                      <p className="text-[#F2F2F2] leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-[#4CAF50]/20 rounded transition-colors">
                        <Check size={16} className="text-[#4CAF50]" />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded transition-colors">
                        <Trash size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
