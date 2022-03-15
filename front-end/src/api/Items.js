import api from "./api";

const getItemModels = async (searchTerm) => {
  try {
    const endpoint = searchTerm
      ? `/item-models?search=${searchTerm}`
      : "/item-models";
    const response = await api.get(endpoint);
    console.log("got items", response);
    return response.data.itemModels;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

const getItemModel = async (id) => {
  try {
    const endpoint = `/item-models/${id}`;
    const response = await api.get(endpoint);
    console.log(`got item ${id}`, response);
    return response.data.itemModel;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

const getItemTypes = async () => {
  try {
    const response = await api.get("/item-types");
    console.log("got types", response);
    return response.data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

const getItemCategories = async () => {
  try {
    const response = await api.get("/item-categories");
    console.log("got categories", response);
    return response.data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

const getItemCount = async () => {
  try {
    const response = await api.get("/items");
    console.log("got count", response);
    return response.data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

export const ItemAPI = {
  getItemModels,
  getItemTypes,
  getItemCategories,
  getItemCount,
  getItemModel,
};
