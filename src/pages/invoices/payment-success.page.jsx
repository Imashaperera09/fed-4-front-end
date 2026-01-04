import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-none shadow-2xl bg-card/50 backdrop-blur-xl animate-in zoom-in duration-500">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4 w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground">Payment Successful!</CardTitle>
                    <CardDescription className="text-lg">
                        Thank you for your payment. Your invoice has been updated.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-2 text-center">
                    <p className="text-muted-foreground mb-8">
                        A confirmation email has been sent to your registered email address.
                        You can view your updated invoice status in the invoices dashboard.
                    </p>
                    <div className="space-y-4">
                        <Button asChild className="w-full h-12 text-lg font-semibold group">
                            <Link to="/dashboard/invoices">
                                Back to Invoices
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" className="w-full">
                            <Link to="/dashboard">Go to Dashboard</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
