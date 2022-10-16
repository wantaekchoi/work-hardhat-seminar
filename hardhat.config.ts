import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades';
import 'dotenv/config'

require("./scripts/mint");

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      chainId: 5,
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [
        `0x${process.env.ACCOUNT_PRIVATE_KEY}`,
      ],
    }
  }
};

export default config;
