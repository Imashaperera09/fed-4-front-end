import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateSolarUnitMutation, useGetAllUsersQuery } from "@/lib/redux/query"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

const formSchema = z.object({
    serialNumber: z.string().min(1, { message: "Serial number is required" }),
    installationDate: z.string().min(1, { message: "Installation date is required" }),
    capacity: z.number().positive({ message: "Capacity must be a positive number" }),
    status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
    userId: z.string().optional(),
    userEmail: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
}).refine((data) => {
    if (data.userId === "custom" && (!data.userEmail || data.userEmail.trim() === "")) {
        return false;
    }
    return true;
}, {
    message: "Email is required for custom assignment",
    path: ["userEmail"],
});

export function CreateSolarUnitForm() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isCustomEmail, setIsCustomEmail] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serialNumber: "",
            installationDate: new Date().toISOString().split('T')[0],
            capacity: 0,
            status: "ACTIVE",
            userId: "none",
            userEmail: "",
        }
    })

    const [createSolarUnit, { isLoading: isCreatingSolarUnit }] = useCreateSolarUnitMutation();
    const { data: users } = useGetAllUsersQuery();

    async function onSubmit(values) {
        try {
            setError(null);
            const submissionData = {
                ...values,
                userId: values.userId === "none" || values.userId === "custom" ? null : values.userId,
                userEmail: values.userId === "custom" ? values.userEmail : null
            };
            await createSolarUnit(submissionData).unwrap();
            navigate("/dashboard/admin/solar-units");
        } catch (err) {
            console.error(err);
            setError(err.data?.message || "Failed to create solar unit. Please try again.");
        }
    }

    return (
        <Card className="max-w-2xl mx-auto shadow-lg border-none bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Unit Details</CardTitle>
                <CardDescription>Enter the technical specifications for the new solar unit.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm font-medium">
                                {error}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="serialNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Serial Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. SU-2024-001" {...field} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="installationDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Installation Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capacity (Watts)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="5000" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Initial Status</FormLabel>
                                        <FormControl>
                                            <Select value={field.value || ""} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full bg-background/50">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assigned User</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value || ""}
                                                onValueChange={(val) => {
                                                    field.onChange(val);
                                                    setIsCustomEmail(val === "custom");
                                                }}
                                            >
                                                <SelectTrigger className="w-full bg-background/50">
                                                    <SelectValue placeholder="Select User" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">No User Assigned</SelectItem>
                                                    {users?.map((user) => (
                                                        <SelectItem key={user._id} value={user._id}>{user.email}</SelectItem>
                                                    ))}
                                                    <SelectItem value="custom">+ Add New Email...</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {isCustomEmail && (
                                <FormField
                                    control={form.control}
                                    name="userEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New User Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter email address" {...field} className="bg-background/50" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate("/dashboard/admin/solar-units")} disabled={isCreatingSolarUnit}>
                                Cancel
                            </Button>
                            <Button type="submit" className="px-8" disabled={isCreatingSolarUnit}>
                                {isCreatingSolarUnit ? "Creating..." : "Create Unit"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}