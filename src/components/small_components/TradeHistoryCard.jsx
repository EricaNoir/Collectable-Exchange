/**
    generate history list
    End point:
    '\history'
    '\history\searchName?otherName=name' (TODO)
    Request: 'GET'
    Response: JSON Array (collectableName, collectableSet, price, sellingOrBuying, collectableImage, otherId)
 */
function TradeHistoryCard({ trade }) {
    return (
        <div className="trade-history-card">
            <div className="trade-history-img-container">
                <img
                    src={`http://localhost:8080/images/${trade.collectableImage}`}
                />
            </div>

            <div className="card-box">
                <div>
                    <span>Name:</span>
                    <div>{trade.collectableName}</div>
                </div>
                <div>
                    <span>Set:</span>
                    <div>{trade.collectableSet}</div>
                </div>
                <div>
                    <span>Trade time:</span>
                    <div>{new Date(trade.tradeDate)
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:{new Date(trade.tradeDate)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")} {new Date(
                            trade.tradeDate
                        ).getDate()}/{(
                            new Date(trade.tradeDate).getMonth() + 1
                        )
                            .toString()
                            .padStart(2, "0")}/{new Date(
                            trade.tradeDate
                        ).getFullYear()}</div>
                </div>
                <div>
                    <span>Price:</span>
                    <div>AU${trade.price}</div>
                </div>
                <div>
                    <span>Seller:</span>
                    <div>{trade.seller}</div>
                </div>
                <div>
                    <span>Buyer:</span>
                    <div>{trade.buyer}</div>
                </div>
            </div>
        </div>
    );
}

export default TradeHistoryCard;
