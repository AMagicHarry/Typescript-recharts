import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useMemo, useState } from "react";
import { useCommuting } from "@/context/CommutingContext";
import { calculateEmissions, TransportMode } from "@/constants/emissions";
import { TRANSPORT_COLORS } from "@/constants/colors";
import CO2EmissionsChart from "./CO2EmissionsChart";
import CO2EmissionsPercentChart from "./CO2EmissionsPercentChart";
import CO2EmissionsTable from "./CO2EmissionsTable";

function roundToTwoDecimals(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculatePercentages(
  data: Array<{ key: string; name: string; value: number }>
) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  return data.map((item) => ({
    ...item,
    percentage: roundToTwoDecimals((item.value / total) * 100),
  }));
}

export type ChartData = Array<{ key: string; name: string; value: number; percentage: number }>;

export function QuarterlyOverview() {
  const {
    state: { data, selectedQuarter, selectedYear },
  } = useCommuting();

  const emissionsData = useMemo(() => {
    return Object.keys(TRANSPORT_COLORS).map((key) => {
      let value = 0;

      if (
        data[selectedYear]?.[selectedQuarter]?.[key as TransportMode] &&
        data[selectedYear]?.[selectedQuarter]?.[key as TransportMode].status ===
          "approved"
      ) {
        value =
          data[selectedYear]?.[selectedQuarter]?.[key as TransportMode].value;
      }

      return {
        key,
        name: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        value: calculateEmissions(key as TransportMode, value),
      };
    });
  }, [data, selectedQuarter, selectedYear]);

  const [chartData, setChartData] = useState<ChartData>([]);

  useEffect(() => {
    setChartData(calculatePercentages(emissionsData));
  }, [emissionsData]);

  const total =
    Math.round(
      emissionsData.reduce((sum, item) => sum + item.value, 0) * 1000
    ) / 1000;

  return (
    <div className="grid gap-6">
      {!!total && (
        <Card>
          <CardHeader>
            <CardTitle>CO2 Emissions by Transport Mode</CardTitle>
            <CardDescription>{selectedQuarter} 2024 Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <CO2EmissionsChart data={chartData} />

              <CO2EmissionsPercentChart data={chartData} />
            </div>
          </CardContent>
        </Card>
      )}

      <CO2EmissionsTable data={chartData} total={total} />
    </div>
  );
}
