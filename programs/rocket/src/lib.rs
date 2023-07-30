use std::mem::size_of;
use spl_account_compression::{state::CONCURRENT_MERKLE_TREE_HEADER_SIZE_V1, ConcurrentMerkleTree};

use borsh::{BorshDeserialize, BorshSerialize};
use anchor_lang::{error, InstructionData, solana_program::system_program, prelude::*, __private::bytemuck::checked::try_from_bytes};
use clockwork_sdk::{state::{Thread, ThreadResponse}, ThreadProgram};
use anchor_spl::token::{TokenAccount,Mint, Token};
use anchor_lang::solana_program::program::{invoke};
use anchor_lang::solana_program::sysvar;
use mpl_bubblegum::{program::Bubblegum, cpi::accounts::CreateTree, state::metaplex_adapter::MetadataArgs, hash_metadata, hash_creators};
use mpl_token_metadata::instruction::burn_edition_nft;
use mpl_token_metadata::state::Metadata;
use mpl_token_metadata::state::TokenMetadataAccount;
use spl_account_compression::program::SplAccountCompression;
declare_id!("3PhaPMTdNzWpgyRDqsizW2teansweaYWBQ3somsUP13z");


#[program]
pub mod rpsx {
    use anchor_lang::{solana_program::instruction::Instruction, system_program::{transfer, Transfer}};
    use clockwork_sdk::state::Trigger;
    use mpl_bubblegum::{cpi::{mint_v1, accounts::MintV1, verify_creator, unverify_creator}, state::metaplex_adapter::{MetadataArgs, Creator, Collection, TokenProgramVersion}};

    pub use super::*;

