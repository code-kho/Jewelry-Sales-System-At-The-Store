import dynamic from "next/dynamic";
import {Box, Grid, useTheme} from "@mui/material";
import Card2 from "./Card2";
import * as options from "./chartsOptions";
import {currency} from "lib";
import {useGetDate, useLast7Days} from "../../hooks/useGetDate";
import {useEffect, useState} from "react";
import axios from "axios"; // apext chart instance

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const Section3 = () => {
    const theme = useTheme(); // weekly chart series
    const {startDate7, endDate7} = useLast7Days();
    const [total7, setTotal7] = useState();
    const [each7Day, setEach7Day,] = useState();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData7 = async () => {
            try {
                //http://localhost:8080/order/get-money-by-date?countId=1&startDate=2021-05-29&endDate=2024-05-29
                const resTotal7 = await axios.get(`https://four-gems-api-c21adc436e90.herokuapp.com/order/get-money-by-date?countId=1&startDate=${startDate7}&endDate=${endDate7}`, {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                });
                //console.log(resTotal7.data)
                setTotal7(resTotal7.data.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchData7();
    }, []);
    useEffect(() => {
        const fetchDataEach7 = async () => {
            try {
                //http://localhost:8080/order/get-money-by-date?countId=1&startDate=2021-05-29&endDate=2024-05-29
                const resEach7 = await axios.get(`https://four-gems-api-c21adc436e90.herokuapp.com/order/get-money-each-day?countId=1&startDate=${startDate7}&endDate=${endDate7}`, {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                });
                const apiData = resEach7.data.data;
                const dataArray = Object.values(apiData);
                //console.log(dataArray); // Kiểm tra xem dữ liệu
                setEach7Day(dataArray); // Cập nhật state với dataArray
            } catch (e) {
                console.log(e)
            }
        }
        fetchDataEach7();
    }, []);
    const {startDate, endDate} = useLast7Days();
    const [order7, setOrder7] = useState(); //Orders Today
    const [orderEach7, setOrderEach7] = useState();
    let token = '';
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('token');
    } else if (typeof sessionStorage !== 'undefined') {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem('token');
    } else {
        // If neither localStorage nor sessionStorage is supported
        console.log('Web Storage is not supported in this environment.');
    }
    useEffect(() => {
        const fetchOrder7 = async () => {
            try {
                //http://localhost:8080/user/get-user-information?userId=4
                const resOrder7 = await axios.get(`https://four-gems-api-c21adc436e90.herokuapp.com/order/get-number-order-by-date?countId=1&startDate=${startDate7}&endDate=${endDate7}`, {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                });
                // console.log(resOrder7.data)
                setOrder7(resOrder7.data.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchOrder7();
    }, []);
    useEffect(() => {
        const fetchOrderEach7 = async () => {
            try {
                //http://localhost:8080/order/get-money-by-date?countId=1&startDate=2021-05-29&endDate=2024-05-29
                const resEach7 = await axios.get(`https://four-gems-api-c21adc436e90.herokuapp.com/order/get-money-each-day?countId=1&startDate=${startDate7}&endDate=${endDate7}`, {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                });
                const apiData = resEach7.data.data;
                const dataArray = Object.values(apiData);
                //console.log(dataArray); // Kiểm tra xem dữ liệu
                setEach7Day(dataArray); // Cập nhật state với dataArray
            } catch (e) {
                console.log(e)
            }
        }
        fetchOrderEach7();
    }, []);
    const [orderEachDay7, setOrderEachDay7,] = useState();
    useEffect(() => {
        const fetchEachDayOrder7 = async () => {
            try {
                //http://localhost:8080/user/get-user-information?userId=4
                const resEachDayOrder7 = await axios.get(`https://four-gems-api-c21adc436e90.herokuapp.com/order/get-total-order-each-day?countId=1&startDate=${startDate7}&endDate=${endDate7}`, {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                });
                const apiData = resEachDayOrder7.data.data;
                const dataArray = Object.values(apiData);
                // console.log(dataArray); // Kiểm tra xem dữ liệu
                setOrderEachDay7(dataArray); // Cập nhật state với dataArray
            } catch (e) {
                console.log(e)
            }
        }
        fetchEachDayOrder7();
    }, []);
    const series = [
        {
            name: "Weekly",
            data: each7Day,
        },
    ];
    const totalOrderseries1 = [
        {
            name: "Weekly",
            data: orderEachDay7,
        },
    ];
    return (
        <Box>
            <Grid container spacing={3}>

                {/* WEEKLY SALE CHART */}
                <Grid item xl={3} lg={6} md={6} xs={12}>
                    <Card2
                        title="Weekly Sales"
                        amount={currency(total7, 0)}
                    >
                        <ReactApexChart
                            type="bar"
                            height={100}
                            series={series}
                            options={options.weeklyChartOptions(theme)}
                        />
                    </Card2>
                </Grid>

                {/* TOTAL ORDERS CHART */}
                <Grid item xl={3} lg={6} md={6} xs={12}>
                    <Card2
                        title="Total Orders of the Week"
                        // percentage="2.65%"
                        amount={order7}
                    >
                        <ReactApexChart
                            type="bar"
                            height={100}
                            series={totalOrderseries1}
                            options={options.weeklyChartOptionsOne(theme)}
                        />
                    </Card2>
                </Grid>

                {/* MARKET SHARE CHART */}
                {/*<Grid item xl={3} lg={3} md={6} xs={12}>*/}
                {/*  <Card2*/}
                {/*    title="Market Share"*/}
                {/*    percentage="2.65%"*/}
                {/*    amount={currency(14260, 0)}*/}
                {/*  >*/}
                {/*    <ReactApexChart*/}
                {/*      height={130}*/}
                {/*      type="radialBar"*/}
                {/*      series={[44, 55, 67]}*/}
                {/*      options={options.marketShareChartOptions(theme)}*/}
                {/*    />*/}
                {/*  </Card2>*/}
                {/*</Grid>*/}
            </Grid>
        </Box>
    );
};

export default Section3;