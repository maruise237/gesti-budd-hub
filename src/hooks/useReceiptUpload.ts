
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useReceiptUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadReceipt = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(data.path);

      toast({
        title: "Reçu téléchargé",
        description: "Le reçu a été téléchargé avec succès.",
      });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le reçu.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteReceipt = async (url: string): Promise<boolean> => {
    try {
      // Extract filename from URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      const { error } = await supabase.storage
        .from('receipts')
        .remove([fileName]);

      if (error) {
        throw error;
      }

      toast({
        title: "Reçu supprimé",
        description: "Le reçu a été supprimé avec succès.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting receipt:', error);
      toast({
        title: "Erreur de suppression",
        description: "Impossible de supprimer le reçu.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadReceipt,
    deleteReceipt,
    uploading
  };
};
