import { Box, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    minWidth: 300,
    maxHeight: "90vh",
  };

export const ModalContainer = ({open, onClose, children}) => {

    return (
        <Modal open={open} onClose={onClose} disableScrollLock>
            <Box sx={style}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon/>
                </IconButton>
                {children}
            </Box>
        </Modal>
    )
}