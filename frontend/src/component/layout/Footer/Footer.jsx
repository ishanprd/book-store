import React from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="py-8 bg-gray-900 text-white flex justify-center items-center px-8">
      <div className="w-full md:w-2/4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#A790EA]">BOOK</h1>
        <p className="max-w-md mx-auto mb-4">Quality Books For Every Reader's Journey</p>
        <p className="text-sm opacity-70">© 2025 Book. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;