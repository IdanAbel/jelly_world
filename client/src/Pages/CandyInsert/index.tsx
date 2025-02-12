import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Chip,
} from "@mui/material";

import {
  createCandy,
  listExampleCandies,
} from "../../Services/candyServices.ts";
import { RootState } from "../../store.ts";
import { Candy } from '../../Util/types.ts';
import CandyTypeSelect from '../../Components/CandyGenersSelect.tsx';
import ImageInput from '../../Components/ImageInput.tsx';
import Loader from '../../Components/Loader.tsx';
import React from 'react';
import { useAuth } from "../../Context/AuthContext.tsx";
import { CANDY_CREATE_RESET } from "../../Constants/candyConstants.ts";
import Message from "../../Components/Message.tsx";

const CandyInsert = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticatedWithGoogle } = useAuth();

  const { loading, candies, error } = useSelector(
    (state: RootState) => state.candyExampleList
  );

  const [inputs, setInputs] = useState<Partial<Candy>>({
    flavorName: '',
    description: '',
    groupName: [],
    glutenFree: false,
    sugarFree: false,
    seasonal: false,
    kosher: false,
    rating: 0,
    reviewsAmount: 0,
    createdBy: '',
    backgroundColor: '',
    image: undefined,
  });

  const candyCreate = useSelector((state: any) => state.candyCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    candy: createdCandy,
  } = candyCreate;

  useEffect(() => {
    dispatch(listExampleCandies() as any);
  }, [dispatch]);

  const {
    flavorName,
    description,
    groupName,
    glutenFree,
    sugarFree,
    seasonal,
    kosher,
  } = inputs;

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
    dispatch(createCandy(inputs as any, isAuthenticatedWithGoogle) as any); //TODO: IMPLEMENT TRUE
  };

  useEffect(() => {
    dispatch({ type: CANDY_CREATE_RESET });
    if (successCreate) navigate("/");
  }, [dispatch, navigate, successCreate, createdCandy]);

  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
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
            Add Candy Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Flavor Name"
                value={flavorName}
                onChange={(event: any) => onChange(event, "flavorName")}
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    "& input": { textAlign: "right" },
                  },
                }}
              />
            </Grid>
            {loading ? (
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Loading Flavor Example ....
              </Container>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <>
                <Container>
                  <Typography>Flavor Example</Typography>
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "2px",
                    }}
                  >
                    {candies && candies?.length > 0 ? (
                      candies.map((candy) => (
                        <Chip label={candy.flavorName} variant="outlined" />
                      ))
                    ) : (
                      <Typography>No candies found</Typography>
                    )}
                  </Container>
                </Container>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(event: any) => onChange(event, "description")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <CandyTypeSelect
                value={groupName}
                onChange={(event) =>
                  setInputs({ ...inputs, groupName: [event.target.value] })
                }
              />
            </Grid>

            {/* Boolean Toggles */}
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={glutenFree}
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
                    checked={sugarFree}
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
                    checked={seasonal}
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
                    checked={kosher}
                    onChange={(event) =>
                      setInputs({ ...inputs, kosher: event.target.checked })
                    }
                  />
                }
                label="Kosher"
              />
            </Grid>
            <Grid item xs={12}>
              <ImageInput onChange={handleImageChange} label="Upload Candy Image"/>
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
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      </Container>
    </Box>
  );
};

export default CandyInsert;
