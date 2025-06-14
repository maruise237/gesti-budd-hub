
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Project {
  id: string;
  name: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("id, name")
        .eq("user_id", user!.id)
        .order("name");

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  return {
    projects,
    fetchProjects,
  };
};
