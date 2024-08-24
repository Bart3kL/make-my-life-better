import { BasicInformations } from "./BasicInformations";

export const sections = [
	{
		title: "Basic informations",
		value: "/blog",
		content: <BasicInformations />,
	},

	{
		title: "Blog post structure",
		value: "/structure",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl"></div>
		),
	},
];

export const sectionsHeadingsStrucute = [
	{
		title: "Basic informations",
		value: "/blog",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl"></div>
		),
	},

	{
		title: "Blog post structure",
		value: "/structure",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl">
				<h2 className="mb-10 text-center text-xl text-midnight md:mb-20 md:text-3xl">
					Enter blog post title
				</h2>
			</div>
		),
	},
];
