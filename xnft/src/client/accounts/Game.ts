import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GameFields {
  over: boolean
  startTime: BN
  crashTime: BN
  wagers: BN
  numusers: number
  authority: PublicKey
  lastAward: BN
}

export interface GameJSON {
  over: boolean
  startTime: string
  crashTime: string
  wagers: string
  numusers: number
  authority: string
  lastAward: string
}

export class Game {
  readonly over: boolean
  readonly startTime: BN
  readonly crashTime: BN
  readonly wagers: BN
  readonly numusers: number
  readonly authority: PublicKey
  readonly lastAward: BN

  static readonly discriminator = Buffer.from([
    27, 90, 166, 125, 74, 100, 121, 18,
  ])

  static readonly layout = borsh.struct([
    borsh.bool("over"),
    borsh.i64("startTime"),
    borsh.i64("crashTime"),
    borsh.u64("wagers"),
    borsh.u8("numusers"),
    borsh.publicKey("authority"),
    borsh.u64("lastAward"),
  ])

  constructor(fields: GameFields) {
    this.over = fields.over
    this.startTime = fields.startTime
    this.crashTime = fields.crashTime
    this.wagers = fields.wagers
    this.numusers = fields.numusers
    this.authority = fields.authority
    this.lastAward = fields.lastAward
  }

  static async fetch(c: Connection, address: PublicKey): Promise<Game | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(PROGRAM_ID)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[]
  ): Promise<Array<Game | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(PROGRAM_ID)) {
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
      over: dec.over,
      startTime: dec.startTime,
      crashTime: dec.crashTime,
      wagers: dec.wagers,
      numusers: dec.numusers,
      authority: dec.authority,
      lastAward: dec.lastAward,
    })
  }

  toJSON(): GameJSON {
    return {
      over: this.over,
      startTime: this.startTime.toString(),
      crashTime: this.crashTime.toString(),
      wagers: this.wagers.toString(),
      numusers: this.numusers,
      authority: this.authority.toString(),
      lastAward: this.lastAward.toString(),
    }
  }

  static fromJSON(obj: GameJSON): Game {
    return new Game({
      over: obj.over,
      startTime: new BN(obj.startTime),
      crashTime: new BN(obj.crashTime),
      wagers: new BN(obj.wagers),
      numusers: obj.numusers,
      authority: new PublicKey(obj.authority),
      lastAward: new BN(obj.lastAward),
    })
  }
}
