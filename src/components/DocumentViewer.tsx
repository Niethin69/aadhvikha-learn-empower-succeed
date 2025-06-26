
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Download, FileText } from "lucide-react";

interface DocumentViewerProps {
  fileName: string;
  fileUrl: string;
  children: React.ReactNode;
}

const DocumentViewer = ({ fileName, fileUrl, children }: DocumentViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!fileUrl) {
    return null;
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isPdf = fileName?.toLowerCase().endsWith('.pdf');
  const isImage = fileName?.toLowerCase().match(/\.(jpg|jpeg|png)$/);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {fileName}
          </DialogTitle>
          <DialogDescription>
            Document preview
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-4">
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {isPdf && (
            <iframe
              src={fileUrl}
              className="w-full h-[70vh] border rounded"
              title={fileName}
            />
          )}
          
          {isImage && (
            <img
              src={fileUrl}
              alt={fileName}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          )}
          
          {!isPdf && !isImage && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
              <FileText className="h-16 w-16 mb-4" />
              <p>Preview not available for this file type</p>
              <p className="text-sm">Click download to view the file</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
