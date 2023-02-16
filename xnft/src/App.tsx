import { registerRootComponent } from "expo";
import React from "react";
import { RecoilRoot } from "recoil";
import { Wallet } from "./components/Wallet";

import { HomeScreen } from "./screens/HomeScreen";

function App() {
  return (
    <RecoilRoot>
      <Wallet>
        <HomeScreen/></Wallet>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
