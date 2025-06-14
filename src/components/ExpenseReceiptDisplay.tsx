
import { Button } from "@/components/ui/button";
import { Eye, FileText, Image } from "lucide-react";

interface ExpenseReceiptDisplayProps {
  receiptUrl: string | null;
}

export const ExpenseReceiptDisplay = ({ receiptUrl }: ExpenseReceiptDisplayProps) => {
  if (!receiptUrl) {
    return <span className="text-gray-400 text-sm">Aucun reçu</span>;
  }

  const isImage = receiptUrl.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
  const isPdf = receiptUrl.toLowerCase().includes('.pdf');

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.open(receiptUrl, '_blank')}
      className="flex items-center space-x-1"
    >
      {isImage && <Image className="h-4 w-4 text-green-500" />}
      {isPdf && <FileText className="h-4 w-4 text-red-500" />}
      <Eye className="h-4 w-4" />
      <span className="hidden sm:inline">Voir</span>
    </Button>
  );
};
