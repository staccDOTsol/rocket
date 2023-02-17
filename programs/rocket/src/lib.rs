use std::mem::size_of;

use borsh::{BorshDeserialize, BorshSerialize};
use anchor_lang::{error, solana_program::system_program, prelude::*};
use clockwork_sdk::state::{Thread, ThreadResponse};

declare_id!("7vWEUWH7L9VJCZjVahFwpWstZqfmGTSK122VVtvdvzFz");


#[program]
pub mod rpsx {
    pub use super::*;

    pub fn new_game(ctx: Context<NewGame>) -> Result<()> {
        let game = &mut ctx.accounts.game;

        // Initialize the game account.
        game.bump = *ctx.bumps.get("game").unwrap();
        game.board = new_board(BOARD_SIZE);
        game.is_open = true;
        game.num_players_total = 0;
        game.num_players_rock = 0;
        game.num_players_paper = 0;
        game.num_players_scissors = 0; 
        game.started_at = Clock::get().unwrap().unix_timestamp;

        Ok(())
    }

   
    // pub fn join(ctx: Context<Join>, wager: u64, wen: String, team: U4, x:u8, y:u8) -> Result<()> {
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
        player.bump = *ctx.bumps.get("authority").unwrap();
        player.team = team;

        Ok(())
    }

    pub fn new_piece(ctx: Context<NewPiece>, x: u64, y: u64)-> Result<()> {
        let authority = &ctx.accounts.authority;
        let game = &mut ctx.accounts.game;
        let player = &mut ctx.accounts.player;
        let piece = &mut ctx.accounts.piece;
       
        // Add a piece to the board.
        let board_position = &game.board[x as usize][y as usize];
        require!(board_position.is_none(), GameError::BoardPositionOccupied);
        game.board[x as usize][y as usize] = Some(player.team.clone());
        
        // Initialize the piece account.
        piece.authority = authority.key();
        piece.bump = *ctx.bumps.get("piece").unwrap();
        piece.id = game.num_pieces;
        // TODO piece.thread = ;
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

        // TODO Find the closest piece.
        // TODO Move in the direction of the closest piece.
        let maybe_our_team = &game.board[piece.x as usize][piece.y as usize];
        require!(maybe_our_team.is_some(), GameError::InvalidBoardPosition);

        let board = Box::new(game.board.clone());
        let our_team = maybe_our_team.clone().unwrap();
        let closest_capturable_positions = grid_search(piece.x as usize, piece.y as usize, board, 0, &our_team);

        let mut net_x: i64 = 0;
        let mut net_y: i64 = 0;
        for pos in closest_capturable_positions {
            if pos.0.0 > piece.x as usize {
                net_x += 1;
            } else if pos.0.0 < piece.y as usize {
                net_x -= 1;
            }
            if pos.0.1 > piece.y as usize {
                net_y += 1;
            } else if pos.0.1 < piece.y as usize {
                net_y -= 1;
            }
        }

        if net_x > 0 {
            piece.x = piece.x.checked_add(1).unwrap();
        } else if net_x < 1 {
            piece.x = piece.x.saturating_sub(1);
        };

        if net_y > 0 {
            piece.y = piece.y.checked_add(1).unwrap();
        } else if net_y < 1 {
            piece.y = piece.y.saturating_sub(1);
        };

        let new_board_position = &game.board[piece.x as usize][piece.y as usize];
        if our_team.can_capture(new_board_position) {
            game.board[piece.x as usize][piece.y as usize] = Some(our_team);
        };
         
        Ok(ThreadResponse::default())
    }
}


#[derive(Accounts)]
pub struct NewGame<'info> {
    #[account(
        init, 
        payer = payer,
        space = size_of::<Game>(),
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
        space = size_of::<Player>(),
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
        space = size_of::<Piece>(),
        seeds = [SEED_PIECE, game.num_pieces.to_le_bytes().as_ref()],
        bump
    )]
    pub piece: Account<'info, Piece>,

    #[account(mut, seeds=[SEED_PLAYER, authority.key().as_ref()], bump = player.bump)]
    pub player: Account<'info, Player>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct MovePiece<'info> {
    #[account(mut, seeds=[SEED_GAME], bump = game.bump)]
    pub game: Account<'info, Game>,

    #[account(mut, seeds=[SEED_PIECE], bump = piece.bump)]
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

pub fn new_board(size: usize) -> Board {
    vec![vec![None; size]; size]   
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
}


#[cfg(test)]
mod tests {
    use crate::{Team, grid_search, BOARD_SIZE, new_board};

    #[test]
    fn test_grid_search() {
        let mut board = new_board(BOARD_SIZE);
        board[1][3] = Some(Team::Rock);
        board[1][1] = Some(Team::Scissors);
        board[3][3] = Some(Team::Scissors);
        board[2][3] = Some(Team::Paper);

        let positions = dbg!(grid_search(3, 1, Box::new(board), 1, &Team::Rock));
        assert!(positions.len() == 2);
    }
}
