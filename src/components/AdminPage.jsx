import "../css/AdminPage.scss";
import MANavbar from "./small_components/MANavbar";
import CreateManagerButton from "./small_components/CreateManagerButton";
import ManageUserButton from "./small_components/ManageUserButton";
import DeleteCampaignButton from "./small_components/DeleteCampaignButton";
import ManageCampaignPriorityButton from "./small_components/ManageCampaignPriorityButton";
import React from "react";


/** All functions that only Admin can use
 */
function AdminPage() {
    return (
        <>
            <MANavbar />
            <section className="body-container">
                <section className="button-container">
                    <div className="btn-and-description">
                        <h2>Create a new Manager account</h2>
                        <CreateManagerButton />
                    </div>
                    <div className="btn-and-description">
                        <h2>Authorise user or manager</h2>
                        <ManageUserButton />
                    </div>
                    <div className="btn-and-description">
                        <h2>Delete one campaign from its set</h2>
                        <DeleteCampaignButton />
                    </div>
                    <div className="btn-and-description">
                        <h2>Manage priority in display</h2>
                        <ManageCampaignPriorityButton />
                    </div>
                </section>
            </section>
        </>
    );
}

export default AdminPage;
