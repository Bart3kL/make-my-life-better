import { TabsContainer } from "@/components/shared/TabsContainer";
import { sections } from "@/components/blogPages/constants";
import { Content } from "@/components/blogPages/Content";

interface SearchParams {
	blogPostId?: string;
}

export default async function ContentPage({ searchParams }: { searchParams: SearchParams }) {
	return (
		<>
			<TabsContainer sections={sections} currentTab={2}>
				<Content blogPostId={searchParams.blogPostId} />
			</TabsContainer>
		</>
	);
}
