import { Avatar } from "@mui/material";
import { StyledTableRow, StyledTableCell } from "../StyledComponents";

export const ProductRowImport = ({ product }) => {
    const { productName, image, productId, quantityInCounter } = product;
    if (quantityInCounter && typeof quantityInCounter === "object") {
        Object.entries(quantityInCounter).forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
        });
    } else {
        console.error("quantityInCounter is undefined or null");
    }

    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    } else if (typeof sessionStorage !== "undefined") {
        token = sessionStorage.getItem("token");
    } else {
        console.log("Web Storage is not supported in this environment.");
    }

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left" sx={{ minWidth: 50 }}>
                {productId}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ minWidth: 60 }}>
                <Avatar
                    src={image}
                    alt={productName}
                    sx={{
                        borderRadius: "8px",
                        width: 100,
                        height: 100,
                    }}
                />
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ minWidth: 75 }}>
                {productName}
            </StyledTableCell>
            {quantityInCounter && typeof quantityInCounter === "object" ? (
                Object.keys(quantityInCounter).map((key) => (
                    <StyledTableCell
                        key={key}
                        align="left"
                        sx={{ minWidth: 25 }}
                    >
                        {quantityInCounter[key]}
                    </StyledTableCell>
                ))
            ) : (
                <StyledTableCell align="left" colSpan={3}>
                    <span>Quantity data not available</span>
                </StyledTableCell>
            )}
        </StyledTableRow>
    );
};
