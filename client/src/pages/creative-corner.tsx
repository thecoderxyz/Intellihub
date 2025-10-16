import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { CreativeRequest, AIResponse } from "@shared/schema";
import { OutputDisplay } from "@/components/output-display";

export default function CreativeCorner() {
  const [ingredients, setIngredients] = useState("");
  const [output, setOutput] = useState<{ title: string; content: string } | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: CreativeRequest) => {
      return await apiRequest<AIResponse>("POST", "/api/creative", data);
    },
    onSuccess: (data) => {
      setOutput({
        title: "Generated Recipe",
        content: data.content
      });
    }
  });

  const handleSubmit = () => {
    if (!ingredients.trim()) return;
    setOutput(null);
    mutation.mutate({ ingredients: ingredients.trim() });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-creative-title">Creative Corner</h1>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-chart-4">Recipe Creator</h3>
        <p className="text-muted-foreground mb-4">
          Have some ingredients but not sure what to make? List them below!
        </p>
        <Textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={4}
          placeholder="e.g., chicken breast, rice, broccoli, soy sauce"
          className="bg-background mb-4"
          data-testid="input-ingredients"
        />
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending || !ingredients.trim()}
          className="bg-chart-4 hover:bg-chart-4 text-white font-semibold"
          data-testid="button-generate-recipe"
        >
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Recipe
        </Button>
      </Card>

      <OutputDisplay
        output={output}
        isLoading={mutation.isPending}
        error={mutation.error as Error}
      />
    </div>
  );
}
