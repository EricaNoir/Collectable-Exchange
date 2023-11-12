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
            <img
                src={`http://localhost:8080/images/${trade.collectableImage}`}
            />
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
                    <div>{trade.tradeDate}</div>
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
