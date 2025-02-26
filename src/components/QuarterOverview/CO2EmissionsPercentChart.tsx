import {
  Bar,
  BarChart,
  Tooltip,
  LabelList,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData } from ".";
import { TRANSPORT_COLORS } from "@/constants/colors";
import { TransportMode } from "@/constants/emissions";

const CO2EmissionsPercentChart = ({ data }: { data: ChartData }) => (
  <ResponsiveContainer width="100%" height={400}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 50, left: 100, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          width={100}
          tick={{ fontSize: 14, width: 300 }}
        />
        <Tooltip
          formatter={(value) => [`${value} kg CO₂`, "Emissions"]}
          labelStyle={{ color: "#374151" }}
        />
        <Bar dataKey="value" minPointSize={2} background={{ fill: "#f3f4f6" }}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={TRANSPORT_COLORS[entry.key as TransportMode]}
            />
          ))}
          <LabelList
            dataKey="percentage"
            position="right"
            content={({ x = 0, y = 0, width = 0, value = 0 }) => (
              <text
                x={+x + +width + (+value > 7 ? -45 : 4)}
                y={+y + 21}
                fill={+value > 7 ? "white" : "#6b7280"}
                color="white"
                fontSize={13}
              >
                {`${value}%`}
              </text>
            )}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ResponsiveContainer>
);

export default CO2EmissionsPercentChart;