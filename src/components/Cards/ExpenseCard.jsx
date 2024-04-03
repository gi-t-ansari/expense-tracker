import { Button } from "@material-tailwind/react";
import React from "react";

const ExpenseCard = ({ amount }) => {
  return (
    <div className="px-8 py-12 rounded-lg w-96 bg-[#9b9b9b] flex flex-col items-center gap-3 shadow-lg">
      <p className="text-center text-2xl text-white">
        Expenses: <span className="text-orange-300">Rs.{amount}</span>
      </p>
      <Button className="bg-red-500">+Add Expense</Button>
    </div>
  );
};

export default ExpenseCard;
