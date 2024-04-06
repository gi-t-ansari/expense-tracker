import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddBalanceModal({
  open,
  handleOpen,
  onClose,
  setAddBalance,
}) {
  const schema = yup.object().shape({
    incomeAmount: yup
      .string()
      .required("This field is required")
      .matches(/^\d+$/, "Input must contain only numbers"),
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const handleAddBalance = (data) => {
    console.log("Form Data", data);
    setAddBalance((prev) => prev + parseInt(data?.incomeAmount));
    reset();
    onClose();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="p-4">
        <DialogHeader>Add Balance</DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmit(handleAddBalance)}
            className="flex gap-3 items-center"
          >
            <div className="basis-[50%]">
              <Input
                {...register("incomeAmount")}
                label="Income Amount*"
                type="text"
                error={errors?.incomeAmount}
              />
              {errors?.incomeAmount && (
                <span className="text-red-500 text-sm">
                  {errors?.incomeAmount?.message}
                </span>
              )}
            </div>

            <Button type="submit" className="bg-[#f5bb4b] shadow-2xl">
              <span>Add Balance</span>
            </Button>
            <Button
              onClick={handleClose}
              className="mr-1 bg-[#e2e3e3] text-black shadow-2xl"
            >
              <span>Cancel</span>
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
