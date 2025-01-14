import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Box,
  Grid,
  Rating,
} from "@mui/material";

const Candy: React.FC<{ candy: any }> = ({ candy }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "20px auto",
        borderRadius: 3,
        boxShadow: 5,
        backgroundColor: candy.backgroundColor || "#ffffff",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={candy.image}
        alt={candy.flavorName}
        sx={{ borderRadius: "8px 8px 0 0", objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {candy.flavorName}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {candy.description}
        </Typography>

        <Stack spacing={1}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Group:</strong> {candy.groupName.join(", ") || "N/A"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Ingredients:</strong>{" "}
              {candy.ingredients.length > 0
                ? candy.ingredients.join(", ")
                : "No ingredients listed"}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Chip
              label={`Gluten-Free: ${candy.glutenFree ? "Yes" : "No"}`}
              color={candy.glutenFree ? "success" : "default"}
              size="medium"
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              label={`Sugar-Free: ${candy.sugarFree ? "Yes" : "No"}`}
              color={candy.sugarFree ? "success" : "default"}
              size="medium"
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              label={`Seasonal: ${candy.seasonal ? "Yes" : "No"}`}
              color={candy.seasonal ? "info" : "default"}
              size="medium"
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              label={`Kosher: ${candy.kosher ? "Yes" : "No"}`}
              color={candy.kosher ? "info" : "default"}
              size="medium"
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant="body2" color="text.secondary">
            <strong>Rating:</strong>
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={candy.rating} readOnly precision={0.5} size="medium" />
            <Typography variant="body2" color="text.secondary">
              ({candy.reviewsAmount} reviews)
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Candy;
