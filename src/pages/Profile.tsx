
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCustomization } from "@/components/ProfileCustomization";
import { CollaboratorInvitations } from "@/components/CollaboratorInvitations";
import { User, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('profile')}</h1>
          <p className="text-muted-foreground">
            {t('manage_profile_and_team')}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t('my_profile')}
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t('team')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileCustomization />
          </TabsContent>

          <TabsContent value="team">
            <CollaboratorInvitations />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
