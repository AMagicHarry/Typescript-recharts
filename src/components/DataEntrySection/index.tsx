import { DataEntryForm } from "./DataEntryForm";
import { ApprovalView } from "./ApprovalView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function DataEntrySection() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="fill-in" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="fill-in">Fill in</TabsTrigger>
          <TabsTrigger value="submit">Submit</TabsTrigger>
          <TabsTrigger value="approve">Approve</TabsTrigger>
          <TabsTrigger value="finalize">Finalize</TabsTrigger>
          <TabsTrigger value="classic">Gauges Classic</TabsTrigger>
        </TabsList>
        <TabsContent value="fill-in">
          <DataEntryForm />
        </TabsContent>
        <TabsContent value="approve">
          <ApprovalView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
