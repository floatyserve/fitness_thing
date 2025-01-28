import ReactApexChart from "react-apexcharts";

const LineChart = ({ data, dates, name, min, max, colors }) => {

    const options = {
        chart: {
            type: "area",
            stacked: false,
            height: 350,
            zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
            },
            toolbar: {
                autoSelected: "zoom",
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        title: {
            text: name,
            align: "left",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        colors: [colors],
        yaxis: {
            min: min,
            max: max,
            labels: {
                formatter: (val) => (val).toFixed(0),
            },
            title: {
                text: name,
            },
        },
        xaxis: {
            type: "datetime",
            categories: dates,
        },
        tooltip: {
            shared: false,
            y: {
                formatter: (val) => (val).toFixed(0),
            },
        },
    };

    const series = [
        {
            name: name,
            data: data,
        },
    ];

    return (
        <div id="chart" style={{ width: '80%', margin: '0 auto' }}>
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default LineChart;
