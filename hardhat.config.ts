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
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY!],
    },
    bscTestnet:{
      url:"https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: ["0f1d278ad63c51f033d0dd4a05de9275c136e0909e5df100b18fa6c160a627f1"],
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY,
  },
};

export default config;
