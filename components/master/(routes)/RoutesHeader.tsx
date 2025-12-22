
import { Map, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoutesHeaderProps {
    count: number;
    onAdd: () => void;
}

const RoutesHeader = ({ count, onAdd }: RoutesHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-border/40 pb-1">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Route Master
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage {count} logistics routes & lanes
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
                <Button onClick={onAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Route
                </Button>
            </div>
        </div>
    );
};

export default RoutesHeader;
