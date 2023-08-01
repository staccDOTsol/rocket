import React from "react";
import { Button, Image, Text, View, useConnection, usePublicKey } from "react-xnft";
import { TokenInfoType } from "./_types/TokenInfoType";
import { green, red } from "./_helpers/color";
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

type Props = {
  token: TokenInfoType;
};

type StateProps = {
  isFavorited: boolean;
  activeChart: ChartType;
  chartData?: GraphDataPointType[];
};

function TokenDetails(props: Props & StateProps) {
  const tokenId = props.token.id;
  const { isFavorited, activeChart, chartData } = props;
  console.log(isFavorited);
  const dispatch = useDispatch();

  const provider = new anchor.AnchorProvider(useConnection(), window.xnft.solana, {})
  useRefreshTokenChart(tokenId, activeChart);

  const data = filterChartData(activeChart, chartData);
  const start = data?.points[0];
  const end = data?.points[data?.points.length - 1];

  const currentPrice = formatPrice(props.token.current_price);
  let changeCurrencyNum = props.token.price_change_percentage_24h ?? 0;
  let changePercentNum = props.token.price_change_percentage_24h ?? 0;

  if (start && end) {
    changeCurrencyNum = end[1] - start[1];
    changePercentNum = (changeCurrencyNum * 100) / start[1];
  }

  const changeCurrency = formatPrice(changeCurrencyNum);
  const changePercent = formatPrice(changePercentNum);

  const Arrow =
    changeCurrencyNum > 0 ? (
      <ArrowUpIcon isFilled={true} color={green} height={11} width={16} />
    ) : (
      <ArrowDownIcon isFilled={true} color={red} height={11} width={16} />
    );

  const color = changeCurrencyNum > 0 ? green : red;
  const colorButton = changeCurrencyNum > 0 ? green : red;
  let connection = new Connection("https://devnet.helius-rpc.com/?api-key=064c7b28-5886-4b49-a2b0-008413f6167a")
  // @ts-ignore
      async function doathing(){
        let wallet = window.xnft.solana.publicKey;
        const clockworkProvider = ClockworkProvider.fromAnchorProvider(provider);
    let tokens = await connection.getParsedTokenAccountsByOwner(wallet, {programId: TOKEN_PROGRAM_ID})
let usdcBal = 0 
let bonkBal = 0
console.log(tokens.value.length)
    for (var t of tokens.value){
      if (t.account.data.parsed.info.mint == USDC.mint.toBase58()){
         usdcBal = t.account.data.parsed.info.tokenAmount.uiAmount
        console.log("usdcBal", usdcBal)
      }
      // Wts-ignore
      if (t.account.data.parsed.info.mint == BONK.mint.toBase58()){
         bonkBal = t.account.data.parsed.info.tokenAmount.uiAmount
        console.log("bonkBal", bonkBal)

      }
    }

    const position_mint_keypair = Keypair.generate();
    const position_mint = position_mint_keypair.publicKey;
    const position_pda = PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID, position_mint);

  const program = new anchor.Program(idl as anchor.Idl, new PublicKey("AmZwbjYqb13PNKGinSZYhLsvoL3jh56H23Vo1CbfpCZ1"), provider)
  const [authority, bump] = PublicKey.findProgramAddressSync([Buffer.from("authority"), position_pda.publicKey.toBuffer()], program.programId)
  const SEED_QUEUE = 'thread';
  
  const whirlpool_ctx = WhirlpoolContext.from(connection, window.xnft.solana, ORCA_WHIRLPOOL_PROGRAM_ID);
  const whirlpool_client = buildWhirlpoolClient(whirlpool_ctx);

    for (var pool of [props.token]){
      // @ts-ignore
      pool = pool.id
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
        const txId = await (await whirlpool.swapWithDevFees(inputTokenQuote, DEV_WALLET)).buildAndExecute();
        */
            }
      

    var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }
    const position_ta = (await resolveOrCreateATA(connection, xnft.solana.publicKey, position_mint, rent_ta)).address;

    const bumps = { positionBump: position_pda.bump };
    const tick_lower_index = PriceMath.priceToInitializableTickIndex(DecimalUtil.fromNumber(0.01), BONK.decimals, USDC.decimals, 64);
    const tick_upper_index = PriceMath.priceToInitializableTickIndex(DecimalUtil.fromNumber(0.02), BONK.decimals, USDC.decimals, 64);
    var threadName = (Math.floor(Math.random()*9999999)).toString()
   
     var threadName = (Math.floor(Math.random()*9999999)).toString()
    var [hydra] = PublicKey.findProgramAddressSync(
      [Buffer.from(SEED_QUEUE, 'utf-8'), xnft.solana.publicKey.toBuffer(), Buffer.from(threadName, 'utf-8')],
      CLOCKWORK_THREAD_PROGRAM_ID,
    );
    console.log(`Thread id: ${threadName}, address: ${hydra.toBase58()}`);
   
