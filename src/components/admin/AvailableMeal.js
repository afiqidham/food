// AvailableMeals.js

import React, { useState, useEffect } from "react";
import classes from '../Meals/AvailableMeals.module.css';
import Card from "../UI/Card";
import AdminForm from "../admin/AdminForm";
import MealsItem from "./MealsItem";

const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the initial list of meals
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    setLoading(true);
    try {
      // Replace this with your local storage key
      const storedMeals = JSON.parse(localStorage.getItem("foodItems")) || [];
      setMeals(storedMeals);
      setError(null);
    } catch (error) {
      console.error("Error fetching meals from local storage", error);
      setError("Error fetching meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addNewMealHandler = (newMeal) => {
    try {
      // Save the new meal to local storage
      const updatedMeals = [...meals, newMeal];
      localStorage.setItem("meals", JSON.stringify(updatedMeals));

      // Update the state to re-render the component
      setMeals(updatedMeals);
      setError(null);
    } catch (error) {
      console.error("Error adding new meal to local storage", error);
      setError("Error adding new meal. Please try again later.");
    }
  };

  const deleteMealHandler = (mealId) => {
    // Remove the meal with the specified ID
    const updatedMeals = meals.filter((meal) => meal.id !== mealId);

    // Update the meals state
    setMeals(updatedMeals);

    // Save the updated list to local storage
    localStorage.setItem('foodItems', JSON.stringify(updatedMeals));
  };

  const mealsList = meals.map((meal) => (
    <MealsItem
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    image={meal.image}
    onDeleteMeal={deleteMealHandler}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.mealsList}>{mealsList}</ul>
      </Card>
      <AdminForm onAddNewMeal={addNewMealHandler} />
    </section>
  );
};

export default AvailableMeal;
