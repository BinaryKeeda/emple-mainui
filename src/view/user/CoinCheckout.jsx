import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PAYMENT_URL } from "../../lib/config";
import { useSnackbar } from 'notistack'
import GlobalBreadcrumbs from "../../utilities/Breadcrumb";
import { getUser } from "../../redux/reducers/UserThunks";
export default function CoinCheckout() {
    const coinPacks = [
        { _id: 1, price: 99, coins: 300 },
        { _id: 2, price: 199, coins: 650 },
        { _id: 3, price: 299, coins: 1000 },
    ];

    const { enqueueSnackbar } = useSnackbar();

    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((s) => s.auth);
    const navigate = useNavigate();

    const selectedPack = coinPacks.find((c) => c._id === Number(id));

    if (!selectedPack) {
        return (
            <div className="p-6 text-red-500 text-lg font-semibold">
                Invalid Coin Pack
            </div>
        );
    }

    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            document.body.appendChild(script);
        });

    const handlePayment = async () => {
        const loaded = await loadRazorpayScript();
        if (!loaded) return alert("Razorpay SDK failed to load");

        // 1️⃣ Create order
        const orderRes = await fetch(`${PAYMENT_URL}/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: selectedPack.price,
                coins: selectedPack.coins,
                userId: user?._id,
                coinPackId: selectedPack._id,
                email: user?.email
            }),
        });

        const orderData = await orderRes.json();
        if (!orderData.orderId) return alert("Order creation failed");

        // 2️⃣ Razorpay Checkout
        const options = {
            key: import.meta.env.VITE_APP_RAZORPAY_KEY,
            amount: selectedPack.price * 100,
            currency: "INR",
            name: "BinaryKeeda Coins",
            description: `${selectedPack.coins} Coins Purchase`,
            order_id: orderData.orderId,

            notes: {
                userId: user?._id,
                coinPackId: selectedPack._id,
                email: user?.email,
                coins: selectedPack.coins
            },

            handler: async function (response) {
                // 3️⃣ Verify Payment
                const verifyRes = await fetch(`${PAYMENT_URL}/verify-payment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: orderData.orderId,
                        paymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    }),
                });

                const verifyResult = await verifyRes.json();

                if (verifyResult && verifyResult.success === true) {
                    enqueueSnackbar("Payment Successful!", {
                        variant: "success",
                    });
                    dispatch(getUser?.())
                    navigate("/user");
                } else {
                    enqueueSnackbar("Payment failed! Signature mismatch.", {
                        variant: "error",
                    });
                    navigate("/user");
                }
            },

            prefill: { email: user?.email },
            theme: { color: "#111111" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


    return (
        <>
            <GlobalBreadcrumbs />
            <div className="bg-gray-100 pt-10 flex items-center justify-center px-4">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 border border-gray-200">

                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Checkout</h2>
                    <p className="text-gray-500 mb-6">Review your pack & proceed to payment</p>

                    {/* Summary Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold text-gray-900">
                                    {selectedPack.coins} Coins
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Instantly added after successful payment
                                </p>
                            </div>

                            <span className="text-xl font-bold text-gray-900">
                                ₹{selectedPack.price}
                            </span>
                        </div>
                    </div>

                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="border p-3 w-full rounded-lg bg-gray-100 cursor-not-allowed mb-4"
                    />

                    <label className="text-sm font-medium text-gray-600">Selected Plan</label>
                    <input
                        type="text"
                        value={`${selectedPack.coins} Coins — ₹${selectedPack.price}`}
                        readOnly
                        className="border p-3 w-full rounded-lg bg-gray-100 cursor-not-allowed mb-6"
                    />

                    <button
                        onClick={handlePayment}
                        className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition shadow-md"
                    >
                        Pay ₹{selectedPack.price}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Secured by Razorpay
                    </p>
                </div>
            </div>
        </>

    );
}
