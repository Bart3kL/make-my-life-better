import { DummyContent } from "./DummyContent";

export const tabs = [
	{
		title: "Blog structure",
		value: "product",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl">
				<p>Product Tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Services",
		value: "services",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl">
				<p>Services tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Playground",
		value: "playground",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl">
				<p>Playground tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Content",
		value: "content",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl">
				<p>Content tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Random",
		value: "random",
		content: (
			<div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 text-xl font-bold text-midnight md:text-4xl">
				<p>Random tab</p>
				<DummyContent />
			</div>
		),
	},
];
