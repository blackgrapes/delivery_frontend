import { useState } from "react";
import { X, Upload, Download, FileText, AlertCircle, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BulkUploadModalProps {
  onUpload: (data: any[]) => void;
  onCancel: () => void;
}

const BulkUploadModal = ({ onUpload, onCancel }: BulkUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [defaultBranch, setDefaultBranch] = useState("");
  const [defaultCategory, setDefaultCategory] = useState("SELF");

  const handleFileSelect = (selectedFile: File) => {
    if (
      selectedFile.type === "text/csv" ||
      selectedFile.name.endsWith(".csv")
    ) {
      setFile(selectedFile);
    } else {
      alert("Please select a CSV file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const csvText = e.target?.result as string;
          const lines = csvText
            .split("\n")
            .filter((line) => line.trim() !== "");

          if (lines.length === 0) {
            alert("CSV file is empty");
            setIsUploading(false);
            return;
          }

          // Auto-detect headers from first line
          const headers = lines[0]
            .split(",")
            .map((h) => h.trim().toLowerCase());

          const data = lines
            .slice(1)
            .map((line, index) => {
              const values = line.split(",").map((v) => v.trim());
              const row: any = { id: `bulk-${Date.now()}-${index}` };

              headers.forEach((header, i) => {
                if (values[i]) {
                  // Map CSV headers to our data structure
                  switch (header) {
                    case "pincode":
                    case "pin code":
                    case "postal code":
                      row.pincode = values[i];
                      break;
                    case "city":
                      row.city = values[i];
                      break;
                    case "state":
                      row.state = values[i];
                      break;
                    case "district":
                      row.district = values[i];
                      break;
                    case "country":
                      row.country = values[i] || "India";
                      break;
                    case "status":
                      row.status =
                        values[i] === "inactive" ? "inactive" : "active";
                      break;
                    case "specialinstructions":
                    case "special instructions":
                    case "instructions":
                      row.specialInstructions = values[i];
                      break;
                    default:
                      row[header] = values[i];
                  }
                }
              });

              // Set default values for missing fields
              if (!row.country) row.country = "India";
              if (!row.status) row.status = "active";
              if (!row.specialInstructions) row.specialInstructions = "";

              // Apply bulk configurations if CSV value is empty
              if (!row.controllingBranchId && defaultBranch) row.controllingBranchId = defaultBranch;
              if (!row.serviceCategory && defaultCategory) row.serviceCategory = defaultCategory;

              return row;
            })
            .filter(
              (row) => row.pincode && row.city && row.state && row.district
            );

          if (data.length === 0) {
            alert("No valid pincode data found. Please check your CSV format.");
            setIsUploading(false);
            return;
          }

          console.log("Processed data:", data);
          onUpload(data);
        } catch (error) {
          console.error("Error processing CSV:", error);
          alert("Error processing CSV file. Please check the format.");
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        alert("Error reading file");
        setIsUploading(false);
      };

      reader.readAsText(file);
    } catch (error) {
      alert("Error processing file");
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    // Simple template with just headers
    const headers =
      "pincode,city,state,district,country,status,specialInstructions";
    const example1 =
      "400069,Mumbai,Maharashtra,Mumbai Suburban,India,active,High density area";
    const example2 =
      "110019,Delhi,Delhi,South Delhi,India,active,Commercial area";
    const example3 =
      "560034,Bangalore,Karnataka,Bangalore Urban,India,active,IT corridor";

    const template = [headers, example1, example2, example3].join("\n");

    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pincodes_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-4xl h-full max-h-[95vh] rounded-2xl border-border/70 shadow-lg flex flex-col">
        {/* Header - Fixed */}
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/70 bg-card flex-shrink-0">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-5 w-5" />
            Bulk Upload Pincodes
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="rounded-lg h-8 w-8 p-0"
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Content - Scrollable */}
        <CardContent className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              Upload any CSV file with pincode data
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <Badge variant="outline" className="rounded-full mb-2">
                  Required Fields
                </Badge>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Pincode</li>
                  <li>• City</li>
                  <li>• State</li>
                  <li>• District</li>
                </ul>
              </div>
              <div>
                <Badge variant="outline" className="rounded-full mb-2">
                  Optional Fields
                </Badge>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Country</li>
                  <li>• Status</li>
                  <li>• Special Instructions</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> The system will automatically detect
                columns from your CSV file. You can use any column names - we'll
                map them to the correct fields.
              </p>
            </div>
          </div>

          {/* Default Configuration */}
          <div className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              Default Configuration (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="defBranch" className="text-xs">
                  Assign to Branch ID
                </Label>
                <Input
                  id="defBranch"
                  placeholder="e.g. BR-MUM-01"
                  onChange={(e) => setDefaultBranch(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="defCat" className="text-xs">
                  Service Category
                </Label>
                <Select onValueChange={setDefaultCategory}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SELF">Self Owned</SelectItem>
                    <SelectItem value="PARTNER">Partner</SelectItem>
                    <SelectItem value="FRANCHISE">Franchise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">
              These values will be applied to all records where the CSV column is empty or missing.
            </p>
          </div>

          {/* File Upload Area */}
          <div className="relative">
            <div
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors ${isDragging
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/30"
                } ${isUploading ? "opacity-50" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />

              <div className="space-y-2 mb-3 sm:mb-4">
                <p className="text-sm font-medium text-foreground">
                  {file
                    ? `Selected: ${file.name}`
                    : "Drag & drop any CSV file here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {file ? "Ready to upload" : "or click to browse files"}
                </p>
              </div>

              <input
                type="file"
                accept=".csv"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileSelect(e.target.files[0])
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />

              <Button
                variant="outline"
                className="gap-2 rounded-lg text-xs sm:text-sm"
                onClick={() =>
                  (
                    document.querySelector(
                      'input[type="file"]'
                    ) as HTMLInputElement
                  )?.click()
                }
                disabled={isUploading}
              >
                <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                {file ? "Change File" : "Browse Files"}
              </Button>
            </div>
          </div>

          {/* Template Download */}
          <div className="text-center border-t pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Need a sample format? Download our template:
            </p>
            <Button
              variant="outline"
              className="gap-2 rounded-lg text-xs sm:text-sm"
              onClick={downloadTemplate}
              disabled={isUploading}
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              Download Sample CSV Template
            </Button>
          </div>
        </CardContent>

        {/* Actions - Fixed at bottom */}
        <div className="border-t border-border/70 bg-card p-6 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-lg text-xs sm:text-sm py-2 sm:py-2"
              onClick={onCancel}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-xs sm:text-sm py-2 sm:py-2"
              onClick={handleUpload}
              disabled={!file || isUploading}
            >
              <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
              {isUploading ? "Processing..." : "Upload & Process"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BulkUploadModal;
