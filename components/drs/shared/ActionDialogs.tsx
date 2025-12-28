import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, FileText, FileDown, Download, User, Truck, MapPin } from "lucide-react";

// --- Quick DRS Dialog ---
interface QuickDRSDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const QuickDRSDialog = ({ open, onOpenChange }: QuickDRSDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Quick Create DRS</DialogTitle>
                    <DialogDescription>
                        Create a new Delivery Run Sheet immediately.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Rider</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Rider" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="r1">Rahul Kumar</SelectItem>
                                    <SelectItem value="r2">Vikram Singh</SelectItem>
                                    <SelectItem value="r3">Amit Sharma</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Vehicle Mode</Label>
                            <Select defaultValue="bike">
                                <SelectTrigger>
                                    <SelectValue placeholder="Vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bike">Bike</SelectItem>
                                    <SelectItem value="scooter">Scooter</SelectItem>
                                    <SelectItem value="van">Van</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Route / Zone</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Zone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="north">North Zone</SelectItem>
                                <SelectItem value="south">South Zone</SelectItem>
                                <SelectItem value="east">East Zone</SelectItem>
                                <SelectItem value="central">Central Hub</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Starting Mileage</Label>
                        <div className="relative">
                            <Truck className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="Enter odometer reading" type="number" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea placeholder="Any instructions for the rider..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>Create DRS</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// --- Import Dialog ---
interface ImportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type?: string;
}

export const ImportDialog = ({ open, onOpenChange, type = "DRS Data" }: ImportDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import {type}</DialogTitle>
                    <DialogDescription>
                        Upload a CSV or Excel file to update {type.toLowerCase()}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 p-8 text-center transition-colors hover:bg-muted/10">
                        <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <Upload className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground">
                                CSV, XLS, XLSX (max. 10MB)
                            </p>
                        </div>
                        <Input id="file" type="file" className="hidden" />
                        <Button variant="outline" size="sm">
                            Select File
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border bg-card p-3">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                            <p className="text-sm font-medium">template.xlsx</p>
                            <p className="text-xs text-muted-foreground">12KB</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                            Download
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>Import Data</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// --- Export Dialog ---
interface ExportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExport?: (format: string) => void;
}

export const ExportDialog = ({ open, onOpenChange, onExport }: ExportDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Export Report</DialogTitle>
                    <DialogDescription>
                        Choose format and data to export.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="space-y-3">
                        <Label>Export Format</Label>
                        <RadioGroup defaultValue="csv" className="grid grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="csv" id="csv" className="peer sr-only" />
                                <Label
                                    htmlFor="csv"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <FileDown className="mb-2 h-6 w-6 text-muted-foreground" />
                                    CSV
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="pdf" id="pdf" className="peer sr-only" />
                                <Label
                                    htmlFor="pdf"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <Download className="mb-2 h-6 w-6 text-muted-foreground" />
                                    PDF
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-3">
                        <Label>Include</Label>
                        <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="current" defaultChecked />
                                <Label htmlFor="current">Current View Data</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="all" />
                                <Label htmlFor="all">All Records</Label>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        onExport?.("csv");
                        onOpenChange(false);
                    }}>Export Report</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
