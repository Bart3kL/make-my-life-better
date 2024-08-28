import { Sidebar } from "@/components/shared/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <Sidebar>{children} </Sidebar>;
}
