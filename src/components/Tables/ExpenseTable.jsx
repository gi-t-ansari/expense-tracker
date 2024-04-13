import { Button, Card, CardFooter, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { expenseTableCols } from "../../config";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";
import { EditExpenseModal } from "../Modals";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ExpenseTable = ({
  data,
  setExpenseData,
  setExpenseAmount,
  setWalletBalance,
  walletBalance,
}) => {
  const [rows, setRows] = useState(data ?? []);
  const [openEditExpense, setOpenEditExpense] = useState(false);
  const [editableExpense, setEditableExpense] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
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
    setExpenseData((prev) =>
      prev?.filter((item) => item?.title !== data?.title)
    );
    setWalletBalance((prev) => prev + parseInt(data?.price));
    setExpenseAmount((prev) => prev - parseInt(data?.price));
  };

  /**----------Handling Pagination----------- */
  const handleNext = () => {
    setStartIndex((prev) => prev + 4);
    setEndIndex((prev) => prev + 4);
  };

  const handlePrevious = () => {
    setStartIndex((prev) => prev - 4);
    setEndIndex((prev) => prev - 4);
  };

  return (
    <Card className="h-full rounded-md overflow-y-auto">
      <table className="w-full min-w-max table-auto text-left rounded-md">
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
            rows?.slice(startIndex, endIndex).map((item, index) => (
              <tr key={item?.title} className="even:bg-blue-gray-50/50">
                <td className="px-4 py-2 min-w-24" align="left">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.title}
                  </Typography>
                </td>
                <td className="px-4 py-2 min-w-24" align="left">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.category}
                  </Typography>
                </td>
                <td className="px-4 py-2 min-w-24" align="left">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.price}
                  </Typography>
                </td>
                <td className="px-4 py-2 min-w-28" align="left">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {moment(item?.date).format("DD-MM-YYYY")}
                  </Typography>
                </td>
                <td className="px-4 py-2 min-w-24 flex gap-2" align="left">
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
      {rows?.length > 0 && (
        <CardFooter className="flex justify-between items-center gap-2 py-3 sticky left-0">
          <Button
            size="sm"
            className="md:py-2 py-1"
            onClick={handlePrevious}
            disabled={startIndex <= 0 ? true : false}
          >
            <Typography className="text-xs hidden md:block">
              Previous
            </Typography>
            <FaAngleLeft className="md:hidden text-lg" />
          </Button>

          <Typography>
            Transactions{" "}
            {rows?.slice(startIndex, endIndex).length === 1
              ? rows?.length
              : `${startIndex + 1} - ${
                  endIndex >= rows?.length ? rows?.length : endIndex
                }`}
          </Typography>
s
          <Button
            size="sm"
            className="md:py-2 py-1"
            onClick={handleNext}
            disabled={endIndex >= data?.length ? true : false}
          >
            <Typography className="text-xs hidden md:block">Next</Typography>
            <FaAngleRight className="md:hidden text-lg" />
          </Button>
        </CardFooter>
      )}
      <EditExpenseModal
        open={openEditExpense}
        data={editableExpense}
        onClose={handleCloseEditExpense}
        setExpenseData={setExpenseData}
        setExpenseAmount={setExpenseAmount}
        setWalletBalance={setWalletBalance}
        walletBalance={walletBalance}
      />
    </Card>
  );
};

export default ExpenseTable;
