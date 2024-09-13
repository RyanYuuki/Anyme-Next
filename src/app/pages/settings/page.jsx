"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cog, Palette, Play, Rss } from "lucide-react";
import { useTheme, ThemeProvider } from "next-themes";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("sources");

  return (
    <div className="mx-10 max-md:mx-3 rounded-lg py-6 px-4 md:px-6 lg:px-8 bg-muted/50">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <aside className="lg:w-1/4 mb-8 lg:mb-0">
          <ScrollArea className="lg:h-[calc(100vh-8rem)]">
            <nav className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 pb-4 lg:pb-0 overflow-x-auto lg:overflow-x-visible">
              <Button
                variant={activeTab === "sources" ? "default" : "ghost"}
                className="justify-start whitespace-nowrap"
                onClick={() => setActiveTab("sources")}
              >
                <Rss className="mr-2 h-4 w-4" />
                Sources
              </Button>
              <Button
                variant={activeTab === "themes" ? "default" : "ghost"}
                className="justify-start whitespace-nowrap"
                onClick={() => setActiveTab("themes")}
              >
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </Button>
              <Button
                variant={activeTab === "video-player" ? "default" : "ghost"}
                className="justify-start whitespace-nowrap"
                onClick={() => setActiveTab("video-player")}
              >
                <Play className="mr-2 h-4 w-4" />
                Video Player
              </Button>
              <Button
                variant={activeTab === "other" ? "default" : "ghost"}
                className="justify-start whitespace-nowrap"
                onClick={() => setActiveTab("other")}
              >
                <Cog className="mr-2 h-4 w-4" />
                Advanced
              </Button>
            </nav>
          </ScrollArea>
        </aside>
        <div className="flex-1">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="sources">
                <SourcesTab />
              </TabsContent>
              <TabsContent value="themes">
                <ThemesTab />
              </TabsContent>
              <TabsContent value="video-player">
                <VideoPlayerTab />
              </TabsContent>
              <TabsContent value="other">
                <AdvancedSettingsTab />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function SourcesTab() {
  return (
    <div className="space-y-6 px-1">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Sources</h2>
        <p className="text-muted-foreground">
          Manage your anime and manga sources.
        </p>
      </div>
      <Separator />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="anime-source">Default Anime Source</Label>
          <Select>
            <SelectTrigger className="bg-background/50" >
              <SelectValue placeholder="Aniwatch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consumet">Consumet</SelectItem>
              <SelectItem value="aniwatch">Aniwatch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="manga-source">Default Manga Source</Label>
          <Select>
            <SelectTrigger className="bg-background/50" >
              <SelectValue placeholder="MangaKakalot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mangakakalot">MangaKakalot</SelectItem>
              <SelectItem value="mangareader">MangaReader</SelectItem>
              <SelectItem value="mangapill">MangaPill</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center px-3 justify-between">
          <Label htmlFor="romaji-names">Romaji Names</Label>
          <Switch id="romaji-names" />
        </div>
      </div>
    </div>
  );
}

function ThemesTab() {  
  const { setTheme, theme } = useTheme();
  const handleTheme = (theme) => {
    setTheme(theme);
  }
  
  return (
    <div className="space-y-6 px-1">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Appearance</h2>
        <p className="text-muted-foreground">
          Customize the look and feel of the application.
        </p>
      </div>
      <Separator />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Theme</Label>
          <RadioGroup onValueChange={(value) => handleTheme(value)} defaultValue={theme} value={theme}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </div>
        {/* <div className="space-y-2">
          <Label>Accent Color</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select accent color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </div>
  );
}

function VideoPlayerTab() {
  return (
    <div className="space-y-6 px-1">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Video Player</h2>
        <p className="text-muted-foreground">
          Customize your video playback experience.
        </p>
      </div>
      <Separator />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="autoplay">Autoplay Next Episode</Label>
          <Switch id="autoplay" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quality">Default Quality</Label>
          <Select>
            <SelectTrigger className="bg-background/50" >
              <SelectValue placeholder="Select default quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="1080p">1080p</SelectItem>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="480p">480p</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="playback-speed">Default Playback Speed</Label>
          <Select>
            <SelectTrigger className="bg-background/50" >
              <SelectValue placeholder="Select playback speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function AdvancedSettingsTab() {
  return (
    <div className="space-y-6 px-1">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Advanced Settings</h2>
        <p className="text-muted-foreground">
          Configure advanced options for AnymeY.
        </p>
      </div>
      <Separator />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch id="notifications" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Label htmlFor="data-saver">Data Saver Mode</Label>
          <Switch id="data-saver" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Label htmlFor="clear-cache">Clear Cache</Label>
          <Button variant="outline">Clear Cache</Button>
        </div>
      </div>
    </div>
  );
}
