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
            <div className="trade-history-card-1">
                <div className="trade-history-image-div">
                    <img
                        className="trade-history-image"
                        src={`/api/images/${trade.collectableImage}`}
                    />
                </div>
                <p className="trade-history-time">
                    <strong>Trade time: </strong>{trade.tradeDate}
                </p>
            </div>
            <div className="trade-history-card-2">
                <p className="trade-history-collectable-set">
                <strong>Set: </strong>{trade.collectableSet}
                </p>
                <p className="trade-history-collectable-name">
                <strong>Name: </strong>{trade.collectableName}
                </p>
            </div>
            <div className="trade-history-card-3">
                <p className="trade-history-price"><strong>Price: </strong>AU${trade.price}</p>
                <p className="trade-history-seller"><strong>Seller: </strong>{trade.seller}</p>
                <p className="trade-history-buyer"><strong>Buyer: </strong>{trade.buyer}</p>
            </div>
        </div>
    );
}

export default TradeHistoryCard;
