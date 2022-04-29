import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/types";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: "https://matic-testnet-archive-rpc.bwarelabs.com",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY,
  },
};

export default config;
