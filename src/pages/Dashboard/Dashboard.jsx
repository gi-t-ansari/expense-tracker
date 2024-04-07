import React, { useEffect, useState } from "react";
import { ExpenseCard, ExpenseTable, WalletCard } from "../../components";
import { Typography } from "@material-tailwind/react";

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseData, setExpenseData] = useState([]);

  return (
    <>
      <Typography variant="h4" color="white">
        Expense Tracker
      </Typography>
      <section className="rounded-lg px-16 py-8 bg-[#626262] flex gap-5">
        <WalletCard amount={walletBalance} setAddBalance={setWalletBalance} />
        <ExpenseCard
          amount={expenseAmount}
          setExpenseData={setExpenseData}
          setExpenseAmount={setExpenseAmount}
          setWalletBalance={setWalletBalance}
        />
      </section>
      <section className="mt-6">
        <Typography variant="h5" color="white" className="italic">
          Recent Transactions
        </Typography>
        <ExpenseTable
          data={expenseData}
          setExpenseData={setExpenseData}
          setExpenseAmount={setExpenseAmount}
          setWalletBalance={setWalletBalance}
        />
      </section>
    </>
  );
};

export default Dashboard;
