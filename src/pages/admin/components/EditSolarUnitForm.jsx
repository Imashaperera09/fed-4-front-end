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
import { useEditSolarUnitMutation } from "@/lib/redux/query"
import { useParams, useNavigate } from "react-router-dom"
import { useGetAllUsersQuery } from "@/lib/redux/query"

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

    const { id } = useParams();
    const navigate = useNavigate();

    const [editSolarUnit, { isLoading: isEditingSolarUnit }] = useEditSolarUnitMutation();

    const { data: users } = useGetAllUsersQuery();

    async function onSubmit(values) {
        try {
            await editSolarUnit({ id, data: values }).unwrap();
            navigate(`/admin/solar-units/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Serial Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Serial Number" {...field} />
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
                                <Input type="date" placeholder="Installation Date" {...field} />
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
                            <FormLabel>Capacity</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Capacity" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
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
                                    <SelectTrigger>
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
                            <FormLabel>User</FormLabel>
                            <FormControl>
                                <Select value={field.value || ""} onValueChange={field.onChange}>
                                    <SelectTrigger>
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
                <div className="flex gap-4">
                    <Button type="submit" disabled={isEditingSolarUnit}>{isEditingSolarUnit ? "Saving..." : "Save Changes"}</Button>
                    <Button type="button" variant="outline" onClick={() => navigate(`/admin/solar-units/${id}`)}>Cancel</Button>
                </div>
            </form>
        </Form>
    );
}