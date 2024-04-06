import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { categoryOptions } from "../../config";

export default function AddExpenseModal({
  open,
  handleOpen,
  onClose,
  setExpenseData,
}) {
  const schema = yup.object().shape({
    title: yup.string().required("This field is required"),
    price: yup
      .string()
      .required("This field is required")
      .matches(/^\d+$/, "Input must contain only numbers"),
    category: yup.string().required("This field is required"),
    date: yup.date("Input ust be a date").required("This field is required"),
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const handleAddExpense = (data) => {
    if (data) {
      setExpenseData((prev) => [...prev, data]);
      onClose();
      reset();
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="p-4">
        <DialogHeader>Add Expense</DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmit(handleAddExpense)}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <div className="mb-2 basis-[49%]">
                <Input {...register("title")} label="Title*" type="text" />
                {errors?.title && (
                  <span className="text-red-500 text-sm">
                    {errors?.title?.message}
                  </span>
                )}
              </div>
              <div className="mb-2 basis-[49%]">
                <Input {...register("price")} label="Price*" type="text" />
                {errors?.price && (
                  <span className="text-red-500 text-sm">
                    {errors?.price?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mb-2 basis-[49%]">
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      onChange={(selectedValue) =>
                        field.onChange(selectedValue?.value)
                      }
                      options={categoryOptions?.map((category) => ({
                        label: category?.label,
                        value: category?.value,
                      }))}
                    />
                  )}
                  defaultValue=""
                />
                {errors?.category && (
                  <span className="text-red-500 text-sm">
                    {errors?.category?.message}
                  </span>
                )}
              </div>
              <div className="mb-2 basis-[49%]">
                <Input {...register("date")} label="Date" type="date" />
                {errors?.date && (
                  <span className="text-red-500 text-sm">
                    {errors?.date?.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Button type="submit" className="bg-[#f5bb4b] shadow-2xl mr-2">
                <span>Add Expense</span>
              </Button>
              <Button
                onClick={handleClose}
                className="mr-1 bg-[#e2e3e3] text-black shadow-2xl"
              >
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
