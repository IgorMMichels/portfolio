import React from "react";
import { Camera, Globe, Briefcase, MessageCircle, Target } from "lucide-react";

interface Footer7Props {
  logo?: {
    url: string;
    icon: React.ReactElement;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Menu",
    links: [
      { name: "Home", href: "#hero" },
      { name: "Sobre Mim", href: "#sobre-mim" },
      { name: "Timeline", href: "#timeline" },
      { name: "Contato", href: "#contato" },
    ],
  },
  {
    title: "Trabalhos",
    links: [
      { name: "economizae", href: "#" },
      { name: "fitly", href: "#" },
      { name: "solus motobombas", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <Camera className="size-5" />, href: "#", label: "Instagram" },
  { icon: <Globe className="size-5" />, href: "#", label: "Facebook" },
  { icon: <MessageCircle className="size-5" />, href: "#", label: "Twitter" },
  { icon: <Briefcase className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "#",
    icon: <Target className="size-8 text-accent-cyan" />,
    title: "Igor",
  },
  sections = defaultSections,
  description = "A comprehensive financial technology platform.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Igor. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-32 bg-transparent text-text-primary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url} className="flex items-center gap-2">
                {logo.icon}
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </a>
            </div>
            <p className="max-w-[70%] text-sm text-text-muted">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-text-muted">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-accent-cyan transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-2 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-text-primary">{section.title}</h3>
                <ul className="space-y-3 text-sm text-text-muted">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-accent-cyan transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border py-8 text-xs font-medium text-text-muted md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-accent-cyan transition-colors">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
