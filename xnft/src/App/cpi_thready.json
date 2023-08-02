{
  "version": "0.1.0",
  "name": "cpi_whirlpool_anchor_gen_v0250",
  "instructions": [
    {
      "name": "verifyWhirlpoolsConfigAccount",
      "accounts": [
        {
          "name": "whirlpoolsConfig",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "verifyFeetierAccount",
      "accounts": [
        {
          "name": "feetier",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "verifyWhirlpoolAccount",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "verifyTickarrayAccount",
      "accounts": [
        {
          "name": "tickarray",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sampling1",
          "type": "u32"
        },
        {
          "name": "sampling2",
          "type": "u32"
        },
        {
          "name": "sampling3",
          "type": "u32"
        },
        {
          "name": "sampling4",
          "type": "u32"
        },
        {
          "name": "sampling5",
          "type": "u32"
        },
        {
          "name": "sampling6",
          "type": "u32"
        },
        {
          "name": "sampling7",
          "type": "u32"
        },
        {
          "name": "sampling8",
          "type": "u32"
        }
      ]
    },
    {
      "name": "verifyPositionAccount",
      "accounts": [
        {
          "name": "position",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "proxySwap",
      "accounts": [
        {
          "name": "hydra",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToB",
          "type": "bool"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "proxyOpenPosition",
      "accounts": [
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "dev",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recentBlockhashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": "OpenPositionBumps"
          }
        }
      ]
    },
    {
      "name": "proxyIncreaseLiquidity",
      "accounts": [
        {
          "name": "hydra",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardOwnerAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardOwnerAccount2",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardVault2",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Solana system program."
          ]
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidity",
          "type": "u128"
        },
        {
          "name": "tokenMaxA",
          "type": "u64"
        },
        {
          "name": "tokenMaxB",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "proxyDecreaseLiquidity",
      "accounts": [
        {
          "name": "hydra",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardOwnerAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardOwnerAccount2",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardVault2",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "proxyUpdateFeesAndRewards",
      "accounts": [
        {
          "name": "hydra",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "proxyCollectFees",
      "accounts": [
        {
          "name": "hydra",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardOwnerAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardOwnerAccount2",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "rewardVault2",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "proxyCollectReward",
      "accounts": [
        {
          "name": "hydra",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardOwnerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "proxyClosePosition",
      "accounts": [
        {
          "name": "hydra",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "dcaCreate",
      "accounts": [
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authorityAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorityBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dca",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dcaAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dcaBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "dcaDelete",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "The authority (owner) of the dca."
          ]
        },
        {
          "name": "closeTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address to return the data rent lamports to."
          ]
        },
        {
          "name": "dca",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "authorityAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorityBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dca",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dcaAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dcaBVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dcaThread",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "orcaWhirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenAVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolTokenBVault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Authority",
      "docs": [
        "* Dca"
      ],
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "Dca",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "aMint",
            "type": "publicKey"
          },
          {
            "name": "bMint",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "otherAmountThreshold",
            "type": "u64"
          },
          {
            "name": "sqrtPriceLimit",
            "type": "u128"
          },
          {
            "name": "amountSpecifiedIsInput",
            "type": "bool"
          },
          {
            "name": "aToB",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "OpenPositionBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "DcaSettings",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "otherAmountThreshold",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "sqrtPriceLimit",
            "type": {
              "option": "u128"
            }
          },
          {
            "name": "amountSpecifiedIsInput",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "aToB",
            "type": {
              "option": "bool"
            }
          }
        ]
      }
    }
  ],
  "metadata": {
    "address": "AmZwbjYqb13PNKGinSZYhLsvoL3jh56H23Vo1CbfpCZ1"
  }
}