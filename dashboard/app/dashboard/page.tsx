"use client";

import React, { useState, useEffect } from "react";
import { Chat, Clock, ArrowLeft, ArrowRight } from "phosphor-react";

interface Feedback {
  id: string;
  message: string;
  timestamp: Date;
  projectId: string;
  projectName: string;
}

const Dashboard: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const feedbackPerPage = 12;

  // Mock data generation
  useEffect(() => {
    const generateMockFeedback = (): Feedback[] => {
      const messages = [
        "Love the new dark mode! The contrast is perfect for long coding sessions.",
        "The search function is super fast but could use better keyboard shortcuts.",
        "Great work on the mobile responsiveness. Everything looks smooth!",
        "The loading animations are a bit too slow on mobile devices.",
        "Amazing product! The integration was seamless and took less than 5 minutes.",
        "Could you add support for custom themes? The current ones are great but limited.",
        "The dashboard is intuitive but the export feature seems to be broken.",
        "Performance has improved significantly since the last update. Well done!",
        "The API documentation is excellent. Very clear and comprehensive.",
        "Would love to see real-time notifications for new feedback submissions.",
        "The pricing is very reasonable compared to other similar tools.",
        "The onboarding process was smooth and the tutorials were helpful.",
        "Some buttons are hard to click on mobile. Consider increasing touch targets.",
        "The analytics section provides great insights into user behavior.",
        "Integration with Slack would be a game-changer for our team workflow.",
        "The feedback widget loads quickly and doesn't impact page performance.",
        "Love the minimalist design approach. It feels very modern and clean.",
        "The search functionality works well but could use filters for better organization.",
        "Customer support response time is impressive. Got help within an hour.",
        "The free tier is generous and perfect for small projects and testing.",
      ];

      const projects = [
        { id: "proj_1", name: "myapp-frontend" },
        { id: "proj_2", name: "portfolio-site" },
        { id: "proj_3", name: "ecommerce-platform" },
        { id: "proj_4", name: "blog-engine" },
        { id: "proj_5", name: "dashboard-ui" },
      ];

      return Array.from({ length: 47 }, (_, i) => {
        const project = projects[Math.floor(Math.random() * projects.length)];
        const hoursAgo = Math.floor(Math.random() * 168); // Random hours in the past week
        const timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

        return {
          id: `feedback_${i + 1}`,
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp,
          projectId: project.id,
          projectName: project.name,
        };
      }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    setTimeout(() => {
      setFeedback(generateMockFeedback());
      setLoading(false);
    }, 800);
  }, []);

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const totalPages = Math.ceil(feedback.length / feedbackPerPage);
  const startIndex = (currentPage - 1) * feedbackPerPage;
  const currentFeedback = feedback.slice(
    startIndex,
    startIndex + feedbackPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A23] text-[#F2F2F2] font-['Space_Grotesk']">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#B8FF00] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#8891A5]">loading feedback...</p>
          </div>
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A23] text-[#F2F2F2] font-['Space_Grotesk']">
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Chat size={32} className="text-[#B8FF00]" />
              <h1 className="text-3xl md:text-4xl font-bold lowercase">
                dashboard
              </h1>
            </div>
            <p className="text-[#8891A5] text-lg">
              {feedback.length} total feedback submissions across all projects
            </p>
          </div>

          {/* Feedback Grid */}
          <div className="grid gap-6 mb-8">
            {currentFeedback.map((item) => (
              <div
                key={item.id}
                className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-6 hover:border-[#00F0FF] transition-all group hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#00F0FF] font-medium bg-[#00F0FF]/10 px-2 py-1 rounded">
                      {item.projectName}
                    </span>
                    <div className="flex items-center gap-1 text-[#8891A5] text-sm">
                      <Clock size={14} />
                      <span>{formatTimeAgo(item.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#F2F2F2] leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-[#12132D] border border-[#2B2D42] rounded-lg hover:border-[#00F0FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16} />
                previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-[#B8FF00] text-[#0A0A23] font-semibold"
                          : "bg-[#12132D] border border-[#2B2D42] hover:border-[#00F0FF]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-[#12132D] border border-[#2B2D42] rounded-lg hover:border-[#00F0FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                next
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default Dashboard;
