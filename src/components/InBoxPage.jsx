import Navbar from "./small_components/Navbar";
import React from "react";
import TradeRequestCard from "./small_components/TradeRequestCard";

function InBoxPage({ }) {
    // Get myList as an array of json
    const [myTrade, setMyTrade] = React.useState(null);

    // load my trades
    React.useEffect(() => {
        fetch("/api/myTrade")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((myTradeData) => {
                setMyTrade(myTradeData);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, [myTrade]);

    return (
        <>
            <Navbar />
            <h1>This is the InBoxPage</h1>
            {(myTrade !== null && myTrade.length > 0) ? (
                <div
                    className="card-container"
                    id="trade-request-card-container"
                >
                    {myTrade.map((trade) => (
                        <TradeRequestCard
                            key={trade.exchangeId}
                            trade={trade}
                            onConfirmClick={handleConfirmClick}
                            onDeclineClick={handleDeclineClick}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    No ongoing trade.
                </div>
            )
            }
        </>
    )
}

export default InBoxPage