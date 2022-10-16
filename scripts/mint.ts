import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types';

task('mint', 'mint NFT', async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
  const provider = await hre.ethers.getDefaultProvider(hre.network.name, { alchemy: process.env.ALCHEMY_KEY ?? '' });
  const account = new hre.ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY ?? '', provider);
  const contract = await hre.ethers.getContractAt("NFT", process.env.CONTRACT_ADDRESS ?? '', account);

  let baseTokenURI: string = await contract.baseTokenURI();
  if (baseTokenURI === '') {
    baseTokenURI = process.env.METADATA_URI ?? '';
    console.log('setBaseTokenURI: ', await contract.setBaseTokenURI(baseTokenURI, {
      gasLimit: 500_000,
    }));
  }

  console.log('mintTo: ', await contract.mintTo(process.env.ACCOUNT_ADDRESS ?? '', {
    gasLimit: 500_000,
  }));
});