import axios from "./root.service";

export const startShift = async () => {
  const response = await axios.post("/shifts/start");
  return response.data;
};

export const endShift = async (shiftId) => {
  const response = await axios.post("/shifts/end", { shiftId });
  return response.data;
};
