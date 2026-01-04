import { useState } from "react";
import { useGetInvoicesQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModal from "./components/PaymentModal";
import { Loader2, FileText, CheckCircle, AlertCircle } from "lucide-react";

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe("pk_test_placeholder");

const InvoicesPage = () => {
    const { user } = useUser();
    const { data: invoices, isLoading, isError, refetch } = useGetInvoicesQuery(user?.id);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handlePayClick = (invoice) => {
        setSelectedInvoice(invoice);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSuccess = () => {
        refetch(); // Refresh invoices list
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center text-red-500">
                Failed to load invoices. Please try again later.
            </div>
        );
    }

    return (
        <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
                    <p className="text-muted-foreground mt-1">Manage your billing and payments</p>
                </div>
            </div>

            <div className="grid gap-4">
                {invoices?.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            No invoices found.
                        </CardContent>
                    </Card>
                ) : (
                    invoices?.map((invoice) => (
                        <Card key={invoice._id} className="overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            Invoice #{invoice._id.slice(-6).toUpperCase()}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {format(new Date(invoice.periodStart), "MMM d, yyyy")} -{" "}
                                            {format(new Date(invoice.periodEnd), "MMM d, yyyy")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
                                    <div className="grid grid-cols-2 md:flex gap-8 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Energy Generated</p>
                                            <p className="font-medium">{invoice.energyGenerated} kWh</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Amount</p>
                                            <p className="font-medium text-lg">${invoice.amount.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                        <Badge
                                            variant={
                                                invoice.status === "PAID"
                                                    ? "success" // Assuming you have a success variant, or use default/secondary
                                                    : invoice.status === "PENDING"
                                                        ? "warning"
                                                        : "destructive"
                                            }
                                            className={`
                        ${invoice.status === "PAID" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        ${invoice.status === "PENDING" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""}
                        ${invoice.status === "FAILED" ? "bg-red-100 text-red-800 hover:bg-red-100" : ""}
                      `}
                                        >
                                            {invoice.status === "PAID" && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {invoice.status === "PENDING" && <AlertCircle className="w-3 h-3 mr-1" />}
                                            {invoice.status}
                                        </Badge>

                                        {invoice.status === "PENDING" && (
                                            <Button onClick={() => handlePayClick(invoice)}>Pay Now</Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Payment Modal wrapped in Elements provider */}
            {selectedInvoice && (
                <Elements stripe={stripePromise}>
                    <PaymentModal
                        invoice={selectedInvoice}
                        isOpen={isPaymentModalOpen}
                        onClose={() => setIsPaymentModalOpen(false)}
                        onSuccess={handlePaymentSuccess}
                    />
                </Elements>
            )}
        </main>
    );
};

export default InvoicesPage;
