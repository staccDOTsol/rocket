import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MovePieceAccounts {
  game: PublicKey
  authority: PublicKey
  dev: PublicKey
  payer: PublicKey
  piece: PublicKey
  thread: PublicKey
  bubblegumProgram: PublicKey
  /** CEHCK: checked */
  merkleTree: PublicKey
  rent: PublicKey
  systemProgram: PublicKey
  compressionProgram: PublicKey
  splNoopProgram: PublicKey
  collection: PublicKey
}

export function movePiece(
  accounts: MovePieceAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.dev, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: false, isWritable: false },
    { pubkey: accounts.piece, isSigner: false, isWritable: true },
    { pubkey: accounts.thread, isSigner: true, isWritable: false },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.splNoopProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([136, 133, 16, 117, 173, 226, 233, 76])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