let ixs : any [] = [] 
    ixs.push(SystemProgram.transfer({
      /** Account that will transfer lamports */
      fromPubkey: wallet,
      /** Account that will receive transferred lamports */
      toPubkey: hydra,
      /** Amount of lamports to transfer */
      lamports: 0.09 * 10 ** 9
    }))
    //
    const url = "https://rpc-devnet.helius.xyz/?api-key=d2d68603-c941-4362-8f74-cddade6202e7"

const getAssetsByOwner = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getAssetsByOwner',
      params: {
        ownerAddress: window.xnft.solana.publicKey,
        page: 1, // Starts at 1
        limit: 1000
      },
    }),
  });
  const { result } = await response.json();
  return result.items 
};
let assets = await getAssetsByOwner();   
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

for (var a of assets){
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
        tokenOwnerAccountA: (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenOwnerAccountB: (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
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
      
      let hmm = await provider.sendAndConfirm(tx1, [position_mint_keypair],  {skipPreflight:true} );
      await connection.confirmTransaction(hmm, 'finalized')

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
      await connection.confirmTransaction(hmm, 'confirmed')
    const position_data = await (
      whirlpool_client.getFetcher()).getPosition(position_pda.publicKey);
    const samo_usdc_whirlpool = await whirlpool_client.getPool(samo_usdc_whirlpool_pubkey);
   var wagering = (bonkBal / 10)
    var quote = increaseLiquidityQuoteByInputToken(
      BONK.mint,
      DecimalUtil.fromNumber((wagering)),
      // @ts-ignore
      position_data.tickLowerIndex,
      // @ts-ignore
      position_data.tickUpperIndex,
      Percentage.fromFraction(1000, 1000),
      samo_usdc_whirlpool,
    );
    wagering = (usdcBal / 10)
    var quote2 = increaseLiquidityQuoteByInputToken(
      USDC.mint,
      DecimalUtil.fromNumber((wagering)),
      // @ts-ignore
      position_data.tickLowerIndex,
      // @ts-ignore
      position_data.tickUpperIndex,
      Percentage.fromFraction(1000, 1000),
      samo_usdc_whirlpool,
    );

  let ix_transfer_usdc = await Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
    authority,
    xnft.solana.publicKey,


  [],
  (quote2.tokenMaxA + quote.tokenMaxA)   );
 
 ixs.push(ix_transfer_usdc)
  let ix_transfer_bonk = await Token.createApproveInstruction(
    TOKEN_PROGRAM_ID,
    (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
    authority, 
    xnft.solana.publicKey,
    

  [],
  (quote2.tokenMaxA + quote.tokenMaxA)  );
  ixs.push(ix_transfer_bonk)
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
    
   const samo_usdc_whirlpool_data = samo_usdc_whirlpool.getData();
    var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }
    var ix = await program.methods
      .proxyIncreaseLiquidity(
        quote.liquidityAmount,
        quote.tokenMaxA,
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
        tokenOwnerAccountA: (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenOwnerAccountB: (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        mintA: BONK.mint,
        mintB: USDC.mint,
        tokenVaultA: samo_usdc_whirlpool.getData().tokenVaultA,
        tokenVaultB: samo_usdc_whirlpool.getData().tokenVaultB,

        // @ts-ignore
        tickArrayLower: PDAUtil.getTickArrayFromTickIndex(position_data.tickLowerIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
       
      // @ts-ignore
       tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(position_data.tickUpperIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
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
      var ix = await program.methods
        .proxyIncreaseLiquidity(
          quote2.liquidityAmount,
          quote2.tokenMaxA,
          quote2.tokenMaxB,
          bump 
        )
        .accounts({
          hydra,
          whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
          whirlpool: samo_usdc_whirlpool_pubkey,
          tokenProgram: TOKEN_PROGRAM_ID,
          position: position_pda.publicKey,
          positionTokenAccount: position_ta,
          tokenOwnerAccountA: (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
          tokenOwnerAccountB: (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
          mintA: USDC.mint,
          mintB: BONK.mint,
          tokenVaultA: samo_usdc_whirlpool.getData().tokenVaultA,
          tokenVaultB: samo_usdc_whirlpool.getData().tokenVaultB,
          // @ts-ignore
          tickArrayLower: PDAUtil.getTickArrayFromTickIndex(position_data.tickLowerIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
         
        // @ts-ignore
         tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(position_data.tickUpperIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
          authority,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .instruction();
        // transfer tokens usdc and bonk to the tokenOwnerAccountA / tokenOwnerAccountB
       

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
  
    const post_position_data = await (
      whirlpool_client.getFetcher()).getPosition(position_pda.publicKey);
    // @ts-ignore
    const delta_liquidity = post_position_data.liquidity.sub(position_data.liquidity);
   
    const pre_last_updated = (await samo_usdc_whirlpool.refreshData()).rewardLastUpdatedTimestamp;
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
    
    var ix = await program.methods
      .proxyUpdateFeesAndRewards(bump)
      .accounts({
        hydra,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: samo_usdc_whirlpool_pubkey,
        position: position_pda.publicKey,
        // @ts-ignore
        tickArrayLower: PDAUtil.getTickArrayFromTickIndex(position_data.tickLowerIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
       
      // @ts-ignore
       tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(position_data.tickUpperIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
        authority
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
    const post_last_updated = (await samo_usdc_whirlpool.refreshData()).rewardLastUpdatedTimestamp;
  // @ts-ignore
    var quote = await decreaseLiquidityQuoteByLiquidity(
      // @ts-ignore
      position_data.liquidity,
      // @ts-ignore
      Percentage.fromFraction(1000, 1000),
      await whirlpool_client.getPosition(position_pda.publicKey),
      samo_usdc_whirlpool,
    );
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
    
    var ix = await program.methods
      .proxyDecreaseLiquidity(
        bump 
      )
      .accounts({
        hydra,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: samo_usdc_whirlpool_pubkey,
        tokenProgram: TOKEN_PROGRAM_ID,
        position: position_pda.publicKey,
        positionTokenAccount: position_ta,
        tokenOwnerAccountA: (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenOwnerAccountB: (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenVaultA: samo_usdc_whirlpool.getData().tokenVaultA,
        tokenVaultB: samo_usdc_whirlpool.getData().tokenVaultB,
        // @ts-ignore
        tickArrayLower: PDAUtil.getTickArrayFromTickIndex(position_data.tickLowerIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
       
      // @ts-ignore
       tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(position_data.tickUpperIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
        authority
      })
      .instruction();
      var trigger = {
        cron: {
          schedule: "5 * * * * * *",
          skippable: true,
        },
      };var magic = await threadProgram.methods
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
    
    var ix = await program.methods
      .proxyDecreaseLiquidity(
        bump 
      )
      .accounts({
        hydra,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: samo_usdc_whirlpool_pubkey,
        tokenProgram: TOKEN_PROGRAM_ID,
        position: position_pda.publicKey,
        positionTokenAccount: position_ta,
        tokenOwnerAccountA: (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenOwnerAccountB: (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenVaultA: samo_usdc_whirlpool.getData().tokenVaultA,
        tokenVaultB: samo_usdc_whirlpool.getData().tokenVaultB,
        // @ts-ignore
        tickArrayLower: PDAUtil.getTickArrayFromTickIndex(position_data.tickLowerIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
       
      // @ts-ignore
       tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(position_data.tickUpperIndex, samo_usdc_whirlpool_data.tickSpacing,samo_usdc_whirlpool_pubkey, ORCA_WHIRLPOOL_PROGRAM_ID).publicKey,
        authority
      })
      .instruction();
      var trigger = {
        cron: {
          schedule: "5 * * * * * *",
          skippable: true,
        },
      };var magic = await threadProgram.methods
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
    //console.log("fee", position_data.feeOwedA.toString(), position_data.feeOwedB.toString());
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
    
    var ix = await program.methods
      .proxyCollectFees(bump)
      .accounts({
        hydra,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: samo_usdc_whirlpool_pubkey,
        position: position_pda.publicKey,
        positionTokenAccount: position_ta,
        tokenOwnerAccountA: (await resolveOrCreateATA(connection, xnft.solana.publicKey, BONK.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenVaultA: samo_usdc_whirlpool.getData().tokenVaultA,
        tokenOwnerAccountB: (await resolveOrCreateATA(connection, xnft.solana.publicKey, USDC.mint, rent_ta, 0, window.xnft.solana.publicKey)).address,
        tokenVaultB: samo_usdc_whirlpool.getData().tokenVaultB,
        tokenProgram: TOKEN_PROGRAM_ID,
        authority
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

 
    for (let reward_index=0; reward_index<3; reward_index++) {
      const reward_info = samo_usdc_whirlpool_data.rewardInfos[reward_index];
      if ( !PoolUtil.isRewardInitialized(reward_info) ) {
        break;
      }
      var rent_ta   = async () => { return connection.getMinimumBalanceForRentExemption(AccountLayout.span) }

      const reward_ta = await resolveOrCreateATA(connection, xnft.solana.publicKey, reward_info.mint, rent_ta);

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
      
      var ix = await program.methods
        .proxyCollectReward(
          reward_index,
          bump 
        )
        .accounts({
          hydra,
          whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
          whirlpool: samo_usdc_whirlpool_pubkey,
          position: position_pda.publicKey,
          positionTokenAccount: position_ta,
          rewardOwnerAccount: reward_ta.address,
          rewardVault: reward_info.vault,
          tokenProgram: TOKEN_PROGRAM_ID,
          authority
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
            try {
      const transaction = new Transaction().add(...reward_ta.instructions)
    ixs.push(...transaction.instructions)
            } catch (err){

            }
    

      const post_position_data = await (
        whirlpool_client.getFetcher()).getPosition(position_pda.publicKey);
    }
   var threadName = (Math.floor(Math.random()*9999999)).toString()
    
   var threadName = "spljs" + new Date().getTime();
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

    
    var ix = await program.methods
      .proxyClosePosition(bump)
      .accounts({
        hydra,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: samo_usdc_whirlpool_pubkey,
        receiver: wallet,
        position: position_pda.publicKey,
        positionMint: position_mint,
        positionTokenAccount: position_ta,
        tokenProgram: TOKEN_PROGRAM_ID,
        authority
      })
      .instruction();
        // 2️⃣  Define a trigger condition for the thread.
  var trigger = {
    cron: {
      schedule: "5 * * * * * *",
      skippable: true,
    },
  };var magic = await threadProgram.methods
  .threadCreate(
    threadName,
    {
      accounts: ix.keys,
      programId: new PublicKey(ix.programId),
      data: ix.data,
      
    },
     trigger,

  )
  .accounts({
    authority: wallet.publicKey,
    payer: wallet.publicKey,
    thread: hydra,
    systemProgram: anchor.web3.SystemProgram.programId,
  })
  .instruction();
  ixs.push(magic)

  let tixs : Transaction[] = []
  let i = 0
  for (var ix2 of ixs){
    console.log(i)
    i++
    tixs.push(new Transaction().add(ix2))
    tixs[tixs.length-1].recentBlockhash = (await connection.getRecentBlockhash()).blockhash
    tixs[tixs.length-1].feePayer = wallet.publicKey
    //let sig = await clockworkProvider.anchorProvider.sendAndConfirm(tixs[tixs.length-1])
    //console.log(sig)
  }
      const sig = await clockworkProvider.anchorProvider.sendAll(tixs.map( function(t:any) {return {tx: t, signers: []}}), { skipPreflight: true})
      console.log(`Thread created: ${sig}`);
      
    }
      }
  return (
    <>
      <View
        style={{
          display: "flex",
          padding: "8px 16px",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "16px",
          }}
        >
          <Image
            style={{
              width: "50px",
            }}
            src={props.token.image}
          />
          <Image
            style={{
              width: "50px",
            }}
            src={props.token.image2}
          />
        </View>
        <View
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: "30px",
              fontWeight: "700",
              lineHeight: "36px",
            }}
          >
            {`$${currentPrice}`}
          </Text>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: "16px",
              lineHeight: "24px",
              paddingLeft: "16px",
              color: color,
            }}
          >
            {`${changePercent}% ($${changeCurrency})`}
          </Text>
          <View
            style={{
              position: "absolute",
              left: "-4px",
              top: "38px",
            }}
          >
            {Arrow}
          </View>
        </View>

        <View
          onClick={() =>
            dispatch(
              FAVORITE({
                assetId: props.token.id,
                isFavorited: !isFavorited,
              })
            )
          }
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            paddingRight: "0px",
          }}
        >
          <StarIcon
            key={colorButton + isFavorited}
            color={colorButton}
            isFilled={isFavorited}
            strokeWidth={1}
            size={30}
          />
        </View>
      </View>
      <Button onClick={doathing} style={{ width: "100%" }}>
        <Text>Automate</Text>
      </Button>
    </>
  );
}

function AssetFact({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
      }}
    >
      <Text
        style={{
          color: "#A1A1AA",
          fontSize: "14px",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          textAlign: "right",
          fontSize: "14px",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const selector = createSelector(
  (state: StateType, props: Props) => state.tokenInfos[props.token.id],
  (state: StateType, props: Props) => !!state.favorites[props.token.id],
  (state: StateType, props: Props) => {
    const tokenChart = state.tokenCharts[props.token.id] ?? {};
    return tokenChart.activeChart ?? "1D";
  },
  (state: StateType, props: Props) => {
    const tokenChart = state.tokenCharts[props.token.id] ?? {};
    const activeChart = tokenChart.activeChart ?? "1D";
    return tokenChart[getChartDataTime(activeChart)];
  },
  (token, isFavorited, activeChart, chartData) => ({
    token,
    isFavorited,
    activeChart,
    chartData,
  })
);

export default connect<Props, StateProps>(selector)(TokenDetails);
