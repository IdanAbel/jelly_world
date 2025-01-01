import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface FormContainerProps {
    children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
    return (
        <Box className="container">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {children}
            </Box>
        </Box>
    );
};

export default FormContainer;
