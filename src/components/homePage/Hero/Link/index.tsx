import { LinkPreview } from "@/components/shared/LinkPreview";

import { LinkProps } from "./types";

export const Link = ({
  title,
  icon,
  url,
  isStatic = false,
  imageSrc = "",
}: LinkProps) => {
  return (
    <LinkPreview
      className="flex items-center justify-center "
      url={url}
      isStatic={isStatic}
      imageSrc={imageSrc}
    >
      {icon}
      <p className="ml-2 text-lg">{title}</p>
    </LinkPreview>
  );
};
