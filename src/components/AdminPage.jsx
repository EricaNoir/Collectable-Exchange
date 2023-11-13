import '../css/AdminPage.scss'

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
    return <></>;
}

export default AdminPage;
