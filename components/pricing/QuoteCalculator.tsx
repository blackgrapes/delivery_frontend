"use client";

import { useState } from "react";
import { Calculator, Truck, Zap, Package, Info, ArrowRight, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuoteResult {
    standard: { rate: number; days: number };
    express: { rate: number; days: number };
}

export default function QuoteCalculator() {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        weight: "",
        type: "parcel",
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<QuoteResult | null>(null);

    const calculateQuote = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Simulate API delay
        const weightVal = parseFloat(formData.weight) || 1;

        setTimeout(() => {
            // Mock Calculation Logic
            const baseRate = 50;
            const weightMultiplier = 20; // per kg

            const standardCost = baseRate + (weightVal * weightMultiplier);
            const expressCost = standardCost * 1.8; // 1.8x multiplier for express

            setResult({
                standard: { rate: Math.round(standardCost), days: 3 },
                express: { rate: Math.round(expressCost), days: 1 },
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Form Section */}
            <Card className="border-primary/20 shadow-lg">
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Calculator className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-lg">Detailed Estimate</h3>
                    </div>

                    <form onSubmit={calculateQuote} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="origin">Origin Pincode</Label>
                                <Input
                                    id="origin"
                                    placeholder="e.g. 110001"
                                    required
                                    maxLength={6}
                                    value={formData.origin}
                                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="destination">Destination Pincode</Label>
                                <Input
                                    id="destination"
                                    placeholder="e.g. 400001"
                                    required
                                    maxLength={6}
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                min="0.1"
                                placeholder="e.g. 0.5"
                                required
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Shipment Type</Label>
                            <RadioGroup
                                defaultValue="parcel"
                                className="grid grid-cols-2 gap-4"
                                onValueChange={(val) => setFormData({ ...formData, type: val })}
                            >
                                <div>
                                    <RadioGroupItem value="document" id="document" className="peer sr-only" />
                                    <Label
                                        htmlFor="document"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <Package className="mb-2 h-6 w-6 text-muted-foreground peer-data-[state=checked]:text-primary" />
                                        Document
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="parcel" id="parcel" className="peer sr-only" />
                                    <Label
                                        htmlFor="parcel"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <Truck className="mb-2 h-6 w-6 text-muted-foreground peer-data-[state=checked]:text-primary" />
                                        Parcel
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                            {loading ? "Calculating..." : "Calculate Rates"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
                {!result && !loading && (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-muted rounded-xl min-h-[300px]">
                        <Info className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                        <h4 className="text-lg font-medium text-muted-foreground">Estimated rates will appear here</h4>
                        <p className="text-sm text-muted-foreground/80 mt-2 max-w-xs">
                            Fill in the details to verify service availability and get accurate pricing.
                        </p>
                    </div>
                )}

                {loading && (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-muted rounded-xl min-h-[300px] animate-pulse">
                        <div className="h-12 w-12 bg-muted rounded-full mb-4"></div>
                        <div className="h-4 w-3/4 bg-muted rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-muted rounded"></div>
                    </div>
                )}

                {result && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Recommendation Banner */}
                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-start gap-3">
                            <Info className="h-5 w-5 text-primary mt-0.5" />
                            <p className="text-sm text-primary/80">
                                <strong>Note:</strong> Prices are inclusive of GST. Fuel surcharge may vary.
                            </p>
                        </div>

                        {/* Express Option */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl shadow-lg transform transition-all hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-3 bg-yellow-400 text-black text-xs font-bold rounded-bl-xl shadow-sm">
                                RECOMMENDED
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                            <Zap className="h-6 w-6 text-yellow-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Express Air</h4>
                                            <p className="text-blue-100 text-sm">Delivery in {result.express.days} Day(s)</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold flex items-center justify-end">
                                            <IndianRupee className="h-5 w-5" /> {result.express.rate}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="secondary" className="w-full text-primary font-bold">
                                    Book Express <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Standard Option */}
                        <div className="bg-card border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                                        <Truck className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Standard Surface</h4>
                                        <p className="text-muted-foreground text-sm">Delivery in {result.standard.days} Days</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold flex items-center justify-end text-foreground">
                                        <IndianRupee className="h-5 w-5" /> {result.standard.rate}
                                    </p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">
                                Book Standard
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
