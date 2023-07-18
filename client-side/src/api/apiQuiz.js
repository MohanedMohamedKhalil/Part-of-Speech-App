import axios from "axios";

const configAxios = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {},
});

export const getWords = async function () {
  try {
    const { data } = await configAxios.get("words");
    return data;
  } catch (error) {
    return error;
  }
};

export const getRank = async function (score) {
  try {
    const { data } = await configAxios.post("rank", {
      data: { score },
    });
    return data.rank;
  } catch (error) {
    return error;
  }
};
