import React, { useEffect, useState } from 'react'
import "jquery-ui-dist/jquery-ui"
import ApexCharts from "apexcharts";
import { DropdownSelect } from '../dropdown/DropdownSelect';
import MonthSelect from '../dropdown/MonthSelect';
import DataTable from 'react-data-table-component';


export const Card1 = ({ ...props }) => {
    const [chartData, setChartData] = useState([
        { x: 'Inpipeline', y: 400 },
        { x: 'Follow Up', y: 30 },
        { x: 'Schedule', y: 248 },
        { x: 'Conversation', y: 470 },
        { x: 'Won', y: 470 },
        { x: 'Lost', y: 180 }
    ]);

    const onMonthChange = (selectedMonth) => {
        let filteredData = [];
        switch (selectedMonth) {
            case 'Last 6 months':
                filteredData = [
                    { x: 'Inpipeline', y: 300 },
                    { x: 'Follow Up', y: 400 },
                    { x: 'Schedule', y: 200 },
                    { x: 'Conversation', y: 40 },
                    { x: 'Won', y: 400 },
                    { x: 'Lost', y: 150 }
                ];
                break;
            case 'Last 12 months':
                filteredData = [
                    { x: 'Inpipeline', y: 300 },
                    { x: 'Follow Up', y: 300 },
                    { x: 'Schedule', y: 200 },
                    { x: 'Conversation', y: 40 },
                    { x: 'Won', y: 400 },
                    { x: 'Lost', y: 150 }
                ];
                break;
            default:

                filteredData = [
                    { x: 'Inpipeline', y: 400 },
                    { x: 'Follow Up', y: 30 },
                    { x: 'Schedule', y: 248 },
                    { x: 'Conversation', y: 70 },
                    { x: 'Won', y: 470 },
                    { x: 'Lost', y: 180 }
                ];
                break;
        }
        setChartData(filteredData);
    };

    const [chartOptions, setChartOptions] = useState({
        series: [{
            name: "sales",
            data: chartData
        }],
        chart: { type: 'bar', height: 250 },
        colors: ['#FFC38F'],
        xaxis: { type: 'category', group: { style: { fontSize: '7px', fontWeight: 700 } } },
    });

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector("#deals-chart"), {
            ...chartOptions,
            series: [{ name: "sales", data: chartData }]
        });
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [chartData, chartOptions]);

    return (
        <div className={`col-md-6`}>
            <div className={`card`}>
                <div className="card-body">
                    <div className="statistic-header">
                        <h4>Deals By Stage</h4>
                        <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                                <DropdownSelect onMonthChange={onMonthChange} {...props} />
                            </div>
                        </div>
                    </div>
                    <div id="deals-chart"></div>
                </div>
            </div>
        </div>
    );
};

export const Card3 = () => {
    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                data: [400, 220, 448]
            }
        ],
        chart: {
            type: 'bar',
            height: 150
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        borderRadius: 50,
        colors: ['#fa8297'],
        xaxis: {
            categories: ['Conversation', 'Follow Up', 'Inpipeline']
        }
    });

    const onMonthChange = (selectedMonth) => {
        let newData = [400, 220, 448];
        switch (selectedMonth) {
            case 'Last 3 months':
                newData = [200, 100, 300];
                break;
            case 'Last 6 months':
                newData = [150, 250, 400];
                break;
            case 'Last 12 months':
                newData = [100, 300, 500];
                break;
            default:
                newData = [400, 220, 448];
        }

        setChartOptions({
            ...chartOptions,
            series: [{ data: newData }]
        });
    };

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector("#last-chart"), chartOptions);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [chartOptions]);

    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <div className="statistic-header">
                        <h4>Lost Deals Stage</h4>
                        <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                                <ul>
                                    <MonthSelect onMonthChange={onMonthChange} />
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="last-chart"></div>
                </div>
            </div>
        </div>
    );
};

