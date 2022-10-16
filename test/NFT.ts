import { ethers } from 'hardhat';
import { expect } from 'chai';
import { NFT } from '../typechain-types/contracts/NFT'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('My NFT', () => {

  let contract: NFT;
  let signers: SignerWithAddress[];

  before(async () => {
    signers = await ethers.getSigners();
  });

  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory('NFT');
    contract = await contractFactory.deploy();

    expect(contract.address).to.properAddress;
    expect(await contract.supportsInterface('0x80ac58cd')).to.equal(true);
  });

  it('check name', async () => {
    expect(await contract.name()).to.equal('My NFT');
  });

  it('check symbol', async () => {
    expect(await contract.symbol()).to.equal('MNFT');
  });

  it('mint and check balance, owner, uri', async () => {
    expect(await contract.balanceOf(await signers[0].getAddress())).to.equal(0);
    await contract.mintTo(await signers[0].getAddress());
    expect(await contract.balanceOf(await signers[0].getAddress())).to.equal(1);
    expect(await contract.ownerOf(1)).to.equal(await signers[0].getAddress());
    expect(await contract.tokenURI(1)).to.equal('');
  });

  it('mint, set base uri and check uri', async () => {
    const baseTokenUri: string = process.env.METADATA_URI ?? '';
    await contract.mintTo(await signers[0].getAddress());
    await contract.setBaseTokenURI(baseTokenUri);
    let tokenId = 1;
    expect(await contract.tokenURI(tokenId)).to.equal(baseTokenUri + tokenId);

    await contract.mintTo(await signers[0].getAddress());
    tokenId++;
    expect(await contract.tokenURI(tokenId)).to.equal(baseTokenUri + tokenId);
  });
});
