use std::mem::size_of;

use borsh::{BorshDeserialize, BorshSerialize};
use anchor_lang::{error, InstructionData, solana_program::system_program, prelude::*};
use clockwork_sdk::{state::{Thread, ThreadResponse}, ThreadProgram};
use anchor_spl::token::{TokenAccount,Mint, Token};
use anchor_lang::solana_program::program::{invoke};
use anchor_lang::solana_program::sysvar;
use mpl_token_metadata::instruction::burn_edition_nft;
use mpl_token_metadata::state::Metadata;
use mpl_token_metadata::state::TokenMetadataAccount;
declare_id!("7vWEUWH7L9VJCZjVahFwpWstZqfmGTSK122VVtvdvzFz");


#[program]
pub mod rpsx {
    use anchor_lang::{solana_program::instruction::Instruction, system_program::{transfer, Transfer}};
    use clockwork_sdk::state::Trigger;

    pub use super::*;

    pub fn new_game(ctx: Context<NewGame>) -> Result<()> {
        let game = &mut ctx.accounts.game;

        // Initialize the game account.
        game.bump = *ctx.bumps.get("game").unwrap();
        game.board = new_board();
        game.is_open = true;
        game.num_players_total = 0;
        game.num_players_rock = 0;
        game.num_players_paper = 0;
        game.num_players_scissors = 0; 
        game.started_at = Clock::get().unwrap().unix_timestamp;

        Ok(())
    }

   
pub fn join_harder (ctx: Context<JoinHarder>, x: u64, y: u64)-> Result<()> {
    let themetadata: Metadata = Metadata::from_account_info(&ctx.accounts.metadata)?;
    
    let authority = &ctx.accounts.authority;
    let game = &mut ctx.accounts.game;
    let player = &mut ctx.accounts.player;
    let piece = &mut ctx.accounts.piece;
    let system_program = &ctx.accounts.system_program;
    let thread = &ctx.accounts.thread;
    let thread_program = &ctx.accounts.thread_program;
   
    match themetadata.collection {
        Some(c) if c.verified && c.key == ctx.accounts.collection.key() => {

            let ix = burn_edition_nft(
                *ctx.accounts.token_program.to_account_info().key,
                *ctx.accounts.metadata.to_account_info().key,
                *ctx.accounts.authority.to_account_info().key,
                *ctx.accounts.print_edition_mint.to_account_info().key,
                *ctx.accounts.master_edition_mint.to_account_info().key,
                *ctx.accounts.print_edition_token.to_account_info().key,
                *ctx.accounts.master_edition_token.to_account_info().key,
                *ctx.accounts.master_edition.to_account_info().key,
                *ctx.accounts.print_edition.to_account_info().key,
                *ctx.accounts.edition_marker.to_account_info().key,
                *ctx.accounts.spl_token.to_account_info().key
            );
            invoke(
                &ix,
                &[
                    ctx.accounts.token_program.to_account_info().clone(),
                    ctx.accounts.metadata.to_account_info().clone(),
                    ctx.accounts.authority.to_account_info().clone(),
                    ctx.accounts.print_edition_mint.to_account_info().clone(),
                    ctx.accounts.master_edition_mint.to_account_info().clone(),
                    ctx.accounts.print_edition_token.to_account_info().clone(),
                    ctx.accounts.master_edition_token.to_account_info().clone(),
                    ctx.accounts.master_edition.to_account_info().clone(),
                    ctx.accounts.print_edition.to_account_info().clone(),
                    ctx.accounts.edition_marker.to_account_info().clone(),
                    ctx.accounts.spl_token.to_account_info().clone()
                ],
            )?;
            piece.super_power = 1;
        },    Some(c) if c.verified && c.key == ctx.accounts.collection2.key() => {

            let ix = burn_edition_nft(
                *ctx.accounts.token_program.to_account_info().key,
                *ctx.accounts.metadata.to_account_info().key,
                *ctx.accounts.authority.to_account_info().key,
                *ctx.accounts.print_edition_mint.to_account_info().key,
                *ctx.accounts.master_edition_mint.to_account_info().key,
                *ctx.accounts.print_edition_token.to_account_info().key,
                *ctx.accounts.master_edition_token.to_account_info().key,
                *ctx.accounts.master_edition.to_account_info().key,
                *ctx.accounts.print_edition.to_account_info().key,
                *ctx.accounts.edition_marker.to_account_info().key,
                *ctx.accounts.spl_token.to_account_info().key
            );
            invoke(
                &ix,
                &[
                    ctx.accounts.token_program.to_account_info().clone(),
                    ctx.accounts.metadata.to_account_info().clone(),
                    ctx.accounts.authority.to_account_info().clone(),
                    ctx.accounts.print_edition_mint.to_account_info().clone(),
                    ctx.accounts.master_edition_mint.to_account_info().clone(),
                    ctx.accounts.print_edition_token.to_account_info().clone(),
                    ctx.accounts.master_edition_token.to_account_info().clone(),
                    ctx.accounts.master_edition.to_account_info().clone(),
                    ctx.accounts.print_edition.to_account_info().clone(),
                    ctx.accounts.edition_marker.to_account_info().clone(),
                    ctx.accounts.spl_token.to_account_info().clone()
                ],
            )?;
            piece.super_power = 2;
        },
        Some(c) if c.verified && c.key == ctx.accounts.collection3.key() => {

            let ix = burn_edition_nft(
                *ctx.accounts.token_program.to_account_info().key,
                *ctx.accounts.metadata.to_account_info().key,
                *ctx.accounts.authority.to_account_info().key,
                *ctx.accounts.print_edition_mint.to_account_info().key,
                *ctx.accounts.master_edition_mint.to_account_info().key,
                *ctx.accounts.print_edition_token.to_account_info().key,
                *ctx.accounts.master_edition_token.to_account_info().key,
                *ctx.accounts.master_edition.to_account_info().key,
                *ctx.accounts.print_edition.to_account_info().key,
                *ctx.accounts.edition_marker.to_account_info().key,
                *ctx.accounts.spl_token.to_account_info().key
            );
            invoke(
                &ix,
                &[
                    ctx.accounts.token_program.to_account_info().clone(),
                    ctx.accounts.metadata.to_account_info().clone(),
                    ctx.accounts.authority.to_account_info().clone(),
                    ctx.accounts.print_edition_mint.to_account_info().clone(),
                    ctx.accounts.master_edition_mint.to_account_info().clone(),
                    ctx.accounts.print_edition_token.to_account_info().clone(),
                    ctx.accounts.master_edition_token.to_account_info().clone(),
                    ctx.accounts.master_edition.to_account_info().clone(),
                    ctx.accounts.print_edition.to_account_info().clone(),
                    ctx.accounts.edition_marker.to_account_info().clone(),
                    ctx.accounts.spl_token.to_account_info().clone()
                ],
            )?;
            piece.super_power = 3;
        },
        None | Some(_) => todo!()
    };
    // Add a piece to the board.
    let board_position = &game.board[x as usize][y as usize];
    require!(board_position.is_none(), GameError::BoardPositionOccupied);
    game.board[x as usize][y as usize] = Some(player.team.clone());

    // Spawn a thread to move this piece.
    clockwork_sdk::cpi::thread_create(
        CpiContext::new_with_signer(
            thread_program.to_account_info(),
            clockwork_sdk::cpi::ThreadCreate {
                authority: game.to_account_info(),
                payer: authority.to_account_info(),
                system_program: system_program.to_account_info(),
                thread: thread.to_account_info()
            },
            &[&[SEED_GAME, &[game.bump]]]
        ),
        format!("{}", game.num_pieces),
        Instruction {
            program_id: crate::ID,
            accounts: crate::accounts::MovePiece {
                game: game.key(),
                piece: piece.key(),
                thread: thread.key()
            }.to_account_metas(None),
            data: crate::instruction::MovePiece{}.data(),
        }.into(),
        Trigger::Immediate,
    )?;

    // Transfer SOL from authority to the thread.
    // TODO migrate to v2, and remove this extra CPI.
    transfer(
        CpiContext::new(
            system_program.to_account_info(),
            Transfer {
                from: authority.to_account_info(),
                to: thread.to_account_info(),
            },
        ),
        1000 * 1000 // Enough for 1000 moves
    )?;
    
        // Transfer SOL from authority to the thread.
        // TODO migrate to v2, and remove this extra CPI.
        transfer(
            CpiContext::new(
                system_program.to_account_info(),
                Transfer {
                    from: authority.to_account_info(),
                    to: game.to_account_info(),
                },
            ),
            1000 * 1000 // Enough for 1000 moves
        )?;
    // Initialize the piece account.
    piece.authority = authority.key();
    piece.bump = *ctx.bumps.get("piece").unwrap();
    piece.id = game.num_pieces;
    piece.thread = thread.key();
    piece.x = x; 
    piece.y = y; 

    // Increment piece counters.
    game.num_pieces = game.num_pieces.checked_add(1).unwrap();
    player.num_pieces = player.num_pieces.checked_add(1).unwrap();

    Ok(())
}