export const Card2 = ({ ...props }) => {
    const [dealsData, setDealsData] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const initialData = [
        { dealName: 'Collins', stage: 'Conversation', dealValue: '$04,51,000', probability: '85%', status: 'Open' },
        { dealName: 'Konopelski', stage: 'Pipeline', dealValue: '$03,12,500', probability: '85%', status: 'Lost' },
        { dealName: 'Adams', stage: 'Won', dealValue: '$04,14,800', probability: '80%', status: 'Won' },
        { dealName: 'Schumm', stage: 'Lost', dealValue: '$9,14,400', probability: '47%', status: 'Lost' },
        { dealName: 'Wisozk', stage: 'Follow Up', dealValue: '$11,14,400', probability: '98%', status: 'Lost' }
    ];

    useEffect(() => {
        setDealsData(initialData);
    }, []);

    const columns = [
        {
            name: "Deal Name",
            selector: (row) => row.dealName,
            sortable: true,
        },
        {
            name: "Stage",
            selector: (row) => row.stage,
            sortable: true,
        },
        {
            name: "Deal Value",
            selector: (row) => row.dealValue,
            sortable: true,
        },
        {
            name: "Probability",
            selector: (row) => row.probability,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };

    const onMonthChange = (selectedMonth) => {

        console.log("Selected month:", selectedMonth);
    };

    return (
        <div className="col-md-6 d-flex">
            <div className="card analytics-card w-100">
                <div className="card-body">
                    <div className="statistic-header">
                        <h4>{props.name}<a href="#" className="text-muted">
                            {/* <i className="la la-link ms-1"></i>   */}
                        </a></h4>
                        <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                                <ul>
                                    {props.children}
                                    {/* <MonthSelect onMonthChange={onMonthChange} {...props} /> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <DataTable
                            subHeader={false}
                            persistTableHead
                            onColumnOrderChange
                            striped={true}
                            responsive={true}
                            pagination
                            paginationResetDefaultPage={resetPaginationToggle}
                            customStyles={customStyles}
                            data={props.Data}
                            columns={props.columns}
                            paginationRowsPerPageOptions={[25, 50, 100, 500]}
                            paginationPerPage={25}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Card4 = ({ ...props }) => {
    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                data: [400, 220, 448]
            }
        ],
        chart: {
            type: 'bar',
            height: 150
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        borderRadius: 50,
        colors: ['#8bde95'],
        xaxis: {
            categories: ['Conversation', 'Follow Up', 'Inpipeline']
        }
    });

    const onMonthChange = (selectedMonth) => {
        let newData = [400, 220, 448];
        switch (selectedMonth) {
            case 'Last 3 months':
                newData = [180, 340, 200];
                break;
            case 'Last 6 months':
                newData = [150, 250, 100];
                break;
            case 'Last 12 months':
                newData = [350, 220, 400];
                break;
            default:
                newData = [400, 220, 448];
        }

        setChartOptions({
            ...chartOptions,
            series: [{ data: newData }]
        });
    };

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector("#won-chart"), chartOptions);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [chartOptions]);

    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <div className="statistic-header">
                        <h4>Won Deals Stage</h4>
                        <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                                <ul>
                                    <DropdownSelect onMonthChange={onMonthChange} {...props} />
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="won-chart"></div>
                </div>
            </div>
        </div>
    );
};

export const Card5 = () => {

    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
            }
        ],
        chart: {
            type: 'line',
            height: 350
        },
        stroke: {
            curve: 'stepline'
        },
        dataLabels: {
            enabled: false
        },
        title: {
            align: 'left'
        },
        colors: ['#FF902F'],
        markers: {
            hover: {
                sizeOffset: 4
            }
        }
    });
    const onMonthChange = (selectedMonth) => {
        let newData = [];
        switch (selectedMonth) {
            case 'Last 6 months':
                newData = [30, 40, 50, 20, 10, 40, 30, 20, 40, 60, 50];
                break;
            case 'Last 6 months':
                newData = [30, 40, 50, 20, 10, 40, 30, 20, 60, 30, 50];
                break;

            default:
                newData = [34, 44, 54, 21, 12, 43, 33, 23, 66, 36, 58];
                break;
        }

        setChartOptions({
            ...chartOptions,
            series: [{ data: newData }]
        });
    };

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector("#year-chart"), chartOptions);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [chartOptions]);

    return (

        <div className="col-md-12">
            <div className="card mb-0">
                <div className="card-body">
                    <div className="statistic-header">
                        <h4>Deals by Year</h4>
                        <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                                <ul>
                                    <MonthSelect onMonthChange={onMonthChange} />
                                </ul>
                            </div>
                        </div>
                    </div>
                    chart
                    <div id="year-chart"></div>
                </div>
            </div>
        </div>
    )
}




