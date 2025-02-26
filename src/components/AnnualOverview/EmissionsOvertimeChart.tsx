import { TRANSPORT_COLORS } from "@/constants/colors";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  CartesianGrid,
  Area,
} from "recharts";
import { CommutingData } from ".";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const EmissionsOvertimeChart = ({ data }: { data: CommutingData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Cumulative CO2 Emissions Over Time</CardTitle>
      <CardDescription>
        Quarterly progression of emissions by transport mode
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={Object.keys(data).map((key) => ({
            ...data[key],
            quarter: key,
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.entries(TRANSPORT_COLORS).map(([key, color]) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={color}
              fill={color}
              fillOpacity={1}
              name={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default EmissionsOvertimeChart;
