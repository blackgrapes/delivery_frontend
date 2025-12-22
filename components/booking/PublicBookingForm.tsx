"use client";

import { useState } from "react";
import {
    User,
    MapPin,
    Package,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Truck,
    Weight,
    CreditCard,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const STEPS = [
    { id: 1, label: "Sender", icon: User },
    { id: 2, label: "Receiver", icon: MapPin },
    { id: 3, label: "Package", icon: Package },
    { id: 4, label: "Review", icon: CheckCircle2 },
];

export default function PublicBookingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState<null | string>(null);

    const [formData, setFormData] = useState({
        // Sender
        senderName: "",
        senderPhone: "",
        senderCity: "",
        senderPincode: "",

        // Receiver
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        receiverCity: "",
        receiverPincode: "",

        // Package
        packageType: "box",
        weight: "",
        contents: "",
        declaredValue: "",
        serviceType: "standard"
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            const mockAWB = "GUEST" + Math.floor(100000 + Math.random() * 900000);
            setBookingSuccess(mockAWB);
            setIsSubmitting(false);
        }, 1500);
    };

    if (bookingSuccess) {
        return (
            <Card className="max-w-xl mx-auto border-dashed border-2 border-green-500/50 bg-green-50/50">
                <CardContent className="pt-10 pb-10 text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-green-800">Booking Confirmed!</h2>
                        <p className="text-muted-foreground">
                            Your shipment has been registered successfully.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-green-200 inline-block text-left w-full max-w-sm mx-auto shadow-sm">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">AWB Number</p>
                        <p className="text-3xl font-mono font-bold text-green-900 tracking-tight">{bookingSuccess}</p>
                        <Separator className="my-4" />
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Estimated Cost:</span>
                            <span className="font-semibold">₹ {parseInt(formData.weight || "1") * 50 + 100}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 max-w-sm mx-auto">
                        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => window.location.href = `/track`}>
                            Track Shipment
                        </Button>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Book Another
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Progress Stepper */}
            <div className="flex items-center justify-between relative px-4">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10" />
                {STEPS.map((step) => {
                    const StepIcon = step.icon;
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                            <div
                                className={`
                  h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isActive ? "border-primary bg-primary text-primary-foreground" :
                                        isCompleted ? "border-primary bg-primary/10 text-primary" :
                                            "border-muted bg-background text-muted-foreground"}
                `}
                            >
                                <StepIcon className="h-5 w-5" />
                            </div>
                            <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            <Card className="border-border/60 shadow-lg">
                <CardHeader>
                    <CardTitle>{STEPS[currentStep - 1].label} Details</CardTitle>
                    <CardDescription>
                        {currentStep === 1 && "Please enter your details as the sender."}
                        {currentStep === 2 && "Where is this package going?"}
                        {currentStep === 3 && "Tell us about the package contents."}
                        {currentStep === 4 && "Review details and confirm booking."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {currentStep === 1 && (
                        <div className="grid gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="senderName">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="senderName"
                                        placeholder="John Doe"
                                        className="pl-9"
                                        value={formData.senderName}
                                        onChange={(e) => handleInputChange("senderName", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="senderCity">City</Label>
                                    <Select value={formData.senderCity} onValueChange={(val) => handleInputChange("senderCity", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Delhi">Delhi</SelectItem>
                                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                                            <SelectItem value="Bangalore">Bangalore</SelectItem>
                                            <SelectItem value="Kolkata">Kolkata</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="senderPhone">Phone</Label>
                                    <Input
                                        id="senderPhone"
                                        placeholder="9876543210"
                                        value={formData.senderPhone}
                                        onChange={(e) => handleInputChange("senderPhone", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="grid gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="receiverName">Receiver Name</Label>
                                <Input
                                    id="receiverName"
                                    placeholder="Jane Doe"
                                    value={formData.receiverName}
                                    onChange={(e) => handleInputChange("receiverName", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="receiverAddress">Full Address</Label>
                                <Input
                                    id="receiverAddress"
                                    placeholder="House No, Street, Landmark"
                                    value={formData.receiverAddress}
                                    onChange={(e) => handleInputChange("receiverAddress", e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="receiverCity">City</Label>
                                    <Select value={formData.receiverCity} onValueChange={(val) => handleInputChange("receiverCity", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Delhi">Delhi</SelectItem>
                                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                                            <SelectItem value="Bangalore">Bangalore</SelectItem>
                                            <SelectItem value="Kolkata">Kolkata</SelectItem>
                                            <SelectItem value="Chennai">Chennai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="receiverPincode">Pincode</Label>
                                    <Input
                                        id="receiverPincode"
                                        placeholder="110001"
                                        value={formData.receiverPincode}
                                        onChange={(e) => handleInputChange("receiverPincode", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="grid gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="packageType">Package Type</Label>
                                    <Select value={formData.packageType} onValueChange={(val) => handleInputChange("packageType", val)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="box">Box</SelectItem>
                                            <SelectItem value="envelope">Envelope / Documents</SelectItem>
                                            <SelectItem value="fragile">Fragile</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <div className="relative">
                                        <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="weight"
                                            type="number"
                                            placeholder="0.5"
                                            className="pl-9"
                                            value={formData.weight}
                                            onChange={(e) => handleInputChange("weight", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contents">Package Contents</Label>
                                <Input
                                    id="contents"
                                    placeholder="e.g. Clothes, Books, Keys"
                                    value={formData.contents}
                                    onChange={(e) => handleInputChange("contents", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="serviceType">Service Type</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className={`p-4 border rounded-xl cursor-pointer transition-all ${formData.serviceType === 'standard' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                                        onClick={() => handleInputChange("serviceType", "standard")}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Truck className="h-4 w-4 text-primary" />
                                            <span className="font-semibold text-sm">Standard</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">3-5 Days Delivery</p>
                                    </div>
                                    <div
                                        className={`p-4 border rounded-xl cursor-pointer transition-all ${formData.serviceType === 'express' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                                        onClick={() => handleInputChange("serviceType", "express")}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="h-4 w-4 text-orange-500" />
                                            <span className="font-semibold text-sm">Express</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">1-2 Days Delivery</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-muted/30 p-4 rounded-xl space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">From</p>
                                        <p className="font-medium text-sm">{formData.senderName}</p>
                                        <p className="text-xs text-muted-foreground">{formData.senderCity}</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-2" />
                                    <div className="space-y-1 text-right">
                                        <p className="text-xs text-muted-foreground">To</p>
                                        <p className="font-medium text-sm">{formData.receiverName}</p>
                                        <p className="text-xs text-muted-foreground">{formData.receiverCity}, {formData.receiverPincode}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground text-xs">Service</p>
                                        <p className="font-medium capitalize">{formData.serviceType}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Weight</p>
                                        <p className="font-medium">{formData.weight} kg</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-muted-foreground text-xs">Contents</p>
                                        <p className="font-medium">{formData.contents}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-xl bg-primary/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-background rounded-full">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Estimated Total</p>
                                        <p className="text-xs text-muted-foreground">Including taxes</p>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold font-mono">₹ {parseInt(formData.weight || "1") * 50 + 100}</p>
                            </div>
                        </div>
                    )}

                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isSubmitting}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Button>

                    {currentStep < 4 ? (
                        <Button onClick={nextStep} className="gap-2">
                            Next Step <ArrowRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 bg-green-600 hover:bg-green-700 min-w-[140px]">
                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                            {!isSubmitting && <CheckCircle2 className="h-4 w-4" />}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
