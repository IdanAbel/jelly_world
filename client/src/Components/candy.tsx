import React, {useEffect, useState} from "react";
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
  TextField,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {createCandyReview, likeCandy, unlikeCandy} from "../Services/candyServices";
import CandyEdit from "../Pages/CandyEdit";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useAuth } from "../Context/AuthContext";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const Candy: React.FC<{ candy: any }> = ({ candy }) => {
  const { isAuthenticatedWithGoogle } = useAuth();
  const [reviews, setReviews] = useState(candy.reviews || []);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState<string[]>(candy.likes || []);
  const [isLiked, setIsLiked] = useState<boolean>(candy.likes.includes(userInfo?.id));

  useEffect(() => {
    setIsLiked(likes.includes(userInfo?.id));
  }, [likes, userInfo]);

  const handleAddReview = () => {
    if (rating && comment.trim()) {
      const newReview = { rating, comment };
      dispatch(
        createCandyReview(candy._id as any, newReview as any, isAuthenticatedWithGoogle) as any
      );
      setReviews((prev) => [...prev, newReview]);
      setRating(null);
      setComment("");
    }
  };

  const handleLike = async () => {
    if (!userInfo) return;

    try {
      if (isLiked) {
        await dispatch(unlikeCandy(candy._id));
        setLikes((prev) => prev.filter((id) => id !== userInfo.id));
      } else {
        await dispatch(likeCandy(candy._id));
        setLikes((prev) => [...prev, userInfo.id]);
      }
    } catch (error) {
    }
  };
  const handleToggleEditDialog = () => {
    setIsEditDialogOpen((state) => !state);
  };

  const handleToggleDeleteDialog = () => {
    setIsDeleteDialogOpen((state) => !state);
  };

  const isCreatedByUser = userInfo && candy?.createdBy === userInfo.id;

  return (
    <>
      {isCreatedByUser && isDeleteDialogOpen && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          close={handleToggleDeleteDialog}
          candyId={candy._id}
        ></DeleteConfirmationDialog>
      )}
      {isCreatedByUser && isEditDialogOpen && (
        <CandyEdit
          isOpen={isEditDialogOpen}
          close={handleToggleEditDialog}
          candy={candy}
        ></CandyEdit>
      )}
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
              <Rating
                value={candy.rating}
                readOnly
                precision={0.5}
                size="medium"
              />
              <Typography variant="body2" color="text.secondary">
                ({candy.reviewsAmount} reviews)
              </Typography>
            </Stack>
          </Box>

          {userInfo && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Add a Review
              </Typography>
              <Stack spacing={2}>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  max={10}
                />
                <TextField
                  label="Comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddReview}
                  disabled={!rating || !comment.trim()}
                >
                  Submit Review
                </Button>
                <Button
                    variant="contained"
                    color={isLiked ? "secondary" : "primary"}
                    onClick={handleLike}
                    startIcon={<ThumbUpIcon />}
                >
                  {isLiked ? "Unlike" : "Like"} ({likes.length})
                </Button>
              </Stack>
            </Box>
          )}
          {isCreatedByUser && (
            <>
              <IconButton onClick={handleToggleEditDialog}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleToggleDeleteDialog}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
          <Box mt={4}>
            <Button
              variant="text"
              color="primary"
              onClick={() => setShowReviews((prev) => !prev)}
            >
              {showReviews ? "Hide Reviews" : "Show  All Reviews"}
            </Button>
            <Collapse in={showReviews}>
              <List>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <ListItem key={index}>
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
            </Collapse>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Candy;
