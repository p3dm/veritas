import { GitHubLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./button";
import { socialLinks } from "@/lib/link";
import Link from "next/link";
import { ThemeToggle } from "../layout/theme-switcher";

export const Footer = () => {
  return (
    <div className="flex gap-6 items-center absolute bottom-2 left-1/2 -translate-x-1/2">
      <Link
        target="_blank"
        className={buttonVariants({ size: "icon" })}
        href={socialLinks.mail}
      >
        <EnvelopeClosedIcon className="size-6" />
      </Link>
      <Link
        target="_blank"
        className={buttonVariants({ size: "icon" })}
        href={socialLinks.github}
      >
        <GitHubLogoIcon className="size-6" />
      </Link>
      <ThemeToggle />
    </div>
  );
};