    // pub fn join(ctx: Context<Join>, wager: u64, wen: String, team: Team, x:u8, y:u8) -> Result<()> {
    pub fn new_player(ctx: Context<NewPlayer>, team: Team) -> Result<()> {
        let authority = &ctx.accounts.authority;
        let game = &mut ctx.accounts.game;
        let player = &mut ctx.accounts.player;

        // Increment the game's player count.
        game.num_players_total = game.num_players_total.checked_add(1).unwrap();
        match team { 
            Team::Rock => {
                game.num_players_rock = game.num_players_rock.checked_add(1).unwrap();
            }
            Team::Paper => {
                game.num_players_paper = game.num_players_paper.checked_add(1).unwrap();
            }
            Team::Scissors => {
                game.num_players_scissors = game.num_players_scissors.checked_add(1).unwrap();
            }
        }

        // Initialize the player account.
        player.authority = authority.key();
        player.bump = *ctx.bumps.get("player").unwrap();
        player.team = team;

        Ok(())
    }

    pub fn new_piece(ctx: Context<NewPiece>, x: u64, y: u64)-> Result<()> {
        let authority = &ctx.accounts.authority;
        let game = &mut ctx.accounts.game;
        let player = &mut ctx.accounts.player;
        let piece = &mut ctx.accounts.piece;
        let system_program = &ctx.accounts.system_program;
        let thread = &ctx.accounts.thread;
        let thread_program = &ctx.accounts.thread_program;
       
        // Add a piece to the board.
        let board_position = &game.board[x as usize][y as usize];
        require!(board_position.is_none(), GameError::BoardPositionOccupied);
        game.board[x as usize][y as usize] = Some(player.team.clone());

        // Spawn a thread to move this piece.
        clockwork_sdk::cpi::thread_create(
            CpiContext::new_with_signer(
                thread_program.to_account_info(),
                clockwork_sdk::cpi::ThreadCreate {
                    authority: game.to_account_info(),
                    payer: authority.to_account_info(),
                    system_program: system_program.to_account_info(),
                    thread: thread.to_account_info()
                },
                &[&[SEED_GAME, &[game.bump]]]
            ),
            format!("{}", game.num_pieces),
            Instruction {
                program_id: crate::ID,
                accounts: crate::accounts::MovePiece {
                    game: game.key(),
                    piece: piece.key(),
                    thread: thread.key()
                }.to_account_metas(None),
                data: crate::instruction::MovePiece{}.data(),
            }.into(),
            Trigger::Immediate,
        )?;

        

        // Transfer SOL from authority to the thread.
        // TODO migrate to v2, and remove this extra CPI.
        transfer(
            CpiContext::new(
                system_program.to_account_info(),
                Transfer {
                    from: authority.to_account_info(),
                    to: thread.to_account_info(),
                },
            ),
            1000 * 1000 // Enough for 1000 moves
        )?;
        // Transfer SOL from authority to the thread.
        // TODO migrate to v2, and remove this extra CPI.
        transfer(
            CpiContext::new(
                system_program.to_account_info(),
                Transfer {
                    from: authority.to_account_info(),
                    to: game.to_account_info(),
                },
            ),
            1000 * 1000 // Enough for 1000 moves
        )?;
        
        // Initialize the piece account.
        piece.authority = authority.key();
        piece.bump = *ctx.bumps.get("piece").unwrap();
        piece.id = game.num_pieces;
        piece.thread = thread.key();
        piece.x = x; 
        piece.y = y; 

        // Increment piece counters.
        game.num_pieces = game.num_pieces.checked_add(1).unwrap();
        player.num_pieces = player.num_pieces.checked_add(1).unwrap();

        Ok(())
    }

