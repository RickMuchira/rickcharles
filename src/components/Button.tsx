// components/Button.tsx
"use client";

import clsx from "clsx";
import { ReactNode } from "react";

type CommonProps = {
  id: string;
  title: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  containerClass?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  download?: boolean;
  target?: string;
  rel?: string;
};

type PureButtonProps = CommonProps & {
  href?: undefined;
  download?: undefined;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = LinkProps | PureButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    id,
    title,
    rightIcon,
    leftIcon,
    containerClass,
    onClick,
    className,
    // No annotation markers
  } = props;

  const baseClasses =
    "group relative z-10 inline-flex cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black";
  const combinedClasses = clsx(baseClasses, containerClass, className);

  if ("href" in props && props.href) {
    const { href, download, target, rel } = props;
    return (
      <a
        id={id}
        href={href}
        className={combinedClasses}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(download ? { download: "" } : {})}
        {...(target ? { target } : {})}
        {...(rel ? { rel } : {})}
      >
        {leftIcon}
        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
          <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
            {title}
          </div>
          <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
            {title}
          </div>
        </span>
        {rightIcon}
      </a>
    );
  }

  const { type = "button" } = props as PureButtonProps;
  return (
    <button
      id={id}
      type={type}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={combinedClasses}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
