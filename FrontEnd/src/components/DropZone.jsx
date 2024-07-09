import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Divider, Grid, CircularProgress } from "@mui/material";
import { H5, Small } from "./Typography";
import { storage } from "../firebase/firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

const DropZone = ({
    imgUrl,
    setImgUrl,
    onChange,
    title = "Drag & drop product image here",
    imageSize = "Upload 280*280 image",
}) => {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(
        async (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                try {
                    const file = acceptedFiles[0];
                    const storageRef = ref(storage, `images/${file.name}`);
                    setLoading(true);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);
                    setImgUrl(url);
                    onChange(url);
                } catch (error) {
                    console.error("Error uploading file: ", error);
                } finally {
                    setLoading(false);
                }
            }
        },
        [onChange, setImgUrl]
    );

    const handleDelete = async () => {
        if (!imgUrl) return;

        // Extract the file name from the URL
        const fileName = decodeURIComponent(
            imgUrl.split("/o/")[1].split("?")[0]
        );
        const storageRef = ref(storage, fileName);
        setLoading(true);
        try {
            await deleteObject(storageRef);
            setImgUrl(null);
            onChange(null);
        } catch (error) {
            console.error("Error deleting file: ", error);
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        multiple: false,
        accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
    });

    return (
        <Box>
            <Box
                py={4}
                px={{ md: 10, xs: 4 }}
                display="flex"
                minHeight="200px"
                alignItems="center"
                borderRadius="10px"
                border="1.5px dashed"
                flexDirection="column"
                borderColor="grey.300"
                justifyContent="center"
                textAlign="center"
                bgcolor={isDragActive ? "grey.200" : "grey.100"}
                sx={{ transition: "all 250ms ease-in-out", outline: "none" }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <H5 mb={1} color="grey.600">
                    {title}
                </H5>
                <Divider
                    sx={{
                        "::before, ::after": {
                            borderColor: "grey.300",
                            width: 70,
                        },
                    }}
                >
                    <Small color="text.disabled" px={1}>
                        OR
                    </Small>
                </Divider>
                <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    sx={{ px: 4, my: 4 }}
                >
                    Select files
                </Button>
                <Small color="grey.600">{imageSize}</Small>
            </Box>
            {loading && <CircularProgress />}
            {imgUrl && (
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <img
                            src={imgUrl}
                            alt="Uploaded"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10px",
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default DropZone;
