import { useState } from "react";
import { useGetInvoicesQuery, useGetAllUsersQuery, useGetSolarUnitsQuery, useGenerateInvoiceMutation, useAutoGenerateInvoicesMutation } from "@/lib/redux/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Loader2, FileText, CheckCircle, AlertCircle, XCircle, Filter, Plus, RefreshCw } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const AdminInvoicesPage = () => {
    const { data: invoices, isLoading: isLoadingInvoices } = useGetInvoicesQuery();
    const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery();
    const { data: solarUnits, isLoading: isLoadingUnits } = useGetSolarUnitsQuery();
    const [generateInvoice, { isLoading: isGenerating }] = useGenerateInvoiceMutation();
    const [autoGenerateInvoices, { isLoading: isAutoGenerating }] = useAutoGenerateInvoicesMutation();

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUnitId, setSelectedUnitId] = useState("");

    const isLoading = isLoadingInvoices || isLoadingUsers || isLoadingUnits;

    const getUserName = (userId) => {
        if (!users) return userId;
        const user = users.find((u) => u._id === userId || u.clerkId === userId);
        return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
    };

    const filteredInvoices = invoices?.filter((invoice) => {
        if (statusFilter === "ALL") return true;
        return invoice.status === statusFilter;
    });

    const handleGenerateInvoice = async () => {
        if (!selectedUnitId) return;
        try {
            await generateInvoice({ solarUnitId: selectedUnitId }).unwrap();
            setIsDialogOpen(false);
            setSelectedUnitId("");
            alert("Invoice generated successfully!");
        } catch (error) {
            console.error("Failed to generate invoice:", error);
            alert("Failed to generate invoice. Please try again.");
        }
    };

    const handleAutoGenerate = async () => {
        if (!confirm("This will generate invoices for all eligible solar units. Continue?")) {
            return;
        }
        try {
            const result = await autoGenerateInvoices().unwrap();
            alert(
                `Auto-generation completed!\n` +
                `Generated ${result.results.invoicesGenerated} invoices.\n` +
                `Success: ${result.results.successCount}, Errors: ${result.results.errorCount}`
            );
        } catch (error) {
            console.error("Failed to auto-generate invoices:", error);
            alert("Failed to auto-generate invoices. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">All Invoices</h1>
                    <p className="text-muted-foreground mt-1">Manage billing across all users</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Statuses</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PAID">Paid</SelectItem>
                                <SelectItem value="FAILED">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleAutoGenerate}
                        disabled={isAutoGenerating}
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                        {isAutoGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Auto-Generating...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Auto-Generate All
                            </>
                        )}
                    </Button>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="w-4 h-4 mr-2" />
                                Generate Invoice
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Generate Manual Invoice</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Select Solar Unit</label>
                                    <Select value={selectedUnitId} onValueChange={setSelectedUnitId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a solar unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {solarUnits?.map((unit) => (
                                                <SelectItem key={unit._id} value={unit._id}>
                                                    {unit.serialNumber} ({getUserName(unit.userId)})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <p className="text-sm text-muted-foreground italic">
                                    This will generate an invoice for the last 30 days of energy production.
                                </p>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={handleGenerateInvoice}
                                    disabled={!selectedUnitId || isGenerating}
                                >
                                    {isGenerating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Generate
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Generated Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInvoices?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No invoices found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredInvoices?.map((invoice) => (
                                    <TableRow key={invoice._id}>
                                        <TableCell className="font-medium">
                                            #{invoice._id.slice(-6).toUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{getUserName(invoice.userId)}</span>
                                                <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                                                    {invoice.userId}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(invoice.periodStart), "MMM d")} -{" "}
                                            {format(new Date(invoice.periodEnd), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`
                          ${invoice.status === "PAID" ? "bg-green-100 text-green-800 border-green-200" : ""}
                          ${invoice.status === "PENDING" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : ""}
                          ${invoice.status === "FAILED" ? "bg-red-100 text-red-800 border-red-200" : ""}
                        `}
                                            >
                                                {invoice.status === "PAID" && <CheckCircle className="w-3 h-3 mr-1" />}
                                                {invoice.status === "PENDING" && <AlertCircle className="w-3 h-3 mr-1" />}
                                                {invoice.status === "FAILED" && <XCircle className="w-3 h-3 mr-1" />}
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
};

export default AdminInvoicesPage;
