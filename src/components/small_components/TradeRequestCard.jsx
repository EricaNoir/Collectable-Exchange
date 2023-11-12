/**
    End point: '\myTrade'

    Request: 'GET'

    Response: JSON Array (exchangeId, collectableName, collectableSet, price, sellingOrBuying, collectableImage, otherId)

    End point: '\myTrade\confirm'

    Request: 'POST'

    Body: response ("Approve." or "Cancel.")

    Response: String ("Success." or "Error.")
 */

function TradeRequestCard({ trade, myName, onConfirmClick, onDeclineClick }) {
    return (
        <>
            {myName === trade.requesterName ? (
                <div className="trade-request-card">
                    <div className="outgoing-request-card-1">
                        <h2 className="other-name">
                            My{" "}
                            {trade.sellingOrBuying === "SELLING"
                                ? "buying"
                                : "selling"}{" "}
                            request to {trade.ownerName}
                        </h2>
                        <div className="request-image-container">
                            <img
                                src={`http://localhost:8080/images/${trade.collectableImage}`}
                                alt="item image"
                            ></img>
                        </div>
                    </div>
                    <div className="outgoing-request-card-2">
                        <h3 className="trade-request-card-name-and-set">
                            {`${trade.collectableName} from ${trade.collectableSet}`}
                        </h3>
                        <p className="trade-request-card-price">
                            {`Price:  AU$${trade.price}`}
                        </p>
                    </div>
                    <div className="outgoing-request-card-3">
                        <button
                            className="trade-request-card-decline-btn"
                            onClick={() => onDeclineClick(trade.exchangeId)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="trade-request-card">
                    <div className="outgoing-request-card-1">
                        <h2 className="other-name">
                            {trade.requesterName}'s{" "}
                            {trade.sellingOrBuying === "SELLING"
                                ? "buying"
                                : "selling"}{" "}
                            request to me
                        </h2>
                        <div className="request-image-container">
                            <img
                                src={`http://localhost:8080/images/${trade.collectableImage}`}
                                alt="item image"
                            ></img>
                        </div>
                    </div>
                    <div className="outgoing-request-card-2">
                        <h3 className="trade-request-card-name-and-set">
                            {`${trade.collectableName} from ${trade.collectableSet}`}
                        </h3>
                        <p className="trade-request-card-price">
                            {trade.price}
                        </p>
                    </div>
                    <div className="outgoing-request-card-3">
                        <button
                            className="trade-request-card-confirm-btn"
                            onClick={() => onConfirmClick(trade.exchangeId)}
                        >
                            Confirm
                        </button>
                        <button
                            className="trade-request-card-decline-btn"
                            onClick={() => onDeclineClick(trade.exchangeId)}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default TradeRequestCard;
