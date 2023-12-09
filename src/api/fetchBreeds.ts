import baseURL from "./baseUrl";

const fetchBreeds = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${baseURL}/dogs/breeds`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching breed names:", error);
    throw error;
  }
};

export default fetchBreeds;
