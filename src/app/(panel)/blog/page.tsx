import { cookies } from "next/headers";

import { TabsContainer } from "@/components/shared/TabsContainer";
import { BasicInformations } from "@/components/blogPages/BasicInformations";

import { sections } from "@/components/blogPages/constants";

export default function Blog() {
	const token = cookies().get("auth-token")!.value;
	return (
		<>
			<TabsContainer sections={sections} currentTab={0}>
				<BasicInformations token={token} />
			</TabsContainer>
		</>
	);
}
