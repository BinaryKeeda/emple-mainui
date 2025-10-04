import {
  Instagram,
  LinkedIn,
  Mail,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import React from "react";
import { LOGO2 } from "../lib/config";
import { Link } from "react-router-dom";

function LinkSvg({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-600"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="max-w-7xl mx-auto text-black px-6 lg:px-8 py-10"
    >
      <div className=" mx-auto flex flex-col lg:flex-row lg:justify-between gap-10">
        {/* Left Side */}
        <div className="flex-1">
          <div className="flex items-center ">
            <img src={LOGO2} className="h-8" alt="BinaryKeeda Logo" />
            <span className="text-lg font-semibold">BinaryKeeda</span>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            Learn. Practice. Excel.
            <br />
            Join the movement that's redefining how students learn, grow, and
            succeed.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <LinkSvg href="https://www.linkedin.com/company/binarykeeda/about/">
              <LinkedIn sx={{ fontSize: 20 }} />
            </LinkSvg>
            <LinkSvg href="https://www.instagram.com/binarykeedaeducation/">
              <Instagram sx={{ fontSize: 20 }} />
            </LinkSvg>
            <LinkSvg href="https://www.youtube.com/@BinaryKeeda">
              <YouTube sx={{ fontSize: 20 }} />
            </LinkSvg>
            <LinkSvg href="https://chat.whatsapp.com/HCPwImL36H31EG82ankeSX">
              <WhatsApp sx={{ fontSize: 20 }} />
            </LinkSvg>
          </div>

          <p className="text-sm text-gray-700 mt-3">
            Reach us at{" "}
            <a href="mailto:support@binarykeeda.com" className="underline">
              support@binarykeeda.com
            </a>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 text-gray-600">
          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="/terms-of-service"
                  className="hover:text-orange-500"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="/privacy-policy"
                  className="hover:text-orange-500"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-md font-semibold">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/user/binarykeeda-dsa-sheet"
                  className="hover:text-orange-500"
                >
                  BK DSA Sheet
                </Link>
              </li>
              <li>
                <a
                  href="/user/binarykeeda-210-sheet"
                  className="hover:text-orange-500"
                >
                  BK 210 Roadmap
                </a>
              </li>
              <li>
                <a
                  href="/user/binarykeeda-roadmap-sheet"
                  className="hover:text-orange-500"
                >
                  Roadmaps
                </a>
              </li>
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h3 className="text-md font-semibold">Practice</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/user/practice" className="hover:text-orange-500">
                  Quizzes
                </a>
              </li>
              <li>
                <a href="/user/test-series" className="hover:text-orange-500">
                  Test Series
                </a>
              </li>
              <li>
                <a
                  href="/user/binarykeeda-dsa-sheet"
                  className="hover:text-orange-500"
                >
                  Coding Sheet
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-gray-600 mt-10" />

      <div className="text-center text-sm text-gray-700 py-5">
        ©{" "}
        <a href="/" className="underline">
          BinaryKeeda
        </a>{" "}
        2025, All rights reserved.
      </div>
    </footer>
  );
}
