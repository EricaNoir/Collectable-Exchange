/**
    End point: '\user?ownerId=ownerId'
    Request: 'GET'
    Response: JSON Array (userImage, username, userPhone, userEmail, userFacebook, buyingCollectableInterested, sellingCollectableInterested)
    click to copy

    click each collectable exchange Like button to send exchange request
    End point: '\trade'
    Request: 'POST'
    Body: exchangeId (发送申请方的userId可在后端直接读到)
    Response: String ("Success." or "Collectable already occupied." or "Error.")
*/

function ExchangeCard({ exchange, onUserInfoClick }) {
    return (
        <div className="exchange-card">
            <img src="./assets/img/default-avatar.jpg" alt="item image"></img>
            <h3 className="exchange-card-name">{exchange.collectableName}</h3>
            <h3 className="exchange-card-set">{exchange.collectableSet}</h3>
            <p className="exchange-card-price">{exchange.price}</p>
            <p className="exchange-card-selling-or-buying">{exchange.sellingOrBuying}</p>

            <button className="exchange-card-user-info-btn" onClick={() => onUserInfoClick(exchange.ownerId)}>See User Info</button>
            <button className="exchange-card-send-request-btn">Send Request</button>
        </div>
    )
}

export default ExchangeCard