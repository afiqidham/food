import React from 'react';
import { Card, CardActionArea, CardMedia, CardActions, CardContent, Button, Grid } from '@mui/material';
import classes from '../Meals/MealItem/MealItem.module.css';

const MealsItem = ({ id, name, description, price, image, onDeleteMeal }) => {
  const deleteMealHandler = () => {
    // Confirm deletion with the user (you may want to use a modal or window.confirm)
    const userConfirmed = window.confirm('Are you sure you want to delete this meal?');

    if (userConfirmed) {
      // Call the onDeleteMeal prop to delete the specific meal
      onDeleteMeal(id);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ margin: '8px' }}>
      <Card className={classes.squareMeal}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="200"
            image={image}
          />
        </CardActionArea>
        <CardContent className={classes.cardContent}>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>RM{price.toFixed(2)}</p>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            onClick={deleteMealHandler}
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.deleteMealButton}
          >
            Delete Meal
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MealsItem;
