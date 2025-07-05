import React from "react";
import { GithubLogo, Hamburger, X } from "phosphor-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0A0A23]/80 border-b border-[#2B2D42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-[#B8FF00] lowercase">
              pingback
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#docs"
              className="text-[#8891A5] hover:text-[#F2F2F2] transition-colors"
            >
              docs
            </a>
            <a
              href="#pricing"
              className="text-[#8891A5] hover:text-[#F2F2F2] transition-colors"
            >
              pricing
            </a>
            <a
              href="https://github.com"
              className="text-[#8891A5] hover:text-[#F2F2F2] transition-colors flex items-center gap-2"
            >
              <GithubLogo size={18} />
              github
            </a>
          </nav>

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
            <nav className="flex flex-col space-y-4">
              <a
                href="#docs"
                className="text-[#8891A5] hover:text-[#F2F2F2] transition-colors"
              >
                docs
              </a>
              <a
                href="#pricing"
                className="text-[#8891A5] hover:text-[#F2F2F2] transition-colors"
              >
                pricing
              </a>
              <a
                href="https://github.com"
                className="text-[#8891A5] hover:text-[#F2F2F2] transition-colors flex items-center gap-2"
              >
                <GithubLogo size={18} />
                github
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
