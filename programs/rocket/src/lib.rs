use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock;
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use anchor_lang::solana_program::sysvar;

use anchor_lang::solana_program::{system_instruction};

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

declare_id!("H9jRj2YszfK6tHPA7UrsnqxXeY9avZYqYFhNzXApxYhw");

#[program]
pub mod rocket {
    use anchor_lang::solana_program::program::invoke;

    use super::*;

    pub fn play(ctx: Context<Play>, wen: String, wager: u64) -> Result<()> {
        let game = &mut ctx.accounts.game;
        let clock = clock::Clock::get().unwrap().unix_timestamp as i64;
        if game.crash_time < clock {
          let award = game.to_account_info().lamports();
            // Debit from_account and credit to_account
            **game.to_account_info().try_borrow_mut_lamports()? -= award / 5;
            **ctx.accounts.house.try_borrow_mut_lamports()? += award / 5;
           game.start_time = clock;
           game.crash_time = clock + 100 as i64;
           game.numusers = 0;
           drop(game);
        }
        else {
            let user = &mut ctx.accounts.user;
            if !user.dead { 
                let recent_blockhashes = &ctx.accounts.recent_blockhashes;
                let data = recent_blockhashes.data.borrow();
                let most_recent = array_ref![data, 8, 8];
                let user_head = user.key();
                user.dead = true;


                let index3 = u64::from_le_bytes(*most_recent);
                let clock = clock::Clock::get().unwrap().unix_timestamp as u8;
                let clock_arr: [u8; 1] = [clock];
                let index = calculate_hash(&HashOfHash {
                    recent_blockhash: index3,
                    user: user_head.to_bytes(),
                    clock: clock_arr
                });
                msg!(&index.to_string());
                let last = index.to_string().chars().nth(0).unwrap();
                let clock = clock::Clock::get().unwrap().unix_timestamp as i64;
                let game = &mut ctx.accounts.game;

                game.crash_time = clock + last as i64;
                game.start_time = clock as i64;
                let diff = game.crash_time - game.start_time;
                msg!(&diff.to_string().to_owned());
                msg!(&game.numusers.to_string().to_owned());
                msg!(&game.wagers.to_string().to_owned());
                let mut award = game.wagers.
                    checked_div(game.numusers as u64 + 1 as u64).ok_or(RocketError::BadArtithmetic)?;
                    msg!(&award.to_string().to_owned());
                award = award
                    .checked_mul(user.wager.checked_div(game.wagers).ok_or(RocketError::BadArtithmetic)?).
                    ok_or(RocketError::BadArtithmetic)?;
                
                    msg!(&award.to_string().to_owned());
                    award = award.checked_add(diff.checked_add((game.wagers / 1000 as u64) as i64).ok_or(RocketError::BadArtithmetic)? as u64).ok_or(RocketError::BadArtithmetic)?;
                
                    msg!(&award.to_string().to_owned());
                    // Does the from account have enough lamports to transfer?
                    if **game.to_account_info().try_borrow_lamports()? < award {
                        return Err(RocketError::BadArtithmetic.into());
                    }
                    // Debit from_account and credit to_account
                    **game.to_account_info().try_borrow_mut_lamports()? -= award;
                    **ctx.accounts.authority.try_borrow_mut_lamports()? += award;
                   game.lastAward = award;
                
                    game.wagers = game.wagers - award;
                drop(user);
                drop(game);
                msg!(&last.to_string());
            }
            else {
                user.dead = false;
                user.authority = ctx.accounts.authority.key();
                game.numusers = game.numusers + 1;
                if **ctx.accounts.authority.try_borrow_lamports()? < wager {
                    return Err(RocketError::BadArtithmetic.into());
                }
                invoke(
                    &system_instruction::transfer(ctx.accounts.authority.key, &game.key(), wager),
                    &[
                        ctx.accounts.authority.to_account_info().clone(),
                        game.to_account_info().clone(),
                        ctx.accounts.system_program.to_account_info().clone(),
                    ],
                )?;
                game.wagers = game.wagers + wager;
                user.wager = wager;
            }
        }
    
        Ok(())
    }

    pub fn join(ctx: Context<Join>, wager: u64, wen: String) -> Result<()> {
        let game = &mut ctx.accounts.game;
        let user = &mut ctx.accounts.user;
        user.authority = ctx.accounts.authority.key();
        game.numusers = game.numusers + 1;
        if **ctx.accounts.authority.try_borrow_lamports()? < wager {
            return Err(RocketError::BadArtithmetic.into());
        }
        invoke(
            &system_instruction::transfer(ctx.accounts.authority.key, &game.key(), wager),
            &[
                ctx.accounts.authority.to_account_info().clone(),
                game.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
        )?;
        game.wagers = game.wagers + wager;
        user.wager = wager;
        drop(game);
        drop(user);

        Ok(())
    }

    pub fn initialize(ctx: Context<Initialize>, wen: String) -> Result<()> {
     
        let game = &mut ctx.accounts.game;
        game.authority = ctx.accounts.authority.key();
        let clock = clock::Clock::get().unwrap().unix_timestamp as i64;

        game.start_time = clock;

        game.crash_time = clock + 100;
        drop(game);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(wen: String, wager: u64)]
pub struct Play <'info> {
    #[account(mut,
        seeds=["gamegame".as_bytes()],  
        bump)]
    pub game: Account<'info, Game>,
    #[account(mut,
        constraint = user.authority == authority.key(),
        seeds=["gamegame".as_bytes(), &game.key().to_bytes(), &authority.key().to_bytes()], 
        bump)]
        pub user: Account<'info, User>,
        #[account(mut,constraint = house.key() == Pubkey::new_from_array([
            255,  12, 193,  85, 142,  19, 218, 127,
            175, 207,  67, 156,  36, 169,  47, 190,
             30, 195, 152,  61, 206,  54,  59,  95,
            211, 192,  59, 184,  44, 172, 121, 242
          ]))]
          /// CHECK:
        pub house: UncheckedAccount<'info>,
    #[account(address = sysvar::recent_blockhashes::id())]
    /// CHECK:
    recent_blockhashes: AccountInfo<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}
#[derive(Accounts)]
#[instruction(wen: String)]
pub struct Initialize <'info> {
    #[account(init, 
        payer=authority,
        space=150,
        seeds=["gamegame".as_bytes()], 
        bump)]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}
#[derive(Accounts)]
#[instruction(wager: u64, wen: String)]

pub struct Join <'info> {
    #[account(mut,
        seeds=["gamegame".as_bytes()], 
        bump)]
    pub game: Account<'info, Game>,
    #[account(init, 
        payer=authority,
        space=150,
        seeds=["gamegame".as_bytes(), &game.key().to_bytes(), &authority.key().to_bytes()], 
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
    pub dead: bool
}
#[account]
pub struct Game  {
    pub over: bool,
    pub start_time: i64 , 
    crash_time: i64 ,
    pub wagers: u64,
    pub numusers: u8,
    pub authority: Pubkey,
    pub lastAward: u64
}

#[error_code]
pub enum RocketError {
    #[msg("Encountered an arithmetic error")]
    BadArtithmetic,
}
