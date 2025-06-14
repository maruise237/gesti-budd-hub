
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyTimeEntriesStateProps {
  onCreateEntry: () => void;
}

export const EmptyTimeEntriesState = ({ onCreateEntry }: EmptyTimeEntriesStateProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Aucune entrée de temps trouvée
          </h3>
          <p className="text-gray-600">
            Commencez par enregistrer votre premier temps de travail.
          </p>
          <Button onClick={onCreateEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Créer une Entrée
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
