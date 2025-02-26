import { TransportMode } from "@/constants/emissions";
import { CommutingData } from ".";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AnnualEmissionsTable = ({ data: processedData }: { data: CommutingData }) => {
  return (
    <div className="col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Annual Emissions</CardTitle>
          <CardDescription>
            Detailed breakdown of CO2 emissions (in kg) by transport mode and
            quarter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-green-700 hover:bg-green-600">
                <TableHead className="text-white font-bold">
                  Transport Mode
                </TableHead>
                {Object.keys(processedData).map((quarter) => (
                  <TableHead key={quarter} className="text-white font-bold">
                    {quarter}
                  </TableHead>
                ))}
                <TableHead className="text-white font-bold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(Object.keys(processedData.Q1) as TransportMode[]).map(
                (mode, index) => (
                  <TableRow
                    key={mode}
                    className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
                  >
                    <TableCell>
                      {mode
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </TableCell>
                    {Object.entries(processedData).map(([quarter, data]) => (
                      <TableCell key={quarter}>{data[mode]}</TableCell>
                    ))}
                    <TableCell>
                      {Math.round(
                        Object.values(processedData).reduce(
                          (sum, data) => sum + (data[mode] || 0),
                          0
                        ) * 1000
                      ) / 1000}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnualEmissionsTable;