    pub fn move_piece(ctx: Context<MovePiece>) -> Result<ThreadResponse> {
        let game = &mut ctx.accounts.game;
        let piece = &mut ctx.accounts.piece;

        // Get this piece's current team.
        let maybe_our_team = &game.board[piece.x as usize][piece.y as usize];
        require!(maybe_our_team.is_some(), GameError::InvalidBoardPosition);

        // The the closest capturable positions on the board.
        let board = Box::new(game.board.clone());
        let our_team = maybe_our_team.clone().unwrap();
        let closest_capturable_positions = grid_search(piece.x as usize, piece.y as usize, board, 0, &our_team);

        // Determine a direction of travel based on where the closest capturable pieces are relative to our position.
        let mut dir_x: i64 = 0;
        let mut dir_y: i64 = 0;
        for pos in &closest_capturable_positions {
            if pos.0.0 > piece.x as usize {
                dir_x += 1;
            } else if pos.0.0 < piece.y as usize {
                dir_x -= 1;
            }
            if pos.0.1 > piece.y as usize {
                dir_y += 1;
            } else if pos.0.1 < piece.y as usize {
                dir_y -= 1;
            }
        }

        // Move the piece.
        game.board[piece.x as usize][piece.y as usize] = None;
        if dir_x > 0 {
            piece.x = piece.x.saturating_add(1);
        } else if dir_x < 0 {
            piece.x = piece.x.saturating_sub(1);
        };
        if dir_y > 0 {
            piece.y = piece.y.saturating_add(1);
        } else if dir_y < 0 {
            piece.y = piece.y.saturating_sub(1);
        };

        // If we've landed on a capturable piece, then capture it.
        let new_board_position = &game.board[piece.x as usize][piece.y as usize];
        
        if our_team.can_capture(new_board_position) {
            game.board[piece.x as usize][piece.y as usize] = None;
        }
        if piece.super_power == 3 {
            
                // Determine a direction of travel based on where the closest capturable pieces are relative to our position.
                let mut dir_x: i64 = 0;
                let mut dir_y: i64 = 0;
                for pos in &closest_capturable_positions {
                    if pos.0.0 > piece.x as usize {
                        dir_x += 1;
                    } else if pos.0.0 < piece.y as usize {
                        dir_x -= 1;
                    }
                    if pos.0.1 > piece.y as usize {
                        dir_y += 1;
                    } else if pos.0.1 < piece.y as usize {
                        dir_y -= 1;
                    }
                }
        
                // Move the piece.
                game.board[piece.x as usize][piece.y as usize] = None;
                if dir_x > 0 {
                    piece.x = piece.x.saturating_add(1);
                } else if dir_x < 0 {
                    piece.x = piece.x.saturating_sub(1);
                };
                if dir_y > 0 {
                    piece.y = piece.y.saturating_add(1);
                } else if dir_y < 0 {
                    piece.y = piece.y.saturating_sub(1);
                };
        
                // If we've landed on a capturable piece, then capture it.
                let new_board_position = &game.board[piece.x as usize][piece.y as usize];
                if our_team.can_capture(new_board_position) {
                    game.board[piece.x as usize][piece.y as usize] = Some(our_team);
                }
            
        } else if piece.super_power == 1 {
    game.board[piece.x as usize][piece.y as usize] =Some(our_team);

}
         
        Ok(ThreadResponse::default())
    }
}


