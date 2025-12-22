import { Plus, Download, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatesHeaderProps {
    onAddRate: () => void;
    onCalculate: () => void;
    rateCount: number;
}

const RatesHeader = ({
    onAddRate,
    onCalculate,
    rateCount,
}: RatesHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-border/40 pb-1">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Rate Management
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage {rateCount} pricing rules
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2" onClick={onCalculate}>
                    <Calculator className="h-4 w-4" />
                    Calculate Freight
                </Button>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
                <Button onClick={onAddRate} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Rate Rule
                </Button>
            </div>
        </div>
    );
};

export default RatesHeader;
