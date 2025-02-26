import { useEffect, useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useCommuting } from "../context/CommutingContext";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

export function QuarterSelector({
  showQuarter = true,
}: {
  showQuarter?: boolean;
}) {
  const { state, dispatch } = useCommuting();
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    parseInt(state.selectedYear)
  );
  const [open, setOpen] = useState(false);

  const years = Array.from({ length: 21 }, (_, i) => currentYear - 20 + i);
  const yearsMatrix = Array.from(
    { length: Math.ceil(years.length / 3) },
    (_, i) => years.slice(i * 3, i * 3 + 3)
  );

  useEffect(() => {
    setSelectedYear(parseInt(state.selectedYear));
  }, [state.selectedYear]);

  const handleYearSelect = (year: number) => {
    dispatch({ type: "SET_SELECTED_YEAR", payload: year.toString() });
    setOpen(false);
  };

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    dispatch({ type: "SET_SELECTED_YEAR", payload: newYear.toString() });
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    dispatch({ type: "SET_SELECTED_YEAR", payload: newYear.toString() });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Select Year
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevYear}
                disabled={selectedYear <= currentYear - 20}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[220px] justify-center text-left font-normal",
                      !selectedYear && "text-muted-foreground"
                    )}
                  >
                    {selectedYear}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <div className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {yearsMatrix.map((row, i) => (
                        <div key={i} className="flex justify-center gap-2">
                          {row.map((year) => (
                            <Button
                              key={year}
                              variant={
                                year === selectedYear ? "default" : "ghost"
                              }
                              className="w-12"
                              onClick={() => handleYearSelect(year)}
                            >
                              {year}
                            </Button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNextYear}
                disabled={selectedYear >= currentYear}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedYear !== currentYear && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You are currently viewing data for {selectedYear}, which is not
                the current year.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {showQuarter && (
          <div className="flex gap-2">
            {quarters.map((quarter) => (
              <Button
                key={quarter}
                variant={
                  state.selectedQuarter === quarter ? "default" : "outline"
                }
                onClick={() =>
                  dispatch({ type: "SET_SELECTED_QUARTER", payload: quarter })
                }
                className="flex-1"
              >
                {quarter}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
