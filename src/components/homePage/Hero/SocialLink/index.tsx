import { type SocialLinkProps } from "./types";
import { LinkPreview } from "@/components/shared/LinkPreview";


export const SocialLink = ({
	title,
	icon,
	url,
	isStatic = false,
	imageSrc = "",
}: SocialLinkProps) => {
	return (
		<LinkPreview
			className="flex items-center justify-center"
			url={url}
			isStatic={isStatic}
			imageSrc={imageSrc}
		>
			{icon}
			<p className="ml-2 text-lg">{title}</p>
		</LinkPreview>
	);
};