#[derive(Accounts)]
pub struct NewGame<'info> {
    #[account(
        init, 
        payer = payer,
        space = 10000,
        seeds = [SEED_GAME], 
        bump
    )]
    pub game: Account<'info, Game>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(wager: u64, wen: String, team: Team)]

pub struct JoinHarder <'info> {
    #[account(mut)]
    pub authority: AccountInfo <'info>,

    #[account(mut, seeds=[SEED_GAME], bump = game.bump)]
    pub game: Account<'info, Game>,

    #[account(
        init,
        payer = authority,
        space = size_of::<Piece>()*2,
        seeds = [SEED_PIECE, game.num_pieces.to_le_bytes().as_ref()],
        bump
    )]
    pub piece: Account<'info, Piece>,

    #[account(mut, seeds=[SEED_PLAYER, authority.key().as_ref()], bump = player.bump)]
    pub player: Account<'info, Player>,


    #[account(address = Thread::pubkey(game.key(), format!("{}", game.num_pieces)))]
    pub thread: SystemAccount<'info>,

    #[account(address = clockwork_sdk::ID)]
    pub thread_program: Program<'info, ThreadProgram>,
    #[account(address = sysvar::recent_blockhashes::id())]
    /// CHECK:
    recent_blockhashes: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    #[account(mut)]
    pub print_edition_mint: Account<'info, Mint>,
    #[account(mut)]
    pub master_edition_mint: Account<'info, Mint>,
    #[account(mut)]
    pub print_edition_token: Account<'info, TokenAccount>,
    #[account(mut)]
    pub master_edition_token: Account<'info, TokenAccount>,
    #[account(mut)]
    pub master_edition: AccountInfo<'info>,
    #[account(mut)]
    pub metadata: AccountInfo<'info>,
    #[account(mut)]
    pub print_edition: AccountInfo<'info>,
    #[account(mut)]
    pub edition_marker: AccountInfo<'info>,
    pub spl_token: AccountInfo<'info>,
