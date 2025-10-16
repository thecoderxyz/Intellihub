import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { CodeRequest, AIResponse } from "@shared/schema";
import { OutputDisplay } from "@/components/output-display";

export default function CodeHelper() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<{ title: string; content: string } | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: CodeRequest) => {
      return await apiRequest<AIResponse>("POST", "/api/code", data);
    },
    onSuccess: (data) => {
      setOutput({
        title: "Code Analysis & Generation",
        content: data.content
      });
    }
  });

  const handleSubmit = () => {
    if (!code.trim()) return;
    setOutput(null);
    mutation.mutate({ code: code.trim() });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-code-title">Code Helper</h1>
      
      <Card className="p-6">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          placeholder="Paste code to explain, or describe the code you need..."
          className="bg-background font-mono text-sm mb-4"
          data-testid="input-code"
        />
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending || !code.trim()}
          className="bg-chart-3 hover:bg-chart-3 text-white font-semibold"
          data-testid="button-analyze-code"
        >
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Analyze / Generate Code
        </Button>
      </Card>

      <OutputDisplay
        output={output}
        isLoading={mutation.isPending}
        error={mutation.error as Error}
        isCode={true}
      />
    </div>
  );
}
