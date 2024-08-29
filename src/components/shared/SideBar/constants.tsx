import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiLinkedin, CiLogout } from "react-icons/ci";

export const links = [
	{
		label: "Dashboard",
		href: "/dashboard",
		activeLink: ["/dashboard"],
		icon: <MdOutlineSpaceDashboard className="h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Create blog post",
		href: "/blog",
		activeLink: ["/blog", "/blog/structure", "/blog/content"],
		icon: <IoNewspaperOutline className="h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Linkedin",
		href: "/linkedin",
		activeLink: ["/linkedin"],
		icon: <CiLinkedin className="h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Logout",
		href: "/",
		activeLink: [""],
		icon: <CiLogout className="h-8 w-8 flex-shrink-0" />,
	},
];
