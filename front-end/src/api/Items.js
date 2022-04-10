// Api.js
// Retrieves from the API when making a ItemAPI call

// IMPORTS
// api call
import api from "./api";

// getItemModels call
// returns the item models that match the search term
const getItemModels = async (searchTerm) => {
  try {
    const endpoint = searchTerm
      ? `/item-models?search=${searchTerm}`
      : "/item-models";
    const response = await api.get(endpoint);
    return response.data.itemModels;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

// getItemModel call
// returns the item model given a specific ID
const getItemModel = async (id) => {
  try {
    const endpoint = `/item-models/${id}`;
    const response = await api.get(endpoint);
    return response.data.itemModel;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

// getItemTypes call
// returns all of the item types in the database
const getItemTypes = async () => {
  try {
    const response = await api.get("/item-types");
    return response.data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

// getItemCategories call
// returns all of the item categories in the database
const getItemCategories = async () => {
  try {
    const response = await api.get("/item-categories");
    return response.data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

// getItemCount call
// returns the number of available items for each item
const getItemCount = async () => {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

// onSubmitCheckout call
// posts items that are reserved
const onSubmitCheckout = async (username, itemId) => {
  try {
    await api.post("/reservations", { username, itemId });
  } catch (error) {
    console.log("ERROR IN CHECKING ITEM OUT: " + error);
  }
};

// ItemAPI call
// calls each of these functions when used
export const ItemAPI = {
  getItemModels,
  getItemTypes,
  getItemCategories,
  getItemCount,
  getItemModel,
  onSubmitCheckout,
};
