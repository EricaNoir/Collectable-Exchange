import '../css/AdminPage.scss'
import MANavbar from "./small_components/MANavbar";
import CreateManagerButton from './small_components/CreateManagerButton';
import ManageUserButton from './small_components/ManageUserButton';
import React from 'react';
/** All functions that only Admin can use
（ADMIN才有）
创建新Manager账号的功能
只要账号密码
表单参考sign up，handle参考随便一个post
（ADMIN才有）
Search User
输入User名，根据userRole字段是否包含MANAGER显示不同的按钮
如果不包含，只有DELETE按钮，如果包含，有DELETE和授权，点开授权下拉菜单选择权限（MANAGER, CAMPAIGN_MANAGER）（POST 名字和权限）
DELETE（POST名字）
（ADMIN才有）
删除卡组
POST set name（下拉菜单）
前端要有确认页面（会删除所有相关的现有交易，保留交易记录）
（ADMIN才有）
编辑卡组优先级
下拉菜单选择set名
下拉菜单1-4（4最高）*/
function AdminPage() {

    // delete campaign

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
    const [deleteCampaign, setDeleteCampaign] = React.useState({
        collectableSet: "",
        collectableName: "",
    })
    const handleDeleteCampaignChange = (event) => {
        const { name, value } = event.target;
        setDeleteCampaign({
            ...deleteCampaign,
            [name]: value,
        });
    };
    const handleDeleteCampaignSubmit = () => {
        const result = window.confirm("Are you sure to delete this campaign? All related exchanges will be deleted.");
        if (result) {
            const url = "/api/manage/deleteCampaign"

            const body = new FormData();
            body.append("set", deleteCampaign.collectableSet);
            body.append("name", deleteCampaign.collectableName);

            fetch(url, {
                method: "POST",
                body: body,
            })
                .then((response) => response.text())
                .then((data) => {
                    alert(data);
                });
        }
    }

    // manage campaign priority
    const [setPriority, setSetPriority] = React.useState({
        set: "",
        priority: 1,
    });
    const handleSetPriorityChange = (event) => {
        const { name, value } = event.target;
        setSetPriority({
            ...setPriority,
            [name]: value,
        });
    };
    const handlePrioritySubmit = () => {
        const result = window.confirm("Are you sure to change the priority of this campaign?");
        if (result) {
            const url = "/api/manage/moderatePriority"

            const body = new FormData();
            body.append("set", setPriority.set);
            body.append("priority", setPriority.priority);

            fetch(url, {
                method: "POST",
                body: body,
            })
                .then((response) => response.text())
                .then((data) => {
                    alert(data);
                });
        }
    }

    return (<>
        <MANavbar />
        <section className="body-container">
            <CreateManagerButton />
            <ManageUserButton />
        </section>
    </>);

}

export default AdminPage;
