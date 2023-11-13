import FeedbackCard from "./small_components/FeedbackCard";
import "../css/MAFeedbackPage.scss";
import MANavbar from "./small_components/MANavbar";
import React from "react";

// Every account type have this page
function MAFeedbackPage() {
    const [feedbacks, setFeedbacks] = React.useState(null);

    // load feedbacks
    React.useEffect(() => {
        fetch("/api/manage/feedback")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setFeedbacks(data);
            })
            .catch((error) => {
                console.error("Fetch feedback error:", error);
            });
    }, []);

    function handleReadClick(id) {
        fetch(`/api/manage/feedback/check?id=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                if (data === "Success.") {
                    setFeedbacks(
                        feedbacks.filter((feedback) => feedback.id !== id)
                    );
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }

    return (
        <>
            <MANavbar />

            <section className="body-container">
                <h1>User Feedback</h1>
                {feedbacks !== null && feedbacks.length > 0 ? (
                    <div className="feedback-card-container">
                        {feedbacks.map((feedback) => (
                            <FeedbackCard
                                key={feedback.id}
                                onReadClick={handleReadClick}
                                feedback={feedback}
                            />
                        ))}
                    </div>
                ) : feedbacks !== null ? (
                    <div>No feedback yet.</div>
                ) : (
                    <div>Loading...</div>
                )}
            </section>
        </>
    );
}

export default MAFeedbackPage;
