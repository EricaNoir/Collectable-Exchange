// 统计图表
// 30天内用户交易量排行前十的用户名及交易数量（排行榜
// 30天内总交易数量
// 30天内每个set的总交易量（柱状图
// 现有set的exchange数量（柱状图

import React from "react";

function Analytics() {
    const [analytics, setAnalytics] = React.useState(null);
    React.useEffect(() => {
        fetch("/manage/managerAuthority")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setAnalytics(data);
            })
    }, []);
    
    return ( <>
    </> );
}

export default Analytics;
