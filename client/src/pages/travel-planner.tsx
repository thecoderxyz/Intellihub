import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { TravelRequest, AIResponse } from "@shared/schema";
import { OutputDisplay } from "@/components/output-display";

export default function TravelPlanner() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [interests, setInterests] = useState("");
  const [output, setOutput] = useState<{ title: string; content: string } | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: TravelRequest) => {
      return await apiRequest<AIResponse>("POST", "/api/travel", data);
    },
    onSuccess: (data, variables) => {
      setOutput({
        title: `${variables.destination} - ${variables.duration} Itinerary`,
        content: data.content
      });
    }
  });

  const handleSubmit = () => {
    if (!destination.trim() || !duration.trim()) return;
    setOutput(null);
    mutation.mutate({
      destination: destination.trim(),
      duration: duration.trim(),
      interests: interests.trim() || undefined
    });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-travel-title">Travel Planner</h1>
      
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination (e.g., Paris, France)"
            className="bg-background"
            data-testid="input-destination"
          />
          <Input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (e.g., 5 days)"
            className="bg-background"
            data-testid="input-duration"
          />
        </div>
        <Textarea
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          rows={3}
          placeholder="Interests (e.g., museums, local food, hiking)"
          className="bg-background mb-4"
          data-testid="input-interests"
        />
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending || !destination.trim() || !duration.trim()}
          className="bg-chart-5 hover:bg-chart-5 text-white font-semibold"
          data-testid="button-generate-itinerary"
        >
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Itinerary
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
