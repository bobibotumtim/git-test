import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { instance } from "../lib/axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     await instance.get("/recipes").then((res) => {
  //       setRecipes(res.data);
  //     })
  //   };

  //   fetchRecipes();
  // }, []);

  useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await instance.get("/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Fetch recipes failed:", error);
    }
  };

  fetchRecipes();
}, []);

  console.log("Recipes:", recipes);

  return <AppContext.Provider
    value={{ recipes, setRecipes }}
  >{children}</AppContext.Provider>;

};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;