    pub fn new_game(ctx: Context<NewGame>) -> Result<()> {
        let game = &mut ctx.accounts.game;

        // Initialize the game account.
        game.bump = *ctx.bumps.get("game").unwrap();
        game.board = new_board();
        let payer = ctx.accounts.payer.key();
        let merkle_tree = ctx.accounts.merkle_tree.key();
        
        game.tree = Tree {
            tree_creator: payer.key(),
            tree_delegate: game.key(),
            merkle_tree,
            canopy_depth: MAX_DEPTH as u32,
            num_minted: 0,
        };
        game.is_open = true;
        game.num_players_total = 0;
        game.num_players_rock = 0;
        game.num_players_paper = 0;
        game.num_players_scissors = 0; 
        game.started_at = Clock::get().unwrap().unix_timestamp;

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
        let dev = &mut ctx.accounts.dev;
        let player = &mut ctx.accounts.player;
        let piece = &mut ctx.accounts.piece;
        let system_program = &ctx.accounts.system_program;
        let thread = &ctx.accounts.thread;
        let thread_program = &ctx.accounts.thread_program;
       
        
    // Add a piece to the board.
    let board_position =  &game.board[piece.x as usize][piece.y as usize];
    // Default proof tree construction.
    let cpi_context = CpiContext::new(
        ctx.accounts.bubblegum_program.to_account_info(),
        MintV1 {
            tree_delegate: game.to_account_info(),
            leaf_delegate: ctx.accounts.thread.to_account_info(),
            leaf_owner: ctx.accounts.authority.to_account_info(),
            tree_authority: ctx.accounts.dev.to_account_info(),
            merkle_tree: ctx.accounts.merkle_tree.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            log_wrapper: ctx.accounts.spl_noop_program.to_account_info(),
            compression_program: ctx.accounts.compression_program.to_account_info(),
        },
    );
    let collection = Collection {
        key: ctx.accounts.collection.key(),
        verified: true
    };
    let metadata = MetadataArgs {
        primary_sale_happened: false,
        edition_nonce: None,
        token_standard: None, 
        uses: None, 
        token_program_version: TokenProgramVersion::Original,
        collection: Some(collection),
        name: "name".to_string(),
        symbol: "symbol".to_string(),
        seller_fee_basis_points: 138,
        creators: vec![Creator{
            address: *ctx.accounts.authority.to_account_info().key,
            share: 50,
            verified: false 
    
        },Creator{
            address: *ctx.accounts.dev.to_account_info().key,
            share: 50,
            verified: false 
    
        }],
        uri: "https://arweave.net/wH6ZidT12EXOFw-49-te7T58KJ-X645S5h6e3ywlM-I".to_string(),
        is_mutable: true,
    };
    mint_v1(cpi_context, metadata.clone()).unwrap();
    let root = decode_root(ctx.accounts.merkle_tree.clone()).unwrap();
    let (data_hash, creator_hash) = compute_metadata_hashes(&metadata.clone())?;

    let cpi_context     
    = CpiContext::new(
        ctx.accounts.bubblegum_program.to_account_info(),
        mpl_bubblegum::cpi::accounts::CreatorVerification {
            tree_authority:game.to_account_info(),
            leaf_owner: ctx.accounts.payer.to_account_info(),
            leaf_delegate: ctx.accounts.thread.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            creator: ctx.accounts.authority.to_account_info(),
            log_wrapper: ctx.accounts.spl_noop_program.to_account_info(),
            compression_program: ctx.accounts.compression_program.to_account_info(),
            merkle_tree: ctx.accounts.merkle_tree.to_account_info(),
            system_program: system_program.to_account_info()
        }
    );
    
    verify_creator(cpi_context, root, data_hash, creator_hash, piece.x * piece.y as u64, 0, metadata.clone()).unwrap();
    
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
                thread: thread.key(),
                bubblegum_program: ctx.accounts.bubblegum_program.key(),
                merkle_tree: ctx.accounts.merkle_tree.key(),
                spl_noop_program: ctx.accounts.spl_noop_program.key(),
                compression_program: ctx.accounts.compression_program.key(),
                collection: ctx.accounts.collection.key(),
                rent: ctx.accounts.rent.key(),
                authority: ctx.accounts.authority.key(),
                dev: ctx.accounts.dev.key(),
                payer: ctx.accounts.payer.key(),
                system_program: ctx.accounts.system_program.key(),


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
            1000 * 138 // Enough for 1000 moves
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
            1000 * 138 // Enough for 1000 moves
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

        
        let collection = Collection {
            key: ctx.accounts.collection.key(),
            verified: true
        };
        let metadata = MetadataArgs {
            primary_sale_happened: false,
            edition_nonce: None,
            token_standard: None, 
            uses: None, 
            token_program_version: TokenProgramVersion::Original,
            collection: Some(collection),
            name: "name".to_string(),
            symbol: "symbol".to_string(),
            seller_fee_basis_points: 138,
            creators: vec![Creator{
                address: *ctx.accounts.authority.to_account_info().key,
                share: 50,
                verified: false 
        
            },Creator{
                address: *ctx.accounts.dev.to_account_info().key,
                share: 50,
                verified: false 
        
            }],
            uri: "https://arweave.net/wH6ZidT12EXOFw-49-te7T58KJ-X645S5h6e3ywlM-I".to_string(),
            is_mutable: true,
        };
        let root = decode_root(ctx.accounts.merkle_tree.clone()).unwrap();
        let (data_hash, creator_hash) = compute_metadata_hashes(&metadata.clone())?;
    
        let cpi_context     
        = CpiContext::new(
            ctx.accounts.bubblegum_program.to_account_info(),
            mpl_bubblegum::cpi::accounts::CreatorVerification {
                tree_authority:game.to_account_info(),
                leaf_owner: ctx.accounts.payer.to_account_info(),
                leaf_delegate: ctx.accounts.thread.to_account_info(),
                payer: ctx.accounts.payer.to_account_info(),
                creator: ctx.accounts.authority.to_account_info(),
                log_wrapper: ctx.accounts.spl_noop_program.to_account_info(),
                compression_program: ctx.accounts.compression_program.to_account_info(),
                merkle_tree: ctx.accounts.merkle_tree.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info()
            }
        );
        unverify_creator(cpi_context, root, data_hash, creator_hash, piece.x * piece.y as u64, 0, metadata.clone()).unwrap();
        let cpi_context     
        = CpiContext::new(
            ctx.accounts.bubblegum_program.to_account_info(),
            mpl_bubblegum::cpi::accounts::CreatorVerification {
                tree_authority:game.to_account_info(),
                leaf_owner: ctx.accounts.payer.to_account_info(),
                leaf_delegate: ctx.accounts.thread.to_account_info(),
                payer: ctx.accounts.payer.to_account_info(),
                creator: ctx.accounts.authority.to_account_info(),
                log_wrapper: ctx.accounts.spl_noop_program.to_account_info(),
                compression_program: ctx.accounts.compression_program.to_account_info(),
                merkle_tree: ctx.accounts.merkle_tree.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info()
            }
        );

        verify_creator(cpi_context, root, data_hash, creator_hash, piece.x * piece.y as u64, 0, metadata.clone()).unwrap();
        
            
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
    pub system_program: Program<'info, System>,

    #[account(mut)]
    pub merkle_tree: AccountInfo<'info>,
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
    #[account(mut)]
    pub dev: AccountInfo <'info>,
    pub payer: Signer<'info>,

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

    
    #[account(address = mpl_bubblegum::ID)]
    pub bubblegum_program: Program<'info, Bubblegum>,
    #[account(address = clockwork_sdk::ID)]
    /// CEHCK: checked
    #[account(mut)]
    pub merkle_tree: AccountInfo<'info>,
    pub rent: Sysvar<'info, Rent>,
    #[account(address = spl_account_compression::ID)]
    pub compression_program: Program<'info, SplAccountCompression>,
    
    #[account(address = spl_noop::ID)]
    pub spl_noop_program: AccountInfo<'info>,
    pub collection: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MovePiece<'info> {
    #[account(mut, seeds=[SEED_GAME], bump = game.bump)]
    pub game: Account<'info, Game>,


    #[account(mut)]
    pub authority: AccountInfo <'info>,
    #[account(mut)]
    pub dev: AccountInfo <'info>,
    pub payer: AccountInfo<'info>,


    #[account(mut, seeds=[SEED_PIECE, piece.id.to_le_bytes().as_ref()], bump = piece.bump)]
    pub piece: Account<'info, Piece>,

    #[account(signer, address = piece.thread)]
    pub thread: Box<Account<'info, Thread>>,

    #[account(address = mpl_bubblegum::ID)]
    pub bubblegum_program: Program<'info, Bubblegum>,
    #[account(address = clockwork_sdk::ID)]
    /// CEHCK: checked
    #[account(mut)]
    pub merkle_tree: AccountInfo<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    #[account(address = spl_account_compression::ID)]
    pub compression_program: Program<'info, SplAccountCompression>,
    
    #[account(address = spl_noop::ID)]
    pub spl_noop_program: AccountInfo<'info>,
    pub collection: AccountInfo<'info>,
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
    pub tree: Tree,
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

// Test for multiple combinations?
const MAX_DEPTH: usize = 14;
const MAX_BUF_SIZE: usize = 64;

// Minting too many leaves takes quite a long time (in these tests at least).
const DEFAULT_NUM_MINTS: u64 = 10;

// A convenience object that records some of the parameters for compressed
// trees and generates TX builders with the default configuration for each
// operation.
// TODO: finish implementing all operations.
#[derive(Debug, Clone, BorshDeserialize, BorshSerialize)]
pub struct Tree {
    pub tree_creator: Pubkey,
    pub tree_delegate: Pubkey,
    pub merkle_tree: Pubkey,
    pub canopy_depth: u32,
    // Keep track of how many mint TXs executed successfully such that we can automatically
    // populate the `nonce` and `index` of leaf args instead of having to do it manually.
    pub num_minted: u64,
}


pub type Board = Vec<Vec<Option<Team>>>;

// Computes the `data_hash` and `creator_hash`. Taken from the contract code where something
// similar is computed. Needs subsequent cleanup/refactoring.
fn compute_metadata_hashes(metadata_args: &MetadataArgs) -> Result<([u8; 32], [u8; 32])> {
    let data_hash = hash_metadata(metadata_args).unwrap();
    let creator_hash = hash_creators(metadata_args.creators.as_slice()).unwrap();
    Ok((data_hash, creator_hash))
}
fn decode_root(tree_account: AccountInfo, ) -> Result<[u8; 32]> {

    let mut merkle_tree_bytes = tree_account.data.borrow_mut();
    let (_header_bytes, rest) =
        merkle_tree_bytes.split_at_mut(2 + 54 as usize);

    let merkle_tree_size = size_of::<ConcurrentMerkleTree<MAX_DEPTH, MAX_BUF_SIZE>>();
    let tree_bytes = &mut rest[..merkle_tree_size];

    let tree = (try_from_bytes::<ConcurrentMerkleTree<MAX_DEPTH, MAX_BUF_SIZE>>(tree_bytes)).unwrap() ;
    let root = tree.change_logs[tree.active_index as usize].root;

    Ok(root)
}
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

