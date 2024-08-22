import Link from "next/link";

export const LogoIcon = () => {
	return (
		<Link
			href="#"
			className="text-blue-2 relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
		>
			<div className="bg-blue-2 h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm" />
		</Link>
	);
};
