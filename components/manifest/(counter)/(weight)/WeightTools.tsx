import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Calculator, Ruler, RefreshCw } from "lucide-react";

const WeightTools = () => {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/95 shadow-card">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Weight Tools</p>
            <p className="text-xs text-muted-foreground">
              Quick actions for weight management
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Upload className="h-4 w-4" />
              Bulk Weighing
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Calculator className="h-4 w-4" />
              Charge Calculator
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <Ruler className="h-4 w-4" />
              Volumetric Calc
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-border/70"
            >
              <RefreshCw className="h-4 w-4" />
              Auto Verify
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightTools;
