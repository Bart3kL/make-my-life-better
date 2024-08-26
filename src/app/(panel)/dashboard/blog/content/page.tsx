import { TabsContainer } from "@/components/shared/TabsContainer";

import { sections } from "@/components/blogPages/constants";
import { Content } from "@/components/blogPages/Content";

export const revalidate = 0;

export default async function ContentPage({ searchParams }: { searchParams: any }) {
	return (
		<>
			<TabsContainer sections={sections} currentTab={2}>
				<Content blogPostId={searchParams.blogPostId} />
			</TabsContainer>
		</>
	);
}
