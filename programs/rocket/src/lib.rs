use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock;
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use anchor_lang::solana_program::sysvar;
use borsh::{BorshDeserialize, BorshSerialize};
use clockwork_sdk::state::AccountMetaData;
use anchor_lang::solana_program::{system_instruction};

use { 
    clockwork_sdk::{
        state::{Thread, ThreadAccount, ThreadResponse, InstructionData},
    }
  };
use anchor_lang::error;
use arrayref::array_ref;

pub fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}

#[derive(Hash)]
pub struct HashOfHash {
    pub(crate) recent_blockhash: u64,
    pub(crate) user: [u8; 32],
    pub(crate) clock: [u8; 1]
}
#[derive(Copy, Clone,PartialEq, PartialOrd)]
pub struct U4(u8);

impl U4 {
    fn new(value: u8) -> U4 {
        assert!(value <= 0xF, "value must be between 0 and 15");
        U4(value)
    }
    
    fn get(&self) -> u8 {
        self.0 & 0xF
    }
}

impl std::ops::BitOr for U4 {
    type Output = Self;

    fn bitor(self, other: Self) -> Self {
        U4::new(self.get() << 4 | other.get())
    }
}

impl BorshSerialize for U4 {
    fn serialize<W: std::io::Write>(&self, writer: &mut W) -> std::result::Result<(), std::io::Error> {
        self.get().serialize(writer)
    }
}

impl BorshDeserialize for U4 {
    fn deserialize(buf: &mut &[u8]) -> std::result::Result<U4, std::io::Error> {
        let value = u8::deserialize(buf)?;
        Ok(U4::new(value))
    }
}

impl std::fmt::Display for U4 {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:X}", self.get())
    }
}


declare_id!("7vWEUWH7L9VJCZjVahFwpWstZqfmGTSK122VVtvdvzFz");

#[program]
pub mod rocket {
    use anchor_lang::solana_program::program::invoke;

    use super::*;

 
 
    pub fn play(ctx: Context<Play>, wen: String)-> Result<ThreadResponse> {
        
       let  user = &mut ctx.accounts.user;
        let recent_blockhashes = &ctx.accounts.recent_blockhashes;
                let data = recent_blockhashes.data.borrow();
                let most_recent = array_ref![data, 8, 8];
                let user_head = user.key();
               

                let index3 = u64::from_le_bytes(*most_recent);
                let clock = clock::Clock::get().unwrap().unix_timestamp as u8;
                let clock_arr: [u8; 1] = [clock];
                let index = calculate_hash(&HashOfHash {
                    recent_blockhash: index3,
                    user: user_head.to_bytes(),
                    clock: clock_arr
                });
                msg!(&index.to_string());

        let game = &mut ctx.accounts.game;
        let x = user.x;
        let y = user.y;
        game.avec[x as usize][y as usize] = U4(0);
        msg!("index {}", index.to_string());
                  let last = index.to_string().chars().nth(0).unwrap() as u8 % 2;
                  let otherlast = index.to_string().chars().nth(1).unwrap() as u8 % 2;
                  let someothervalue = index.to_string().chars().nth(2).unwrap();
                  let someothervalue2 = index.to_string().chars().nth(3).unwrap();
                  msg!("last {}", last);
                  msg!("otherlast {}", otherlast);
                  msg!("someothervalue {}", index);
                  msg!("index {}", someothervalue2);
                  if (someothervalue as u8) < 5  {

                    if  user.y.checked_add(otherlast as u8) < Some(64) {
                     user.y = user.y.checked_add(otherlast as u8).unwrap();
                    }
                }
                else {
                 
                    if  user.y.checked_sub(otherlast as u8) >  Some(0) {
                     user.y = user.y.checked_sub(otherlast as u8).unwrap();
                    }
                }
                if (someothervalue2 as u8)  < 5 {
                    if  user.x.checked_add(last as u8) < Some(64) {
                     user.x = user.x .checked_add(last as u8).unwrap();
                    }
                }
                else {
                    if  user.x.checked_sub(last as u8) > Some(0) {
                     user.x = user.x.checked_sub(last as u8).unwrap();
                    }
                }
                  let x = user.x;
                  let y = user.y;
                  if game.avec[user.x as usize][user.y as usize] != U4(0) {
                     
                     // rock beats scissors
                     // paper beats rock
                     // scissors beats paper
                       let otheruser = game.avec[user.x as usize][user.y as usize];
                      if user.team == U4(3) && otheruser == U4(1) {
                          game.avec[x as usize][y as usize] = U4(3);
                          game.onecount-=1;
                      }
                      else if user.team == U4(1) && otheruser == U4(2) {
                          game.avec[x as usize][y as usize] = U4(1);
                          game.twocount-=1;
                      }
                      else if user.team == U4(2) && otheruser == U4(3) {
                          game.avec[x as usize][y as usize] = U4(2);
                          game.zerocount-=1;
                      }
                      else if user.team == U4(1) && otheruser == U4(3){
                          game.avec[x as usize][y as usize] = U4(3);
                          game.onecount-=1;
                      }
                      else if user.team == U4(2) && otheruser == U4(1) {
                          game.avec[x as usize][y as usize] = U4(1);
                          game.twocount-=1;
                      }
                      else if user.team == U4(3) && otheruser == U4(2) {
                          game.avec[x as usize][y as usize] = U4(2);
                          game.zerocount-=1;
                      }
                  }
                  game.avec[x as usize][y as usize] = user.team;/*
                  if game.zerocount == 0 && game.onecount == 0  {
                      // two wins
                      game.over = true;
                      game.ss = **game.to_account_info().try_borrow_lamports().unwrap();
                  }
                  else   if game.twocount == 0 && game.onecount == 0  {
                      // three wins
                      game.over = true;
                      game.ss = **game.to_account_info().try_borrow_lamports().unwrap();
                  }
                  else      if game.zerocount == 0 && game.twocount == 0  {
                      // one wins
                      game.over = true;
                      game.ss = **game.to_account_info().try_borrow_lamports().unwrap();
                  }
                 */
                  Ok(ThreadResponse {
                      next_instruction: None,
                      kickoff_instruction: None,
                  })
    }

