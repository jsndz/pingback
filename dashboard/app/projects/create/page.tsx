"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Spinner } from "phosphor-react";

interface FormData {
  name: string;
  websiteUrl: string;
}

interface FormErrors {
  name?: string;
  websiteUrl?: string;
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    websiteUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Project name validation
    if (!formData.name.trim()) {
      newErrors.name = "project name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "project name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "project name must be less than 50 characters";
    } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(formData.name.trim())) {
      newErrors.name =
        "project name can only contain letters, numbers, spaces, hyphens, and underscores";
    }

    // Website URL validation (optional)
    if (formData.websiteUrl.trim()) {
      try {
        const url = new URL(formData.websiteUrl.trim());
        if (!["http:", "https:"].includes(url.protocol)) {
          newErrors.websiteUrl = "website url must use http or https protocol";
        }
      } catch {
        newErrors.websiteUrl = "please enter a valid website url";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would make an API call here
      console.log("Creating project:", formData);

      // Redirect to projects page
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A23] text-[#F2F2F2] font-['Space_Grotesk']">
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/projects")}
              className="flex items-center gap-2 text-[#8891A5] hover:text-[#F2F2F2] transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              back to projects
            </button>

            <div className="flex items-center gap-3 mb-2">
              <Plus size={32} className="text-[#B8FF00]" />
              <h1 className="text-3xl md:text-4xl font-bold lowercase">
                create project
              </h1>
            </div>
            <p className="text-[#8891A5] text-lg">
              set up a new feedback collection project
            </p>
          </div>

          {/* Form */}
          <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#F2F2F2] mb-2"
                >
                  project name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="my-awesome-project"
                  className={`w-full px-4 py-3 bg-[#0A0A23] border rounded-lg text-[#F2F2F2] placeholder-[#8891A5] focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#2B2D42] focus:border-[#00F0FF]"
                  }`}
                  disabled={loading}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Website URL */}
              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium text-[#F2F2F2] mb-2"
                >
                  website url
                  <span className="text-[#8891A5] font-normal ml-1">
                    (optional)
                  </span>
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    handleInputChange("websiteUrl", e.target.value)
                  }
                  placeholder="https://myproject.com"
                  className={`w-full px-4 py-3 bg-[#0A0A23] border rounded-lg text-[#F2F2F2] placeholder-[#8891A5] focus:outline-none transition-colors ${
                    errors.websiteUrl
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#2B2D42] focus:border-[#00F0FF]"
                  }`}
                  disabled={loading}
                />
                {errors.websiteUrl && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.websiteUrl}
                  </p>
                )}
                <p className="mt-2 text-sm text-[#8891A5]">
                  the website where you'll be collecting feedback from
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#B8FF00] text-[#0A0A23] px-6 py-3 rounded-lg font-semibold hover:bg-[#A3E600] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Spinner size={20} className="animate-spin" />
                      creating project...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      create project
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-[#B8FF00]/10 border border-[#B8FF00]/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#B8FF00] mb-2">
              what happens next?
            </h3>
            <ul className="text-sm text-[#8891A5] space-y-1">
              <li>• you'll get a unique feedback link for your project</li>
              <li>• embed the feedback widget on your website</li>
              <li>• start collecting anonymous feedback from users</li>
              <li>• view and manage feedback in your dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
