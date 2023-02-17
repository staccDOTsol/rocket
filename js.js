const bs58 = require('bs58')
const address = "Hah7BEng73oRHMz6N6tZVruSneirvUwPCZ48dU52bCxn"
console.log(new Uint8Array(bs58.decode(address)))
