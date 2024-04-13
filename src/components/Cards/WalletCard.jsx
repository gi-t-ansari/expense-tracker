import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { AddBalanceModal } from "../Modals";

const WalletCard = ({ amount, setAddBalance }) => {
  const [openAddBalance, setOpenAddBalance] = useState(false);

  const handleOpenAddBalance = () => {
    setOpenAddBalance(true);
  };
  return (
    <div className="md:px-8 md:py-12 rounded-lg md:w-96 p-6 w-76 bg-[#9b9b9b] flex flex-col items-center gap-3 shadow-lg">
      <p className="text-center md:text-2xl text-xl text-white">
        Wallet Balance: <span className="text-[#9cfb5e] font-bold">Rs. {amount}</span>
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
