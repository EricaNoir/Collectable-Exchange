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
                <p className="trade-history-time">Trade time: {trade.tradeDate}</p>
                <img className="trade-history-image" src={`/api/images/${trade.collectableImage}`} />
            </div>
            <div className="trade-history-card-2">
                <p className="trade-history-collectable-set">Set: {trade.collectableSet}</p>
                <p className="trade-history-collectable-name">Name: {trade.collectableName}</p>
            </div>
            <div className="trade-history-card-3">
                <p className="trade-history-seller">Seller: {trade.seller}</p>
                <p className="trade-history-price">Price: AU${trade.price}</p>
                <p className="trade-history-buyer">Buyer: {trade.buyer}</p>
            </div>
        </div>
    )
}