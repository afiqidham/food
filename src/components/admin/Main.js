import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AdminForm from "./AdminForm";
import { makeStyles } from '@mui/styles';
import Meal from "./Meal";

const componentStyles = makeStyles((theme) => ({
  addItemsButton: {
    backgroundColor: "#4CAF50", // Green color
    color: "white",
    "&:hover": {
      backgroundColor: "#45a049", // Darker green color on hover
    },
  },
}));

const Main = () => {
  const classes = componentStyles();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const showAddItemForm = () => setIsFormOpen(true);
  const hideAddItemForm = () => setIsFormOpen(false);

  return (
    <Box style={{ flex: 4 }}>
      <Button
        variant="contained"
        onClick={showAddItemForm}
        className={classes.addItemsButton}
      >
        Add Food Item
      </Button>
      <AdminForm isOpen={isFormOpen} onClose={hideAddItemForm} />
      <Meal/>
    </Box>
  );
};

export default Main;
