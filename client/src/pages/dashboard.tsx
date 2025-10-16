import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { BookOpen, FileText, Code, Sparkles, Globe, Image } from "lucide-react";

export default function Dashboard() {
  const tools = [
    {
      title: "Learn Faster",
      description: "Use the Study Buddy to explain topics, generate questions, and create quizzes.",
      link: "/study",
      icon: BookOpen,
      color: "text-chart-1"
    },
    {
      title: "Create & Refine",
      description: "Use Text Tools to summarize articles or draft professional emails in seconds.",
      link: "/text",
      icon: FileText,
      color: "text-chart-2"
    },
    {
      title: "Build & Understand",
      description: "Let the Code Helper explain complex code or write new scripts for you.",
      link: "/code",
      icon: Code,
      color: "text-chart-3"
    },
    {
      title: "Visualize Ideas",
      description: "Bring your concepts to life with the Image Generator.",
      link: "/image",
      icon: Image,
      color: "text-chart-4"
    },
    {
      title: "Plan Adventures",
      description: "Get a custom itinerary for your next trip with the Travel Planner.",
      link: "/travel",
      icon: Globe,
      color: "text-chart-5"
    },
    {
      title: "Get Creative",
      description: "Use the Creative Corner to generate recipes and creative content.",
      link: "/creative",
      icon: Sparkles,
      color: "text-chart-4"
    }
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-4xl font-extrabold text-foreground mb-2" data-testid="text-dashboard-title">
        Welcome to IntelliHub AI
      </h1>
      <p className="text-lg text-muted-foreground mb-8" data-testid="text-dashboard-subtitle">
        Your integrated AI-powered workspace.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.link} href={tool.link}>
              <Card 
                className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200"
                data-testid={`card-tool-${tool.link.slice(1)}`}
              >
                <div className="flex items-start gap-4">
                  <Icon className={`w-6 h-6 ${tool.color} flex-shrink-0`} />
                  <div>
                    <h3 className={`font-bold text-xl ${tool.color} mb-2`} data-testid={`text-tool-title-${tool.link.slice(1)}`}>
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-tool-description-${tool.link.slice(1)}`}>
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
