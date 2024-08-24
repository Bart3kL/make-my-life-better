import { TabsContainer } from "@/components/shared/TabsContainer";

import { sections } from "@/components/blogPages/constants";

export default function Blog() {
	return (
		<>
			<TabsContainer sections={sections} currentTab={0}></TabsContainer>
		</>
	);
}
