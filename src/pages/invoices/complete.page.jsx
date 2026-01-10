
import { useSearchParams, Link } from "react-router-dom";
import { useGetSessionStatusQuery } from "@/lib/redux/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaymentCompletePage() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const { data, isLoading } = useGetSessionStatusQuery(sessionId, {
        skip: !sessionId,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Verifying payment...</span>
            </div>
        );
    }

    const isSuccess = data?.paymentStatus === "paid";

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-6">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        {isSuccess ? (
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        ) : (
                            <XCircle className="w-16 h-16 text-red-500" />
                        )}
                    </div>
                    <CardTitle className="text-2xl">
                        {isSuccess ? "Payment Successful!" : "Payment Failed"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isSuccess ? (
                        <p className="text-muted-foreground">
                            Thank you for your payment. Your transaction has been completed successfully.
                            <br />
                            Amount paid: <span className="font-bold text-foreground">${(data.amountTotal / 100).toFixed(2)}</span>
                        </p>
                    ) : (
                        <p className="text-muted-foreground">
                            Something went wrong with your payment. Please try again or contact support.
                        </p>
                    )}

                    <Button asChild className="w-full">
                        <Link to="/dashboard/invoices">Back to Invoices</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
