import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { EntryData, useCommuting } from '../../context/CommutingContext'
import { EMISSION_FACTORS, TransportMode } from '../../constants/emissions'
import { Check, X, Undo } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ApprovalView() {
  const { state, dispatch } = useCommuting();
  const currentData = state.data[state.selectedYear]?.[state.selectedQuarter] || {};

  const handleApprove = (mode: string) => {
    dispatch({
      type: 'APPROVE_DATA',
      payload: {
        year: state.selectedYear,
        quarter: state.selectedQuarter,
        mode,
        approvedBy: 'Current User'
      }
    });
  };

  const handleReject = (mode: string) => {
    dispatch({
      type: 'REJECT_DATA',
      payload: {
        year: state.selectedYear,
        quarter: state.selectedQuarter,
        mode,
        approvedBy: 'Current User'
      }
    });
  };

  const handleUndo = (mode: string) => {
    dispatch({
      type: 'UNDO_DATA',
      payload: {
        year: state.selectedYear,
        quarter: state.selectedQuarter,
        mode,
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approve Data Entries</CardTitle>
        <CardDescription>
          Review and approve draft entries for {state.selectedQuarter} {state.selectedYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transport Mode</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(Object.keys(EMISSION_FACTORS) as TransportMode[]).map((mode) => {
              const entryData = currentData[mode] as EntryData;
              if (!entryData || entryData.status === 'finalized') return null;

              return (
                <TableRow key={mode}>
                  <TableCell>{mode.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                  <TableCell>{entryData.value}</TableCell>
                  <TableCell>{EMISSION_FACTORS[mode].unit}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full capitalize",
                      {
                        "bg-yellow-100 text-yellow-800": entryData.status === 'draft',
                        "bg-blue-100 text-blue-800": entryData.status === 'pending',
                        "bg-green-100 text-green-800": entryData.status === 'approved'
                      }
                    )}>
                      {entryData.status}
                    </span>
                  </TableCell>
                  <TableCell>{entryData.lastModified.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {entryData.status === 'draft' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0"
                          onClick={() => handleApprove(mode)}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0"
                          onClick={() => handleReject(mode)}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    )}
                    {entryData.status === 'approved' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0"
                          onClick={() => handleUndo(mode)}
                        >
                          <Undo className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

