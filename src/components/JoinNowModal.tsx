import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
    fullName: z.string().min(1, "Name is required").max(80, "Name is too long"),
    year: z.enum(
        ["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Other"],
        { required_error: "Please select your year" }
    ),
    major: z.string().min(1, "Major is required").max(80, "Major is too long"),
    email: z.string().email("Invalid email address").max(254, "Email is too long"),
    phone: z.string().max(30, "Phone number is too long").optional(),
    interestArea: z.enum(
        [
            "Aerodynamics",
            "Structures",
            "Propulsion",
            "Avionics Controls",
            "Manufacturing",
            "Business Sponsorship",
            "Other",
        ],
        { required_error: "Please select an interest area" }
    ).optional(),
    note: z.string().max(600, "Note is too long").optional(),
    company: z.string().optional(), // Honeypot
});

type FormValues = z.infer<typeof formSchema>;

interface JoinNowModalProps {
    children: React.ReactNode;
}

export function JoinNowModal({ children }: JoinNowModalProps) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            major: "",
            email: "",
            phone: "",
            note: "",
            company: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/join-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.fieldErrors) {
                    // Manually set errors if backend returns them
                    Object.keys(result.fieldErrors).forEach((key) => {
                        form.setError(key as any, { message: result.fieldErrors[key] });
                    });
                    throw new Error("Validation failed");
                }
                throw new Error(result.message || "Something went wrong");
            }

            setStatus("success");
            form.reset();
        } catch (error: any) {
            console.error(error);
            setStatus("error");
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            // Reset status after a delay so animation looks good, or immediately
            if (status === "success") {
                setStatus("idle");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[85vh] flex flex-col p-0 gap-0">
                <div className="p-6 pb-2">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Join SAE Aero UW</DialogTitle>
                        <DialogDescription>
                            Submit your info and we'll get back to you with meeting times and details.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-2">
                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in-50">
                            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold">Request Sent!</h3>
                            <p className="text-muted-foreground">
                                Thanks for your interest. We've received your details and will be in touch soon.
                            </p>
                            <Button onClick={() => setOpen(false)} className="mt-4 w-full">
                                Done
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form id="join-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
                                {/* Honeypot */}
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem className="hidden">
                                            <FormControl>
                                                <Input {...field} autoComplete="off" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Jane Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Year <span className="text-destructive">*</span></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Year" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Freshman">Freshman</SelectItem>
                                                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                                                        <SelectItem value="Junior">Junior</SelectItem>
                                                        <SelectItem value="Senior">Senior</SelectItem>
                                                        <SelectItem value="Graduate">Graduate</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="major"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Major <span className="text-destructive">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Engineering..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="jane@wisc.edu" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="interestArea"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Interest Area <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Area" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Aerodynamics">Aerodynamics</SelectItem>
                                                        <SelectItem value="Structures">Structures</SelectItem>
                                                        <SelectItem value="Propulsion">Propulsion</SelectItem>
                                                        <SelectItem value="Avionics Controls">Avionics Controls</SelectItem>
                                                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                                        <SelectItem value="Business Sponsorship">Business Sponsorship</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Note <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a bit about yourself or ask a question!"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {status === "error" && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{errorMessage}</AlertDescription>
                                    </Alert>
                                )}
                            </form>
                        </Form>
                    )}
                </div>

                {status !== "success" && (
                    <div className="p-4 border-t bg-background">
                        <Button type="submit" form="join-form" className="w-full" size="lg" disabled={status === "submitting"}>
                            {status === "submitting" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
