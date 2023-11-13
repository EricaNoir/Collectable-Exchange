import Navbar from "./small_components/Navbar";
import React from "react";
import ExchangeCard from "./small_components/ExchangeCard";
import MyCollectableCard from "./small_components/MyCollectableCard";
import UserInfoFloating from "./floating_windows/UserInfoFloating";
import EditCollectableFloating from "./floating_windows/EditCollectableFloating";
import CreateCollectableFloating from "./floating_windows/CreateCollectableFloating";
import { useParams } from "react-router-dom";
import "../css/homePage.scss";

function HomePage() {
    const { userName } = useParams();

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
                if (
                    data === "Success." ||
                    data === "Collectable already occupied."
                ) {
                    setExchangeList(
                        exchangeList.filter(
                            (exchange) => exchange.exchangeId !== exchangeId
                        )
                    );
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
    function handleEditClick(exchange) {
        setActiveWindow({
            type: "edit",
            targetObject: exchange,
        });
    }
    // toggle my exchange
    function handleToggleClick(exchange) {
        const url = "/api/myCollectableExchange/edit";

        const body = new FormData();
        body.append("exchangeId", exchange.exchangeId);
        body.append("price", exchange.price);
        body.append("sellingOrBuying", exchange.sellingOrBuying);
        body.append("priority", exchange.priority);
        body.append("visibility", !exchange.visibility);
        body.append("collectableImage", null);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === "Edit success.") {
                    alert("Collectable toggle sucess.");
                } else alert("Error: " + data);
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
        ownerName: "",
        collectableSet: "",
        collectableName: "",
    });
    const [ownerSearchName, setOwnerSearchName] = React.useState("");
    const [collectableSearchSet, setCollectableSearchSet] = React.useState("");
    const [collectableSearchName, setCollectableSearchName] =
        React.useState("");

    // search input with name
    function handleSearchNameInput(ownerName) {
        setSearchTerm({
            ownerName: ownerName,
            collectableSet: "",
            collectableName: "",
        });
        setCollectableSearchSet("");
        setCollectableSearchName("");
    }
    // search input with set and card
    function handleSearchCardInput(collectableSet, collectableName) {
        setSearchTerm({
            ownerName: "",
            collectableSet: collectableSet,
            collectableName: collectableName,
        });
        setOwnerSearchName("");
    }

    function handleSearch(searchTerm, page) {
        // search by owner
        if (searchTerm.ownerName !== "") {
            fetch(
                `/api/collectableExchangeList/searchName?ownerName=${searchTerm.ownerName}&page=${page}`
            )
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
        else if (searchTerm.collectableSet !== "") {
            fetch(
                `/api/collectableExchangeList/searchCard?collectableSet=${searchTerm.collectableSet}&collectableName=${searchTerm.collectableName}&page=${page}`
            )
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
    }, [myList, currentSection]);

    // called when create succeed
    function handleCreateSuccess() {
        // trigger load my list again
        setMyList(null);
    }

    // Get current collectable category as a Json
    const [collectableCategory, setCollectableCategory] = React.useState(null);

    // load collectable category
    React.useEffect(() => {
        fetch("/api/currentAuthorisedCollectable")
            .then((response) => {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })
            .then((collectableCategoryData) => {
                setCollectableCategory(collectableCategoryData);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);

    const cardContainerRef = React.useRef(null);

    React.useEffect(() => {
        cardContainerRef.current.scrollTop = 0;
    }, [page]);

    // Render post
    const [post, setPost] = React.useState(null);
    // Fetch post
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            fetch("/api/post")
                .then((response) => {
                    if (!response.ok)
                        throw new Error("Network response was not ok");
                    return response.json();
                })
                .then((post) => {
                    setPost(post);
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    // Close the ad
    const [isAdShow, setIsAdShow] = React.useState(true);
    function closeAd() {
        setIsAdShow(false);
    }

    // Handle feedback
    const [userFeedBack, setUserFeedBack] = React.useState("");
    const handleInputChange = (event) => {
        setUserFeedBack(event.target.value);
    };

    const handleFeedbackSubmit = (event) => {
        event.preventDefault();

        const url = "/api/feedback";
        const body = new FormData();

        body.append("feedback", userFeedBack);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                setUserFeedBack("");
            })
    };

    return (
        <>
            <Navbar userName={userName} />
            {activeWindow.type === "userInfo" && (
                <UserInfoFloating
                    closeWindow={closeFloatingWindow}
                    userName={activeWindow.targetObject}
                />
            )}

            {activeWindow.type === "create" && collectableCategory !== null && (
                <CreateCollectableFloating
                    nameList={collectableCategory}
                    closeWindow={closeFloatingWindow}
                    onCreateSuccess={handleCreateSuccess}
                />
            )}

            {activeWindow.type === "edit" && (
                <EditCollectableFloating
                    closeWindow={closeFloatingWindow}
                    exchange={activeWindow.targetObject}
                />
            )}
            <div className="post-container">
                <h2>POST</h2>
                <p className="post-message">
                    {post ? post.message : "No post now"}
                </p>
                <p className="post-footer">
                    {post &&
                        `From ${post.creater} at ${new Date(post.updateDate)
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:${new Date(post.updateDate)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")} ${new Date(
                            post.updateDate
                        ).getDate()}/${(
                            new Date(post.updateDate).getMonth() + 1
                        )
                            .toString()
                            .padStart(2, "0")}/${new Date(
                            post.updateDate
                        ).getFullYear()}`}
                </p>
            </div>
            {isAdShow && (
                <div className="ad-container">
                    <img
                        src="http://localhost:8080/images/ad.png"
                        alt="ad"
                    ></img>
                    <button onClick={closeAd}>Close Ad</button>
                </div>
            )}
            <div className="feedback-container">
                <h3>Feedback to us</h3>
                <form onSubmit={handleFeedbackSubmit}>
                    <textarea
                        name="feedback"
                        value={userFeedBack}
                        onChange={handleInputChange}
                        placeholder="Enter your feedback here..."
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <section className="body-container">
                <nav className="nav-in-home-page">
                    <button
                        className="nav-in-home-page-btn"
                        onClick={handlePlazaClick}
                        style={{
                            backgroundColor:
                                currentSection === "plaza"
                                    ? "#333"
                                    : "white",
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
                                    : "lightgray",
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
                                <div className="search-name-wrapper">
                                    <label className="search-name-label">
                                        Search by owner name:
                                        <input
                                            type="text"
                                            placeholder="Owner Name"
                                            value={ownerSearchName}
                                            onChange={(e) =>
                                                setOwnerSearchName(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                </div>

                                <button
                                    className="search-btn"
                                    onClick={() =>
                                        handleSearchNameInput(ownerSearchName)
                                    }
                                >
                                    Search
                                </button>
                            </div>
                            {collectableCategory !== null ? (
                                <div className="search-card">
                                    <div className="search-name-wrapper">
                                        <div className="search-wrapper">
                                            <label htmlFor="collectableSet">
                                                Select Collectable Set:
                                                <select
                                                    name="collectableSet"
                                                    onChange={(e) =>
                                                        setCollectableSearchSet(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={collectableSearchSet}
                                                    required
                                                >
                                                    <option value="">
                                                        Select a set
                                                    </option>
                                                    {Object.keys(
                                                        collectableCategory
                                                    ).map((set) => (
                                                        <option key={set}>
                                                            {set}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                        <div className="search-wrapper">
                                            <label htmlFor="collectableName">
                                                Select Collectable Name:
                                                {collectableSearchSet !== "" ? (
                                                    <select
                                                        name="collectableName"
                                                        onChange={(e) =>
                                                            setCollectableSearchName(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={
                                                            collectableSearchName
                                                        }
                                                    >
                                                        <option value="">
                                                            Select a name
                                                        </option>
                                                        {collectableCategory[
                                                            collectableSearchSet
                                                        ].map((name) => (
                                                            <option key={name}>
                                                                {name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <select disabled>
                                                        <option value="Select a name">
                                                            Select a name
                                                        </option>
                                                    </select>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        className="search-btn"
                                        onClick={() =>
                                            handleSearchCardInput(
                                                collectableSearchSet,
                                                collectableSearchName
                                            )
                                        }
                                    >
                                        Search
                                    </button>
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                        <h3>Avaliable Exchanges</h3>
                        <div
                            className="card-container"
                            id="exchange-card-container"
                            ref={cardContainerRef}
                        >
                            {exchangeList !== null &&
                            exchangeList.length > 0 ? (
                                exchangeList.map((exchange) => (
                                    <ExchangeCard
                                        key={exchange.exchangeId}
                                        exchange={exchange}
                                        onUserInfoClick={handleUserInfoClick}
                                        onSendRequestClick={
                                            handleSendRequestClick
                                        }
                                    />
                                ))
                            ) : exchangeList !== null ? (
                                <div className="empty-list">
                                    The list is empty.
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                        <div className="page-bar">
                            <button
                                className="change-page-btn"
                                onClick={prePage}
                            >
                                Previous Page
                            </button>
                            Current Page: {page}
                            <button
                                className="change-page-btn"
                                onClick={nextPage}
                            >
                                Next Page
                            </button>
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
                            {myList !== null && myList.length > 0 ? (
                                myList.map((exchange) => (
                                    <MyCollectableCard
                                        key={exchange.exchangeId}
                                        exchange={exchange}
                                        onEditClick={handleEditClick}
                                        onToggleClick={handleToggleClick}
                                    />
                                ))
                            ) : myList !== null ? (
                                <p className="empty-list">The list is empty.</p>
                            ) : (
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
