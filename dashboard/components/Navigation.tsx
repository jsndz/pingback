"use client";

import React, { useState } from "react";
import {
  Hamburger,
  X,
  HouseSimple,
  ChartBar,
  FolderOpen,
  Gear,
} from "phosphor-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "home", icon: HouseSimple },
    { path: "/dashboard", label: "dashboard", icon: ChartBar },
    { path: "/projects", label: "projects", icon: FolderOpen },
    { path: "/settings", label: "settings", icon: Gear },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0A0A23]/90 border-b border-[#2B2D42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-[#B8FF00] lowercase">
              pingback
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "text-[#B8FF00] bg-[#B8FF00]/10"
                      : "text-[#8891A5] hover:text-[#F2F2F2] hover:bg-[#12132D]"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#12132D] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Hamburger size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2B2D42]">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? "text-[#B8FF00] bg-[#B8FF00]/10"
                        : "text-[#8891A5] hover:text-[#F2F2F2] hover:bg-[#12132D]"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
