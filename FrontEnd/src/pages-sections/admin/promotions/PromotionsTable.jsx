import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import PromotionRow from "./PromotionsRow";

const PromotionsTable = () => {
    const [promotions, setPromotions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get(
                    `https://four-gems-api-c21adc436e90.herokuapp.com/promotions?startDate=01/12/2022&endDate=01/12/2024&description=Promotion%20For&page=${page}&size=${rowsPerPage}&discount&sort=discount&sortType=DESC`
                );
                if (response.data.length < rowsPerPage) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setPromotions(response.data);
            } catch (error) {
                console.error("Failed to fetch promotions:", error);
                setHasMore(false);
            }
        };
        fetchPromotions();
    }, [page, rowsPerPage]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(0, prevPage - 1));
    };

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Promotion ID</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promotions.map((promotion) => (
                            <PromotionRow key={promotion.promotionId} promotion={promotion} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                <Button onClick={handlePreviousPage} disabled={page === 0}>
                    Previous
                </Button>
                <span>Page {page + 1}</span>
                <Button onClick={handleNextPage} disabled={!hasMore}>
                    Next
                </Button>
            </div>
        </Paper>
    );
};

export default PromotionsTable;