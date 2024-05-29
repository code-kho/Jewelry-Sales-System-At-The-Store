import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoldPriceTable = (props) => {
    const {setGoldType, goldType} = props
    const [goldPrice, setGoldPrice] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
                    headers: {
                        'x-access-token': 'goldapi-1g1hjslw9du1eh-io', // Thay thế bằng API key thực tế của bạn
                    },
                });
                console.log(response.data); // Ghi log dữ liệu phản hồi vào console
                if (response.data && response.data.price) { // Kiểm tra nếu có thuộc tính 'price'
                    setGoldType(response.data);
                    setGoldPrice(response.data.currency);
                } else {
                    setError('Không thể lấy giá vàng.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy giá vàng:', error);
                setError('Lỗi khi lấy giá vàng.');
            }
        };

        fetchGoldPrice();
    }, []);

    return (
        <div>
            {/*<h2>Giá vàng theo thời gian thực</h2>*/}
            {/*/!*conditional rendering*!/*/}
            {/*{goldType ? ( // Hiển thị giá nếu có*/}
            {/*    <p>Giá: ${goldType.price}</p>*/}
            {/*) : (*/}
            {/*    <p>{error || 'Đang tải...'}</p> // Hiển thị lỗi hoặc thông báo đang tải*/}
            {/*)}*/}
        </div>
    );
};

export default GoldPriceTable;
