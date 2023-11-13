import MANavbar from "./small_components/MANavbar";
import Analytics from "./small_components/Analytics";
import EditAdImgButton from "./small_components/EditAdImgButton";
import EditPostButton from "./small_components/EditPostButton";
import "../css/MAHomePage.scss";

// CAMPAIGN_MANAGER and ADMIN contain the components below
import CampaignManage from "./small_components/CampaignManage";
import React from "react";

function MAHomePage() {
    // User info
    const [userRole, setUserRole] = React.useState("");

    React.useEffect(() => {
        fetch("/api/myProfile")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setUserRole(data.userRole);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);

    return (
        <>
            <MANavbar userRole={userRole} />
            <Analytics />
            <EditAdImgButton />
            <EditPostButton />
            {(userRole.includes("CAMPAIGN_MANAGER") ||
                userRole.includes("ADMIN")) && <CampaignManage />}
        </>
    );
}

export default MAHomePage;
