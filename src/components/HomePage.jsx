import Navbar from "./small_components/Navbar";
import React from "react";
import ExchangeCard from "./small_components/ExchangeCard";
import MyCollectableCard from "./small_components/MyCollectableCard";
import UserInfoFloating from "./floating_windows/UserInfoFloating";
import EditCollectableFloating from "./floating_windows/EditCollectableFloating";
import CreateCollectableFloating from "./floating_windows/CreateCollectableFloating";
import { useParams } from 'react-router-dom';

function HomePage() {

    const {userName} = useParams();

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
    function handleUserInfoClick(ownerName) {
        setActiveWindow({
            type: "userInfo",
            targetObject: ownerName,
        });
    }
    // send trade request
    function handleSendRequestClick(exchangeId) {
        fetch(`/api/trade?exchangeId=${exchangeId}`)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                alert("Response as text: " + data);
                // remove traded exchanges
                if (data === "Success." || data === "Collectable already occupied.") {
                    setExchangeList(exchangeList.filter((exchange) => exchange.exchangeId !== exchangeId));
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
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

    // Page
    const [page, setPage] = React.useState(1);
    function nextPage() {
        if (exchangeList.length === 10) {
            setPage(page + 1);
        }
    }
    function prePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    // Get exchangeList as an array of json
    const [exchangeList, setExchangeList] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState({
        ownerName: '',
        collectableSet: '',
        collectableName: ''
    });
    const [ownerSearchName, setOwnerSearchName] = React.useState('');
    const [collectableSearchSet, setCollectableSearchSet] = React.useState('');
    const [collectableSearchName, setCollectableSearchName] = React.useState('');

    // search input with name
    function handleSearchNameInput(ownerName) {
        setSearchTerm({ ownerName: ownerName, collectableSet: '', collectableName: '' });
        setCollectableSearchSet('');
        setCollectableSearchName('');
    }
    // search input with set and card
    function handleSearchCardInput(collectableSet, collectableName) {
        setSearchTerm({ ownerName: '', collectableSet: collectableSet, collectableName: collectableName });
        setOwnerSearchName('');
    }

    function handleSearch(searchTerm, page) {
        // search by owner
        if (searchTerm.ownerName !== '') {
            fetch(`/api/collectableExchangeList/searchName?ownerName=${searchTerm.ownerName}&page=${page}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((exchangeListData) => {
                    setExchangeList(exchangeListData);
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }
        // search by card set and name
        else if (searchTerm.collectableSet !== '') {
            fetch(`/api/collectableExchangeList/searchCard?collectableSet=${searchTerm.collectableSet}&collectableName=${searchTerm.collectableName}&page=${page}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((exchangeListData) => {
                    setExchangeList(exchangeListData);
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }
        // no search page:
        else {
            fetch(`/api/collectableExchangeList?page=${page}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((exchangeListData) => {
                    setExchangeList(exchangeListData);
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }
    }

    // load different page
    React.useEffect(() => {
        handleSearch(searchTerm, page);
    }, [page, currentSection]);
    // load different search term
    React.useEffect(() => {
        // this will trigger load different page
        setPage(1);
        handleSearch(searchTerm, 1);
    }, [searchTerm]);

    // Get myList as an array of json
    const [myList, setMyList] = React.useState(null);

    // load my list page
    React.useEffect(() => {
        fetch("/api/myCollectableExchange")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((myListData) => {
                setMyList(myListData);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, [currentSection]);

    // Get current collectable category as a Json
    const [collectableCategory, setCollectableCategory] = React.useState(null);

    // load collectable category
    React.useEffect(() => {
        fetch("/api/currentAuthorisedCollectable")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((collectableCategoryData) => {
                setCollectableCategory(collectableCategoryData);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);

    return (
        <>

            <Navbar userName={userName} />
            <h1>This is the HomePage</h1>
            {activeWindow.type === "userInfo" && (
                <UserInfoFloating
                    closeWindow={closeFloatingWindow}
                    userName={activeWindow.targetObject}
                />
            )}

            {activeWindow.type === "create" && collectableCategory !== null && (
                <CreateCollectableFloating nameList={collectableCategory} closeWindow={closeFloatingWindow} />
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
                        <div className="search-bar">
                            <div className="search-name">
                                <label>
                                    Search by owner name:
                                    <input
                                        type="text"
                                        placeholder="Owner Name"
                                        value={ownerSearchName}
                                        onChange={(e) => setOwnerSearchName(e.target.value)}
                                    />
                                </label>
                                <button className="search-btn" onClick={() => handleSearchNameInput(ownerSearchName)}>Search</button>
                            </div>
                            {collectableCategory !== null ? (
                                <div className="search-card">
                                    <label htmlFor="collectableSet">Collectable Set:</label>
                                    <select
                                        name="collectableSet"
                                        onChange={(e) => setCollectableSearchSet(e.target.value)}
                                        value={collectableSearchSet}
                                        required
                                    >
                                        <option value="">
                                            Select a set
                                        </option>
                                        {Object.keys(collectableCategory).map((set) => (
                                            <option key={set}>{set}</option>
                                        ))}
                                    </select>

                                    <label htmlFor="collectableName">Collectable Name:</label>
                                    {collectableSearchSet !== '' ? (
                                        <select
                                            name="collectableName"
                                            onChange={(e) => setCollectableSearchName(e.target.value)}
                                            value={collectableSearchName}
                                        >
                                            <option value="">
                                                Select a name
                                            </option>
                                            {collectableCategory[collectableSearchSet].map(
                                                (name) => (
                                                    <option key={name}>{name}</option>
                                                )
                                            )}
                                        </select>) : (
                                        <select disabled>
                                            <option value="Select a name">Select a name</option>
                                        </select>
                                    )}
                                    <button className="search-btn" onClick={() => handleSearchCardInput(collectableSearchSet, collectableSearchName)}>Search</button>
                                </div>) : (
                                <div>
                                    Loading...
                                </div>
                            )}
                        </div>
                        <div className="page-bar">
                            <button className="change-page-btn" onClick={prePage}>Previous Page</button>
                            Current Page: {page}
                            <button className="change-page-btn" onClick={nextPage}>Next Page</button>
                        </div>
                        <div
                            className="card-container"
                            id="exchange-card-container"
                        >
                            {exchangeList !== null ? (exchangeList.map((exchange) => (
                                <ExchangeCard
                                    key={exchange.exchangeId}
                                    exchange={exchange}
                                    onUserInfoClick={handleUserInfoClick}
                                    onSendRequestClick={handleSendRequestClick}
                                />
                            ))) : (
                                <div>Loading...</div>
                            )}
                        </div>
                        <div className="page-bar">
                            <button className="change-page-btn" onClick={prePage}>Previous Page</button>
                            Current Page: {page}
                            <button className="change-page-btn" onClick={nextPage}>Next Page</button>
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
                            {myList !== null ? (myList.map((exchange) => (
                                <MyCollectableCard
                                    key={exchange.exchangeId}
                                    exchange={exchange}
                                    onEditClick={handleEditClick}
                                />
                            ))) : (
                                <div>Loading...</div>
                            )}
                        </div>
                    </>
                ) : null}
            </section>
        </>
    );
}

export default HomePage;
