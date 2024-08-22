import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiLinkedin, CiLogout } from "react-icons/ci";

export const links = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: <MdOutlineSpaceDashboard className="h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Blog",
		href: "/dashboard/blog",
		icon: <IoNewspaperOutline className="h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Linkedin",
		href: "/dashboard/linkedin",
		icon: <CiLinkedin className="h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Logout",
		href: "/",
		icon: <CiLogout className="h-8 w-8 flex-shrink-0" />,
	},
];
