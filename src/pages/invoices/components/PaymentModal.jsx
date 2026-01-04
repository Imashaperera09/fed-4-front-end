import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation } from "@/lib/redux/query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const PaymentModal = ({ invoice, isOpen, onClose, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Create PaymentIntent
            const { data: { clientSecret } } = await createPaymentIntent({ invoiceId: invoice._id });

            // 2. Confirm Card Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: "SolarNova User", // In a real app, get from user profile
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                navigate("/dashboard/invoices/failure");
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    onSuccess();
                    onClose();
                    navigate("/dashboard/invoices/success");
                }
            }
        } catch (err) {
            setError("Payment failed. Please try again.");
            console.error(err);
            navigate("/dashboard/invoices/failure");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pay Invoice</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Amount Due:</span>
                        <span className="text-xl font-bold">${invoice?.amount.toFixed(2)}</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="p-4 border rounded-md mb-4">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            "::placeholder": {
                                                color: "#aab7c4",
                                            },
                                        },
                                        invalid: {
                                            color: "#9e2146",
                                        },
                                    },
                                }}
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!stripe || loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Pay Now
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;
