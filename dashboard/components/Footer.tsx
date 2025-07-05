import React from "react";
import { GithubLogo, TwitterLogo, GoogleLogo } from "phosphor-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12132D] border-t border-[#2B2D42] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-[#B8FF00] mb-4 lowercase">
              pingback
            </div>
            <p className="text-[#8891A5] max-w-md leading-relaxed">
              The simplest way to collect anonymous feedback from your users.
              Built by developers, for developers.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com"
                className="p-2 hover:bg-[#2B2D42] rounded transition-colors"
              >
                <GithubLogo
                  size={20}
                  className="text-[#8891A5] hover:text-[#B8FF00]"
                />
              </a>
              <a
                href="https://twitter.com"
                className="p-2 hover:bg-[#2B2D42] rounded transition-colors"
              >
                <TwitterLogo
                  size={20}
                  className="text-[#8891A5] hover:text-[#B8FF00]"
                />
              </a>
              <a
                href="mailto:hello@pingback.dev"
                className="p-2 hover:bg-[#2B2D42] rounded transition-colors"
              >
                <GoogleLogo
                  size={20}
                  className="text-[#8891A5] hover:text-[#B8FF00]"
                />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 lowercase">product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#docs"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  documentation
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  pricing
                </a>
              </li>
              <li>
                <a
                  href="#changelog"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  changelog
                </a>
              </li>
              <li>
                <a
                  href="#status"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  status
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 lowercase">company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  about
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  privacy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  terms
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#8891A5] hover:text-[#B8FF00] transition-colors"
                >
                  contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2B2D42] mt-12 pt-8 text-center text-[#8891A5] text-sm">
          © 2025 Pingback. All rights reserved. Built with ❤️ for developers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
