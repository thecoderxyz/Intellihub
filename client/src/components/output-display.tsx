import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface OutputDisplayProps {
  output: { title: string; content: string } | null;
  isLoading: boolean;
  error: Error | null;
  isCode?: boolean;
}

export function OutputDisplay({ output, isLoading, error, isCode = false }: OutputDisplayProps) {
  if (isLoading) {
    return (
      <div className="mt-6 text-center" data-testid="loading-state">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">AI is processing your request...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mt-6 p-6 border-destructive" data-testid="error-state">
        <p className="text-destructive font-medium">
          Error: {error.message}
        </p>
      </Card>
    );
  }

  if (output) {
    return (
      <div className="mt-6" data-testid="output-container">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground" data-testid="output-title">
            {output.title}
          </h3>
          <div 
            className={`text-muted-foreground whitespace-pre-wrap leading-relaxed ${isCode ? 'font-mono text-sm' : ''}`}
            data-testid="output-content"
          >
            {output.content}
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
