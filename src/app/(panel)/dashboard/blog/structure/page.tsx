import { TabsContainer } from "@/components/shared/TabsContainer";

import { sections } from "@/components/blogPages/constants";
import { HeadingsStructure } from "@/components/blogPages/HeadingsStructure";

export default async function StrucutePage({ searchParams }: { searchParams: any }) {
	return (
		<>
			<TabsContainer sections={sections} currentTab={1}>
				<HeadingsStructure blogPostId={searchParams.blogPostId} />
			</TabsContainer>
		</>
	);
}
