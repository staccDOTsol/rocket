const bs58 = require('bs58')
console.log(bs58.encode([
    232, 158, 159,  87,  31,  86, 208,
     28, 245, 115, 130, 214, 193, 219,
     66, 228,  51, 230, 127, 133, 163,
    242,  27,  69, 157, 185, 123, 176,
    143,  63,  68, 191
  ]))

console.log(new Uint8Array(bs58.decode("94NZ1rQsvqHyZu1B71KwVT9B6sWm4h2Q1f6d6aXoJ6vB")))
