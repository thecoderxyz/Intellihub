import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { StudyRequest, AIResponse } from "@shared/schema";
import { OutputDisplay } from "@/components/output-display";

export default function StudyBuddy() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState<{ title: string; content: string } | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: StudyRequest) => {
      const response = await apiRequest<AIResponse>("POST", "/api/study", data);
      return response;
    },
    onSuccess: (data, variables) => {
      const titles = {
        explain: `Explanation for ${topic}`,
        questions: `Practice Questions for ${topic}`,
        mcqs: `MCQs for ${topic}`,
        lessonPlan: `Lesson Plan for ${topic}`
      };
      setOutput({
        title: titles[variables.action],
        content: data.content
      });
    }
  });

  const handleAction = (action: StudyRequest['action']) => {
    if (!subject.trim() || !topic.trim()) return;
    setOutput(null);
    mutation.mutate({ subject: subject.trim(), topic: topic.trim(), action });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-study-title">Study Buddy</h1>
      
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject (e.g., Biology)"
            className="bg-background"
            data-testid="input-study-subject"
          />
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic (e.g., Cell Mitosis)"
            className="bg-background"
            data-testid="input-study-topic"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            onClick={() => handleAction("explain")}
            disabled={mutation.isPending || !subject.trim() || !topic.trim()}
            className="bg-chart-1 hover:bg-chart-1 text-white font-semibold"
            data-testid="button-explain"
          >
            {mutation.isPending && mutation.variables?.action === "explain" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Explain Topic
          </Button>
          <Button
            onClick={() => handleAction("questions")}
            disabled={mutation.isPending || !subject.trim() || !topic.trim()}
            className="bg-chart-2 hover:bg-chart-2 text-white font-semibold"
            data-testid="button-questions"
          >
            {mutation.isPending && mutation.variables?.action === "questions" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Practice Questions
          </Button>
          <Button
            onClick={() => handleAction("mcqs")}
            disabled={mutation.isPending || !subject.trim() || !topic.trim()}
            className="bg-chart-3 hover:bg-chart-3 text-white font-semibold"
            data-testid="button-mcqs"
          >
            {mutation.isPending && mutation.variables?.action === "mcqs" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Generate MCQs
          </Button>
          <Button
            onClick={() => handleAction("lessonPlan")}
            disabled={mutation.isPending || !subject.trim() || !topic.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            data-testid="button-lesson-plan"
          >
            {mutation.isPending && mutation.variables?.action === "lessonPlan" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Lesson Plan
          </Button>
        </div>
      </Card>

      <OutputDisplay
        output={output}
        isLoading={mutation.isPending}
        error={mutation.error as Error}
      />
    </div>
  );
}
