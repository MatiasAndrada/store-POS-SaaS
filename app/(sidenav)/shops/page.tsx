import React, { FC } from "react";
import { LogoutButton } from "@/components/buttons-auth";
const Page: FC = () => {
  return (
    <div>
      <h1>Shops</h1>
      <p>Welcome to the shops page!</p>
      <LogoutButton />
    </div>
  );
};

export default Page;
