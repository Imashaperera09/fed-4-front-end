
import { useParams, useNavigate } from "react-router-dom";
import { useGetInvoicesQuery } from "@/lib/redux/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import CheckoutForm from "./components/CheckoutForm";
import { format } from "date-fns";

const PaymentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // We fetch all invoices and filter because we don't have a getInvoiceById endpoint yet
    // In a real app, you'd want a specific endpoint
    const { data: invoices, isLoading } = useGetInvoicesQuery();

    const invoice = invoices?.find(inv => inv._id === id);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-red-500">Invoice not found</h2>
                <Button variant="link" onClick={() => navigate("/dashboard/invoices")}>
                    Back to Invoices
                </Button>
            </div>
        );
    }

    return (
        <main className="p-6 space-y-6 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate("/dashboard/invoices")} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Invoices
            </Button>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Pay Invoice</h1>
                        <p className="text-muted-foreground mt-1">
                            Complete your payment securely with Stripe
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Invoice ID</span>
                                <span className="font-medium">#{invoice._id.slice(-6).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Billing Period</span>
                                <span className="font-medium text-right">
                                    {format(new Date(invoice.periodStart), "MMM d")} - {format(new Date(invoice.periodEnd), "MMM d, yyyy")}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Energy Usage</span>
                                <span className="font-medium">{invoice.energyGenerated} kWh</span>
                            </div>
                            <div className="flex justify-between py-2 text-lg font-bold">
                                <span>Total Amount</span>
                                <span>${invoice.amount.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-card rounded-lg border shadow-sm p-6">
                    <CheckoutForm invoiceId={invoice._id} />
                </div>
            </div>
        </main>
    );
};

export default PaymentPage;
