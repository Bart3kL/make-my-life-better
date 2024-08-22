import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiLinkedin, CiLogout } from "react-icons/ci";

export const links = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: <MdOutlineSpaceDashboard className="text-midnight h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Profile",
		href: "/dashboard/blog",
		icon: <IoNewspaperOutline className="text-midnight h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Linkedin",
		href: "/dashboard/linkedin",
		icon: <CiLinkedin className="text-midnight h-8 w-8 flex-shrink-0" />,
	},
	{
		label: "Logout",
		href: "/",
		icon: <CiLogout className="text-midnight h-8 w-8 flex-shrink-0" />,
	},
];
