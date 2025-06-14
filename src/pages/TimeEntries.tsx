
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TimeEntryDialog } from "@/components/TimeEntryDialog";
import { TimeEntriesHeader } from "@/components/TimeEntriesHeader";
import { TimeEntriesStats } from "@/components/TimeEntriesStats";
import { TimeEntriesTabContent } from "@/components/TimeEntriesTabContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTimeEntriesData } from "@/hooks/useTimeEntriesData";
import { useTimeEntriesMutations } from "@/hooks/useTimeEntriesMutations";
import { useTimeEntriesDialog } from "@/hooks/useTimeEntriesDialog";

const TimeEntries = () => {
  const { timeEntries, isLoading, projects, employees } = useTimeEntriesData();
  const { deleteEntryMutation, stopTimerMutation } = useTimeEntriesMutations(timeEntries);
  const { 
    isDialogOpen, 
    editingEntry, 
    handleEditEntry, 
    handleOpenDialog, 
    handleCloseDialog 
  } = useTimeEntriesDialog();

  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
      deleteEntryMutation.mutate(entryId);
    }
  };

  const handleStopTimer = (entryId: string) => {
    stopTimerMutation.mutate(entryId);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <TimeEntriesHeader onCreateEntry={handleOpenDialog} />

          <Tabs defaultValue="entries" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entries">Entrées de temps</TabsTrigger>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
            </TabsList>
            
            <TabsContent value="entries" className="space-y-6">
              <TimeEntriesTabContent
                timeEntries={timeEntries}
                projects={projects}
                employees={employees}
                onEditEntry={handleEditEntry}
                onDeleteEntry={handleDeleteEntry}
                onStopTimer={handleStopTimer}
                onCreateEntry={handleOpenDialog}
                isStoppingTimer={stopTimerMutation.isPending}
              />
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-6">
              <TimeEntriesStats timeEntries={timeEntries || []} />
            </TabsContent>
          </Tabs>
        </div>

        <TimeEntryDialog
          open={isDialogOpen}
          onOpenChange={handleCloseDialog}
          timeEntry={editingEntry}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TimeEntries;
