import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Rpsx as IDL } from '../../../target/types/rpsx'
import * as anchor from '@project-serum/anchor'
import { Screen } from "../components/Screen";
import { Connection, PublicKey, SystemProgram, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, Transaction } from "@solana/web3.js";
import { Game } from '../client/accounts/Game'
import { PROGRAM_ID } from "../client/programId";
import { Chart } from 'react-charts'

import { join } from '../client/instructions/join'
import { play } from '../client/instructions/play'
import { newGame } from "../client/instructions";
import { useDidLaunch, useSolanaConnection } from "../hooks/xnft-hooks";

let startTime = new Date().getTime()/1000
export function HomeScreen() {

  const [setTxs, txs] = useState<Transaction[]>([])
    let [gameState, setGameState] = useState<any>()
    let [theColor, setTheColor] = useState<string>('#43A19E')
    let [wager, setWager] = useState<number>(0.01*10**9)
    useEffect(() => {
      if (txs.length == 3){

  // @ts-ignore
   window.xnft?.solana.sendAll(txs)
  // @ts-ignore
  setTxs([])
      }
    }, [txs])
async function joinIt(){

  let user = (PublicKey.findProgramAddressSync(
    // @ts-ignore
    [Buffer.from("game"),game.toBuffer(), window.xnft?.solana?.publicKey.toBuffer()]
  , PROGRAM_ID))[0]
  let wen = new Date().getTime()
  const tx2 = await join( {wager:new anchor.BN( wager), wen:     (wen.toString() )},{
    game:  game,
    user: user,
    authority: window.xnft?.solana.publicKey,
    recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
    systemProgram: SystemProgram.programId
  });
  try {
    let tx = new Transaction().add(tx2)
    tx.feePayer = window.xnft?.solana.publicKey 
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash 
    // @ts-ignore
    await window.xnft?.solana.sendAndConfirm(tx)
  }
   catch (err){
    console.log(err)

   }
}
async function buttonIt(){
  let wen = new Date().getTime()

  let user = (PublicKey.findProgramAddressSync(
    // @ts-ignore
    [Buffer.from("game"),game.toBuffer(), window.xnft?.solana?.publicKey.toBuffer()]
  , PROGRAM_ID))[0]
  const tx3 = await play(    {wen:  (wen.toString()),wager:new anchor.BN( wager)},{
    game: game,
    user: user,
    house: new PublicKey("JAcF8pPFvGrRCgbe2kAoEPXcgPVoLPNiC3Loz628C8sT"),
    recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
    authority: window.xnft?.solana.publicKey,
    systemProgram: SystemProgram.programId
  });
  try {   
     let tx = new Transaction().add(tx3)
    tx.feePayer = window.xnft?.solana.publicKey 
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash 
    setTxs([...txs, tx])
  }
   catch (err){
    console.log(err)
   }
}
  let [data1, setData] = useState<any>([])
  let [data2, setData2] = useState<any>([])
  const data = React.useMemo(
    () => [
      {
        label: 'Wagers',
        data: data1,
        color: theColor
      }
    ],
    [gameState]
  )
 
  const axes = React.useMemo(
    () => [
      { responsive: true,primary: true, type: 'linear', position: 'bottom',label: 'none',legend: {
        display: false,
      }, },
      {  responsive: true,type: 'linear', position: 'left',legend: {
        display: false,
      }, }
    ],
    []
  )

      let [oldWager, setOldWager] = useState<number>(0)

      let [oldUsers, setOldUsers] = useState<number>(0)
  const didLaunch = useDidLaunch()
 

  const connection = new Connection("https://rpc.helius.xyz/?api-key=8913a285-a5ef-4c35-8d80-03fb276eff2f")
  let game = (PublicKey.findProgramAddressSync(
    [Buffer.from("game")]
  , PROGRAM_ID))[0]/*
  */
 useEffect(() => {
  setTimeout(async function(){
    setGameState(await Game.fetch(connection, game))
      console.log(gameState)
      if (gameState){
        
        if (gameState.wagers.toNumber() != oldWager){
          let newColor = '#43A19E';

          if (gameState.numUsers != oldUsers){
            if (gameState.numUsers < oldUsers){
newColor = '#F94144'
          }
       setOldUsers(gameState.numUsers)
        }
setTheColor(newColor)

          setOldWager(gameState.wagers.toNumber())
          let tdata = data1 
          tdata.push([new Date().getTime()/1000, gameState.wagers.toNumber()])
      setData(tdata)
      let tdata2 = data2
      tdata2.push([new Date().getTime()/1000, gameState.numusers])
    setData2(tdata2)
      console.log(data1)
        }
      }
    })
  }, [game])
  return ( 
    <Screen>
    {didLaunch ? (
      <View>
      <div
        style={{
          width: '350px',
          height: '300px'
        }}
      ><br/><br/>{gameState && <h4>Last win: {gameState.lastAward.toNumber() / 10 ** 9} sols!</h4>}
      the rules: every time the thing crashes, a new ship is launched and will crash in 100s. <br/>you can wager to eject; if you do, you win a portion of the funds<br/>and then the thing will crash at some random value 0-9seconds.<br/>you can wager again to climb back in...
     
        <Chart data={data} axes={axes} />
        <button onClick={joinIt}>Join</button>
              <button onClick={function(){
                setWager(0.01*10**9)
                buttonIt()
              }}>0.01</button>
              <button onClick={function(){
                setWager(0.05*10**9)
                buttonIt()
              }}>0.05</button>
              <button onClick={function(){
                setWager(0.1*10**9)
                buttonIt()
              }}>0.1</button>
              <button onClick={function(){
                setWager(0.2*10**9)
                buttonIt()
              }}>0.2</button>
              <button onClick={function(){
                setWager(0.5*10**9)
                buttonIt()
              }}>0.5</button>
      </div> </View>) : (<div></div>)}
    </Screen>
  );
}
