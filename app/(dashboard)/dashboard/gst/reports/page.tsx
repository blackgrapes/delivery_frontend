"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, TrendingUp } from "lucide-react";

export default function GSTReportsPage() {
  const reports = [
    {
      id: "gstr-1",
      name: "GSTR-1",
      period: "December 2024",
      status: "filed",
      amount: "₹12,45,000",
      filedDate: "2024-01-10",
    },
    {
      id: "gstr-3b",
      name: "GSTR-3B",
      period: "December 2024",
      status: "pending",
      amount: "₹8,90,000",
      filedDate: null,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">GST Reports</h1>
        <p className="text-muted-foreground">
          View and manage GST compliance reports
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {report.name}
                  </CardTitle>
                  <CardDescription>
                    Period: {report.period}
                  </CardDescription>
                </div>
                <Badge
                  variant={report.status === "filed" ? "outline" : "secondary"}
                >
                  {report.status === "filed" ? "Filed" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className="text-2xl font-bold">{report.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-medium">
                    {report.status === "filed" ? (
                      <span className="text-green-600">Filed</span>
                    ) : (
                      <span className="text-orange-600">Pending</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {report.status === "filed" ? "Filed Date" : "Due Date"}
                  </p>
                  <p className="text-lg font-medium">
                    {report.filedDate
                      ? new Date(report.filedDate).toLocaleDateString()
                      : "2024-01-20"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                {report.status === "pending" && (
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    File Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