    pub fn join(ctx: Context<Join>, wager: u64, wen: String, team: U4, x:u8, y:u8) -> Result<()> {
        let game = &mut ctx.accounts.game;
        let user = &mut ctx.accounts.user;
      
        if team <= U4(0) || team > U4(3)  {
            return Err(RocketError::BadTeam.into());
        }  
        user.wen = wen;
        user.authority = ctx.accounts.authority.key();
      
        user.team = team;
        
        user.x = x;
        user.y = y;
        if team == U4(3) {
            game.zerocount+=1;
        }
        else if team == U4(1) {
            game.onecount+=1;
        }
        else if team == U4(2) {
            game.twocount+=1;
        }
        if game.avec[x as usize][y as usize] != U4(0) {
            return Err(RocketError::AlreadyClaimed.into());
        }
        game.avec[x as usize][y as usize] = team;
        if **ctx.accounts.authority.try_borrow_lamports()? < wager {
            return Err(RocketError::BadArtithmetic.into());
        }
        invoke(
            &system_instruction::transfer(ctx.accounts.authority.key, &game.key(), 1_000_000),
            &[
                ctx.accounts.authority.to_account_info().clone(),
                game.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
        )?;
        user.wager = wager;
        drop(game);
        drop(user);

        Ok(())
    }

    pub fn initialize(ctx: Context<Initialize>, wen: String) -> Result<()> {
     
        let game = &mut ctx.accounts.game;
game.wen = wen;

let game_size = 64;
game.avec = vec![vec![U4::new(0); game_size]; game_size];

        game.authority = ctx.accounts.authority.key();
        let clock = clock::Clock::get().unwrap().unix_timestamp as i64;

        game.start_time = clock;

        drop(game);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(wen: String)]
pub struct Play <'info> {
    #[account(mut,
        seeds=["gamegame".as_bytes(), &game.authority.to_bytes()], 
        bump)]
    pub game: Account<'info, Game>,
    #[account(
        signer,
    )]
    pub thread: Box<Account<'info, Thread>>,
    #[account(mut)]
    /// CHECK: tsignore
    pub authority: AccountInfo <'info>,
    #[account(mut,
        seeds=["gamegame".as_bytes(), &game.key().to_bytes(), &user.authority.to_bytes(), &user.wen.as_bytes()], 
        bump)]
        pub user: Account<'info, User>,
        #[account(address = sysvar::recent_blockhashes::id())]
        /// CHECK:
        recent_blockhashes: AccountInfo<'info>,
}
#[derive(Accounts)]
#[instruction(wen: String)]
pub struct Initialize <'info> {
    #[account(init, 
        payer=authority,
        space=10000 ,
        seeds=["gamegame".as_bytes(),&authority.key().to_bytes()], 
        bump)]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}
#[derive(Accounts)]
#[instruction(wager: u64, wen: String, team: U4)]

pub struct Join <'info> {
    #[account(mut,
        seeds=["gamegame".as_bytes(),&game.authority.to_bytes()], 
        bump)]
    pub game: Account<'info, Game>,
    #[account(init, 
        payer=authority,
        space=150,
        seeds=["gamegame".as_bytes(), &game.key().to_bytes(), &authority.key().to_bytes(), &wen.as_bytes()], 
        bump)]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(address = sysvar::recent_blockhashes::id())]
    /// CHECK:
    recent_blockhashes: AccountInfo<'info>,
    pub system_program: Program<'info, System>
}


#[account]
pub struct User  {
    pub authority: Pubkey , 
    pub wager: u64,
    pub dead: bool,
    pub team: U4,
    pub thread: Pubkey,
    pub x: u8,
    pub y: u8,
    pub claimed: bool,
    pub wen: String,
    pub committed: u64
}
#[account]
pub struct Game  {
    pub over: bool,
    pub ss: u64,
    pub start_time: i64 , 
    crash_time: i64 ,
    pub wagers: u64,
    pub numusers: u8,
    pub authority: Pubkey,
    pub lastAward: u64,
    pub avec: Vec<Vec<U4>>,
    pub onecount: u64,
    pub zerocount: u64,
    pub twocount: u64,
    pub wen: String
}

#[error_code]
pub enum RocketError {
    #[msg("Encountered an arithmetic error")]
    BadArtithmetic,
    #[msg("some1 lives here")]
    AlreadyClaimed,
    #[msg("naughty naughty")]
    BadTeam,
}
