import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Paper, Typography, Box, Button } from "@mui/material";
import Loader from "./Loader";
import { RootState } from "../store";
import Message from "./Message";
import { deleteCandy } from "../Services/candyServices";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  close: () => void;
  candyId: string; 
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  close,
  candyId,
}) => {
  const dispatch = useDispatch();

  const candyDelete = useSelector((state: RootState) => state.candyDelete);
  const { loading: loadingDelete, error: errorDelete } = candyDelete;

  const handleClick = () => {
    dispatch(deleteCandy(candyId) as any);
    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6">
          Are you sure that you want to delete the Candy?
        </Typography>
        <Box>
          <Button onClick={handleClick}>Yes</Button>
          <Button onClick={handleCancel}>No</Button>
        </Box>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      </Paper>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
