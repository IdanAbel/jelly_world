import {useState, useEffect, ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {TextField, Button, Paper, Grid, Typography, Dialog, Checkbox, FormControlLabel} from '@mui/material';
import {Candy} from "../../Util/types.ts";
import {RootState} from "../../store.ts";
import {updateCandy} from "../../Services/candyServices.ts";
import {CANDY_UPDATE_RESET} from "../../Constants/candyConstants.ts";
import {Message} from "@mui/icons-material";
import Loader from "../../Components/Loader.tsx";
import ImageInput from "../../Components/ImageInput.tsx";

interface CandyEditProps {
    isOpen?: boolean;
    candy?: Candy;
    close?: () => void;
    setCandyIdToUpdate?: () => void;
}

const CandyEdit: React.FC<CandyEditProps> = ({isOpen, candy, close, setCandyIdToUpdate}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const candyUpdate = useSelector((state: RootState) => state.candyUpdate);
    const {loading, error, success: successUpdate} = candyUpdate;

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const {userInfo} = userLogin;

    const [inputs, setInputs] = useState<Candy>({
        ...candy
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type, checked} = event.target;
        setInputs({...inputs, [name]: type === 'checkbox' ? checked : value});
    };

    const handleImageChange = (image: string) => {
        setInputs({...inputs, imageUrl: image});
    };

    const handleSubmit = () => {
        dispatch(updateCandy(inputs) as any);
        setCandyIdToUpdate();
        close();
    };

    useEffect(() => {
        if (!userInfo) navigate('/');

        dispatch({type: CANDY_UPDATE_RESET});
        if (successUpdate) navigate('/');
    }, [dispatch, userInfo, navigate, successUpdate]);

    return (
        isOpen && (
            <Dialog open={isOpen} onClose={close}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <Typography variant="h5" sx={{marginBottom: '10px'}}>
                        Edit Candy Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Flavor Name"
                                name="flavorName"
                                value={inputs.flavorName}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Color Group"
                                name="colorGroup"
                                value={inputs.colorGroup}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Background Color"
                                name="backgroundColor"
                                value={inputs.backgroundColor}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={inputs.description}
                                multiline
                                rows={4}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Ingredients"
                                name="ingredients"
                                value={inputs.ingredients.join(', ')}
                                onChange={(event) =>
                                    setInputs({
                                        ...inputs,
                                        ingredients: event.target.value.split(',').map((item) => item.trim())
                                    })
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="glutenFree"
                                        checked={inputs.glutenFree}
                                        onChange={handleChange}
                                    />
                                }
                                label="Gluten-Free"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="sugarFree"
                                        checked={inputs.sugarFree}
                                        onChange={handleChange}
                                    />
                                }
                                label="Sugar-Free"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="seasonal"
                                        checked={inputs.seasonal}
                                        onChange={handleChange}
                                    />
                                }
                                label="Seasonal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="kosher"
                                        checked={inputs.kosher}
                                        onChange={handleChange}
                                    />
                                }
                                label="Kosher"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageInput onChange={handleImageChange} initialImage={inputs.imageUrl}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                {loading && <Loader/>}
                {error && <Message variant="danger">{error}</Message>}
            </Dialog>
        )
    );
};

export default CandyEdit;
