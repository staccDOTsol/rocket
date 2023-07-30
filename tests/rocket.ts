import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Rpsx } from "../target/types/rpsx";
import { ComputeBudgetInstruction, ComputeBudgetProgram, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, Transaction } from '@solana/web3.js'
import { BN } from "bn.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { MPL_BUBBLEGUM_PROGRAM_ID, mplBubblegum, SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID }  from './js/src';

import {
  Context,signerIdentity,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import fs from "fs";
import {
  generateSigner } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createTree } from "./js/src";
import { createCreateTreeInstruction} from "@metaplex-foundation/mpl-bubblegum";
import { createAllocTreeIx } from "@solana/spl-account-compression";

const umi = createUmi('https://devnet.helius-rpc.com/?api-key=cbf0cdf2-8766-47ca-89ed-2ca729dbd05f', "confirmed")
  let connection = new Connection("https://devnet.helius-rpc.com/?api-key=cbf0cdf2-8766-47ca-89ed-2ca729dbd05f", "confirmed")

  // Configure the client to use the local cluster.
  // @ts-ignore
  anchor.setProvider(new anchor.AnchorProvider(connection, new NodeWallet(Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/st/.config/solana/id.json').toString())))), {}));

  const someoneelse = (Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/st/.config/solana/id.json').toString()))) )
  console.log(someoneelse.publicKey.toBase58())
  const program = anchor.workspace.Rpsx as Program<Rpsx>;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
setTimeout(async () => {
    // Add your test here.
    let wen = new Date().getTime() / 1000;
    let game = (PublicKey.findProgramAddressSync(
      [Buffer.from("game")]
    , program.programId))[0]
    let user = (PublicKey.findProgramAddressSync(
      [Buffer.from("game"),game.toBuffer(), anchor.getProvider().publicKey.toBuffer()]
    , program.programId))[0]
    const treeKeypair = Keypair.generate();
    // derive the tree's authority (PDA), owned by Bubblegum
const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
  [treeKeypair.publicKey.toBuffer()],
  new PublicKey(MPL_BUBBLEGUM_PROGRAM_ID),
);
// allocate the tree's account on chain with the `space`
const allocTreeIx = await createAllocTreeIx(
  connection,
  treeKeypair.publicKey,
  someoneelse.publicKey,
  { maxDepth: 14, maxBufferSize: 64 },
  3,
);
// create the instruction to actually create the tree
const createTreeIx = createCreateTreeInstruction(
  {
    payer: someoneelse.publicKey,
    treeCreator: someoneelse.publicKey,
    treeAuthority: treeAuthority,
    merkleTree: treeKeypair.publicKey,
    compressionProgram: new PublicKey(SPL_ACCOUNT_COMPRESSION_PROGRAM_ID),
    // NOTE: this is used for some on chain logging
    logWrapper: new PublicKey(SPL_NOOP_PROGRAM_ID),
  },
  {
    maxBufferSize: 64,
    maxDepth: 14,
    public: false,
  },
  new PublicKey(MPL_BUBBLEGUM_PROGRAM_ID),
);
// build the transaction
const tx = new Transaction().add(allocTreeIx).add(createTreeIx);
tx.feePayer = someoneelse.publicKey;

// send the transaction
const txSignature = await sendAndConfirmTransaction(
  connection,
  tx,
  // ensuring the `treeKeypair` PDA and the `payer` are BOTH signers
  [treeKeypair, someoneelse],
  {
    commitment: "confirmed",
    skipPreflight: true,
  },
);

    
    const tx4 = await program.methods.newGame(      ) 
    .accounts({
      game: game,
      payer: anchor.getProvider().publicKey,
      systemProgram: SystemProgram.programId,
      merkleTree: treeKeypair.publicKey
    }).instruction()
    let computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit(
      {
        units: 1000000000
      }

    )
 let atx = new Transaction().add(computeBudgetIx).add(tx4)
    atx.feePayer = anchor.getProvider().publicKey;
      atx.recentBlockhash = (await connection.getRecentBlockhash("confirmed")).blockhash
      await program.provider.sendAndConfirm(atx, [someoneelse])
    console.log("tx4", tx4)
    await delay(1000)
  })