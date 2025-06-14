
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TimeEntriesLoadingState } from "@/components/TimeEntriesLoadingState";
import { TimeEntriesContent } from "@/components/TimeEntriesContent";
import { useTimeEntriesData } from "@/hooks/useTimeEntriesData";
import { useTimeEntriesHandlers } from "@/hooks/useTimeEntriesHandlers";

const TimeEntries = () => {
  const { timeEntries, isLoading, projects, employees } = useTimeEntriesData();
  const {
    isDialogOpen,
    editingEntry,
    handleEditEntry,
    handleOpenDialog,
    handleCloseDialog,
    handleDeleteEntry,
    handleStopTimer,
    isStoppingTimer,
  } = useTimeEntriesHandlers(timeEntries);

  if (isLoading) {
    return <TimeEntriesLoadingState />;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TimeEntriesContent
          timeEntries={timeEntries}
          projects={projects}
          employees={employees}
          isDialogOpen={isDialogOpen}
          editingEntry={editingEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
          onStopTimer={handleStopTimer}
          onCreateEntry={handleOpenDialog}
          onCloseDialog={handleCloseDialog}
          isStoppingTimer={isStoppingTimer}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TimeEntries;
