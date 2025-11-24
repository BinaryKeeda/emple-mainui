import React from "react";
import Coin from "../../utilities/Coin";
import { useNavigate } from "react-router-dom";
import GlobalBreadcrumbs from "../../utilities/Breadcrumb";

export default function CoinsAdd() {
    const navigate = useNavigate();
    const coinPacks = [
        { _id: 1, price: 99, coins: 300 },
        { _id: 2, price: 199, coins: 650 },
        { _id: 3, price: 299, coins: 1000 },
    ];

    return (
        <>
            <GlobalBreadcrumbs />
            <div
                className="min-h-[calc(100vh - 200px)] flex flex-col items-center p-6 bg-gray-100"
                style={{ backgroundSize: "cover", backgroundPosition: "center" }}
            >

                <div className="w-full flex gap-5 items-center">
                    {coinPacks.map((pack, idx) => (
                        <div
                            key={idx}
                            className="relative w-[300px] bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex items-center  gap-3 mb-3">
                                <span className="text-lg font-bold">
                                    {pack.coins}
                                </span>
                                <Coin />
                            </div>

                            <p className="text-lg font-medium text-gray-700">₹{pack.price}</p>

                            <button onClick={() => {
                                navigate(`${pack._id}`)
                            }} className="mt-4 w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition">
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}
