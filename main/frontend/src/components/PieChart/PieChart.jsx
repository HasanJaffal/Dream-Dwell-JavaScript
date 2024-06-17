/* eslint-disable react/prop-types */
import './PieChart.css';

const PieChart = ({ data }) => {
    const total = data.reduce((acc, value) => acc + value.value, 0);

    let startAngle = 0;

    return (
        <div className="pie-chart-container">
        <svg viewBox="0 0 100 100" className="pie-chart">
            {data.map((slice, index) => {
            const percentage = (slice.value / total) * 100;
            const angle = (percentage * 360) / 100;

            const largeArcFlag = angle > 180 ? 1 : 0;

            const endAngle = startAngle + angle;

            const pathData = `
                M 50 50
                L ${50 + 50 * Math.cos((startAngle * Math.PI) / 180)} ${50 + 50 * Math.sin((startAngle * Math.PI) / 180)}
                A 50 50 0 ${largeArcFlag} 1 ${50 + 50 * Math.cos((endAngle * Math.PI) / 180)} ${50 + 50 * Math.sin((endAngle * Math.PI) / 180)}
                Z
            `;

            startAngle += angle;

            return <path key={index} d={pathData} fill={slice.color} />;
            })}
        </svg>
        </div>
    );
};

export default PieChart;
