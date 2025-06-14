
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Eye, FileText, Image } from "lucide-react";
import { useReceiptUpload } from "@/hooks/useReceiptUpload";

interface ReceiptUploadProps {
  receiptUrl: string | null;
  onReceiptChange: (url: string | null) => void;
}

export const ReceiptUpload = ({ receiptUrl, onReceiptChange }: ReceiptUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadReceipt, deleteReceipt, uploading } = useReceiptUpload();

  const handleFileSelect = async (file: File) => {
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    if (file.size > maxSize) {
      return;
    }

    const url = await uploadReceipt(file);
    if (url) {
      onReceiptChange(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveReceipt = async () => {
    if (receiptUrl) {
      const success = await deleteReceipt(receiptUrl);
      if (success) {
        onReceiptChange(null);
      }
    }
  };

  const getFileIcon = (url: string) => {
    if (url.toLowerCase().includes('.pdf')) {
      return <FileText className="h-6 w-6 text-red-500" />;
    }
    return <Image className="h-6 w-6 text-green-500" />;
  };

  const getFileName = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  if (receiptUrl) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon(receiptUrl)}
              <div>
                <p className="text-sm font-medium">Reçu attaché</p>
                <p className="text-xs text-gray-500">{getFileName(receiptUrl)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open(receiptUrl, '_blank')}
              >
                <Eye className="h-4 w-4 mr-1" />
                Voir
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveReceipt}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive 
            ? 'border-orange-500 bg-orange-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Glissez-déposez votre reçu ici, ou{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-orange-600"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  parcourez vos fichiers
                </Button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, PDF jusqu'à 5MB
              </p>
            </div>
            {uploading && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Téléchargement...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
