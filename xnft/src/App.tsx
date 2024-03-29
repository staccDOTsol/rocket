import { registerRootComponent } from "expo";
import React from "react";
import { RecoilRoot } from "recoil";
import { Wallet } from "./components/Wallet";

import { HomeScreen } from "./screens/HomeScreen";

function App() {
  return (
    <RecoilRoot> 
        <HomeScreen/>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
