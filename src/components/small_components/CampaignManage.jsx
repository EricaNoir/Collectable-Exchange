// Only for campaign manager and admin

import React from "react";
import CreateCampaignButton from "./CreateCampageButton";

function CampaignManage() {

    const [collectableList, setCollectableList] = React.useState(null);
    // load collectable full list
    React.useEffect(() => {
        const url = "/api/manage/allCollectable"
        fetch(url)
            .then((response) => response.json())
            .then((data) =>
                setCollectableList(data)
            );
    }, []);

    function deleteCollectable(exchangeId) {
        const result = window.confirm("Are you sure to delete this exchange?");
        if (result) {
            const url = `/api/manage/deleteCollectable?collectableId=${exchangeId}`;
            fetch(url)
                .then((response) => response.text())
                .then((data) => {
                    alert(data);
                    setCollectableList(collectableList.filter(
                        (exchange) => exchange.exchangeId !== exchangeId
                    ));
                });
        }
    };


    return (
        <>
            <h2>Collectable Full List</h2>
            <CreateCampaignButton />
            {collectableList && (
                <table>
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Collectable Set</th>
                            <th>Collectable Name</th>
                            <th>Selling or Buying</th>
                            <th>Price</th>
                            <th>Priority</th>
                            <th>Visibility</th>
                            <th>If Pending</th>
                            <th>Update Time</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collectableList.map((exchange) => (
                            <tr key={exchange.exchangeId}>
                                <td>{exchange.ownerName}</td>
                                <td>{exchange.collectableSet}</td>
                                <td>{exchange.collectableName}</td>
                                <td>{exchange.sellingOrBuying}</td>
                                <td>{exchange.price}</td>
                                <td>{exchange.priority}</td>
                                <td>{exchange.visibility}</td>
                                <td>{exchange.isPending}</td>
                                <td>{exchange.updateDate}</td>
                                <td>
                                    <button onClick={() => deleteCollectable(exchange.exchangeId)}>Delete Collectable</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>);
}

export default CampaignManage;