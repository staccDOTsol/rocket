import { useEffect } from "react";
import { useDispatch } from "../../state";
import { SET_TOKENLIST } from "../_actions/SET_TOKENLIST";
import { TokenListType } from "../_types/TokenListType";
import { ORCA_WHIRLPOOL_PROGRAM_ID, WhirlpoolContext, buildWhirlpoolClient } from "@orca-so/whirlpools-sdk";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { useConnection } from "react-xnft";

const refreshtime = 1000 * 60;
const count = 250;
const url = `https://api.mainnet.orca.so/v1/whirlpool/list`;

function useRefreshTokenList() {
  const dispatch = useDispatch();
  let connection = useConnection();
  useEffect(() => {
    const fetchTokenList = () => {
      fetch(url)
        .then(async (response) => {
          const jsona = await response.json();
          let json: TokenListType = []
          let goodLogo = ""

      const whirlpool_ctx = WhirlpoolContext.from(connection, window.xnft.solana, ORCA_WHIRLPOOL_PROGRAM_ID);
      const whirlpool_client = buildWhirlpoolClient(whirlpool_ctx);

         json= [
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1256304677646796,
              "sparkline_in_7d": {
                  "price": [
                      25.714175291333696,
                      21.5108423660364,
                      15.760286993760705
                  ]
              },
              "id": "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
              "symbol": "SOL-USDC",
              "name": "Wrapped Solana-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 26.33325947169108
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "price_change_percentage_24h": 0.007444063278307045,
              "sparkline_in_7d": {
                  "price": [
                      0.8857641397183805,
                      0.7718105280208879,
                      0.7718105280208879
                  ]
              },
              "id": "HQcY5n2zP6rW74fyFEhWeBd3LnJpBcZechkvJpmdb8cx",
              "symbol": "SOL-mSOL",
              "name": "Wrapped Solana-Marinade staked SOL",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "current_price": 0.8900900435833373
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "price_change_percentage_24h": 0.007187049114063537,
              "sparkline_in_7d": {
                  "price": [
                      0.8904789548762886,
                      0.8323041368266385,
                      0.8323041368266385
                  ]
              },
              "id": "2AEWSvUds1wsufnsDPCXjFsJCMJH5SNNm7fSF4kxys9a",
              "symbol": "SOL-stSOL",
              "name": "Wrapped Solana-Lido Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "current_price": 0.8949732528970488
          },
          {
              "tokenA": "RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.022742163974918045,
              "sparkline_in_7d": {
                  "price": [
                      0.10455191222684213,
                      0.06976757654229918,
                      0.018975169316420737
                  ]
              },
              "id": "6bskSanDywHt17rRXRbnx1zoErCeCpst5P4544s6cZka",
              "symbol": "RLB-USDC",
              "name": "Rollbit Coin-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/24552/large/unziL6wO_400x400.jpg?1648134494",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.10818662371049727
          },
          {
              "tokenA": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "tokenB": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "price_change_percentage_24h": 0.0047379056057730295,
              "sparkline_in_7d": {
                  "price": [
                      1.0035662685363096,
                      0.9990007138562375,
                      0.9977968634430401
                  ]
              },
              "id": "DvgSQJyx6JNaPzmhBwzWw6rntGBQCr5fmNnV2AfyEfCg",
              "symbol": "mSOL-stSOL",
              "name": "Marinade staked SOL-Lido Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "image2": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "current_price": 1.0053964512219322
          },
          {
              "tokenA": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "tokenB": "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
              "price_change_percentage_24h": 0.013216599667744244,
              "sparkline_in_7d": {
                  "price": [
                      1.0637728276559735,
                      1.0608507466406443,
                      1.0606429306439034
                  ]
              },
              "id": "8dxebMPEZjYJvE5JfC9iicZt9pkATBLW1PFgRHi5wGGv",
              "symbol": "mSOL-jitoSOL",
              "name": "Marinade staked SOL-Jito Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "image2": "https://assets.coingecko.com/coins/images/28046/large/JitoSOL-200.png?1667271467",
              "current_price": 1.072582990780608
          },
          {
              "tokenA": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1373495129123299,
              "sparkline_in_7d": {
                  "price": [
                      28.976304039133737,
                      24.13165923352304,
                      17.693475997923233
                  ]
              },
              "id": "AiMZS5U3JMvpdvsr1KeaMiS354Z1DeSg5XjA4yYRxtFf",
              "symbol": "mSOL-USDC",
              "name": "Marinade staked SOL-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 29.651965648851487
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1256304677646796,
              "sparkline_in_7d": {
                  "price": [
                      25.714175291333696,
                      21.5108423660364,
                      15.760286993760705
                  ]
              },
              "id": "HJPjoWUrhoZzkNfRpHuieeFk9WcZWjwy6PBjZ81ngndJ",
              "symbol": "SOL-USDC",
              "name": "Wrapped Solana-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 26.38646068032046
          },
          {
              "tokenA": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1546700226862008,
              "sparkline_in_7d": {
                  "price": [
                      28.80040593370175,
                      24.00248653771658,
                      17.55748676773205
                  ]
              },
              "id": "AXtdSZ2mpagmtM5aipN5kV9CyGBA8dxhSBnqMRp7UpdN",
              "symbol": "stSOL-USDC",
              "name": "Lido Staked SOL-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 29.494031141190472
          },
          {
              "tokenA": "RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a",
              "tokenB": "So11111111111111111111111111111111111111112",
              "price_change_percentage_24h": 0.0008653839395361684,
              "sparkline_in_7d": {
                  "price": [
                      0.003963161708063575,
                      0.002603155829883188,
                      0.0011441502735381008
                  ]
              },
              "id": "HwCngan6JmSxeYdizHxDLXUUi21ggoQgVPVSp9rP2Hk1",
              "symbol": "RLB-SOL",
              "name": "Rollbit Coin-Wrapped Solana",
              "image": "https://assets.coingecko.com/coins/images/24552/large/unziL6wO_400x400.jpg?1648134494",
              "image2": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "current_price": 0.004104433111976413
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1256304677646796,
              "sparkline_in_7d": {
                  "price": [
                      25.714175291333696,
                      21.5108423660364,
                      15.760286993760705
                  ]
              },
              "id": "83v8iPyZihDEjDdY8RdZddyZNyUtXngz69Lgo9Kt5d6d",
              "symbol": "SOL-USDC",
              "name": "Wrapped Solana-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 26.3333946686133
          },
          {
              "tokenA": "UXPhBoR3qG4UCiGNJfV7MqhHyFqKN68g45GoYvAeL2M",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0027213641809752213,
              "sparkline_in_7d": {
                  "price": [
                      0.009043578759728256,
                      0.008297426512031917,
                      0.005539823903641822
                  ]
              },
              "id": "9r5v3ZTSZaRkRANZ5PSxh32ry4udrvtYmxypQG3XJbqN",
              "symbol": "UXP-USDC",
              "name": "UXD Protocol-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/20319/large/UXP.jpg?1636864568",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.011781360664852249
          },
          {
              "tokenA": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "tokenB": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "price_change_percentage_24h": 0.002785232115982361,
              "sparkline_in_7d": {
                  "price": [
                      0.9984420322741191,
                      0.9965072591563591,
                      0.9960601425149138
                  ]
              },
              "id": "4fuUiYxTQ6QCrdSq9ouBYcTM7bqSwYTSyLueGZLTy4T4",
              "symbol": "USDC-USDT",
              "name": "USD Coin-Tether",
              "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "image2": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
              "current_price": 1.0000351424072802
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "8phK65jxmTPEN158xLgSr4oZvssw9SyTErpNZj3g7px4",
              "symbol": "SOL-bSOL",
              "name": "Wrapped Solana-BlazeStake Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/26636/large/blazesolana.png?1659328728",
              "current_price": 0.9357138108623173
          },
          {
              "tokenA": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "tokenB": "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
              "price_change_percentage_24h": 0.0006349956409848721,
              "sparkline_in_7d": {
                  "price": [
                      0.015078435257362237,
                      0.012898349453128026,
                      0.009564498946383072
                  ]
              },
              "id": "Db4AyCBKyH5pcCxJuvQzWfFsVsSH6rM9sm21HbA4WU5",
              "symbol": "stSOL-whETH",
              "name": "Lido Staked SOL-Ethereum (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "image2": "https://assets.coingecko.com/coins/images/22990/large/ETH_wh_small.png?1644225466",
              "current_price": 0.015650991364137647
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "HxRELUQfvvjToVbacjr9YECdfQMUqGgPYB68jVDYxkbr",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "8axbhGwV8UzBoqRdpYAhhrESVAXLkJQVaYTUp2j1jtc2",
              "symbol": "SOL-NANA",
              "name": "Wrapped Solana-NANA Token",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://shdw-drive.genesysgo.net/EV1ARo89dwRzR1kv7JMr7V97qrcXjffkcwEuNHMJfJmz/Banan.png",
              "current_price": 2618.1153963234906
          },
          {
              "tokenA": "A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.014657775375455206,
              "sparkline_in_7d": {
                  "price": [
                      0.9930474401789232,
                      0.9697331622811235,
                      0.9543854954184644
                  ]
              },
              "id": "8hcwA1hr1bLGLHXBCadXWDgxsc1BTe4hAKPcQgTVNXL4",
              "symbol": "USDCet-USDC",
              "name": "USD Coin (Wormhole from Ethereum)-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/23019/large/USDCet_wh_small.png?1644223449",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.999592600595857
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1256304677646796,
              "sparkline_in_7d": {
                  "price": [
                      25.714175291333696,
                      21.5108423660364,
                      15.760286993760705
                  ]
              },
              "id": "21gTfxAnhUDjJGZJDkTXctGFKT8TeiXx6pN1CEg9K1uW",
              "symbol": "SOL-USDC",
              "name": "Wrapped Solana-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 26.356747308438724
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
              "price_change_percentage_24h": 2923355.2767689526,
              "sparkline_in_7d": {
                  "price": [
                      71420429.09822243,
                      63726495.88471656,
                      38911682.02525181
                  ]
              },
              "id": "3ne4mWqdYuNiYrYZC9TrA3FcfuFdErghH97vNPbjicr1",
              "symbol": "SOL-BONK",
              "name": "Wrapped Solana-Bonk",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1672304290",
              "current_price": 73470868.8113528
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
              "price_change_percentage_24h": 0.23064221463215695,
              "sparkline_in_7d": {
                  "price": [
                      11.566248471371066,
                      8.946696037006244,
                      6.293294246588137
                  ]
              },
              "id": "CPsTfDvZYeVB5uTqQZcwwTTBJ7KPFvB6JKLGSWsFZEL7",
              "symbol": "SOL-DUST",
              "name": "Wrapped Solana-DUST Protocol",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/24289/large/dust-protocol-degod.png?1647306854",
              "current_price": 11.613695429140355
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1256304677646796,
              "sparkline_in_7d": {
                  "price": [
                      25.714175291333696,
                      21.5108423660364,
                      15.760286993760705
                  ]
              },
              "id": "Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE",
              "symbol": "SOL-USDC",
              "name": "Wrapped Solana-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 26.33756051897697
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
              "price_change_percentage_24h": 2.4445530417314316,
              "sparkline_in_7d": {
                  "price": [
                      29.409399623793988,
                      28.75738928287375,
                      26.544454170842833
                  ]
              },
              "id": "HrvrhPtNq8JEGbi7dhMFuXy1Jms49nZrgC6GLjZ3cPyo",
              "symbol": "SOL-ORCA",
              "name": "Wrapped Solana-Orca",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/17547/large/Orca_Logo.png?1628781615",
              "current_price": 29.466696277296876
          },
          {
              "tokenA": "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 34.36294978673914,
              "sparkline_in_7d": {
                  "price": [
                      1883.8512021453564,
                      1860.8959716078748,
                      1716.7395364171377
                  ]
              },
              "id": "AU971DrPyhhrpRnmEBp5pDTWL2ny7nofb5vYBjDJkR2E",
              "symbol": "whETH-USDC",
              "name": "Ethereum (Wormhole)-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/22990/large/ETH_wh_small.png?1644225466",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 1885.0907880116927
          },
          {
              "tokenA": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.014199999523137441,
              "sparkline_in_7d": {
                  "price": [
                      0.9912993971303863,
                      0.9501998090566965,
                      0.9501998090566965
                  ]
              },
              "id": "Fvtf8VCjnkqbETA6KtyHYqHm26ut6w184Jqm4MQjPvv7",
              "symbol": "USDH-USDC",
              "name": "USDH-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.9972468149087871
          },
          {
              "tokenA": "RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a",
              "tokenB": "So11111111111111111111111111111111111111112",
              "price_change_percentage_24h": 0.0008653839395361684,
              "sparkline_in_7d": {
                  "price": [
                      0.003963161708063575,
                      0.002603155829883188,
                      0.0011441502735381008
                  ]
              },
              "id": "AHoX7W4sjiYQnjdbMLqr4NrBMZqTyoA6QoeRdNfgDez",
              "symbol": "RLB-SOL",
              "name": "Rollbit Coin-Wrapped Solana",
              "image": "https://assets.coingecko.com/coins/images/24552/large/unziL6wO_400x400.jpg?1648134494",
              "image2": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "current_price": 0.00407752127018483
          },
          {
              "tokenA": "SCSuPPNUSypLBsV4darsrYNg4ANPgaGhKhsA3GmMyjz",
              "tokenB": "So11111111111111111111111111111111111111112",
              "price_change_percentage_24h": 0.0000021088150936819492,
              "sparkline_in_7d": {
                  "price": [
                      0.00010515522415238766,
                      0.00010495116170859114,
                      0.00010495116170859114
                  ]
              },
              "id": "EEK88emhMYgmFPYvaPDxafBmu6LZAk6vQzYdUC8Tofxj",
              "symbol": "SCS-SOL",
              "name": "Solcasino Token-Wrapped Solana",
              "image": "https://assets.coingecko.com/coins/images/30228/large/logo_%282%29.png?1683633230",
              "image2": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "current_price": 0.00010709143887827497
          },
          {
              "tokenA": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "tokenB": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "price_change_percentage_24h": 0.016712187679009505,
              "sparkline_in_7d": {
                  "price": [
                      0.9897549846629718,
                      0.9499271209465914,
                      0.9499271209465914
                  ]
              },
              "id": "963Do8Jw6aKaRB7YLorAGrqAJqhWqVGAStkewfne1SX5",
              "symbol": "USDH-USDT",
              "name": "USDH-Tether",
              "image": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "image2": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
              "current_price": 0.9972232162303497
          },
          {
              "tokenA": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "tokenB": "HxRELUQfvvjToVbacjr9YECdfQMUqGgPYB68jVDYxkbr",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "7dHbARY1XjZfDPCbjb42yDbAKJTNgvDgNUNQR8Ak5Yen",
              "symbol": "USDC-NANA",
              "name": "USD Coin-NANA Token",
              "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "image2": "https://shdw-drive.genesysgo.net/EV1ARo89dwRzR1kv7JMr7V97qrcXjffkcwEuNHMJfJmz/Banan.png",
              "current_price": 98.6262096944479
          },
          {
              "tokenA": "MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey",
              "tokenB": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "price_change_percentage_24h": 0.000104102454961823,
              "sparkline_in_7d": {
                  "price": [
                      0.002111339011506428,
                      0.001859072348064502,
                      0.001859072348064502
                  ]
              },
              "id": "BVXNG6BrL2Tn3NmppnMeXHjBHTaQSnSnLE99JKwZSWPg",
              "symbol": "MNDE-mSOL",
              "name": "Marinade-Marinade staked SOL",
              "image": "https://assets.coingecko.com/coins/images/18867/large/MNDE.png?1643187748",
              "image2": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "current_price": 0.002190654579763631
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
              "price_change_percentage_24h": 0.009595876244111179,
              "sparkline_in_7d": {
                  "price": [
                      0.9476730686636486,
                      0.8342359771674587,
                      0.8342359771674587
                  ]
              },
              "id": "Hp53XEtt4S8SvPCXarsLSdGfZBuUr5mMmZmX2DRNXQKp",
              "symbol": "SOL-jitoSOL",
              "name": "Wrapped Solana-Jito Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/28046/large/JitoSOL-200.png?1667271467",
              "current_price": 0.954759012974859
          },
          {
              "tokenA": "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.08298916567224168,
              "sparkline_in_7d": {
                  "price": [
                      2.2147840973565733,
                      2.1258830852583244,
                      1.9993906649973914
                  ]
              },
              "id": "CpbNcvqxXdQyQ3SRPDPSwLfzd9sgzBm8TjRFsfJL7Pf4",
              "symbol": "DUST-USDC",
              "name": "DUST Protocol-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/24289/large/dust-protocol-degod.png?1647306854",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 2.2752912725172814
          },
          {
              "tokenA": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.07508848688261716,
              "sparkline_in_7d": {
                  "price": [
                      0.8228364712644837,
                      0.7480109600507797,
                      0.5298822191555285
                  ]
              },
              "id": "5Z66YYYaTmmx1R4mATAGLSc8aV4Vfy5tNdJQzk1GP9RF",
              "symbol": "ORCA-USDC",
              "name": "Orca-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/17547/large/Orca_Logo.png?1628781615",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.8951781636283798
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
              "price_change_percentage_24h": 0.0006010892995909362,
              "sparkline_in_7d": {
                  "price": [
                      0.013462641055108334,
                      0.011534753252580897,
                      0.00863013924129778
                  ]
              },
              "id": "HktfL7iwGKT5QHjywQkcDnZXScoh811k7akrMZJkCcEF",
              "symbol": "SOL-whETH",
              "name": "Wrapped Solana-Ethereum (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/22990/large/ETH_wh_small.png?1644225466",
              "current_price": 0.013977566919928887
          },
          {
              "tokenA": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.3077354919989687e-8,
              "sparkline_in_7d": {
                  "price": [
                      3.533877162028386e-7,
                      3.362543397719109e-7,
                      3.052287405249458e-7
                  ]
              },
              "id": "8QaXeHBrShJTdtN1rWCccBxpSVvKksQ2PCu5nufb2zbk",
              "symbol": "BONK-USDC",
              "name": "Bonk-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1672304290",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 3.5780991062694715e-7
          },
          {
              "tokenA": "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
              "tokenB": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "RFvYdVLEn3ZFjH1XcJJiHagowvgoZWqDMUp9ut5dTYg",
              "symbol": "bSOL-stSOL",
              "name": "BlazeStake Staked SOL-Lido Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/26636/large/blazesolana.png?1659328728",
              "image2": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "current_price": 0.9564772379980372
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
              "price_change_percentage_24h": 9.070551858848148,
              "sparkline_in_7d": {
                  "price": [
                      212.42532221000405,
                      178.77438983217198,
                      100.29442919673194
                  ]
              },
              "id": "DB7VtRPVePiVF513NKs2cb9QnEBWJZQRXap4TnWLd5xF",
              "symbol": "SOL-POLIS",
              "name": "Wrapped Solana-Star Atlas DAO",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/17789/large/POLIS.jpg?1629256006",
              "current_price": 214.2965712629965
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "CjZhHQnNUWdMtHzpJuxrPsK2hydeqKRyiMuzLQ3BMDkK",
              "symbol": "SOL-WBTC",
              "name": "Wrapped Solana-Wrapped BTC (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png",
              "current_price": 0.0008823933812459183
          },
          {
              "tokenA": "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0028386799007589225,
              "sparkline_in_7d": {
                  "price": [
                      0.9991341600489925,
                      0.9973570782454373,
                      0.9908447153976271
                  ]
              },
              "id": "GLNvG5Ly4cK512oQeJqnwLftwfoPZ4skyDwZWzxorYQ9",
              "symbol": "UXD-USDC",
              "name": "UXD Stablecoin-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/22850/large/UXD-White.png?1642747473",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.9999872161328421
          },
          {
              "tokenA": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "tokenB": "FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds",
              "price_change_percentage_24h": 1.2913808568648975,
              "sparkline_in_7d": {
                  "price": [
                      9.109009637233541,
                      8.841470031784821,
                      8.841470031784821
                  ]
              },
              "id": "5YL3N175fTaBwUEh6a6s72ZRj4D2nzc7HTrTzFG3jnwb",
              "symbol": "USDC-FORGE",
              "name": "USD Coin-Blocksmith Labs Forge",
              "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "image2": "https://assets.coingecko.com/coins/images/25411/large/Logo_%281%29.png?1651733020",
              "current_price": 9.186353780132189
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "5qrvgpvr55Eo7c5bBcwopdiQ6TpvceiRm42yjHTbtDvc",
              "symbol": "SOL-HNT",
              "name": "Wrapped Solana-Helium Network Token",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://solana.fm/api/image-proxy?imageUrl=https://shdw-drive.genesysgo.net/6tcnBSybPG7piEDShBcrVtYJDPSvGrDbVvXmXKpzBvWP/hnt.png",
              "current_price": 16.874306041051117
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1256304677646796,
              "sparkline_in_7d": {
                  "price": [
                      25.714175291333696,
                      21.5108423660364,
                      15.760286993760705
                  ]
              },
              "id": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
              "symbol": "SOL-USDC",
              "name": "Wrapped Solana-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 26.34764742249443
          },
          {
              "tokenA": "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.010693181012156855,
              "sparkline_in_7d": {
                  "price": [
                      0.23326192690989125,
                      0.22200055786735043,
                      0.19771193306085033
                  ]
              },
              "id": "7PNQ9rfSGCbCC3XTeL6CwwAzevqQGvKXeXMxP2TjS7rM",
              "symbol": "GMT-USDC",
              "name": "STEPN-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/23597/large/gmt.png?1644658792",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.2338237255203957
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "price_change_percentage_24h": 1.118965661826124,
              "sparkline_in_7d": {
                  "price": [
                      25.730607480896847,
                      21.515328694887096,
                      15.796932995651808
                  ]
              },
              "id": "5zVKUoZcQkFCGcRHVHiyGAJRrZj1by67pW3dmvguFvwd",
              "symbol": "SOL-USDT",
              "name": "Wrapped Solana-Tether",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
              "current_price": 26.40149530060897
          },
          {
              "tokenA": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "tokenB": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "price_change_percentage_24h": 1.129791500569283,
              "sparkline_in_7d": {
                  "price": [
                      28.994820834458338,
                      24.136692163298278,
                      17.704464163933242
                  ]
              },
              "id": "7A1R3L7AxcxuZHMJjFgskKGeBR5Rwst3Ai5bv5uAWZFG",
              "symbol": "mSOL-USDT",
              "name": "Marinade staked SOL-Tether",
              "image": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "image2": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
              "current_price": 29.66074348454172
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
              "price_change_percentage_24h": 468.6443650353276,
              "sparkline_in_7d": {
                  "price": [
                      6113.738685583539,
                      5791.257001749908,
                      3897.2861394504166
                  ]
              },
              "id": "4nAiqm5QiZiwh1sMpmuJJdVUH12Fst2kPPzApNfppQGd",
              "symbol": "SOL-SAMO",
              "name": "Wrapped Solana-Samoyedcoin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/15051/large/IXeEj5e.png?1619560738",
              "current_price": 6178.175047192524
          },
          {
              "tokenA": "EcQCUYv57C4V6RoPxkVUiDwtX1SP8y8FP5AEToYL8Az",
              "tokenB": "So11111111111111111111111111111111111111112",
              "price_change_percentage_24h": 0.0000739785583234434,
              "sparkline_in_7d": {
                  "price": [
                      0.0003975514851371466,
                      0.0003975514851371466,
                      0.0003975514851371466
                  ]
              },
              "id": "6ygxbLkLi3Z7VCdWqzduwHPmYjHnFWXVFtZbgMwtNnSf",
              "symbol": "WLKN-SOL",
              "name": "Walken-Wrapped Solana",
              "image": "https://assets.coingecko.com/coins/images/25566/large/wlkn.jpg?1652523301",
              "image2": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "current_price": 0.00041323914353343663
          },
          {
              "tokenA": "AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.01217175496764944,
              "sparkline_in_7d": {
                  "price": [
                      0.4176568057363773,
                      0.40362526385358993,
                      0.33116442061739404
                  ]
              },
              "id": "Gr7WKYBqRLt7oUkjZ54LSbiUf8EgNWcj3ogtN8dKbfeb",
              "symbol": "AURY-USDC",
              "name": "Aurory-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/19324/large/Ico_Blanc.png?1672824647",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.41354031626424426
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "price_change_percentage_24h": 1.2888604565229684,
              "sparkline_in_7d": {
                  "price": [
                      25.616623201000433,
                      21.559037416945934,
                      15.69989753219874
                  ]
              },
              "id": "AiZa55wSymdzwU9VDoWBrjizFjHdzDJFRNks2enP35sw",
              "symbol": "SOL-USDH",
              "name": "Wrapped Solana-USDH",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "current_price": 26.476044597978728
          },
          {
              "tokenA": "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "8JwS5zosnLFT84S1NebSp1HS6aeaxviXYS7jBh9PQ8vp",
              "symbol": "HNT-USDC",
              "name": "Helium Network Token-USD Coin",
              "image": "https://solana.fm/api/image-proxy?imageUrl=https://shdw-drive.genesysgo.net/6tcnBSybPG7piEDShBcrVtYJDPSvGrDbVvXmXKpzBvWP/hnt.png",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 1.564043720989985
          },
          {
              "tokenA": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "tokenB": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "price_change_percentage_24h": 0.0015159140488734055,
              "sparkline_in_7d": {
                  "price": [
                      0.03312646664849533,
                      0.030190365072856756,
                      0.030190365072856756
                  ]
              },
              "id": "4eJ1jCPysCrEH53VUAxgNT8BMccXsgHX1nX4FxXAUVWy",
              "symbol": "USDH-mSOL",
              "name": "USDH-Marinade staked SOL",
              "image": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "image2": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "current_price": 0.03361981419876171
          },
          {
              "tokenA": "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
              "tokenB": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "CwZbEdMZdxjnPLcRGRz8PwuvA4tK4iBmS9YZrMvnrNJr",
              "symbol": "bSOL-mSOL",
              "name": "BlazeStake Staked SOL-Marinade staked SOL",
              "image": "https://assets.coingecko.com/coins/images/26636/large/blazesolana.png?1659328728",
              "image2": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "current_price": 0.9513650966952132
          },
          {
              "tokenA": "MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0038675053761369274,
              "sparkline_in_7d": {
                  "price": [
                      0.06220500550881251,
                      0.057188377245756414,
                      0.0483636536714433
                  ]
              },
              "id": "3dvV75ULxUzuyg57ZwQiay5xfNNdxT6Y98LA11vQyneF",
              "symbol": "MNDE-USDC",
              "name": "Marinade-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/18867/large/MNDE.png?1643187748",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.06508783816709397
          },
          {
              "tokenA": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0003338867406692614,
              "sparkline_in_7d": {
                  "price": [
                      0.003986070104874938,
                      0.0036440440181294376,
                      0.003285119719875311
                  ]
              },
              "id": "FuvLSmZRY7X4tBciLbgVkSPLBW7v4d1i57D4sWd3ig8x",
              "symbol": "SAMO-USDC",
              "name": "Samoyedcoin-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/15051/large/IXeEj5e.png?1619560738",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.004294874918813696
          },
          {
              "tokenA": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0003338867406692614,
              "sparkline_in_7d": {
                  "price": [
                      0.003986070104874938,
                      0.0036440440181294376,
                      0.003285119719875311
                  ]
              },
              "id": "9vqYJjDUFecLL2xPUC4Rc7hyCtZ6iJ4mDiVZX7aFXoAe",
              "symbol": "SAMO-USDC",
              "name": "Samoyedcoin-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/15051/large/IXeEj5e.png?1619560738",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.0042974927803326795
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
              "price_change_percentage_24h": 743.0884751142039,
              "sparkline_in_7d": {
                  "price": [
                      16626.65261892162,
                      15662.463945553529,
                      9506.709669194888
                  ]
              },
              "id": "23YhpF9dECKeK3LPQRGFRcMXXsXXeMwWWutxSvKWZaBF",
              "symbol": "SOL-ATLAS",
              "name": "Wrapped Solana-Star Atlas",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/17659/large/Icon_Reverse.png?1628759092",
              "current_price": 17073.864690760303
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds",
              "price_change_percentage_24h": 30.549410910837054,
              "sparkline_in_7d": {
                  "price": [
                      242.88531951449372,
                      198.67581667149872,
                      153.25612370785322
                  ]
              },
              "id": "HMCtcqLMhVSbP3bkyFKA8i5YSj5MYkin4V2nvehxhQqL",
              "symbol": "SOL-FORGE",
              "name": "Wrapped Solana-Blocksmith Labs Forge",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/25411/large/Logo_%281%29.png?1651733020",
              "current_price": 243.25519867345758
          },
          {
              "tokenA": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "tokenB": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "price_change_percentage_24h": 1.1471667062985453,
              "sparkline_in_7d": {
                  "price": [
                      28.81881032444874,
                      24.007492527068845,
                      17.56365941624273
                  ]
              },
              "id": "FAbwB8VgdgSGty5E8dnmNbu5PZnQcvSuLnboJVpw1Rty",
              "symbol": "stSOL-USDT",
              "name": "Lido Staked SOL-Tether",
              "image": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "image2": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
              "current_price": 29.495841063529067
          },
          {
              "tokenA": "4vMsoUT2BWatFweudnQM1xedRLfJgJ7hswhcpz4xgBTy",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.00036922602071516424,
              "sparkline_in_7d": {
                  "price": [
                      0.013822682118570974,
                      0.012917185787618347,
                      0.012729292161082163
                  ]
              },
              "id": "DSyu4Sc5TyWDATZQaiZSMg4KTauwbsXpHb4Z1dU3i5wR",
              "symbol": "HONEY-USDC",
              "name": "Hivemapper-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/28388/large/honey.png?1670065511",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.014123841423804278
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx",
              "price_change_percentage_24h": 7.601356902308893,
              "sparkline_in_7d": {
                  "price": [
                      106.59406629381874,
                      93.08892026234335,
                      69.02132133756899
                  ]
              },
              "id": "EngvuHZ7JobyTfkDzi5djqncCgmumrB4qLTacRefQon2",
              "symbol": "SOL-GMT",
              "name": "Wrapped Solana-STEPN",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/23597/large/gmt.png?1644658792",
              "current_price": 113.1901797504664
          },
          {
              "tokenA": "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
              "tokenB": "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
              "price_change_percentage_24h": 1.424373457001039,
              "sparkline_in_7d": {
                  "price": [
                      77.68415556290384,
                      75.43048225312624,
                      75.43048225312624
                  ]
              },
              "id": "6jYALVrSAEw4oFXHnH5uSnx5Sgs2b6hCZgc9eequnTDy",
              "symbol": "POLIS-ATLAS",
              "name": "Star Atlas DAO-Star Atlas",
              "image": "https://assets.coingecko.com/coins/images/17789/large/POLIS.jpg?1629256006",
              "image2": "https://assets.coingecko.com/coins/images/17659/large/Icon_Reverse.png?1628759092",
              "current_price": 79.33103259286008
          },
          {
              "tokenA": "kiGenopAScF8VF31Zbtx2Hg8qA5ArGqvnVtXb83sotc",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.00016472029803886023,
              "sparkline_in_7d": {
                  "price": [
                      0.005064649005515227,
                      0.004946235761950768,
                      0.004946235761950768
                  ]
              },
              "id": "DZiV1HEnLE8hU16Xs1cjThAY2twAke4QSpJpHgNwpd3h",
              "symbol": "KI-USDC",
              "name": "Genopets KI-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/26135/large/genopets_ki.png?1660017469",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.005074129391605646
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 1.1256304677646796,
              "sparkline_in_7d": {
                  "price": [
                      25.714175291333696,
                      21.5108423660364,
                      15.760286993760705
                  ]
              },
              "id": "DFVTutNYXD8z4T5cRdgpso1G3sZqQvMHWpW2N99E4DvE",
              "symbol": "SOL-USDC",
              "name": "Wrapped Solana-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 26.546540054791798
          },
          {
              "tokenA": "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0035736842856976953,
              "sparkline_in_7d": {
                  "price": [
                      0.11997836973143397,
                      0.11601626663938597,
                      0.11601626663938597
                  ]
              },
              "id": "4dMCeFsjsGgakprFMtTY4uwuRL2p55Y6pJuQBcUFyu1v",
              "symbol": "POLIS-USDC",
              "name": "Star Atlas DAO-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/17789/large/POLIS.jpg?1629256006",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.12290916293889909
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp",
              "price_change_percentage_24h": 29.54906252684941,
              "sparkline_in_7d": {
                  "price": [
                      340.83405518491355,
                      242.762281897666,
                      200.63186068063598
                  ]
              },
              "id": "7aorPT7k5uuEgeJv39iRbEXyj6csrTxtRVraW374Em6y",
              "symbol": "SOL-JELLY",
              "name": "Wrapped Solana-Jelly eSports",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/28572/large/jellylogo.png?1671863817",
              "current_price": 370.278112997511
          },
          {
              "tokenA": "9DZ58i5vAfk3JaFVYezYzhrVht7j8McZsUbuTcDiSbrP",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "7RSPwESzRHi2nFkpLz7dutfzd5eQTGLiJ2AAf6ipToiP",
              "symbol": "ETX-USDC",
              "name": "Ethrix-USD Coin",
              "image": "https://arweave.net/iOND5JLSsq_0dka0SnzTsDCl83hu0_-sOQ2fDbQDuTQ",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.3197044198756027
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
              "price_change_percentage_24h": 2.4445530417314316,
              "sparkline_in_7d": {
                  "price": [
                      29.409399623793988,
                      28.75738928287375,
                      26.544454170842833
                  ]
              },
              "id": "5VvTssZbVJJCaRkRaRSBDBH3LPdVMMJi7AHeBPghkjNK",
              "symbol": "SOL-ORCA",
              "name": "Wrapped Solana-Orca",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/17547/large/Orca_Logo.png?1628781615",
              "current_price": 29.764821679464557
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
              "price_change_percentage_24h": 13.636898390716908,
              "sparkline_in_7d": {
                  "price": [
                      103.63258716606732,
                      103.63258716606732,
                      73.49148852461211
                  ]
              },
              "id": "D3C5H4YU7rjhK7ePrGtK1Bhde4tfeiTr98axdZnA7tet",
              "symbol": "SOL-RAY",
              "name": "Wrapped Solana-Raydium",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/13928/large/PSigc4ie_400x400.jpg?1612875614",
              "current_price": 105.31571960380008
          },
          {
              "tokenA": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "tokenB": "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
              "price_change_percentage_24h": 0.0006315513304761197,
              "sparkline_in_7d": {
                  "price": [
                      0.015170526604989572,
                      0.012967763701843311,
                      0.009658088082506407
                  ]
              },
              "id": "6jZQFLhSAzTYfo33MSQYvwKvZYwxat8kUa29Mz63oHN9",
              "symbol": "mSOL-whETH",
              "name": "Marinade staked SOL-Ethereum (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "image2": "https://assets.coingecko.com/coins/images/22990/large/ETH_wh_small.png?1644225466",
              "current_price": 0.01573876414963035
          },
          {
              "tokenA": "5MAYDfq5yxtudAhtfyuMBuHZjgAbaS9tbEyEQYAhDS5y",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.000037630762136454075,
              "sparkline_in_7d": {
                  "price": [
                      0.002659415699987203,
                      0.0026555553785726576,
                      0.0026555553785726576
                  ]
              },
              "id": "DQbUWSZoLpuHmdyqnJzpctPBkoKdJhMZdE1cJoWk2pnt",
              "symbol": "ACS-USDC",
              "name": "Access Protocol-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/28747/large/dR4FovX4_400x400.jpg?1673860839",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.0026168119565087126
          },
          {
              "tokenA": "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx",
              "tokenB": "AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB",
              "price_change_percentage_24h": 0.8052139712063173,
              "sparkline_in_7d": {
                  "price": [
                      16.154829780168413,
                      15.05606359834565,
                      14.082279859220613
                  ]
              },
              "id": "4eX9XvtWTgTMoMLD7XcXXR81rKknnwFU7kE6wLVm7rTK",
              "symbol": "GMT-GST",
              "name": "STEPN-STEPN Green Satoshi Token on Solana",
              "image": "https://assets.coingecko.com/coins/images/23597/large/gmt.png?1644658792",
              "image2": "https://assets.coingecko.com/coins/images/21841/large/gst.png?1640332626",
              "current_price": 16.095571178657348
          },
          {
              "tokenA": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "tokenB": "HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p",
              "price_change_percentage_24h": 0.021053289511498652,
              "sparkline_in_7d": {
                  "price": [
                      0.47773667794013736,
                      0.3693305502818936,
                      0.3693305502818936
                  ]
              },
              "id": "3db3DPqaS6x3S9oKTzZfu38kJSDFbLsvUDQ9LuRWHUxn",
              "symbol": "USDC-wLDO",
              "name": "USD Coin-Lido DAO (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "image2": "https://assets.coingecko.com/coins/images/22995/large/LDO_wh_small.png?1644226233",
              "current_price": 0.48105453738533543
          },
          {
              "tokenA": "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux",
              "tokenB": "mb1eu7TzEc71KxDpsmsKoucSSuuoGLv1drys1oP2jh6",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "45zpzzpZquaVv4BAdXfzNbuba7DAXV32d1sTrUh5wcnW",
              "symbol": "HNT-MOBILE",
              "name": "Helium Network Token-Helium Mobile",
              "image": "https://solana.fm/api/image-proxy?imageUrl=https://shdw-drive.genesysgo.net/6tcnBSybPG7piEDShBcrVtYJDPSvGrDbVvXmXKpzBvWP/hnt.png",
              "image2": "https://solana.fm/api/image-proxy?imageUrl=https://shdw-drive.genesysgo.net/6tcnBSybPG7piEDShBcrVtYJDPSvGrDbVvXmXKpzBvWP/mobile.png",
              "current_price": 11787.85842441651
          },
          {
              "tokenA": "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
              "tokenB": "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
              "price_change_percentage_24h": 1.424373457001039,
              "sparkline_in_7d": {
                  "price": [
                      77.68415556290384,
                      75.43048225312624,
                      75.43048225312624
                  ]
              },
              "id": "9HfmWsAwjZpCMCfqFZz3iLtd5K6vxFAY9SmM2XbtUVbZ",
              "symbol": "POLIS-ATLAS",
              "name": "Star Atlas DAO-Star Atlas",
              "image": "https://assets.coingecko.com/coins/images/17789/large/POLIS.jpg?1629256006",
              "image2": "https://assets.coingecko.com/coins/images/17659/large/Icon_Reverse.png?1628759092",
              "current_price": 79.58194117882769
          },
          {
              "tokenA": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "tokenB": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
              "price_change_percentage_24h": 106402.26186015317,
              "sparkline_in_7d": {
                  "price": [
                      2709478.336011202,
                      2287942.6336001535,
                      2248950.7847540937
                  ]
              },
              "id": "GMx3g7HZCVzLuE6Ckdu9sgExgiZQ7kiF7xfCrPnwVzbr",
              "symbol": "USDH-BONK",
              "name": "USDH-Bonk",
              "image": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "image2": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1672304290",
              "current_price": 2780016.7294823197
          },
          {
              "tokenA": "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",
              "tokenB": "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "C3km5MDqBiA3eVBsy8r6D8AtTr4J8j2TpRTiXaydkiCx",
              "symbol": "WBTC-whETH",
              "name": "Wrapped BTC (Wormhole)-Ethereum (Wormhole)",
              "image": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png",
              "image2": "https://assets.coingecko.com/coins/images/22990/large/ETH_wh_small.png?1644225466",
              "current_price": 15.853545349885517
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "Fishy64jCaa3ooqXw7BHtKvYD8BTkSyAPh6RNE3xZpcN",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "13ztuDnY8HvZCkBK7XwRv5jT5fd9KS7bgdXp1mL1Gd3H",
              "symbol": "SOL-FISHY",
              "name": "Wrapped Solana-FISHY by sharky.fi",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://shdw-drive.genesysgo.net/CpRahRvMZad2VNTJDN24m4Bk6PsWRBm14w684RatY1bd/The%20winning%20logo.png",
              "current_price": 464.18175145225547
          },
          {
              "tokenA": "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux",
              "tokenB": "iotEVVZLEywoTn1QdwNPddxPWszn3zFhEot3MfL9fns",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "6x6FPHbG1igaDCJ57UScYxg1sFjevhMNaW9md9PfudFx",
              "symbol": "HNT-IOT",
              "name": "Helium Network Token-Helium IOT",
              "image": "https://solana.fm/api/image-proxy?imageUrl=https://shdw-drive.genesysgo.net/6tcnBSybPG7piEDShBcrVtYJDPSvGrDbVvXmXKpzBvWP/hnt.png",
              "image2": "https://solana.fm/api/image-proxy?imageUrl=https://shdw-drive.genesysgo.net/6tcnBSybPG7piEDShBcrVtYJDPSvGrDbVvXmXKpzBvWP/iot.png",
              "current_price": 3905.220518282439
          },
          {
              "tokenA": "BWXrrYFhT7bMHmNBFoQFWdsSgA3yXoAnMhDK6Fn1eSEn",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "H5VULAZyHVkp8E8UM4afihuoebHPjSoUberhYBXeafGU",
              "symbol": "HADES-USDC",
              "name": "Hades-USD Coin",
              "image": "https://i.postimg.cc/jd8JsYSJ/icon-1.jpg",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.19435505146975526
          },
          {
              "tokenA": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "tokenB": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
              "price_change_percentage_24h": 20.513827872151808,
              "sparkline_in_7d": {
                  "price": [
                      231.31519904303548,
                      231.31519904303548,
                      231.31519904303548
                  ]
              },
              "id": "DpmWxsGtJoe9r5JjYT5XWN5ZDBW54echsfQBt54WEi9m",
              "symbol": "USDH-SAMO",
              "name": "USDH-Samoyedcoin",
              "image": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "image2": "https://assets.coingecko.com/coins/images/15051/large/IXeEj5e.png?1619560738",
              "current_price": 232.73718207230266
          },
          {
              "tokenA": "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
              "tokenB": "So11111111111111111111111111111111111111112",
              "price_change_percentage_24h": 0.00023127145445247252,
              "sparkline_in_7d": {
                  "price": [
                      0.003591635498163786,
                      0.0035534046722632507,
                      0.003292354684863784
                  ]
              },
              "id": "5nCnxTd8FVnKBmJFzf1q7DMwazNiEezfFiwgWCEdpVzL",
              "symbol": "SRM-SOL",
              "name": "Serum-Wrapped Solana",
              "image": "https://assets.coingecko.com/coins/images/11970/large/serum-logo.png?1597121577",
              "image2": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "current_price": 0.003643434691276202
          },
          {
              "tokenA": "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "55BrDTCLWayM16GwrMEQU57o4PTm6ceF9wavSdNZcEiy",
              "symbol": "WBTC-USDC",
              "name": "Wrapped BTC (Wormhole)-USD Coin",
              "image": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 29912.51214286682
          },
          {
              "tokenA": "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.000001671930706543538,
              "sparkline_in_7d": {
                  "price": [
                      0.000010571979739647295,
                      0.000006824397317471225,
                      0.000005744010363047189
                  ]
              },
              "id": "CJX9KVBAwobF7ijE7cd4kujyaHw2QCjyN9be94i5Seyo",
              "symbol": "KIN-USDC",
              "name": "Kin-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/959/large/kin-circle-white.png?1669864374",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.000013122050689765218
          },
          {
              "tokenA": "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
              "tokenB": "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "5snaYowgJDfuM1LPbTNUYHbgkKHtVVnzHiiLDWUV2hh8",
              "symbol": "bSOL-jitoSOL",
              "name": "BlazeStake Staked SOL-Jito Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/26636/large/blazesolana.png?1659328728",
              "image2": "https://assets.coingecko.com/coins/images/28046/large/JitoSOL-200.png?1667271467",
              "current_price": 1.0203696432300822
          },
          {
              "tokenA": "31k88G5Mq7ptbRDf3AM13HAq6wRQHXHikR8hik7wPygk",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "9vNKzrrHAjqjuTGLjCBo9Ai4edMYgP9dsG4tFZ2hF251",
              "symbol": "GP-USDC",
              "name": "Graphite-USD Coin",
              "image": "https://arweave.net/ALLzymnuIihFPhoNUJpPxQzbGI8LodXKhNzXzbRMPbA",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.07589307418121982
          },
          {
              "tokenA": "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.004496342700478911,
              "sparkline_in_7d": {
                  "price": [
                      0.11033462807191084,
                      0.10784327166362184,
                      0.09292305016790954
                  ]
              },
              "id": "FJn8GCqGDKcCPgeuaMxoqzkASDnQcDVtt5MFDWxRoKWM",
              "symbol": "SHDW-USDC",
              "name": "Shadow Token-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/22271/large/Property_1_Color.png?1666926988",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.11129903355471245
          },
          {
              "tokenA": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "tokenB": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "price_change_percentage_24h": 0.0015521254858842579,
              "sparkline_in_7d": {
                  "price": [
                      0.03330183310196102,
                      0.030326788786797492,
                      0.030326788786797492
                  ]
              },
              "id": "GpqMSH1YM6oPmJ5xxEE2KfePf7uf5rXFbTW2TnxicRj6",
              "symbol": "USDH-stSOL",
              "name": "USDH-Lido Staked SOL",
              "image": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "image2": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "current_price": 0.03380839426045148
          },
          {
              "tokenA": "LMDAmLNduiDmSiMxgae1gW7ubArfEGdAfTpKohqE5gn",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0009800490035086172,
              "sparkline_in_7d": {
                  "price": [
                      0.015866712932624764,
                      0.013593094930711038,
                      0.013593094930711038
                  ]
              },
              "id": "DUy9DuDNbHCSExk1Lv8SuiWwKZyL6THaKdwJREn4wi1X",
              "symbol": "LMDA-USDC",
              "name": "Lambda Markets-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/28653/large/XFAIIV1f_400x400.jpg?1672896515",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.0164592200013915
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "4vMsoUT2BWatFweudnQM1xedRLfJgJ7hswhcpz4xgBTy",
              "price_change_percentage_24h": 96.61690238071765,
              "sparkline_in_7d": {
                  "price": [
                      1826.9296915617758,
                      1581.560260902195,
                      1073.4240002338229
                  ]
              },
              "id": "3Ka5N5hsufUVdVbxAJJYcSk7Rkm8Mdvc7DfxVDD2oXaw",
              "symbol": "SOL-HONEY",
              "name": "Wrapped Solana-Hivemapper",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/28388/large/honey.png?1670065511",
              "current_price": 1846.2923536162284
          },
          {
              "tokenA": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
              "tokenB": "Gz7VkD4MacbEB6yC5XD3HcumEiYx2EtDYYrfikGsvopG",
              "price_change_percentage_24h": 1.4509265562150873,
              "sparkline_in_7d": {
                  "price": [
                      38.85604068827097,
                      32.395246967257286,
                      27.282870960015927
                  ]
              },
              "id": "5jc5QGUxqkyrXTi5AV2z3HY3V62rac95uqFbSJMhKMEf",
              "symbol": "mSOL-MATICPO",
              "name": "Marinade staked SOL-MATIC (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1644541955",
              "image2": "https://assets.coingecko.com/coins/images/22947/large/MATICpo_wh_small.png?1644226625",
              "current_price": 39.68264446155935
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "EswgBj2hZKdgovX2ihWSUDnuBg9VNbGmSGoH5yjNsPRa",
              "price_change_percentage_24h": 17.758235574652872,
              "sparkline_in_7d": {
                  "price": [
                      1257.3360812011192,
                      1234.833946108591,
                      923.4849470796794
                  ]
              },
              "id": "23DF9WNrskdv5W4rqrWAWTrt2ChRUYN9rHu4ddctmzgc",
              "symbol": "SOL-PHY",
              "name": "Wrapped Solana-Physis",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/23087/large/PHY-icon-200x200.png?1643181312",
              "current_price": 1275.4229602368234
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "BWXrrYFhT7bMHmNBFoQFWdsSgA3yXoAnMhDK6Fn1eSEn",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "DjfEf8RqbBytbq2oyG5oSrdfGYgtXhk24zgwapswNTfZ",
              "symbol": "SOL-HADES",
              "name": "Wrapped Solana-Hades",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://i.postimg.cc/jd8JsYSJ/icon-1.jpg",
              "current_price": 135.29384873575958
          },
          {
              "tokenA": "ZScHuTtqZukUrtZS43teTKGs2VqkKL8k4QCouR2n6Uo",
              "tokenB": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "6wKCFZ4VnYtNVmQYAZzs5CHsodG32vPcBQifQkGFYDkK",
              "symbol": "wstETH-stSOL",
              "name": "Lido Wrapped Staked ETH-Lido Staked SOL",
              "image": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ZScHuTtqZukUrtZS43teTKGs2VqkKL8k4QCouR2n6Uo/logo.png",
              "image2": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "current_price": 72.31692110283795
          },
          {
              "tokenA": "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "4rJktf4exNDLBjkm3RPD8BBYihTZKVtr8jPpy7DjNrQA",
              "symbol": "GUAC-USDC",
              "name": "Guacamole-USD Coin",
              "image": "https://shdw-drive.genesysgo.net/36JhGq9Aa1hBK6aDYM4NyFjR5Waiu9oHrb44j1j8edUt/image.png",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 5.302816257803961e-9
          },
          {
              "tokenA": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
              "tokenB": "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
              "price_change_percentage_24h": 0.00000817285336259454,
              "sparkline_in_7d": {
                  "price": [
                      0.000520567317077513,
                      0.0004939881279747741,
                      0.0004939881279747741
                  ]
              },
              "id": "3jLRacqwVaxLC6fSNaZSHiC7samXPkSkJ3j5d6QJUaEL",
              "symbol": "USDH-whETH",
              "name": "USDH-Ethereum (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/22941/large/USDH_icon.png?1643008131",
              "image2": "https://assets.coingecko.com/coins/images/22990/large/ETH_wh_small.png?1644225466",
              "current_price": 0.000528460886166714
          },
          {
              "tokenA": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "tokenB": "ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs",
              "price_change_percentage_24h": 0.0029636924076407445,
              "sparkline_in_7d": {
                  "price": [
                      0.12776397301145517,
                      0.11127278594129947,
                      0.11127278594129947
                  ]
              },
              "id": "67S6KLCtgFZmRYzy6dCDc1v754mmcpK33pZd7Hg2yeVj",
              "symbol": "USDC-MEDIA",
              "name": "USD Coin-Media Network",
              "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "image2": "https://assets.coingecko.com/coins/images/15142/large/media50x50.png?1620122020",
              "current_price": 0.12996419879548574
          },
          {
              "tokenA": "9noXzpXnkyEcKF3AeXqUHTdR59V5uvrRBUZ9bwfQwxeq",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "ARDj5ixvAYoviDc8eiJemh1rm5ALPWoSE9HYQBv6aLfq",
              "symbol": "KING-USDC",
              "name": "KING-USD Coin",
              "image": "https://i.imgur.com/IQ4rEmD.png",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.00014253045223929127
          },
          {
              "tokenA": "EcQCUYv57C4V6RoPxkVUiDwtX1SP8y8FP5AEToYL8Az",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0.0017131729684725459,
              "sparkline_in_7d": {
                  "price": [
                      0.010541584022056193,
                      0.010541584022056193,
                      0.010541584022056193
                  ]
              },
              "id": "6uLjoyvd4JozUNvR6nPZNmnVqaMeZ7jWFCyH2bjujxwB",
              "symbol": "WLKN-USDC",
              "name": "Walken-USD Coin",
              "image": "https://assets.coingecko.com/coins/images/25566/large/wlkn.jpg?1652523301",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.010920330508148265
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "GDfnEsia2WLAW5t8yx2X5j2mkfA74i5kwGdDuZHt7XmG",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "CbhosY11hcpoNLcYLBgueBamcfF8T5oUjj6RaxHDgSW4",
              "symbol": "SOL-CROWN",
              "name": "Wrapped Solana-CROWN Token",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://shdw-drive.genesysgo.net/AwJ6W2rRaYCGXimceFuLm5td14fhN1VFEfSYg566RxMD/image.png",
              "current_price": 659.1371846723196
          },
          {
              "tokenA": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
              "tokenB": "HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p",
              "price_change_percentage_24h": 0.4778259635561106,
              "sparkline_in_7d": {
                  "price": [
                      14.067299013033212,
                      11.693543060529594,
                      9.272490564010848
                  ]
              },
              "id": "max1GTEmP7zAxJSEe9jFkihYSnxZmbEbp9BtBNYw1K6",
              "symbol": "stSOL-wLDO",
              "name": "Lido Staked SOL-Lido DAO (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/18369/large/logo_-_2021-09-15T100934.765.png?1631671781",
              "image2": "https://assets.coingecko.com/coins/images/22995/large/LDO_wh_small.png?1644226233",
              "current_price": 14.182989442180602
          },
          {
              "tokenA": "DMTvMNWBeDftspDnzzMFW47TDTnNU7BW2d2Wr9Tb7qf",
              "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "4CpENSkrsoC8rZtdSA2i49zt4b6xy86yuf4QMWoPN85P",
              "symbol": "DMT-USDC",
              "name": "Dream Matter Token-USD Coin",
              "image": "https://asset.astro-space.xyz/token/dmt.png",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.14872319382158805
          },
          {
              "tokenA": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "tokenB": "HAxCJjnmgkdXhwZYeJiUvBgm4NdQvqhGJCS3KxCnCxWs",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "BfQWBafNniBdzSDHgKemeKJgs4bz2qxGdFJ6Cbi4xs6u",
              "symbol": "USDC-USDCar",
              "name": "USD Coin-USD Coin (Arb1) (Wormhole)",
              "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "image2": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "current_price": 0.9999015513461157
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
              "price_change_percentage_24h": 468.6443650353276,
              "sparkline_in_7d": {
                  "price": [
                      6113.738685583539,
                      5791.257001749908,
                      3897.2861394504166
                  ]
              },
              "id": "DFNxfUy4YfAafSJBDL3cTeLDb2DPBMJ5wCxePzWujmVA",
              "symbol": "SOL-SAMO",
              "name": "Wrapped Solana-Samoyedcoin",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://assets.coingecko.com/coins/images/15051/large/IXeEj5e.png?1619560738",
              "current_price": 6147.224846812296
          },
          {
              "tokenA": "So11111111111111111111111111111111111111112",
              "tokenB": "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR",
              "price_change_percentage_24h": 0,
              "sparkline_in_7d": {
                  "price": []
              },
              "id": "HrXPdUiPbzof3yPBb2wdB9ryhRSEe2hKhzpfpPMQbnRZ",
              "symbol": "SOL-GUAC",
              "name": "Wrapped Solana-Guacamole",
              "image": "https://assets.coingecko.com/coins/images/21629/large/solana.jpg?1639626543",
              "image2": "https://shdw-drive.genesysgo.net/36JhGq9Aa1hBK6aDYM4NyFjR5Waiu9oHrb44j1j8edUt/image.png",
              "current_price": 4979720746.721153
          },
          {
              "tokenA": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "tokenB": "F3nefJBcejYbtdREjui1T9DPh5dBgpkKq7u2GAAMXs5B",
              "price_change_percentage_24h": 155.10978156452268,
              "sparkline_in_7d": {
                  "price": [
                      949.9820021362203,
                      811.1900497055451,
                      774.7623765253569
                  ]
              },
              "id": "2tpF88VHajuuv8Ad1wHMq3NmxyRLfSdqv6Jy4X6xc7p1",
              "symbol": "USDC-AART",
              "name": "USD Coin-ALL.ART",
              "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
              "image2": "https://assets.coingecko.com/coins/images/22012/large/all-art.PNG?1640590472",
              "current_price": 1003.6588739175315
          }
      ]
          console.log(json)
          if (TokenListType.is(json)) {
            dispatch(
              SET_TOKENLIST({
                tokenData: json,
              })
            );
          } else {
            throw TokenListType.validate(json)[0];
          }
        })
        .catch((e) => {
          console.error(e, "refreshing in", refreshtime);
        });
    };
    fetchTokenList();
    const refresh = setInterval(fetchTokenList, refreshtime);
    return () => {
      clearInterval(refresh);
    };
  }, []);
}

export default useRefreshTokenList;
