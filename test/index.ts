import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Artwork } from "../typechain";

interface ArtworkContext {
  token: Artwork;
  deployer: SignerWithAddress;
  user1: SignerWithAddress;
  user2: SignerWithAddress;
}

describe("Artwork Smart Contract Tests", function () {
  let ctx: ArtworkContext;
  beforeEach(async function () {
    const [deployer, user1, user2] = await ethers.getSigners();
    const Artwork = await ethers.getContractFactory("Artwork");
    const token = await Artwork.deploy("Artwork Contract", "ART");
    ctx = { token, deployer, user1, user2 };
  });

  it("NFT is minted successfully", async function () {
    expect(await ctx.token.balanceOf(ctx.user1.address)).to.equal(0);
    const tokenURI =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    await ctx.token.connect(ctx.user1).mint(tokenURI);
    expect(await ctx.token.balanceOf(ctx.user1.address)).to.equal(1);
  });

  it("tokenURI is set sucessfully", async function () {
    const tokenURI1 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    const tokenURI2 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/2";
    await ctx.token.connect(ctx.user1).mint(tokenURI1);
    await ctx.token.connect(ctx.user2).mint(tokenURI2);
    expect(await ctx.token.tokenURI(0)).to.equal(tokenURI1);
    expect(await ctx.token.tokenURI(1)).to.equal(tokenURI2);
  });
});
