import fetchData from "./fetchData";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const fetchDogInfo = async (ids: string[]): Promise<Dog[]> => {
  try {
    const data = await fetchData(ids);
    return data;
  } catch (error) {
    console.error("Error fetching dog information:", error);
    throw error;
  }
};

export default fetchDogInfo;
