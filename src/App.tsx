import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { QuarterlyOverview } from "./components/QuarterOverview";
import { AnnualOverview } from "./components/AnnualOverview";
import { ReportDownload } from "./components/ReportDownload";
import { CommutingProvider } from "./context/CommutingContext";
import { DataEntrySection } from "./components/DataEntrySection";
import { QuarterSelector } from "./components/QuarterSelector";
import { ToastProvider } from "@/components/ui/toast";

function App() {
  return (
    <CommutingProvider>
      <ToastProvider>
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold mb-6">
            Commuting CO2 Emissions Dashboard
          </h1>

          <Tabs defaultValue="data-entry" className="space-y-4">
            <TabsList className="h-12 p-1.5">
              <TabsTrigger value="data-entry" className="px-4 py-2.5">
                Data Entry
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="px-4 py-2.5">
                Quarterly Overview
              </TabsTrigger>
              <TabsTrigger value="annual" className="px-4 py-2.5">
                Annual Overview
              </TabsTrigger>
              <TabsTrigger value="report" className="px-4 py-2.5">
                Download Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value="data-entry" className="space-y-4">
              <QuarterSelector />
              <DataEntrySection />
            </TabsContent>

            <TabsContent value="quarterly" className="space-y-4">
              <QuarterSelector />
              <QuarterlyOverview />
            </TabsContent>

            <TabsContent value="annual" className="space-y-4">
              <QuarterSelector showQuarter={false} />
              <AnnualOverview />
            </TabsContent>

            <TabsContent value="report" className="space-y-4">
              <QuarterSelector showQuarter={false} />
              <ReportDownload />
            </TabsContent>
          </Tabs>
        </div>
      </ToastProvider>
    </CommutingProvider>
  );
}

export default App;
