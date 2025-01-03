import { Typography, Box } from '@mui/material';
import JellyList from "./components/JellyList.tsx";

interface HomeProps {
    userInfo: { id: string | null } | null;
}

const Home: React.FC<HomeProps> = ({ userInfo }) => {

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Jelly World
            </Typography>
            <JellyList userInfo={userInfo} />
        </Box>
    );
};

export default Home;