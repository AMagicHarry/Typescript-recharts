import { useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Download } from "lucide-react";
import { AnnualOverview } from "./AnnualOverview";

export function ReportDownload() {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    if (!componentRef.current) return;
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('download.pdf');
    });
  };


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Download Report</CardTitle>
          <CardDescription>
            Generate a PDF report containing all charts and data tables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={handleDownloadPdf}>
              <Download className="mr-2 h-4 w-4" />
              Save as PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hidden printable content */}
      <div className="h-0 overflow-hidden">
        <div ref={componentRef}>
          <h1 className="py-16 text-center text-6xl font-bold">Commuting CO2 Emissions</h1>
          <AnnualOverview />
        </div>
      </div>
    </div>
  );
}
