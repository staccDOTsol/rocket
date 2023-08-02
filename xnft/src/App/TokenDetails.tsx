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
