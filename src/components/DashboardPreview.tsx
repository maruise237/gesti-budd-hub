
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, FileText, Clock } from "lucide-react";

export const DashboardPreview = () => {
  const stats = [
    { label: "Total Revenue", value: "$59,158", change: "+12%", color: "bg-blue-500", icon: TrendingUp },
    { label: "Subscribers", value: "2,984", change: "+18%", color: "bg-purple-500", icon: Users },
    { label: "Conversations", value: "698", change: "+8%", color: "bg-cyan-500", icon: FileText },
    { label: "Purchase Sales", value: "$658", change: "+2%", color: "bg-pink-500", icon: Clock },
  ];

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Carte principale du dashboard */}
      <Card className="glass-card border-border/20 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Hello Sajad!" />
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Hello Sajad!</h3>
              <p className="text-sm text-muted-foreground">Have a great night.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Today</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-background/20">
                <div className={`w-2 h-8 ${stat.color} rounded-full`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            ))}
          </div>

          {/* Graphique stylisé */}
          <div className="relative h-32 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 p-4">
            <svg viewBox="0 0 400 100" className="w-full h-full">
              <path
                d="M0,80 Q100,20 200,40 T400,30"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                className="drop-shadow-sm"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-2 left-4 text-xs text-muted-foreground">
              Last 7 days
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartes flottantes à droite */}
      <div className="absolute -right-8 top-16 space-y-4 hidden lg:block">
        <Card className="glass-card border-border/20 w-64 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">Mobile applications</h4>
            <Badge className="bg-primary">New</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Real-time data and advanced tools help implement mobile apps in your business.
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-xs">JS</AvatarFallback>
              </Avatar>
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-xs">AB</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-muted-foreground">+2 more</span>
          </div>
        </Card>

        <Card className="glass-card border-border/20 w-64 p-4">
          <h4 className="font-semibold text-foreground mb-2">Upload, share, and preview any file</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Upload files to your server with advanced encryption, then share with friends.
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Document.pdf</span>
              <span className="text-foreground">2.1 MB</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Presentation.pptx</span>
              <span className="text-foreground">4.7 MB</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Spreadsheet.xlsx</span>
              <span className="text-foreground">1.8 MB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
