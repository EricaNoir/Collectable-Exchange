import Navbar from "./small_components/Navbar";
import React from "react";
import ExchangeCard from "./small_components/ExchangeCard";
import MyCollectableCard from "./small_components/MyCollectableCard";
import UserInfoFloating from "./floating_windows/UserInfoFloating";
import EditCollectableFloating from "./floating_windows/EditCollectableFloating";
import CreateCollectableFloating from "./floating_windows/CreateCollectableFloating";

function HomePage({}) {
    const [currentSection, setCurrentSection] = React.useState("plaza");
    // switch to palaza
    function handlePlazaClick() {
        setCurrentSection("plaza");
    }
    // switch to my list
    function handleListClick() {
        setCurrentSection("list");
    }

    // "userInfo" "create" "edit"
    const [activeWindow, setActiveWindow] = React.useState({
        type: null,
        targetObject: null,
    });
    // add user info floating window
    function handleUserInfoClick(ownerId) {
        setActiveWindow({
            type: "userInfo",
            targetObject: ownerId,
        });
    }
    // add create floating window
    function handleCreateClick() {
        setActiveWindow({
            type: "create",
            targetObject: null,
        });
    }
    // add edit floating window
    function handleEditClick(exchangeId) {
        setActiveWindow({
            type: "edit",
            targetObject: exchangeId,
        });
    }
    // close floating window
    function closeFloatingWindow() {
        setActiveWindow({
            type: null,
            targetObject: null,
        });
    }

    // Get exchangeList as an array of json
    const [exchangeList, setExchangeList] = React.useState([
        {
            exchangeId: 1,
            collectableName: "chuuya",
            collectableSet: "bsd",
            price: 50,
            sellingOrBuying: "selling",
            updateDate: "30/10/2023",
            collectableImage: null,
            ownerId: 1,
        },
    ]);
    // fetch("/api/collectableExchangeList")
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         setExchangeList(data);
    //     })
    //     .catch((error) => {
    //         console.error("Fetch error:", error);
    //     });

    // Get myList as an array of json
    const [myList, setMyList] = React.useState([
        {
            exchangeId: 2,
            collectableName: "dazai",
            collectableSet: "bsd",
            price: 50,
            sellingOrBuying: "selling",
            updateDate: "30/10/2023",
            priority: "high",
            collectableImage: null,
            visibility: true,
        },
    ]);
    // fetch("/api/myCollectableExchange")
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         setMyList(data);
    //     })
    //     .catch((error) => {
    //         console.error("Fetch error:", error);
    //     });

    return (
        <>
            <Navbar />
            <h1>This is the HomePage</h1>
            {activeWindow.type === "userInfo" && (
                <UserInfoFloating
                    closeWindow={closeFloatingWindow}
                    userId={activeWindow.targetObject}
                />
            )}

            {activeWindow.type === "create" && (
                <CreateCollectableFloating closeWindow={closeFloatingWindow} />
            )}

            {activeWindow.type === "edit" && (
                <EditCollectableFloating
                    closeWindow={closeFloatingWindow}
                    exchangeId={activeWindow.targetObject}
                />
            )}

            <section className="body-container">
                <nav className="nav-in-home-page">
                    <button
                        className="nav-in-home-page-btn"
                        onClick={handlePlazaClick}
                        style={{
                            backgroundColor:
                                currentSection === "plaza"
                                    ? "#333"
                                    : "transparent",
                            color:
                                currentSection === "plaza" ? "white" : "black",
                        }}
                    >
                        Plaza
                    </button>
                    <button
                        className="nav-in-home-page-btn"
                        onClick={handleListClick}
                        style={{
                            backgroundColor:
                                currentSection === "list"
                                    ? "#333"
                                    : "transparent",
                            color:
                                currentSection === "list" ? "white" : "black",
                        }}
                    >
                        My List
                    </button>
                </nav>
                {currentSection === "plaza" ? (
                    <>
                        <div className="search-bar">Search</div>
                        <div
                            className="card-container"
                            id="exchange-card-container"
                        >
                            {exchangeList.map((exchange) => (
                                <ExchangeCard
                                    key={exchange.exchangeId}
                                    exchange={exchange}
                                    onUserInfoClick={handleUserInfoClick}
                                />
                            ))}
                        </div>
                    </>
                ) : currentSection === "list" ? (
                    <>
                        <div className="list-content">
                            <button
                                className="add-my-item-btn"
                                onClick={handleCreateClick}
                            >
                                +
                            </button>
                            {myList.map((exchange) => (
                                <MyCollectableCard
                                    key={exchange.exchangeId}
                                    exchange={exchange}
                                    onEditClick={handleEditClick}
                                />
                            ))}
                        </div>
                    </>
                ) : null}
            </section>
        </>
    );
}

export default HomePage;
