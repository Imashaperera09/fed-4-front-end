import { Link } from "react-router-dom";
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PaymentFailurePage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-none shadow-2xl bg-card/50 backdrop-blur-xl animate-in zoom-in duration-500">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4 w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <XCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground">Payment Failed</CardTitle>
                    <CardDescription className="text-lg">
                        We couldn't process your payment at this time.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-2 text-center">
                    <p className="text-muted-foreground mb-8">
                        This could be due to insufficient funds, an expired card, or a temporary connection issue.
                        Please check your payment details and try again.
                    </p>
                    <div className="space-y-4">
                        <Button asChild className="w-full h-12 text-lg font-semibold group bg-red-600 hover:bg-red-700">
                            <Link to="/dashboard/invoices">
                                <RefreshCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                Try Again
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" className="w-full">
                            <Link to="/dashboard/invoices">
                                <ArrowLeft className="mr-2 w-5 h-5" />
                                Back to Invoices
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
