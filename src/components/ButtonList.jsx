// ButtonList.jsx
import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../utils/categorySlice";

const categories = [
  "All",
  "Gaming",
  "Songs",
  "Football",
  "Soccer",
  "Cricket",
  "Cooking",
  "Valentines",
  "Badminton",
  "Boxing",
  "Hockey",
  "Tennis",
  "Voleyball",
  "Movies",
];

const ButtonList = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.category.selectedCategory);

  return (
    <div className="flex overflow-x-auto gap-2 p-2">
      {categories.map((category) => (
        <Button
          key={category}
          name={category}
          active={selected === category}
          onClick={() => dispatch(setSelectedCategory(category))}
        />
      ))}
    </div>
  );
};

export default ButtonList;
