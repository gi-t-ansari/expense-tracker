import React, { useEffect, useState } from "react";
import { ExpenseCard, WalletCard } from "../../components";
import { Button, Card, Typography } from "@material-tailwind/react";
import { expenseTableCols } from "../../config";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDeleteOutline, MdEdit } from "react-icons/md";

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    console.log("Expense Data", expenseData);
    if (expenseData?.length > 0) {
      setExpenseAmount(
        (prev) => prev + parseInt(expenseData[expenseData?.length - 1].price)
      );
      setWalletBalance(
        (prev) => prev - parseInt(expenseData[expenseData?.length - 1].price)
      );
    }
  }, [expenseData]);

  return (
    <>
      <Typography variant="h4" color="white">
        Expense Tracker
      </Typography>
      <section className="rounded-lg px-16 py-8 bg-[#626262] flex gap-5">
        <WalletCard amount={walletBalance} setAddBalance={setWalletBalance} />
        <ExpenseCard amount={expenseAmount} setExpenseData={setExpenseData} />
      </section>
      <section className="mt-6">
        <Typography variant="h5" color="white" className="italic">
          Recent Transactions
        </Typography>
        <Card className="h-full md:w-[50%] rounded-lg">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {expenseTableCols.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-10"
                  >
                    <Typography
                      variant="small"
                      color="black"
                      className="font-bold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenseData?.length > 0 ? (
                expenseData?.map((item, index) => (
                  <tr key={item?.title} className="even:bg-blue-gray-50/50">
                    <td className="p-4" align="left">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.title}
                      </Typography>
                    </td>
                    <td className="p-4" align="left">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.category}
                      </Typography>
                    </td>
                    <td className="p-4" align="left">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.price}
                      </Typography>
                    </td>
                    <td className="p-4" align="left">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(item?.date).format("DD-MM-YYYY")}
                      </Typography>
                    </td>
                    <td className="p-4 flex gap-2 w-fit" align="left">
                      <Button className="rounded-full p-2 bg-blue-600">
                        <MdEdit className="md:text-lg text-sm" />
                      </Button>
                      <Button className="rounded-full p-2 bg-red-600">
                        <MdDelete className="md:text-lg text-sm" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="even:bg-blue-gray-50/50">
                  <td className="p-4 text-center" colSpan={5}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      No Transaction Made
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </section>
    </>
  );
};

export default Dashboard;
