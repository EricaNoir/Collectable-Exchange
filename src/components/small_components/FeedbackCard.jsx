// feedback card, {username: "", feedback: "", updateDate: ""}
// Have a checkbox
// POST id
// /api/manage/feedback/check?id={}

function FeedbackCard({ feedback, onReadClick }) {
    return (
        <div className="feedback-card">
            <h3>From {feedback.username}:</h3>
            <p>{feedback.feedback}</p>
            <h3>
                {new Date(feedback.updateDate)
                    .getHours()
                    .toString()
                    .padStart(2, "0")}
                :
                {new Date(feedback.updateDate)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}{" "}
                {new Date(feedback.updateDate).getDate()}/
                {(new Date(feedback.updateDate).getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}
                /{new Date(feedback.updateDate).getFullYear()}
            </h3>
            <button onClick={() => onReadClick(feedback.id)}>
                Mark as read
            </button>
        </div>
    );
}

export default FeedbackCard;
