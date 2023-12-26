import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const AdminForm = ({ isOpen, onClose }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("key", "13e4ed944f1c4a440869ae41e67571e7"); // Replace with your ImgBB API key
        formData.append("image", file);

        // Make a POST request to the ImgBB API
        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Check if the request was successful
        if (response.data.success) {
          setImageUrl(response.data.data.url);
        } else {
          // Handle errors
          console.error("Error uploading image:", response.data.status);
          setError("Error uploading image");
        }
      } catch (error) {
        console.error("Error uploading image:", error.message);
        setError("Error uploading image");
      }
    }
  };

  const handleSave = () => {
    if (!itemName || !itemDescription || !itemPrice || !imageUrl) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    const newItem = {
      id: uuidv4(), // Generate a unique ID
      name: itemName,
      description: itemDescription,
      price: parseFloat(itemPrice),
      image: imageUrl,
    };

    setLoading(true);

    try {
      // Retrieve existing food items from local storage
      const existingFoodItems = JSON.parse(localStorage.getItem("foodItems")) || [];

      // Add the new item to the list
      existingFoodItems.push(newItem);

      // Save the updated list back to local storage
      localStorage.setItem("foodItems", JSON.stringify(existingFoodItems));

      // Reset the form
      resetForm();

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error saving new food item", error);
      setError("Error saving new food item");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset the form
    resetForm();

    // Close the form
    onClose();
  };

  const resetForm = () => {
    setItemName("");
    setItemDescription("");
    setItemPrice("");
    setImageFile(null);
    setImageUrl(null);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Food Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Item Name"
          fullWidth
          margin="normal"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          label="Item Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <TextField
          label="Item Price"
          type="number"
          fullWidth
          margin="normal"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Dialog>
  );
};

export default AdminForm;
