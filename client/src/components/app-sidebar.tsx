import { Home, BookOpen, FileText, Code, Sparkles, Globe, Image } from "lucide-react";
import { useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Study Buddy", url: "/study", icon: BookOpen },
  { title: "Text Tools", url: "/text", icon: FileText },
  { title: "Code Helper", url: "/code", icon: Code },
  { title: "Creative Corner", url: "/creative", icon: Sparkles },
  { title: "Travel Planner", url: "/travel", icon: Globe },
  { title: "Image Generator", url: "/image", icon: Image },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();

  return (
    <Sidebar>
      <div className="p-6 text-center border-b border-sidebar-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-chart-3 to-chart-2 bg-clip-text text-transparent" data-testid="text-logo">
          IntelliHub AI
        </h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      onClick={() => setLocation(item.url)}
                      isActive={isActive}
                      data-testid={`link-${item.url === '/' ? 'dashboard' : item.url.slice(1)}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
