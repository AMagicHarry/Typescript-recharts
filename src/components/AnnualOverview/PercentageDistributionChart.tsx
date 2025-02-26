import { QUARTER_COLORS, TRANSPORT_COLORS } from "@/constants/colors";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  ReferenceLine,
} from "recharts";
import { CommutingData } from ".";
import { TransportMode } from "@/constants/emissions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const calculatePercentages = (data: CommutingData) => {
  const categories = Object.keys(TRANSPORT_COLORS);

  return categories.map((category) => {
    const total =
      +(data?.Q1?.[category as TransportMode] || 0) +
        +(data?.Q2?.[category as TransportMode] || 0) +
        +(data?.Q3?.[category as TransportMode] || 0) +
        +(data?.Q4?.[category as TransportMode] || 0) || 1;

    return {
      category: category
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      Q1: (+(data?.Q1?.[category as TransportMode] || 0) * 100) / total,
      Q2: (+(data?.Q2?.[category as TransportMode] || 0) * 100) / total,
      Q3: (+(data?.Q3?.[category as TransportMode] || 0) * 100) / total,
      Q4: (+(data?.Q4?.[category as TransportMode] || 0) * 100) / total,
    };
  });
};

const PercentageDistributionChart = ({ data }: { data: CommutingData }) => {
  const percentageData = calculatePercentages(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport Mode Distribution by Quarter</CardTitle>
        <CardDescription>
          Percentage distribution of CO2 emissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={percentageData}>
            <XAxis
              dataKey="category"
              height={70}
              fontSize={14}
              angle={-32}
              textAnchor="end"
            />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${(+value).toFixed(2)}%`} />
            <Legend />

            {Object.entries(QUARTER_COLORS).map(([quarter, color]) => (
              <Bar
                key={quarter}
                stackId="a"
                dataKey={quarter}
                fill={color}
                name={quarter}
              >
                <LabelList
                  dataKey={quarter}
                  content={({
                    x = 0,
                    y = 0,
                    width = 0,
                    height = 0,
                    value = 0,
                  }) => (
                    <text
                      x={+x + +width / 2}
                      y={+y + +height / 2 + 6}
                      fill="white"
                      color="white"
                      fontSize={13}
                      textAnchor="middle"
                    >
                      {!!value && `${Math.round(+value)}%`}
                    </text>
                  )}
                />
              </Bar>
            ))}

            {percentageData.map((item) => (
              <ReferenceLine
                key={item.category}
                x={item.category}
                position="end"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PercentageDistributionChart;
