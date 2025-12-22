
import { UserCheck, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DriversHeaderProps {
    count: number;
    onAdd: () => void;
}

const DriversHeader = ({ count, onAdd }: DriversHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-border/40 pb-1">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Driver Master
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage {count} drivers & delivery partners
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
                <Button onClick={onAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Driver
                </Button>
            </div>
        </div>
    );
};

export default DriversHeader;
