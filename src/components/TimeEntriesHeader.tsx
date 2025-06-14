
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TimeEntriesHeaderProps {
  onCreateEntry: () => void;
}

export const TimeEntriesHeader = ({ onCreateEntry }: TimeEntriesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Temps de Travail</h1>
        <p className="text-gray-600">
          Enregistrez et suivez le temps passé sur vos projets
        </p>
      </div>
      <Button onClick={onCreateEntry}>
        <Plus className="h-4 w-4 mr-2" />
        Nouvelle Entrée
      </Button>
    </div>
  );
};
