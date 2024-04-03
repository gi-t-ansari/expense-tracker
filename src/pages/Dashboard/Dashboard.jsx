import React, { useState } from "react";
import { ExpenseCard, WalletCard } from "../../components";

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenseAmount, setExpenseAmount] = useState(0);
  return (
    <>
      <section className="rounded-lg px-16 py-8 bg-[#626262] flex gap-5">
        <WalletCard amount={walletBalance} setAddBalance={setWalletBalance} />
        <ExpenseCard amount={expenseAmount} />
      </section>
    </>
  );
};

export default Dashboard;
