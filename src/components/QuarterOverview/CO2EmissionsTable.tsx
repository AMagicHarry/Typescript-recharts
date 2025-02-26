import { ChartData } from ".";
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

const CO2EmissionsTable = ({
  data,
  total,
}: {
  data: ChartData;
  total: number;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Emissions Data</CardTitle>
      <CardDescription>Detailed quarterly breakdown</CardDescription>
    </CardHeader>
    <CardContent>
      <Table className="w-full [&_td:nth-child(1)]:w-80 [&_td:nth-child(2)]:w-60">
        <TableHeader>
          <TableRow className="bg-green-700 hover:bg-green-600">
            <TableHead className="text-white font-bold">
              Transport Mode
            </TableHead>
            <TableHead className="text-white font-bold">
              CO2 Emissions
            </TableHead>
            <TableHead className="text-white font-bold">Percentage</TableHead>
            <TableHead className="text-white font-bold">Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.name}
              className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
            >
              <TableCell className="px-2">{row.name}</TableCell>
              <TableCell className="px-2">{row.value}</TableCell>
              <TableCell className="px-2">{row.percentage}%</TableCell>
              <TableCell className="px-2">kg CO₂</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{total}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>kg CO2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default CO2EmissionsTable;
