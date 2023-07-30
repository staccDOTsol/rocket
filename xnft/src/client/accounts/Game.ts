import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GameFields {
  bump: number
  board: typeof types.Team[][]
  isOpen: boolean
  numPieces: BN
  numPlayersTotal: BN
  numPlayersRock: BN
  numPlayersPaper: BN
  numPlayersScissors: BN
  startedAt: BN
}

export interface GameJSON {
  bump: number
  board: typeof types.Team[][]
  isOpen: boolean
  numPieces: string
  numPlayersTotal: string
  numPlayersRock: string
  numPlayersPaper: string
  numPlayersScissors: string
  startedAt: string
}

export class Game {
  readonly bump: number
  readonly board: typeof types.Team[][]
  readonly isOpen: boolean
  readonly numPieces: BN
  readonly numPlayersTotal: BN
  readonly numPlayersRock: BN
  readonly numPlayersPaper: BN
  readonly numPlayersScissors: BN
  readonly startedAt: BN

  static readonly discriminator = Buffer.from([
    27, 90, 166, 125, 74, 100, 121, 18,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("bump"),
    borsh.u8("board"),
    borsh.bool("isOpen"),
    borsh.u64("numPieces"),
    borsh.u64("numPlayersTotal"),
    borsh.u64("numPlayersRock"),
    borsh.u64("numPlayersPaper"),
    borsh.u64("numPlayersScissors"),
    borsh.i64("startedAt"),
  ])

  constructor(fields: GameFields) {
    this.bump = fields.bump
    this.board = fields.board
    this.isOpen = fields.isOpen
    this.numPieces = fields.numPieces
    this.numPlayersTotal = fields.numPlayersTotal
    this.numPlayersRock = fields.numPlayersRock
    this.numPlayersPaper = fields.numPlayersPaper
    this.numPlayersScissors = fields.numPlayersScissors
    this.startedAt = fields.startedAt
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Game | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<Game | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): Game {
    if (!data.slice(0, 8).equals(Game.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Game.layout.decode(data.slice(8))

    return new Game({
      bump: dec.bump,
      board: dec.board,
      isOpen: dec.isOpen,
      numPieces: dec.numPieces,
      numPlayersTotal: dec.numPlayersTotal,
      numPlayersRock: dec.numPlayersRock,
      numPlayersPaper: dec.numPlayersPaper,
      numPlayersScissors: dec.numPlayersScissors,
      startedAt: dec.startedAt,
    })
  }

  toJSON(): GameJSON {
    return {
      bump: this.bump,
      board: this.board,
      isOpen: this.isOpen,
      numPieces: this.numPieces.toString(),
      numPlayersTotal: this.numPlayersTotal.toString(),
      numPlayersRock: this.numPlayersRock.toString(),
      numPlayersPaper: this.numPlayersPaper.toString(),
      numPlayersScissors: this.numPlayersScissors.toString(),
      startedAt: this.startedAt.toString(),
    }
  }

  static fromJSON(obj: GameJSON): Game {
    return new Game({
      bump: obj.bump,
      board: obj.board,
      isOpen: obj.isOpen,
      numPieces: new BN(obj.numPieces),
      numPlayersTotal: new BN(obj.numPlayersTotal),
      numPlayersRock: new BN(obj.numPlayersRock),
      numPlayersPaper: new BN(obj.numPlayersPaper),
      numPlayersScissors: new BN(obj.numPlayersScissors),
      startedAt: new BN(obj.startedAt),
    })
  }
}