#[account(constraint= collection.key() == Pubkey::new_from_array( [
    246,  92, 129, 142,  45, 217, 165,  60,
    200, 196,  26,  14, 219, 131,  13, 130,
     33, 172, 146,  21, 108, 150, 249, 164,
    145,  37, 149,  62,   0, 231, 201, 207
  ]))]
    pub collection: AccountInfo<'info>,
    pub collection2: AccountInfo<'info>,
    #[account(constraint= collection.key() == Pubkey::new_from_array([
        163, 129, 188, 179, 251, 111, 218, 207,
         79, 203, 194, 222,  20, 155,  17, 216,
         90, 255, 202,  50,  87,  39, 223, 201,
        128,  41,  21,  84, 223, 137, 111,  79
      ]))]
    pub collection3: AccountInfo<'info>
}
#[derive(Accounts)]
#[instruction(team: Team)]
pub struct NewPlayer<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds=[SEED_GAME], 
        bump = game.bump,
        constraint = game.is_open
    )]
    pub game: Account<'info, Game>,

    #[account(
        init, 
        payer = authority,
        space = size_of::<Player>()*2,
        seeds = [SEED_PLAYER, authority.key().as_ref()], 
        bump
    )]
    pub player: Account<'info, Player>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(x: u64, y: u64)]
pub struct NewPiece<'info> {
    #[account(mut)]
    pub authority: AccountInfo <'info>,

    #[account(mut, seeds=[SEED_GAME], bump = game.bump)]
    pub game: Account<'info, Game>,

    #[account(
        init,
        payer = authority,
        space = size_of::<Piece>()*2,
        seeds = [SEED_PIECE, game.num_pieces.to_le_bytes().as_ref()],
        bump
    )]
    pub piece: Account<'info, Piece>,

    #[account(mut, seeds=[SEED_PLAYER, authority.key().as_ref()], bump = player.bump)]
    pub player: Account<'info, Player>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(mut, address = Thread::pubkey(game.key(), format!("{}", game.num_pieces)))]
    pub thread: SystemAccount<'info>,

    #[account(address = clockwork_sdk::ID)]
    pub thread_program: Program<'info, ThreadProgram>,
}

#[derive(Accounts)]
pub struct MovePiece<'info> {
    #[account(mut, seeds=[SEED_GAME], bump = game.bump)]
    pub game: Account<'info, Game>,

    #[account(mut, seeds=[SEED_PIECE, piece.id.to_le_bytes().as_ref()], bump = piece.bump)]
    pub piece: Account<'info, Piece>,

    #[account(signer, address = piece.thread)]
    pub thread: Box<Account<'info, Thread>>,
}

