import React, { useState } from "react";
import {
  Button,
  Image,
  ScrollBar,
  Text,
  TextField,
  useConnection,
  useNavigation,
  View,
} from "react-xnft";
import { createSelector } from "reselect";

import type { StateType } from "../state";
import { connect } from "../state";

import { green, red } from "./_helpers/color";
import formatPrice from "./_helpers/formatPrice";
import type { TokenInfoType } from "./_types/TokenInfoType";
import ArrowDownIcon from "./ArrowDownIcon";
import ArrowUpIcon from "./ArrowUpIcon";
import CenteredLoader from "./CenteredLoader";
import InlineGraph from "./InlineGraph";
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCreateProfile, useDomains, useGumContext, useUploaderContext } from '@gumhq/react-sdk';
import { AnchorProvider } from "@coral-xyz/anchor"

import * as anchor from '@coral-xyz/anchor'
import {Metadata} from "@metaplex-foundation/mpl-token-metadata";
import { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";
import {
  ORCA_WHIRLPOOL_PROGRAM_ID, ORCA_WHIRLPOOLS_CONFIG,
  PDAUtil, PriceMath, TickUtil, SwapUtils,
  swapQuoteByInputTokenWithDevFees, WhirlpoolContext, buildWhirlpoolClient,
  increaseLiquidityQuoteByInputToken, decreaseLiquidityQuoteByLiquidity,
  collectFeesQuote, collectRewardsQuote, TickArrayUtil, PoolUtil,
} from "@orca-so/whirlpools-sdk";
import { AccountLayout, ASSOCIATED_TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { TransactionBuilder, resolveOrCreateATA,  DecimalUtil, Percentage } from "@orca-so/common-sdk";
import formatPrice from "./_helpers/formatPrice";
import CenteredLoader from "./CenteredLoader";
import Chart from "./Chart";
import { GraphDataPointType } from "./_types/GraphDataPointType";
import filterChartData, { charts } from "./_helpers/filterChartData";
import StarIcon from "./StarIcon";
import { StateType, connect, useDispatch } from "../state";
import { createSelector } from "reselect";
import { FAVORITE } from "./_actions/FAVORITE";
import { ChartType } from "./_types/ChartType";
import useRefreshTokenChart from "./_hooks/useRefreshTokenChart";
import { SET_TOKEN_CHART } from "./_actions/SET_TOKEN_CHART";
import { getChartDataTime } from "./_helpers/getChartDataTime";
import ArrowUpIcon from "./ArrowUpIcon";
import ArrowDownIcon from "./ArrowDownIcon";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { PublicKey } from '@solana/web3.js'
import {
  ThreadProgram as ThreadProgramType,
  IDL as ThreadProgramIdl_v1_3_15, 
} from './thread_program';
import * as idl from './cpi_thready.json';
import { token } from "@coral-xyz/anchor/dist/cjs/utils";
import { useSolanaProvider } from "./_hooks/xnft-hooks";
import { ClockworkProvider } from "@clockwork-xyz/sdk";
export const CLOCKWORK_THREAD_PROGRAM_ID = new PublicKey(
  '3XXuUFfweXBwFgFfYaejLvZE4cGZiHgKiGfMtdxNzYmv',
);

const SOL = {mint: new PublicKey("So11111111111111111111111111111111111111112"), decimals: 9};
const ORCA = {mint: new PublicKey("orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE"), decimals: 6};
let BONK = {mint: new PublicKey("BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k"), decimals: 6};
let USDC = {mint: new PublicKey("H8UekPGwePSmQ3ttuYGPU1szyFfjZR4N53rymSFwpLPm"), decimals: 6};

const defaultProfileMetadataUri = 'https://raw.githubusercontent.com/gumhq/sdk/master/packages/gpl-core/tests/utils/profile.json';


type Props = {};

type StateProps = {
  filter: string;
  tokenInfos: StateType["tokenInfos"];
  tokenList: StateType["tokenList"];
  favorites: StateType["favorites"];
};

function TokenList({ tokenList, tokenInfos, favorites }: Props & StateProps) {
  const [filter, setFilter] = useState<string>("bonk");
  const nav = useNavigation();

  let connection = useConnection()

  const provider = new anchor.AnchorProvider(useConnection(), window.xnft.solana, {})
  if (!tokenList) {
    return <CenteredLoader />;
  }

  const favoritesList = tokenList.filter((token) => favorites[token]);

  const nonFavoritesList = tokenList.filter((token) => !favorites[token]);
  nonFavoritesList.length =
    favoritesList.length > 20 ? 0 : 20 - favoritesList.length;

  let filteredList: typeof tokenList | undefined;

  if (filter !== "") {
    const regex = new RegExp(filter, "i");
    filteredList = tokenList.filter(
      (token) =>
        regex.test(tokenInfos[token]?.name) ||
        regex.test(tokenInfos[token]?.symbol) ||
        regex.test(token)
    );
    filteredList.length = 20;
  }
    // @ts-ignore
        async function doathing(){
          
          let wallet = window.xnft.solana.publicKey;
          const clockworkProvider = ClockworkProvider.fromAnchorProvider(provider);
      let tokens = await connection.getParsedTokenAccountsByOwner(wallet, {programId: TOKEN_PROGRAM_ID})
  let usdcBal = 0 
  let bonkBal = 0
  console.log(tokens.value.length)

  
    let ixs : any [] = [] 
    let tixs : Transaction[] = []
    let tixs2 : Transaction[] = []
    console.log(favoritesList)
    // @ts-ignore
      for (var pool of favoritesList){

  
      const position_mint_keypair = Keypair.generate();
      const position_mint = position_mint_keypair.publicKey;
      const position_pda = PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID, position_mint);
  
    const program = new anchor.Program(idl as anchor.Idl, new PublicKey("AmZwbjYqb13PNKGinSZYhLsvoL3jh56H23Vo1CbfpCZ1"), provider)
    const [authority, bump] = PublicKey.findProgramAddressSync([Buffer.from("authority"), position_pda.publicKey.toBuffer()], program.programId)
    const SEED_QUEUE = 'thread';
    
    const whirlpool_ctx = WhirlpoolContext.from(connection, window.xnft.solana, ORCA_WHIRLPOOL_PROGRAM_ID);
    const whirlpool_client = buildWhirlpoolClient(whirlpool_ctx);
  
        // @ts-ignore
        pool = pool
        let tx = new TransactionBuilder(connection,window.xnft.solana) 
        
        const samo_usdc_whirlpool_pubkey = new PublicKey(pool)
  
        if (bonkBal == 0 || usdcBal == 0){
          /*
          // Wallet used to colle.tokect developer fees
          const DEV_WALLET = new PublicKey("Gf3sbc5Jb62jH7WcTr3WSNGDQLk1w6wcKMZXKK1SC1E6")
          const whirlpool = await whirlpool_client.getPool(samo_usdc_whirlpool_pubkey);
          const whirlpoolData = await whirlpool.getData(); 
          
          const inputTokenQuote = await swapQuoteByInputTokenWithDevFees(
            whirlpool,
            whirlpoolData.tokenMintB,
            new anchor.BN(190000000),
            Percentage.fromFraction(1, 1000), // 0.1%
            ORCA_WHIRLPOOL_PROGRAM_ID,
            whirlpool_client.getFetcher(),
            Percentage.fromFraction(2, 1000), // 0.2% of the input asset will be sent to DEV_WALLET
          );
          
          // Send out the transaction
          const txId = await (awaitownerA whirlpool.swapWithDevFees(inputTokenQuote, DEV_WALLET)).buildAndExecute();
          */
              }
        
  
              const samo_usdc_whirlpool = await whirlpool_client.getPool(samo_usdc_whirlpool_pubkey);
   
              const samo_usdc_whirlpool_data = samo_usdc_whirlpool.getData();
let ownerA, ownerB 
              USDC.mint = samo_usdc_whirlpool.getTokenAInfo().mint
              BONK.mint = samo_usdc_whirlpool.getTokenBInfo().mint
              USDC.decimals = samo_usdc_whirlpool.getTokenAInfo().decimals
              BONK.decimals = samo_usdc_whirlpool.getTokenBInfo().decimals
              for (var t of tokens.value){
                if (t.account.data.parsed.info.mint == USDC.mint.toBase58()){
                   usdcBal = t.account.data.parsed.info.tokenAmount.uiAmount
                  console.log("usdcBal", usdcBal)
                  ownerA = t.pubkey
                }
                // Wts-ignore
                if (t.account.data.parsed.info.mint == BONK.mint.toBase58()){
                   bonkBal = t.account.data.parsed.info.tokenAmount.uiAmount
                  console.log("bonkBal", bonkBal)
                  ownerB = t.pubkey
          
                }
              }

      var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }
      const position_ta = (await resolveOrCreateATA(connection, xnft.solana.publicKey, position_mint, rent_ta)).address;
  
      const bumps = { positionBump: position_pda.bump };
      const tickLowerIndex = samo_usdc_whirlpool_data.tickCurrentIndex - samo_usdc_whirlpool_data.tickSpacing - samo_usdc_whirlpool_data.tickSpacing * 2
      const tickUpperIndex =samo_usdc_whirlpool_data.tickCurrentIndex - samo_usdc_whirlpool_data.tickSpacing + samo_usdc_whirlpool_data.tickSpacing * 2
      var threadName = (Math.floor(Math.random()*9999999)).toString()
     
       var threadName = (Math.floor(Math.random()*9999999)).toString()
      var [hydra] = PublicKey.findProgramAddressSync(
        [Buffer.from(SEED_QUEUE, 'utf-8'), xnft.solana.publicKey.toBuffer(), Buffer.from(threadName, 'utf-8')],
        CLOCKWORK_THREAD_PROGRAM_ID,
      );
      console.log(`Thread id: ${threadName}, address: ${hydra.toBase58()}`);
     
  let mint = "5PaPttuTjVqMn2gtTmuwdfsV53oi8h7qhdcgeMbELZdM"
  let ata = "6WnLwm8yGX65VTDtn3ow4gPdPUdBxbyN8DyaKiZG7cpm"
  async function getMetadataPDA(mint2) 
  {
    const [publicKey] = await PublicKey.findProgramAddress(
      [Buffer.from("metadata"), 
      (new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")).toBuffer(), 
      (new PublicKey(mint2)).toBuffer()],
      (new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"))
    );
    return publicKey;
  }
  let metadata = await getMetadataPDA(mint);
  
  for (var a of []){
    break
    console.log(a)
    if (a.creators[0].address =="2vvwMrLjT6aUoEHxMLGsdZEtDhFdsPcqtf8YgaJsGsgZ"){
      console.log('ice cream')
      mint = a.id 
      try {
      let atas = await connection.getParsedTokenAccountsByOwner(window.xnft.solana.publicKey, {mint: new PublicKey(mint)})
      ata = atas.value[0].pubkey.toBase58()
    
  
  metadata = await getMetadataPDA(mint);
      } catch (err){
        
   mint = "5PaPttuTjVqMn2gtTmuwdfsV53oi8h7qhdcgeMbELZdM"
   ata = "6WnLwm8yGX65VTDtn3ow4gPdPUdBxbyN8DyaKiZG7cpm"
      }
    }
  }
  let c = 0
    let reward_ta, reward_ta2
        const reward_info = samo_usdc_whirlpool_data.rewardInfos[0];
        if ( PoolUtil.isRewardInitialized(reward_info) ) {
          c++
          var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }
          
           reward_ta = await resolveOrCreateATA(connection, xnft.solana.publicKey, reward_info.mint, rent_ta);
        }
        const reward_info2 = samo_usdc_whirlpool_data.rewardInfos[1];
        if ( PoolUtil.isRewardInitialized(reward_info2) ) {
          c++
          var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }
          
            reward_ta2 = await resolveOrCreateATA(connection, xnft.solana.publicKey, reward_info2.mint, rent_ta);
        }
  
  
      var ixa = await program.methods
      .proxyOpenPosition(
        bumps,
      )
      .accounts({
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        funder: wallet,
        dev: new PublicKey("Gf3sbc5Jb62jH7WcTr3WSNGDQLk1w6wcKMZXKK1SC1E6"),
        owner: wallet,
      
  
        position: position_pda.publicKey,
        positionMint: position_mint,
        tokenOwnerAccountA:  (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenOwnerAccountB:  (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        mintA: USDC.mint,
        mintB: BONK.mint,
        positionTokenAccount: position_ta,
        whirlpool: samo_usdc_whirlpool_pubkey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
        authority
      })
      .instruction();
      let tx1 = new Transaction();
      tx1.add(ixa);
      tx1.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      tx1.feePayer = wallet;
      tx1.sign(position_mint_keypair);
      tixs2.push(tx1)
      // delegate authority of the position to the authority
        // and ata
        const delegateIx = Token.createApproveInstruction(
          TOKEN_PROGRAM_ID,
          position_ta,
          authority,
          window.xnft.solana.publicKey,
          [],
          DecimalUtil
            .fromNumber(1)
            .toNumber(),
        );
  
        ixs.push(delegateIx)
      const threadProgram = await new anchor.Program(
        ThreadProgramIdl_v1_3_15,
        CLOCKWORK_THREAD_PROGRAM_ID,
        provider,
      )
   var wagering = (bonkBal / 10)
    var quote = increaseLiquidityQuoteByInputToken(
      BONK.mint,
      DecimalUtil.fromNumber((wagering)),
      // @ts-ignore
      tickLowerIndex,
      // @ts-ignore
      tickUpperIndex,
      Percentage.fromFraction(1000, 1000),
      samo_usdc_whirlpool,
    );
    wagering = (usdcBal / 10)
    var quote2 = increaseLiquidityQuoteByInputToken(
      USDC.mint,
      DecimalUtil.fromNumber((wagering)),
      // @ts-ignore
      tickLowerIndex,
      // @ts-ignore
      tickUpperIndex,
      Percentage.fromFraction(1000, 1000),
      samo_usdc_whirlpool,
    );
  
  let ix_transfer_usdc = await Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    (await resolveOrCreateATA(connection, window.xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
    authority,
    xnft.solana.publicKey,
  
  
  [],
 usdcBal + bonkBal 
  );
  
  ixs.push(ix_transfer_usdc)
  let ix_transfer_bonk = await Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    (await resolveOrCreateATA(connection, window.xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
    authority, 
    xnft.solana.publicKey,
    
  
  [],
  
 usdcBal + bonkBal );
  ixs.push(ix_transfer_bonk)
    var threadName = (Math.floor(Math.random()*9999999)).toString()
   
     var threadName = (Math.floor(Math.random()*9999999)).toString()
    var [hydra] = PublicKey.findProgramAddressSync(
      [Buffer.from(SEED_QUEUE, 'utf-8'), xnft.solana.publicKey.toBuffer(), Buffer.from(threadName, 'utf-8')],
      CLOCKWORK_THREAD_PROGRAM_ID,
    );
    console.log(`Thread id: ${threadName}, address: ${hydra.toBase58()}`);
   
        var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }
  
        //console.log("reward", position_data.rewardInfos[reward_index].amountOwed.toString());
        var threadName = (Math.floor(Math.random()*9999999)).toString()
       
       var threadName = (Math.floor(Math.random()*9999999)).toString()
      var [hydra] = PublicKey.findProgramAddressSync(
        [Buffer.from(SEED_QUEUE, 'utf-8'), xnft.solana.publicKey.toBuffer(), Buffer.from(threadName, 'utf-8')],
        CLOCKWORK_THREAD_PROGRAM_ID,
      );
      console.log(`Thread id: ${threadName}, address: ${hydra.toBase58()}`);
     
        ixs.push(SystemProgram.transfer({
          /** Account that will transfer lamports */
          fromPubkey: wallet,
          /** Account that will receive transferred lamports */
          toPubkey: hydra,
          /** Amount of lamports to transfer */
          lamports: 0.09 * 10 ** 9
        }))
        var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }
      
        var ix 
       ix = await program.methods
        .proxyIncreaseLiquidity(
          quote.liquidityAmount ,
          quote.tokenMaxA ,
         quote.tokenMaxB,
          bump 
        )
        .accounts({
          hydra,
          whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
          whirlpool: samo_usdc_whirlpool_pubkey,
          tokenProgram: TOKEN_PROGRAM_ID,
          position: position_pda.publicKey,
          positionTokenAccount: position_ta,
          
          rewardOwnerAccount: reward_ta != undefined ? reward_ta.address : (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
          rewardVault: reward_ta != undefined ? reward_info.vault : (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
  
          rewardOwnerAccount2: reward_ta2 != undefined ? reward_ta2.address : (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
          rewardVault2: reward_ta2 != undefined ? reward_info2.vault : (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
          positionMint: position_mint,
          tokenOwnerAccountA:  (await resolveOrCreateATA(connection, authority, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
          tokenOwnerAccountB:  (await resolveOrCreateATA(connection, authority, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
          mintA: BONK.mint,
          mintB: USDC.mint,
          tokenVaultA: samo_usdc_whirlpool.getData().tokenVaultA,
          tokenVaultB: samo_usdc_whirlpool.getData().tokenVaultB,
  
          // @ts-ignore
          tickArrayLower: PDAUtil.getTickArrayFromTickIndex(tickLowerIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
         
        // @ts-ignore
         tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(tickUpperIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
          authority,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .instruction();
        var trigger = {
          cron: {
            schedule: "5 * * * * * *",
            skippable: true,
          },
        };
        var magic = await threadProgram.methods
        .threadCreate(
          threadName,
          {
            accounts: ix.keys,
            programId: new PublicKey(ix.programId),
            data: ix.data,
          },
           trigger
        )
        .accounts({
          authority: wallet.publicKey,
          payer: wallet.publicKey,
          thread: hydra,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .instruction();
        ixs.push(magic)
            }
  
  
    let i = 0
    for (var ix2 of ixs){
      console.log(i)
      i++
      tixs.push(new Transaction().add(ix2))
      tixs[tixs.length-1].recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      tixs[tixs.length-1].feePayer = wallet.publicKey
      //let sig = await clockworkProvider.anchorProvider.sendAndConfirm(tixs[tixs.length-1])
      //console.log(sig)
  
  
      }

      const sig2= await clockworkProvider.anchorProvider.sendAll(tixs2.map( function(t:any) {return {tx: t, signers: []}}), { skipPreflight: true})
      console.log(`Thread created: ${sig2}`);
      await connection.confirmTransaction(sig2[0], 'finalized')
      const sig = await clockworkProvider.anchorProvider.sendAll(tixs.map( function(t:any) {return {tx: t, signers: []}}), { skipPreflight: true})
      console.log(`Thread created: ${sig}`);
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "10px 0px",
        cursor: "pointer",
      }}
    >
      <View
        style={{
          display: "flex",
          padding: "0px 16px",
          paddingBottom: "10px",
        }}
      >
        <TextField
          placeholder="Search all assets"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          value={filter}
        />
      </View>
      <Button onClick={doathing} style={{ width: "100%" }}>
        <Text>Automate</Text>
      </Button>
      <View
        style={{
          display: "flex",
          flexGrow: 1,
          position: "relative",
        }}
      >
        <ScrollBar>
          {filteredList &&
            filteredList.map((token) =>
              renderToken(tokenInfos[token], favorites[token], nav)
            )}
          {!filteredList &&
            favoritesList.map((token) =>
              renderToken(tokenInfos[token], favorites[token], nav)
            )}
          {!filteredList &&
            nonFavoritesList.map((token) =>
              renderToken(tokenInfos[token], favorites[token], nav)
            )}
        </ScrollBar>
      </View>
    </View>
  );
}

function renderToken(
  token: TokenInfoType,
  isFavorited: boolean,
  nav: ReturnType<typeof useNavigation>
) {
  const changePercent = formatPrice(token.price_change_percentage_24h);
  const currentPrice = formatPrice(token.current_price);
  const Arrow =
    (token.price_change_percentage_24h ?? 0) + 0 > 0 ? (
      <ArrowUpIcon isFilled={true} color={green} height={10} width={15} />
    ) : (
      <ArrowDownIcon isFilled={true} color={red} height={10} width={15} />
    );
  const color = (token.price_change_percentage_24h ?? 0) + 0 > 0 ? green : red;

  return (
    <View
      style={{
        padding: "8px 16px",
        display: "flex",
        position: "relative",
      }}
      key={token.id}
      onClick={() => nav.push("details", { token })}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          paddingRight: "12px",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: "34px",
            // padding:"5px"
          }}
          src={token.image}
        />
        <Image
          style={{
            width: "34px",
            // padding:"5px"
          }}
          src={token.image2}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            font: "Inter",
            lineHeight: "24px",
            fontSize: "16px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >{`${token.name}${isFavorited ? " ★" : ""}`}</Text>
        <Text
          style={{
            font: "Inter",
            lineHeight: "24px",
            fontSize: "16px",
            color: "#A1A1AA",
          }}
        >{`${token.symbol.toLocaleUpperCase()}`}</Text>
      </View> 
      <View
        style={{
          position: "relative",
          minWidth: "71px",
        }}
      >
        <Text
          style={{
            font: "Inter",
            fontSize: "16px",
            textAlign: "right",
            fontFeatureSettings: "tnum",
          }}
        >{`${currentPrice}`}</Text>
        <Text
          style={{
            font: "Inter",
            fontSize: "16px",
            textAlign: "right",
            paddingRight: "16px",
            fontFeatureSettings: "tnum",
            color: color,
          }}
        >{`${changePercent}%`}</Text>
        <View
          style={{
            position: "absolute",
            right: "0px",
            top: "32px",
          }}
        >
          {Arrow}
        </View>
      </View>
    </View>
  );
}

const selector = createSelector(
  (state: StateType) => state.tokenInfos,
  (state: StateType) => state.tokenList,
  (state: StateType) => state.favorites,
  (tokenInfos, tokenList, favorites) => ({ tokenInfos, tokenList, favorites })
);

export default connect<Props, StateProps>(selector)(TokenList);
