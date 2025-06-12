export function handleDonate(amount: number) {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID", // Use env or fallback
    amount, // Amount in paise
    currency: "INR",
    name: "Your Organization",
    description: "Donation",
    handler: function (response: any) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    },
    prefill: {
      name: "",
      email: "",
    },
    theme: {
      color: "#6366f1",
    },
  };
  // @ts-ignore
  const rzp = new window.Razorpay(options);
  rzp.open();
}