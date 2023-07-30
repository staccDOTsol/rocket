import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface NewPieceArgs {
  x: BN
  y: BN
}

export interface NewPieceAccounts {
  authority: PublicKey
  dev: PublicKey
  payer: PublicKey
  game: PublicKey
  piece: PublicKey
  player: PublicKey
  systemProgram: PublicKey
  thread: PublicKey
  threadProgram: PublicKey
  bubblegumProgram: PublicKey
  /** CEHCK: checked */
  merkleTree: PublicKey
  rent: PublicKey
  compressionProgram: PublicKey
  splNoopProgram: PublicKey
  collection: PublicKey
}

export const layout = borsh.struct([borsh.u64("x"), borsh.u64("y")])

export function newPiece(
  args: NewPieceArgs,
  accounts: NewPieceAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.dev, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: false },
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.piece, isSigner: false, isWritable: true },
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.thread, isSigner: false, isWritable: true },
    { pubkey: accounts.threadProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.splNoopProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([136, 17, 68, 212, 182, 62, 108, 151])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      x: args.x,
      y: args.y,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
