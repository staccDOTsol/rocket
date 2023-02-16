import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UserFields {
  authority: PublicKey
  wager: BN
  dead: boolean
}

export interface UserJSON {
  authority: string
  wager: string
  dead: boolean
}

export class User {
  readonly authority: PublicKey
  readonly wager: BN
  readonly dead: boolean

  static readonly discriminator = Buffer.from([
    159, 117, 95, 227, 239, 151, 58, 236,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u64("wager"),
    borsh.bool("dead"),
  ])

  constructor(fields: UserFields) {
    this.authority = fields.authority
    this.wager = fields.wager
    this.dead = fields.dead
  }

  static async fetch(c: Connection, address: PublicKey): Promise<User | null> {
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
  ): Promise<Array<User | null>> {
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

  static decode(data: Buffer): User {
    if (!data.slice(0, 8).equals(User.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = User.layout.decode(data.slice(8))

    return new User({
      authority: dec.authority,
      wager: dec.wager,
      dead: dec.dead,
    })
  }

  toJSON(): UserJSON {
    return {
      authority: this.authority.toString(),
      wager: this.wager.toString(),
      dead: this.dead,
    }
  }

  static fromJSON(obj: UserJSON): User {
    return new User({
      authority: new PublicKey(obj.authority),
      wager: new BN(obj.wager),
      dead: obj.dead,
    })
  }
}
