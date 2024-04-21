import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import React from "react";
import "./RejectModal.css";

type RejectModalProps = {
  showRejectModal: boolean;
  handleClose: () => void;
  handleReject: (id: number, msg: string) => void;
  id: number;
}

const RejectModal = ({showRejectModal, handleClose, handleReject, id}: RejectModalProps) => {

  const [rejectMessage, setRejectMessage] = React.useState<string>("");

  return (
    <Modal
      open={showRejectModal}
      onClose={handleClose}
      className={"RejectModal"}
    >
      <Box className={"RejectModal-container"}>
        <Typography variant={"h3"} align={"center"}
                    className={"RejectModal-title"}>Ingrese el motivo del
          rechazo</Typography>
        <TextField
          value={rejectMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRejectMessage(event.target.value);
          }}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
        <Box className={"RejectModal-button-container"}>
          <Button
            className={"RejectModal-button RejectModal-button-cancel"}
            onClick={() => handleClose()}>CANCELAR</Button>
          <Button
            className={"RejectModal-button RejectModal-button-send"}
            onClick={() => handleReject(id, rejectMessage)}>ENVIAR</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RejectModal;
