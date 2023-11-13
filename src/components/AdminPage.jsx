import '../css/AdminPage.scss'
import MANavbar from "./small_components/MANavbar";
import CreateManagerButton from './small_components/CreateManagerButton';
import ManageUserButton from './small_components/ManageUserButton';
import DeleteCampaignButton from './small_components/DeleteCampaignButton';
import ManageCampaignPriorityButton from './small_components/ManageCampaignPriorityButton';
import React from 'react';
/** All functions that only Admin can use
*/
function AdminPage() {

    return (<>
        <MANavbar />
        <section className="body-container">
            <CreateManagerButton />
            <ManageUserButton />
            <DeleteCampaignButton />
            <ManageCampaignPriorityButton />
        </section>
    </>);

}

export default AdminPage;
