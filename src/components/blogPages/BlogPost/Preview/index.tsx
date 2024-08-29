import Blocks from "editorjs-blocks-react-renderer";
import Image from "next/image";

import { BackButton } from "./BackButton";
import { Checklist } from "@/components/shared/Checklist";

import { cn } from "@/lib/utils";
import { type PreviewProps } from "@/components/blogPages/BlogPost/Preview/types";

export const Preview = ({ image, title, structure, id }: PreviewProps) => {
	return (
		<>
			<div className="mb-12 flex items-center justify-between bg-transparent px-2 py-4 md:px-6">
				<BackButton id={id} />
			</div>
			<div className={cn("prose", "m-auto max-w-[850px]")}>
				<Image
					className="mb-9"
					src={image}
					width={400}
					height={200}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						maxHeight: "350px",
						borderRadius: "10px",
					}}
					alt={title}
				/>
				<h1>{title}</h1>
				<Blocks
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					data={JSON.parse(structure)}
					renderers={{
						checkList: Checklist,
					}}
				/>
			</div>
		</>
	);
};
