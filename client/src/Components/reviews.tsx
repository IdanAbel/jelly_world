import React from "react";
import { List, ListItem, ListItemText, Typography, Container, Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";

const Reviews = () => {
    const location = useLocation();
    const reviews = location.state?.reviews || [];
  
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Candy Reviews
          </Typography>
          <List>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Rating: ${review.rating}/10`}
                    secondary={review.comment}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No reviews yet.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Reviews;
