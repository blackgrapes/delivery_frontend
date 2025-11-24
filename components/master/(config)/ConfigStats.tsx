import { Settings, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ConfigStats = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-blue-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Active Settings
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">42</span>
                <Badge variant="success" className="rounded-full text-xs">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Currently configured
              </p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-green-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Verified Config
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">38</span>
                <Badge variant="success" className="rounded-full text-xs">
                  Valid
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Settings validated
              </p>
            </div>
            <div className="rounded-2xl bg-green-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-orange-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Pending Changes
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">4</span>
                <Badge variant="warning" className="rounded-full text-xs">
                  Review
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 bg-gradient-to-br from-card/95 to-purple-50/50 shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Security Level
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">High</span>
                <Badge variant="info" className="rounded-full text-xs">
                  Protected
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                All features enabled
              </p>
            </div>
            <div className="rounded-2xl bg-purple-100 p-3">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigStats;
