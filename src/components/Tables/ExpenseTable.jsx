import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { expenseTableCols } from "../../config";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";
import { EditExpenseModal } from "../Modals";

const ExpenseTable = ({
  data,
  setExpenseData,
  setExpenseAmount,
  setWalletBalance,
}) => {
  const [rows, setRows] = useState(data ?? []);
  const [openEditExpense, setOpenEditExpense] = useState(false);
  const [editableExpense, setEditableExpense] = useState(null);
  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const handleOpenEditExpense = (data, index) => {
    setEditableExpense({ ...data, index });
    setOpenEditExpense(true);
  };

  const handleCloseEditExpense = () => {
    setOpenEditExpense(false);
    setEditableExpense(null);
  };

  const handleDeleteExpense = (data, index) => {
    setExpenseData(
      (prev) => (prev = prev?.filter((item, index) => index !== index))
    );
    setWalletBalance((prev) => prev + parseInt(data?.price));
    setExpenseAmount((prev) => prev - parseInt(data?.price));
  };

  return (
    <Card className="h-full md:w-[50%]">
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
          {rows?.length > 0 ? (
            rows?.map((item, index) => (
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
                  <Button
                    className="rounded-full p-2 bg-blue-600"
                    onClick={() => handleOpenEditExpense(item, index)}
                  >
                    <MdEdit className="md:text-lg text-sm" />
                  </Button>
                  <Button
                    className="rounded-full p-2 bg-red-600"
                    onClick={() => handleDeleteExpense(item, index)}
                  >
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
      <EditExpenseModal
        open={openEditExpense}
        data={editableExpense}
        onClose={handleCloseEditExpense}
        setExpenseData={setExpenseData}
        setExpenseAmount={setExpenseAmount}
        setWalletBalance={setWalletBalance}
      />
    </Card>
  );
};

export default ExpenseTable;
