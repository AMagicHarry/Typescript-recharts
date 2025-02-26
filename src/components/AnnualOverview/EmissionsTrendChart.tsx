import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { CommutingData } from ".";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const EmissionsTrendChart = ({ data }: { data: CommutingData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Annual CO2 Emissions Trend</CardTitle>
      <CardDescription>Total emissions per quarter</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={Object.keys(data).map((key) => ({
            ...data[key],
            quarter: key,
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#196b24"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default EmissionsTrendChart;
