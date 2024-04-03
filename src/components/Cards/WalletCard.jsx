import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { AddBalanceModal } from "../Modals";

const WalletCard = ({ amount, setAddBalance }) => {
  const [openAddBalance, setOpenAddBalance] = useState(false);

  const handleOpenAddBalance = () => {
    setOpenAddBalance(true);
  };
  return (
    <div className="px-8 py-12 rounded-lg w-96 bg-[#9b9b9b] flex flex-col items-center gap-3 shadow-lg">
      <p className="text-center text-2xl text-white">
        Wallet Balance: <span className="text-green-900">Rs.{amount}</span>
      </p>
      <Button className="bg-green-500" onClick={handleOpenAddBalance}>
        +Add Income
      </Button>
      <AddBalanceModal
        open={openAddBalance}
        handleOpen={handleOpenAddBalance}
        onClose={() => setOpenAddBalance(false)}
        setAddBalance={setAddBalance}
      />
    </div>
  );
};

export default WalletCard;
