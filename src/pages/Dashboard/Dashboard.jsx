import React, { useEffect, useState } from "react";
import {
  ExpenseCard,
  ExpenseChart,
  ExpenseTable,
  WalletCard,
} from "../../components";
import { Progress, Typography } from "@material-tailwind/react";
import {
  calculateEntertainmentExpense,
  calculateFoodExpense,
  calculatePercentage,
  calculateTravelExpense,
} from "../../config";

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [totalFoodExpense, setTotalFoodExpense] = useState(null);
  const [totalTravelExpense, setTotalTravelExpense] = useState(null);
  const [totalEntertainmentExpense, setTotalEntertainmentExpense] =
    useState(null);

  useEffect(() => {
    const totalFoodExpense = calculateFoodExpense(expenseData);

    setTotalFoodExpense({ amount: totalFoodExpense, category: "Food" });

    const totalTravelExpense = calculateTravelExpense(expenseData);
    setTotalTravelExpense({ amount: totalTravelExpense, category: "Travel" });

    const totalEntertainmentExpense =
      calculateEntertainmentExpense(expenseData);
    setTotalEntertainmentExpense({
      amount: totalEntertainmentExpense,
      category: "Entertainment",
    });
  }, [expenseData]);

  return (
    <>
      <Typography variant="h4" color="white">
        Expense Tracker
      </Typography>
      <section className="rounded-lg md:px-16 md:py-8 p-6 bg-[#626262] flex flex-col-reverse md:flex-row gap-5 md:justify-between items-center w-full">
        <div className="flex md:flex-row flex-col gap-5">
          <WalletCard amount={walletBalance} setAddBalance={setWalletBalance} />
          <ExpenseCard
            amount={expenseAmount}
            setExpenseData={setExpenseData}
            setExpenseAmount={setExpenseAmount}
            setWalletBalance={setWalletBalance}
            walletBalance={walletBalance}
          />
        </div>
        {expenseData?.length > 0 && (
          <div className="md:mr-20">
            <ExpenseChart
              expenseAmount={expenseAmount}
              totalFoodExpense={totalFoodExpense}
              totalTravelExpense={totalTravelExpense}
              totalEntertainmentExpense={totalEntertainmentExpense}
            />
          </div>
        )}
      </section>
      <section className="mt-6 flex md:flex-row flex-col gap-5 justify-between">
        <div className="md:basis-[55%] basis-[100%] h-fit">
          <Typography variant="h5" color="white" className="italic">
            Recent Transactions
          </Typography>
          <ExpenseTable
            data={expenseData}
            setExpenseData={setExpenseData}
            setExpenseAmount={setExpenseAmount}
            setWalletBalance={setWalletBalance}
            walletBalance={walletBalance}
          />
        </div>
        {expenseData?.length > 0 && (
          <div className="md:basis-[40%] basis-[100%]">
            <Typography variant="h5" color="white" className="italic">
              Top Expenses
            </Typography>
            <div className="bg-white px-6 py-12 rounded-md flex flex-col gap-10">
              {[totalFoodExpense, totalTravelExpense, totalEntertainmentExpense]
                ?.sort((a, b) => b?.amount - a?.amount)
                .map((item) => (
                  <div>
                    <Typography
                      variant="paragraph"
                      color="black"
                      className="italic"
                    >
                      {item?.category}
                    </Typography>
                    <Progress
                      value={calculatePercentage(item?.amount, expenseAmount)}
                      color="indigo"
                      size="lg"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
