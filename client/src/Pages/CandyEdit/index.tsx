import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Dialog,
  Checkbox,
  FormControlLabel,
  Container,
  Switch,
} from "@mui/material";
import { Candy } from "../../Util/types.ts";
import { RootState } from "../../store.ts";
import { updateCandy } from "../../Services/candyServices.ts";
import { CANDY_UPDATE_RESET } from "../../Constants/candyConstants.ts";
import { Message } from "@mui/icons-material";
import Loader from "../../Components/Loader.tsx";
import ImageInput from "../../Components/ImageInput.tsx";
import React from "react";
import CandyTypeSelect, { CandyTypeGroups } from "../../Components/CandyGenersSelect.tsx";

interface CandyEditProps {
  isOpen?: boolean;
  candy?: Candy;
  close?: () => void;
  setCandyIdToUpdate?: () => void;
}

const CandyEdit: React.FC<CandyEditProps> = ({
  isOpen,
  candy,
  close,
  setCandyIdToUpdate,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const candyUpdate = useSelector((state: RootState) => state.candyUpdate);
  const { loading, error, success: successUpdate } = candyUpdate;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const [inputs, setInputs] = useState<Candy>({
    ...candy,
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Candy
  ) => {
    setInputs({ ...inputs, [fieldName]: event.target.value });
  };


  const handleImageChange = (file: File | null) => {
    if (file) {
      setInputs({ ...inputs, image: file });
    }
  };

  const handleSubmit = () => {
    dispatch(updateCandy(inputs) as any);
    // setCandyIdToUpdate();
    // close();
  };

  useEffect(() => {
    if (!userInfo) navigate("/");

    dispatch({ type: CANDY_UPDATE_RESET });
    if (successUpdate) navigate("/");
  }, [dispatch, userInfo, navigate, successUpdate]);

  return (
    isOpen && (
      <Dialog open={isOpen} onClose={close}>
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ alignSelf: "start", marginBottom: "10px" }}
          >
            Edit Candy Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Flavor Name"
                value={inputs.flavorName}
                onChange={(event) => onChange(event, "flavorName")}
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    "& input": { textAlign: "right" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={inputs.description}
                onChange={(event) => onChange(event, "description")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <CandyTypeSelect
                value={inputs.groupName}
                onChange={(event) =>
                  setInputs({ ...inputs, groupName: [event.target.value] })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={inputs.glutenFree}
                    onChange={(event) =>
                      setInputs({ ...inputs, glutenFree: event.target.checked })
                    }
                  />
                }
                label="Gluten Free"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={inputs.sugarFree}
                    onChange={(event) =>
                      setInputs({ ...inputs, sugarFree: event.target.checked })
                    }
                  />
                }
                label="Sugar Free"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={inputs.seasonal}
                    onChange={(event) =>
                      setInputs({ ...inputs, seasonal: event.target.checked })
                    }
                  />
                }
                label="Seasonal"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={inputs.kosher}
                    onChange={(event) =>
                      setInputs({ ...inputs, kosher: event.target.checked })
                    }
                  />
                }
                label="Kosher"
              />
            </Grid>
            <Grid item xs={12}>
              <ImageInput
                onChange={handleImageChange}
                initialImage={inputs.image}
                label="Upload Candy Image"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#5d7afd",
                  color: "white",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#274bef",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
      </Dialog>
    )
  );
};

export default CandyEdit;
