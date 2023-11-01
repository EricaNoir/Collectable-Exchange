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
        <div className="trade-request-card">
            <img src="./assets/img/default-avatar.jpg" alt="item image"></img>
            <h3 className="trade-request-card-set">{trade.collectableSet}</h3>
            <h3 className="trade-request-card-name">{trade.collectableName}</h3>
            <p className="trade-request-card-price">{trade.price}</p>
            <p className="trade-request-card-selling-or-buying">{trade.sellingOrBuying}</p>

            <button className="trade-request-card-confirm-btn" onClick={() => onConfirmClick(trade.exchangeId)}>Confirm</button>
            <button className="trade-request-card-decline-btn" onClick={() => onDeclineClick(trade.exchangeId)}>Decline</button>
        </div>
    )
}

export default TradeRequestCard;