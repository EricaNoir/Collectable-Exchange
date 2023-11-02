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

function ExchangeCard({ exchange, onUserInfoClick, onSendRequestClick }) {
    return (
        <div className="exchange-card">
            <div className="exchange-card-1">
                <div className="card-image-container">
                    <img
                        src={`/api/images/${exchange.collectableImage}`}
                        alt="item image"
                    ></img>
                </div>
                <h3 className="exchange-card-name-and-set">
                    {`${exchange.collectableName} from ${exchange.collectableSet}`}
                </h3>
            </div>

            <div className="exchange-card-2">
                <p className="exchange-card-price">{`Price:  AU$${exchange.price}`}</p>
                <p className="exchange-card-selling-or-buying">
                    {`Selling or Buying: ${exchange.sellingOrBuying}`}
                </p>
            </div>
            <div className="exchange-card-3">
                <button
                    className="exchange-card-user-info-btn"
                    onClick={() => onUserInfoClick(exchange.ownerName)}
                >
                    See User Info
                </button>
                <button
                    className="exchange-card-send-request-btn"
                    onClick={() => onSendRequestClick(exchange.exchangeId)}
                >
                    Send Request
                </button>
            </div>
        </div>
    );
}

export default ExchangeCard;
