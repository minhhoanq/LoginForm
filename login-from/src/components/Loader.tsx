import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Loader() {
    const loading = useSelector((state: RootState) => state.global.loading);

    return (
        <div>
            <Modal
                open={loading}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack
                    sx={{
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress color="primary" />
                </Stack>
            </Modal>
        </div>
    );
}
