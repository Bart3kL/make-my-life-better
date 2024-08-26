import { TabsContainer } from "@/components/shared/TabsContainer";
import { BasicInformations } from "@/components/blogPages/BasicInformations";

import { sections } from "@/components/blogPages/constants";

export default function Blog() {
	return (
		<>
			<TabsContainer sections={sections} currentTab={0}>
				<BasicInformations />
			</TabsContainer>
		</>
	);
}
