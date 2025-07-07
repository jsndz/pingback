"use client";

import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Plus,
  Copy,
  Check,
  LinkSimple,
  Chat,
} from "phosphor-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  websiteUrl?: string;
  feedbackLink: string;
  feedbackCount: number;
  recentFeedbackCount: number;
  createdAt: Date;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock data generation
  useEffect(() => {
    const generateMockProjects = (): Project[] => {
      const projectNames = [
        "myapp-frontend",
        "portfolio-site",
        "ecommerce-platform",
        "blog-engine",
        "dashboard-ui",
        "mobile-app-api",
        "landing-page",
        "docs-website",
      ];

      const websites = [
        "https://myapp.com",
        "https://johnsmith.dev",
        "https://shopnow.store",
        "https://myblog.io",
        undefined,
        "https://api.myapp.com",
        "https://startup.co",
        "https://docs.myapp.com",
      ];

      return projectNames.map((name, i) => ({
        id: `proj_${i + 1}`,
        name,
        websiteUrl: websites[i],
        feedbackLink: `https://fb.pingback.dev/${Math.random()
          .toString(36)
          .substr(2, 8)}`,
        feedbackCount: Math.floor(Math.random() * 150) + 5,
        recentFeedbackCount: Math.floor(Math.random() * 12),
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      }));
    };

    setTimeout(() => {
      setProjects(generateMockProjects());
      setLoading(false);
    }, 600);
  }, []);

  const copyFeedbackLink = async (link: string, projectId: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(projectId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A23] text-[#F2F2F2] font-['Space_Grotesk']">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#B8FF00] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#8891A5]">loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A23] text-[#F2F2F2] font-['Space_Grotesk']">
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FolderOpen size={32} className="text-[#B8FF00]" />
                <h1 className="text-3xl md:text-4xl font-bold lowercase">
                  projects
                </h1>
              </div>
              <p className="text-[#8891A5] text-lg">
                manage your feedback collection projects
              </p>
            </div>

            <Link
              href="/projects/create"
              className="bg-[#B8FF00] text-[#0A0A23] px-6 py-3 rounded-lg font-semibold hover:bg-[#A3E600] transition-all flex items-center gap-2 group"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform"
              />
              create project
            </Link>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen size={64} className="text-[#2B2D42] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">no projects yet</h3>
              <p className="text-[#8891A5] mb-6">
                create your first project to start collecting feedback
              </p>
              <Link
                href="/projects/create"
                className="bg-[#B8FF00] text-[#0A0A23] px-6 py-3 rounded-lg font-semibold hover:bg-[#A3E600] transition-all inline-flex items-center gap-2"
              >
                <Plus size={20} />
                create project
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-6 hover:border-[#00F0FF] transition-all group hover:translate-y-[-2px]"
                >
                  {/* Project Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 lowercase">
                      {project.name}
                    </h3>
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00F0FF] hover:text-[#B8FF00] transition-colors text-sm flex items-center gap-1"
                      >
                        <LinkSimple size={14} />
                        {project.websiteUrl.replace("https://", "")}
                      </a>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#B8FF00]">
                        {project.feedbackCount}
                      </div>
                      <div className="text-xs text-[#8891A5]">
                        total feedback
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00F0FF]">
                        {project.recentFeedbackCount}
                      </div>
                      <div className="text-xs text-[#8891A5]">this week</div>
                    </div>
                  </div>

                  {/* Feedback Link */}
                  <div className="mb-4">
                    <label className="block text-sm text-[#8891A5] mb-2">
                      feedback link
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={project.feedbackLink}
                        readOnly
                        className="flex-1 bg-[#0A0A23] border border-[#2B2D42] rounded px-3 py-2 text-sm text-[#F2F2F2] focus:outline-none focus:border-[#00F0FF]"
                      />
                      <button
                        onClick={() =>
                          copyFeedbackLink(project.feedbackLink, project.id)
                        }
                        className="p-2 bg-[#2B2D42] hover:bg-[#00F0FF]/20 rounded transition-colors"
                      >
                        {copiedId === project.id ? (
                          <Check size={16} className="text-[#4CAF50]" />
                        ) : (
                          <Copy size={16} className="text-[#8891A5]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-[#8891A5]">
                    <span>created {formatDate(project.createdAt)}</span>
                    <div className="flex items-center gap-1">
                      <Chat size={12} />
                      <span>active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
