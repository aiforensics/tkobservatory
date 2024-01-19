"use client";
import "./link.scss";

interface Props {
  anchor: string;
  disabled: boolean;
  size: string;
  href: string;
  isDark?: boolean;
  handleLinkClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isNavLink?: boolean;
  target?: string;
  isHovered?: boolean;
}

export const Link: React.FC<Props> = ({
  anchor,
  disabled,
  size,
  href,
  isDark,
  handleLinkClick,
  isNavLink,
  target,
  isHovered,
}) => {
  const isDisabled = disabled ? "disabled" : "";
  const color = isDark ? "" : "-light";
  return (
    <a
      className={`link ${isDisabled} ${size} ${color} ${
        isHovered ? "-beinghovered" : ""
      }`}
      href={href}
      onClick={handleLinkClick}
      target="_blank"
      rel="noreferrer"
    >
      {anchor}
    </a>
  );
};
