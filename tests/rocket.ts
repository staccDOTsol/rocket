import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Rocket } from "../target/types/rocket";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, Transaction } from '@solana/web3.js'
import { BN } from "bn.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
describe("rocket", () => {
  let connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")

  // Configure the client to use the local cluster.
  // @ts-ignore
  anchor.setProvider(new anchor.AnchorProvider(connection, new NodeWallet(Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_WALLET_PRIVATE_KEY))), {}));

  const someoneelse = new NodeWallet(Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_WALLET_PRIVATE_KEY)))
  console.log(someoneelse.publicKey.toBase58())
  const program = anchor.workspace.Rocket as Program<Rocket>;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  it("Is initialized!", async () => {
    // Add your test here.
    let wen = new Date().getTime() / 1000;
    let game = (PublicKey.findProgramAddressSync(
      [Buffer.from("gamegame")]
    , program.programId))[0]
    let user = (PublicKey.findProgramAddressSync(
      [Buffer.from("gamegame"),game.toBuffer(), anchor.getProvider().publicKey.toBuffer()]
    , program.programId))[0]


    for (var a = 0; a < 10; a++){
    const someoneelse = new NodeWallet(Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_WALLET_PRIVATE_KEY)))
    let user2 = (PublicKey.findProgramAddressSync(
      [Buffer.from("gamegame"),game.toBuffer(), someoneelse.publicKey.toBuffer()]
    , program.programId))[0]
   
console.log(game.toBase58())
await delay(1000)

   const tx4 = await program.methods.play(      (wen.toString()),new BN( 500000)) 
   .accounts({
     game: game,
     user: user,
     house: new PublicKey("JAcF8pPFvGrRCgbe2kAoEPXcgPVoLPNiC3Loz628C8sT"),
     recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
     authority: anchor.getProvider().publicKey,
     systemProgram: SystemProgram.programId
   }).rpc();
   console.log("Your transaction signature", tx4)
   await delay(1000)
        const tx2 = await program.methods.join(new BN( 8000),      (wen.toString() ))
    .accounts({
      game:  game,
      user: user2,
      authority: someoneelse.publicKey,
      recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
      systemProgram: SystemProgram.programId
    }).signers([someoneelse]).rpc();


    console.log("Your transaction signature", tx2); 
    await delay(1000)
    try {
    const tx3 = await program.methods.play(      (wen.toString()),new BN( 500000)) 
    .accounts({
      game: game,
      user: user2,
      house: new PublicKey("JAcF8pPFvGrRCgbe2kAoEPXcgPVoLPNiC3Loz628C8sT"),
      recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
      authority: someoneelse.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([someoneelse]).rpc();
    console.log("Your transaction signature", tx3)
    } catch (err){
console.log(err)
    }   
  }
    try {
      await delay(1000)

    const tx6 = await program.methods.play(      (wen.toString()),new BN( 500000)) 
    .accounts({
      game: game,
      user: user,
      house: new PublicKey("JAcF8pPFvGrRCgbe2kAoEPXcgPVoLPNiC3Loz628C8sT"),
      recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
      authority: anchor.getProvider().publicKey,
      systemProgram: SystemProgram.programId
    }).rpc();
    console.log("Your transaction signature", tx6)
     } catch (err){
      console.log(err)
      
    }   
    await delay(1000)
     try {

  } catch (err){
    console.log(err)
      
  }  
  await delay(1000)
    try {

    const tx5 = await program.methods.play(      (wen.toString()),new BN( 500000)) 
    .accounts({
      game: game,
      user: user,
      house: new PublicKey("JAcF8pPFvGrRCgbe2kAoEPXcgPVoLPNiC3Loz628C8sT"),
      recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
      authority: anchor.getProvider().publicKey,
      systemProgram: SystemProgram.programId
    }).rpc();
    console.log("Your transaction signature", tx5)
  } catch (err){
      
console.log(err)
  }
  });
});
