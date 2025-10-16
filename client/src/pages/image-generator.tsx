import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { ImageRequest, ImageResponse } from "@shared/schema";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: ImageRequest) => {
      return await apiRequest<ImageResponse>("POST", "/api/image", data);
    },
    onSuccess: (data) => {
      setImageUrl(data.url);
    }
  });

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    setImageUrl(null);
    mutation.mutate({ prompt: prompt.trim() });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-image-title">Image Generator</h1>
      
      <Card className="p-6">
        <div className="flex gap-4">
          <Input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create..."
            className="bg-background"
            data-testid="input-image-prompt"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !mutation.isPending && prompt.trim()) {
                handleSubmit();
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending || !prompt.trim()}
            className="bg-chart-4 hover:bg-chart-4 text-white font-semibold"
            data-testid="button-generate-image"
          >
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate
          </Button>
        </div>
      </Card>

      {mutation.isPending && (
        <div className="mt-6 text-center" data-testid="loading-image">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-chart-4" />
          <p className="mt-4 text-muted-foreground">Creating your image...</p>
        </div>
      )}

      {mutation.error && (
        <Card className="mt-6 p-6 border-destructive">
          <p className="text-destructive font-medium" data-testid="error-image">
            Error: {(mutation.error as Error).message}
          </p>
        </Card>
      )}

      {imageUrl && (
        <div className="mt-6" data-testid="image-output">
          <Card className="p-4">
            <div className="flex justify-center items-center">
              <img
                src={imageUrl}
                alt="Generated"
                className="max-w-full max-h-[512px] rounded-md"
                data-testid="img-generated"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
