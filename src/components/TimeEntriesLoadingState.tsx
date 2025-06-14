
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const TimeEntriesLoadingState = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};
