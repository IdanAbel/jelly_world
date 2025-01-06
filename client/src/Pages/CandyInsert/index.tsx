import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
    Switch,
    FormControlLabel,
} from "@mui/material";


import Message from '../../components/Message';
import { CANDY_CREATE_RESET } from '../../constants/candyConstants';
import { Candy } from '../../Util/types.ts';
import CandyTypeSelect from '../../Components/CandyGenersSelect.tsx';
import ImageInput from '../../Components/ImageInput.tsx';
import Loader from '../../Components/Loader.tsx';
import {createCandy} from "../../Services/candyServices.ts";
import React from 'react';

const CandyInsert = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const candyCreate = useSelector((state: any) => state.candyCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        candy: createdCandy,
    } = candyCreate;

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
        imageUrl: '',
    });

    const {
        flavorName,
        description,
        groupName,
        glutenFree,
        sugarFree,
        seasonal,
        kosher,
    } = inputs;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Candy) => {
        setInputs({ ...inputs, [fieldName]: event.target.value });
    };

    const handleImageChange = (image: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputs({ ...inputs, imageUrl: reader.result as string });
        };
        if (image) {
            reader.readAsDataURL(image);
        }
    };

    const handleSubmit = () => {
        dispatch(createCandy(inputs as any, true) as any); //TODO: IMPLEMENT TRUE
    };

    useEffect(() => {
        dispatch({ type: CANDY_CREATE_RESET });
        if (successCreate) navigate('/');
    }, [dispatch, navigate, successCreate, createdCandy]);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            <Paper
                elevation={3}
                sx={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <Typography variant="h5" sx={{ alignSelf: 'start', marginBottom: '10px' }}>
                    Add Candy Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Flavor Name"
                            value={flavorName}
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
                            value={description}
                            onChange={(event) => onChange(event, "description")}
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
                        <ImageInput onChange={handleImageChange} />
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
    );
};

export default CandyInsert;

