import {
  Bar,
  BarChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData } from ".";

const CO2EmissionsChart = ({ data }: { data: ChartData }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data}>
      <XAxis
        dataKey="name"
        height={80}
        fontSize={14}
        angle={-32}
        textAnchor="end"
      />

      <YAxis />
      <Tooltip />
      <Bar dataKey="value" name="name" fill="#196b24" />
    </BarChart>
  </ResponsiveContainer>
);

export default CO2EmissionsChart;
