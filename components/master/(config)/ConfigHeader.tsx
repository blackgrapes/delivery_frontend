import { Settings, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConfigHeaderProps {
  onExport: () => void;
  onImport: () => void;
}

const ConfigHeader = ({ onExport, onImport }: ConfigHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 border-b border-border/40 pb-1">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-2">
            <Settings className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              System Configuration
            </h1>
            <p className="text-muted-foreground">
              Manage system settings, business rules, and application
              preferences
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="gap-2 rounded-xl border-border/70"
          onClick={onImport}
        >
          <Upload className="h-4 w-4" />
          Import Config
        </Button>
        <Button
          variant="outline"
          className="gap-2 rounded-xl border-border/70"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          Export Config
        </Button>
      </div>
    </div>
  );
};

export default ConfigHeader;
