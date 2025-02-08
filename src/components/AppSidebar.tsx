
import { 
  FolderOpen, 
  Image, 
  FileText, 
  Video, 
  Music, 
  Star, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Upload,
  Tag,
  Clock,
  Filter,
  Users,
  Share2,
  Shield,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AppSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out.",
      });
    } else {
      navigate('/auth');
    }
  };

  const mainItems = [
    {
      title: "All Files",
      icon: FolderOpen,
      action: () => navigate('/'),
    },
    {
      title: "Images",
      icon: Image,
      action: () => navigate('/?category=image'),
    },
    {
      title: "Documents",
      icon: FileText,
      action: () => navigate('/?category=document'),
    },
    {
      title: "Videos",
      icon: Video,
      action: () => navigate('/?category=video'),
    },
    {
      title: "Audio",
      icon: Music,
      action: () => navigate('/?category=audio'),
    },
  ];

  const quickAccessItems = [
    {
      title: "Recent",
      icon: Clock,
      action: () => navigate('/?sort=recent'),
    },
    {
      title: "Favorites",
      icon: Star,
      action: () => navigate('/?favorites=true'),
    },
    {
      title: "Shared",
      icon: Share2,
      action: () => navigate('/?shared=true'),
    },
    {
      title: "Tags",
      icon: Tag,
      action: () => navigate('/tags'),
    },
  ];

  const toolsItems = [
    {
      title: "Upload",
      icon: Upload,
      action: () => document.querySelector('input[type="file"]')?.click(),
    },
    {
      title: "Filter",
      icon: Filter,
      action: () => navigate('/filter'),
    },
    {
      title: "Shared Users",
      icon: Users,
      action: () => navigate('/shared-users'),
    },
    {
      title: "Security",
      icon: Shield,
      action: () => navigate('/security'),
    },
    {
      title: "Trash",
      icon: Trash2,
      action: () => navigate('/trash'),
    },
    {
      title: "Settings",
      icon: Settings,
      action: () => navigate('/settings'),
    },
  ];

  return (
    <Sidebar className={cn(
      "border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <SidebarContent>
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className={cn("font-semibold text-primary", isCollapsed && "hidden")}>
            Cloud Drive
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="px-4 py-2">
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={cn(isCollapsed && "sr-only")}>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.action} className="w-full">
                    <item.icon className="h-4 w-4 mr-2" />
                    <span className={cn("flex-1", isCollapsed && "hidden")}>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(isCollapsed && "sr-only")}>Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickAccessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.action} className="w-full">
                    <item.icon className="h-4 w-4 mr-2" />
                    <span className={cn("flex-1", isCollapsed && "hidden")}>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(isCollapsed && "sr-only")}>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.action} className="w-full">
                    <item.icon className="h-4 w-4 mr-2" />
                    <span className={cn("flex-1", isCollapsed && "hidden")}>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="w-full text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className={cn("flex-1", isCollapsed && "hidden")}>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
