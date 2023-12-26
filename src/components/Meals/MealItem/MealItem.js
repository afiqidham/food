import React, { useContext } from 'react';
import { Card, CardActionArea, CardMedia, CardActions, CardContent, Button, Grid } from '@mui/material';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';

const MealItem = ({ id, name, description, price, image }) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: 1,
    });
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
            onClick={addToCartHandler}
            variant="contained"
            color="primary"
            size="small"
            className={classes.addToCartButton}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MealItem;
