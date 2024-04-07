import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { AddExpenseModal } from "../Modals";

const ExpenseCard = ({ setExpenseData, amount, setExpenseAmount, setWalletBalance }) => {
  const [openAddExpense, setOpenAddExpense] = useState(false);

  const handleOpenAddExpense = () => setOpenAddExpense(true);

  return (
    <div className="px-8 py-12 rounded-lg w-96 bg-[#9b9b9b] flex flex-col items-center gap-3 shadow-lg">
      <p className="text-center text-2xl text-white">
        Expenses: <span className="text-[#f4bb4a] font-bold">Rs.{amount}</span>
      </p>
      <Button className="bg-red-500" onClick={handleOpenAddExpense}>
        +Add Expense
      </Button>
      <AddExpenseModal
        open={openAddExpense}
        onClose={() => setOpenAddExpense(false)}
        handleOpen={handleOpenAddExpense}
        setExpenseData={setExpenseData}
        setExpenseAmount={setExpenseAmount}
        setWalletBalance={setWalletBalance}
      />
    </div>
  );
};

export default ExpenseCard;
