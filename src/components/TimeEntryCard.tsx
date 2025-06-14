
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar, Play, Square } from "lucide-react";
import { format } from "date-fns";

interface TimeEntry {
  id: string;
  start_time: string;
  end_time: string | null;
  hours_worked: number | null;
  description: string | null;
  project_id: string;
  employee_id: string;
  created_at: string;
  projects: {
    name: string;
  } | null;
  employees: {
    first_name: string;
    last_name: string;
  } | null;
}

interface TimeEntryCardProps {
  entry: TimeEntry;
  onEdit: (entry: TimeEntry) => void;
  onDelete: (entryId: string) => void;
  onStopTimer: (entryId: string) => void;
  isStoppingTimer: boolean;
}

export const TimeEntryCard = ({ 
  entry, 
  onEdit, 
  onDelete, 
  onStopTimer, 
  isStoppingTimer 
}: TimeEntryCardProps) => {
  const getStatusBadge = (entry: TimeEntry) => {
    if (entry.end_time) {
      return (
        <Badge variant="default">
          <Clock className="h-3 w-3 mr-1" />
          Terminé
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <Play className="h-3 w-3 mr-1" />
          En cours
        </Badge>
      );
    }
  };

  const formatDuration = (startTime: string, endTime: string | null) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const duration = end.getTime() - start.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {entry.projects?.name || "Projet inconnu"}
          </CardTitle>
          {getStatusBadge(entry)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {entry.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {entry.description}
          </p>
        )}
        
        <div className="space-y-2 text-sm text-gray-600">
          {entry.employees && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>
                {entry.employees.first_name} {entry.employees.last_name}
              </span>
            </div>
          )}
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {format(new Date(entry.start_time), "dd/MM/yyyy HH:mm")}
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              Durée: {formatDuration(entry.start_time, entry.end_time)}
            </span>
          </div>
          
          {entry.hours_worked && (
            <div className="flex items-center font-medium">
              <span>Total: {entry.hours_worked}h</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          {!entry.end_time && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStopTimer(entry.id)}
              disabled={isStoppingTimer}
            >
              <Square className="h-3 w-3 mr-1" />
              Arrêter
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(entry)}
          >
            Modifier
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(entry.id)}
          >
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
