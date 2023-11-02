/** 
    generate authorised collectable list using a drop-down list
    End point: '\currentAuthorisedCollectable
    Request: 'GET'
    Response: JSON Array (collectableName, collectableSet)
    create collectable form, set and name should be a drop-down list
    End point: '\collectableExchangeCreate'
    Request: 'POST'
    Body: collectableName, collectableSet, price, sellingOrBuying, collectableImage, priority, visibility=True
    click your list button to go to your list

    generate current my list
    End point: '\myCollectableExchange
    Request: 'GET'
    Response: JSON Array (exchangeId, collectableName, collectableSet, price, sellingOrBuying, updateDate, collectableImage)
    edit my current exchange
    End point: '\myCollectableExchange\edit
    Request: 'POST'
    Body: exchangeId, collectableName, collectableSet, price, sellingOrBuying, collectableImage, priority, visibility
*/

function MyCollectableCard({ exchange, onEditClick, onToggleClick }) {
    return (
        <div className="my-collectable-card">
            <img src={`/api/images/${exchange.collectableImage}`} alt="item image"></img>
            <h3 className="my-collectable-card-name">{exchange.collectableName}</h3>
            <h3 className="my-collectable-card-set">{exchange.collectableSet}</h3>
            <p className="my-collectable-card-price">{exchange.price}</p>
            <p className="my-collectable-card-selling-or-buying">
                {exchange.sellingOrBuying}
            </p>

            <button
                className="my-collectable-card-edit-btn"
                onClick={() => onEditClick(exchange)}
            >
                Edit
            </button>
            <button 
                className="my-collectable-card-toggle-btn"
                onClick={() => onToggleClick(exchange)}
            >
                Toggle
            </button>
        </div>
    );
}

export default MyCollectableCard;
