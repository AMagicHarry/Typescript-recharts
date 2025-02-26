import { useCommuting } from "@/context/CommutingContext";
import { calculateEmissions, TransportMode } from "@/constants/emissions";
import { TRANSPORT_COLORS } from "@/constants/colors";
import PercentageDistributionChart from "./PercentageDistributionChart";
import EmissionsOvertimeChart from "./EmissionsOvertimeChart";
import QuartlyComparisonChart from "./QuarterlyComparisonChart";
import EmissionsTrendChart from "./EmissionsTrendChart";
import AnnualEmissionsTable from "./AnnualEmissionsTable";

export interface CommutingData {
  [quarter: string]: {
    [mode: string]: number;
  };
}

export function AnnualOverview() {
  const {
    state: { data, selectedYear },
  } = useCommuting();

  const processedData = ["Q1", "Q2", "Q3", "Q4"].reduce((res, quarter) => {
    const processedQuarterData = Object.keys(TRANSPORT_COLORS).reduce(
      (acc, mode) => {
        let value = 0;
        if (
          data[selectedYear]?.[quarter]?.[mode as TransportMode] &&
          data[selectedYear]?.[quarter]?.[mode as TransportMode].status ===
            "approved"
        ) {
          value = data[selectedYear]?.[quarter]?.[mode as TransportMode].value;
        }
        acc[mode as TransportMode] = calculateEmissions(
          mode as TransportMode,
          value
        );
        return acc;
      },
      {} as Record<TransportMode, number>
    );

    return {
      ...res,
      [quarter]: {
        ...processedQuarterData,
        total:
          Math.round(
            Object.values(processedQuarterData).reduce(
              (sum, val) => sum + val,
              0
            ) * 1000
          ) / 1000,
      },
    };
  }, {} as CommutingData);

  const total = Object.values(processedData).reduce(
    (sum, data) => sum + (data["total" as TransportMode] || 0),
    0
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      {!!total && (
        <>
          <PercentageDistributionChart data={processedData} />
          <EmissionsOvertimeChart data={processedData} />
          <QuartlyComparisonChart data={processedData} />
          <EmissionsTrendChart data={processedData} />
        </>
      )}

      <AnnualEmissionsTable data={processedData} />
    </div>
  );
}
