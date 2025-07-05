"use client";

import React from "react";
import { Gear, User, Bell, Shield, Palette } from "phosphor-react";

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A23] text-[#F2F2F2] font-['Space_Grotesk']">
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Gear size={32} className="text-[#B8FF00]" />
              <h1 className="text-3xl md:text-4xl font-bold lowercase">
                settings
              </h1>
            </div>
            <p className="text-[#8891A5] text-lg">
              manage your account and preferences
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <User size={24} className="text-[#B8FF00]" />
                <h2 className="text-xl font-semibold lowercase">profile</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                    display name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Developer"
                    className="w-full px-4 py-3 bg-[#0A0A23] border border-[#2B2D42] rounded-lg text-[#F2F2F2] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                    email address
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-4 py-3 bg-[#0A0A23] border border-[#2B2D42] rounded-lg text-[#F2F2F2] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell size={24} className="text-[#B8FF00]" />
                <h2 className="text-xl font-semibold lowercase">
                  notifications
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">email notifications</h3>
                    <p className="text-sm text-[#8891A5]">
                      receive email alerts for new feedback
                    </p>
                  </div>
                  <button className="relative w-12 h-6 bg-[#B8FF00] rounded-full">
                    <div className="absolute top-1 right-1 w-4 h-4 bg-[#0A0A23] rounded-full transition-transform"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">weekly digest</h3>
                    <p className="text-sm text-[#8891A5]">
                      get a summary of feedback activity
                    </p>
                  </div>
                  <button className="relative w-12 h-6 bg-[#2B2D42] rounded-full">
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} className="text-[#B8FF00]" />
                <h2 className="text-xl font-semibold lowercase">
                  privacy & security
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">data retention</h3>
                  <select className="w-full px-4 py-3 bg-[#0A0A23] border border-[#2B2D42] rounded-lg text-[#F2F2F2] focus:outline-none focus:border-[#00F0FF]">
                    <option>keep feedback for 1 year</option>
                    <option>keep feedback for 6 months</option>
                    <option>keep feedback for 3 months</option>
                  </select>
                </div>
                <div>
                  <h3 className="font-medium mb-2">api access</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value="pk_live_abc123..."
                      readOnly
                      className="flex-1 px-4 py-3 bg-[#0A0A23] border border-[#2B2D42] rounded-lg text-[#F2F2F2] focus:outline-none"
                    />
                    <button className="px-4 py-3 bg-[#2B2D42] hover:bg-[#00F0FF]/20 rounded-lg transition-colors">
                      regenerate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div className="bg-[#12132D] border border-[#2B2D42] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette size={24} className="text-[#B8FF00]" />
                <h2 className="text-xl font-semibold lowercase">appearance</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-3 bg-[#B8FF00]/10 border-2 border-[#B8FF00] rounded-lg text-center">
                      <div className="w-full h-8 bg-[#0A0A23] rounded mb-2"></div>
                      <span className="text-sm">dark</span>
                    </button>
                    <button className="p-3 bg-[#2B2D42] border-2 border-[#2B2D42] rounded-lg text-center hover:border-[#00F0FF]">
                      <div className="w-full h-8 bg-white rounded mb-2"></div>
                      <span className="text-sm">light</span>
                    </button>
                    <button className="p-3 bg-[#2B2D42] border-2 border-[#2B2D42] rounded-lg text-center hover:border-[#00F0FF]">
                      <div className="w-full h-8 bg-gradient-to-r from-[#0A0A23] to-white rounded mb-2"></div>
                      <span className="text-sm">auto</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-[#B8FF00] text-[#0A0A23] px-6 py-3 rounded-lg font-semibold hover:bg-[#A3E600] transition-all">
              save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
