import { TabsContainer } from "@/components/shared/TabsContainer";
import { sections } from "@/components/blogPages/constants";
import { HeadingsStructure } from "@/components/blogPages/Structure";

interface SearchParams {
	blogPostId?: string;
}

export default async function StrucutePage({ searchParams }: { searchParams: SearchParams }) {
	return (
		<>
			<TabsContainer sections={sections} currentTab={1}>
				<HeadingsStructure blogPostId={searchParams.blogPostId} />
			</TabsContainer>
		</>
	);
}
