import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface MessageProps {
  variant?: string;
  children: ReactNode;
}

const Message: React.FC<MessageProps> = ({
  variant = "alert-info",
  children,
}) => {
  const alertClass = `alert ${variant}`;

  return <Box className={alertClass}>{children}</Box>;
};

export default Message;
