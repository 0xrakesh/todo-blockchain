require("dotenv").config();
let network = process.env.network || "127.0.0.1"
let port = process.env.port || 7545
module.exports = {
  networks: {
      development: {
          host: network, // Localhost (default: none)
          port: port,        // Ganache GUI default port
          network_id: "*",   // Any network (default: none)
      },
  },
  compilers: {
      solc: {
          version: "0.8.0", // Specify the Solidity version
      },
  },
};
