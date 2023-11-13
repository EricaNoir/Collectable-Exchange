import React from "react";
import Plot from "react-plotly.js";

function Analytics() {
    const [analytics, setAnalytics] = React.useState(null);
    React.useEffect(() => {
        fetch("/api/manage/analytics")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setAnalytics(data);
            });
    }, []);

    function createBarChart(data, title) {
        return (
            <Plot
                data={[
                    {
                        x: data.map((item) => item.collectableSet),
                        y: data.map((item) => item.count),
                        type: "bar",
                        marker: { color: "#2ca02c" },
                    },
                ]}
                layout={{
                    autosize: true,
                    title: {
                        text: title,
                        font: {
                            family: "Arial, sans-serif",
                            size: 24,
                            weight: "bold",
                        },
                    },
                    xaxis: {
                        title: {
                            text: "Collectable Set",
                            font: {
                                family: "Arial, sans-serif",
                                size: 18,
                                color: "#7f7f7f",
                            },
                        },
                        tickfont: {
                            family: "Arial, sans-serif",
                            size: 14,
                            color: "#7f7f7f",
                        },
                    },
                    yaxis: {
                        title: {
                            text: "Count",
                            font: {
                                family: "Arial, sans-serif",
                                size: 18,
                                color: "#7f7f7f",
                            },
                        },
                        tickfont: {
                            family: "Arial, sans-serif",
                            size: 14,
                            color: "#7f7f7f",
                        },
                    },
                }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
            />
        );
    }

    // Trader name and trade amout of top 10 trader in one month
    const traderRank = analytics && analytics.traderRank && (
        <section className="text-container">
            <h2>Top traders in 30 days:</h2>
            <ol>
                {analytics.traderRank.map((trader, index) => (
                    <li key={index}>
                        {index < 3 && (
                            <span className="top-trader-icon">🏆</span>
                        )}
                        <strong>{trader.trader}:</strong> {trader.tradeCount}{" "}
                        {trader.tradeCount > 1 ? "trades" : "trade"}
                    </li>
                ))}
            </ol>
        </section>
    );

    // Total trade amount in one month
    const tradeAmount = analytics && analytics.tradeAmount && (
        <section className="text-container">
            <h2>Total Trade Amount in 30 days:</h2>
            <h1>{analytics.tradeAmount}</h1>
        </section>
    );

    // Trade amount of each set in one month (bar chart)
    const setRank = analytics && analytics.setRank && (
        <section className="chart-container">
            {createBarChart(
                analytics.setRank,
                "Trade Amount of Each Set in 30 days:"
            )}
        </section>
    );

    // Current exchange in plaza of each set (bar chart)
    const exchangeRank = analytics && analytics.exchangeRank && (
        <section className="chart-container">
            {createBarChart(
                analytics.exchangeRank,
                "Current Exchange in Plaza of Each Set:"
            )}
        </section>
    );

    return (
        <section className="analytics-container">
            {analytics ? (
                <>
                    <h2 className="section-title">Analytics</h2>
                    <div>
                        {traderRank}
                        {tradeAmount}
                    </div>
                    <div>
                        {setRank}
                        {exchangeRank}
                    </div>
                </>
            ) : (
                <p>Loading analytics...</p>
            )}
        </section>
    );
}

export default Analytics;
