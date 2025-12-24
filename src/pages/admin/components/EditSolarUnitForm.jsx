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
import { useEditSolarUnitMutation, useGetAllUsersQuery } from "@/lib/redux/query"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

const formSchema = z.object({
    serialNumber: z.string().min(1, { message: "Serial number is required" }),
    installationDate: z.string().min(1, { message: "Installation date is required" }),
    capacity: z.preprocess((val) => {
        if (typeof val === "string" && val.trim() !== "") return parseFloat(val);
        if (typeof val === "number") return val;
        return undefined;
    }, z.number().positive({ message: "Capacity must be a positive number" })),
    status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
    userId: z.string().min(1, { message: "User ID is required" }),
});

export function EditSolarUnitForm({ solarUnit }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serialNumber: solarUnit.serialNumber,
            installationDate: solarUnit.installationDate ? new Date(solarUnit.installationDate).toISOString().split('T')[0] : '',
            capacity: solarUnit.capacity,
            status: solarUnit.status,
            userId: solarUnit.userId,
        },
    })

    const [editSolarUnit, { isLoading: isEditingSolarUnit }] = useEditSolarUnitMutation();
    const { data: users } = useGetAllUsersQuery();

    async function onSubmit(values) {
        try {
            setError(null);
            await editSolarUnit({ id, data: values }).unwrap();
            navigate(`/admin/solar-units/${id}`);
        } catch (err) {
            console.error(err);
            setError(err.data?.message || "Failed to update solar unit. Please try again.");
        }
    }

    return (
        <Card className="max-w-2xl mx-auto shadow-lg border-none bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Edit Unit Details</CardTitle>
                <CardDescription>Update the technical specifications and assignment for this solar unit.</CardDescription>
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
                                            <Input placeholder="Serial Number" {...field} className="bg-background/50" />
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
                                            <Input type="number" placeholder="Capacity" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} className="bg-background/50" />
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
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select value={field.value || ""} onValueChange={field.onChange}>
                                                <SelectTrigger className="bg-background/50">
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
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Assigned User</FormLabel>
                                        <FormControl>
                                            <Select value={field.value || ""} onValueChange={field.onChange}>
                                                <SelectTrigger className="bg-background/50">
                                                    <SelectValue placeholder="Select User" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {users?.map((user) => (
                                                        <SelectItem key={user._id} value={user._id}>{user.email}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate(`/admin/solar-units/${id}`)} disabled={isEditingSolarUnit}>
                                Cancel
                            </Button>
                            <Button type="submit" className="px-8" disabled={isEditingSolarUnit}>
                                {isEditingSolarUnit ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}