import Navbar from "./small_components/Navbar";
import React from "react";
import TradeRequestCard from "./small_components/TradeRequestCard";
import { useParams } from 'react-router-dom';

function InBoxPage({ }) {
    const {userName} = useParams();
    // Get my trade as an array of json
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

    function handleConfirmClick(exchangeId) {
        fetch(`/api/myTrade/confirm?exchangeId=${exchangeId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((data) => {
            alert("Response as text: " + data);
            // remove traded exchanges
            if (data === "Success.") {
                setMyTrade(myTrade.filter((trade) => trade.exchangeId !== exchangeId));
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    }

    function handleDeclineClick(exchangeId) {
        fetch(`/api/myTrade/decline?exchangeId=${exchangeId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((data) => {
            alert("Response as text: " + data);
            // remove traded exchanges
            if (data === "Success.") {
                setMyTrade(myTrade.filter((trade) => trade.exchangeId !== exchangeId));
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    }

    return (
        <>
            <Navbar userName={userName} />
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
                            myName={userName}
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