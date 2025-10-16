import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { SummarizeRequest, EmailRequest, ToneShiftRequest, AIResponse } from "@shared/schema";
import { OutputDisplay } from "@/components/output-display";

export default function TextTools() {
  const [summarizeText, setSummarizeText] = useState("");
  const [emailTopic, setEmailTopic] = useState("");
  const [emailPoints, setEmailPoints] = useState("");
  const [toneText, setToneText] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneShiftRequest['tone']>("Formal");
  const [output, setOutput] = useState<{ title: string; content: string } | null>(null);

  const summarizeMutation = useMutation({
    mutationFn: async (data: SummarizeRequest) => {
      return await apiRequest<AIResponse>("POST", "/api/text/summarize", data);
    },
    onSuccess: (data) => {
      setOutput({ title: "Summary", content: data.content });
    }
  });

  const emailMutation = useMutation({
    mutationFn: async (data: EmailRequest) => {
      return await apiRequest<AIResponse>("POST", "/api/text/email", data);
    },
    onSuccess: (data, variables) => {
      setOutput({ title: `Draft Email: ${variables.topic}`, content: data.content });
    }
  });

  const toneShiftMutation = useMutation({
    mutationFn: async (data: ToneShiftRequest) => {
      return await apiRequest<AIResponse>("POST", "/api/text/tone-shift", data);
    },
    onSuccess: (data, variables) => {
      setOutput({ title: `Text rewritten in ${variables.tone} tone`, content: data.content });
    }
  });

  const handleSummarize = () => {
    if (!summarizeText.trim()) return;
    setOutput(null);
    summarizeMutation.mutate({ text: summarizeText.trim() });
  };

  const handleEmail = () => {
    if (!emailTopic.trim() || !emailPoints.trim()) return;
    setOutput(null);
    emailMutation.mutate({ topic: emailTopic.trim(), keyPoints: emailPoints.trim() });
  };

  const handleToneShift = () => {
    if (!toneText.trim()) return;
    setOutput(null);
    toneShiftMutation.mutate({ text: toneText.trim(), tone: selectedTone });
  };

  const isLoading = summarizeMutation.isPending || emailMutation.isPending || toneShiftMutation.isPending;
  const error = summarizeMutation.error || emailMutation.error || toneShiftMutation.error;

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-tools-title">Text Tools</h1>
      
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-chart-2">Summarizer</h3>
        <Textarea
          value={summarizeText}
          onChange={(e) => setSummarizeText(e.target.value)}
          rows={6}
          placeholder="Paste text here to summarize..."
          className="bg-background mb-4"
          data-testid="input-summarize-text"
        />
        <Button
          onClick={handleSummarize}
          disabled={isLoading || !summarizeText.trim()}
          className="bg-chart-2 hover:bg-chart-2 text-white font-semibold"
          data-testid="button-summarize"
        >
          {summarizeMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Summarize
        </Button>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-chart-2">Email Writer</h3>
        <Input
          type="text"
          value={emailTopic}
          onChange={(e) => setEmailTopic(e.target.value)}
          placeholder="To / Topic (e.g., Project Update)"
          className="bg-background mb-4"
          data-testid="input-email-topic"
        />
        <Textarea
          value={emailPoints}
          onChange={(e) => setEmailPoints(e.target.value)}
          rows={4}
          placeholder="Key points to include (one per line)..."
          className="bg-background mb-4"
          data-testid="input-email-points"
        />
        <Button
          onClick={handleEmail}
          disabled={isLoading || !emailTopic.trim() || !emailPoints.trim()}
          className="bg-chart-2 hover:bg-chart-2 text-white font-semibold"
          data-testid="button-draft-email"
        >
          {emailMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Draft Email
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-chart-2">Tone Shifter</h3>
        <Textarea
          value={toneText}
          onChange={(e) => setToneText(e.target.value)}
          rows={6}
          placeholder="Paste text here to change its tone..."
          className="bg-background mb-4"
          data-testid="input-tone-text"
        />
        <div className="flex items-center gap-4">
          <Select value={selectedTone} onValueChange={(value) => setSelectedTone(value as ToneShiftRequest['tone'])}>
            <SelectTrigger className="bg-background" data-testid="select-tone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Formal">Formal</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Confident">Confident</SelectItem>
              <SelectItem value="Friendly">Friendly</SelectItem>
              <SelectItem value="Persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleToneShift}
            disabled={isLoading || !toneText.trim()}
            className="bg-chart-2 hover:bg-chart-2 text-white font-semibold flex-1"
            data-testid="button-shift-tone"
          >
            {toneShiftMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Shift Tone
          </Button>
        </div>
      </Card>

      <OutputDisplay
        output={output}
        isLoading={isLoading}
        error={error as Error}
      />
    </div>
  );
}