#[account]
pub struct Player  {
    pub authority: Pubkey, 
    pub bump: u8,
    pub num_pieces: u64,
    pub team: Team,
}

#[account]
pub struct Game  {
    pub bump: u8,
    pub board: Board,
    pub is_open: bool,
    pub num_pieces: u64,
    pub num_players_total: u64,
    pub num_players_rock: u64,
    pub num_players_paper: u64,
    pub num_players_scissors: u64,
    pub started_at: i64,
}

#[account]
pub struct Piece {
    pub authority: Pubkey,
    pub bump: u8,
    pub id: u64,
    pub thread: Pubkey,
    pub x: u64,
    pub y: u64,
    pub super_power: u8
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq, PartialOrd)]
#[repr(u8)]
pub enum Team {
   Rock = 0b00,
   Paper = 0b01,
   Scissors = 0b10,
}

impl Team {
    pub fn can_capture(&self, team: &Option<Team>) -> bool {
        match team {
            None => false,
            Some(team) => {
                match team {
                    Team::Rock => self.eq(&Team::Paper),
                    Team::Paper => self.eq(&Team::Scissors),
                    Team::Scissors => self.eq(&Team::Rock),
                }
            }
        }
    }
}

pub type Board = Vec<Vec<Option<Team>>>;

pub fn new_board() -> Board {
    vec![vec![None; BOARD_SIZE]; BOARD_SIZE]   
}

#[derive(Debug, PartialEq, Eq)]
pub struct Position((usize, usize));

static BOARD_SIZE: usize = 64;

static SEED_GAME: &[u8] = b"game";
static SEED_PLAYER: &[u8] = b"player";
static SEED_PIECE: &[u8] = b"piece";

fn grid_search(x: usize, y: usize, board: Box<Board>, size: usize, our_team: &Team) -> Vec<Position> {
    // Recursive base case.
    if size.gt(&BOARD_SIZE) {
        return vec![];
    }  

    let mut capturable_positions: Vec<Position> = vec![]; 

    let y_pos_top = (y + size).min(BOARD_SIZE - 1);
    let y_pos_bottom = y.saturating_sub(size);
    for x_pos in x.saturating_sub(size)..(x + size).min(BOARD_SIZE - 1) {
        dbg!(x_pos);
        if dbg!(our_team.can_capture(&board[x_pos][y_pos_top])) {
            capturable_positions.push(Position((x_pos, y_pos_top)));
        }
        if dbg!(our_team.can_capture(&board[x_pos][y_pos_bottom])) {
            capturable_positions.push(Position((x_pos, y_pos_bottom)));
        }
    }
    
    let x_pos_left = x.saturating_sub(size);
    let x_pos_right = (x + size).min(BOARD_SIZE - 1);
    for y_pos in y.saturating_sub(size)..(y + size).min(BOARD_SIZE - 1) {
        dbg!(y_pos);
        if dbg!(our_team.can_capture(&board[x_pos_left][y_pos])) {
            capturable_positions.push(Position((x_pos_left, y_pos)));
        }
        if dbg!(our_team.can_capture(&board[x_pos_right][y_pos])) {
            capturable_positions.push(Position((x_pos_right, y_pos)));
        }
    }

    if capturable_positions.is_empty() {
        grid_search(x, y, board, size + 1, our_team)
    } else {
        capturable_positions
    }
}

#[error_code]
pub enum GameError {
    #[msg("This board position is already occupied by another piece")]
    BoardPositionOccupied,
    #[msg("Invalid board position")]
    InvalidBoardPosition,
    #[msg("Invalid team")]
    BadTeam,
}


#[cfg(test)]
mod tests {
    use crate::{Team, grid_search, new_board};

    #[test]
    fn test_grid_search() {
        let mut board = new_board();
        board[1][3] = Some(Team::Rock);
        board[1][1] = Some(Team::Scissors);
        board[3][3] = Some(Team::Scissors);
        board[2][3] = Some(Team::Paper);

        let positions = dbg!(grid_search(3, 1, Box::new(board), 1, &Team::Rock));
        assert!(positions.len() == 2);
    }
}
