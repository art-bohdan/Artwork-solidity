import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Demo } from "../typechain";

interface DemoTokenContext {
  token: Demo;
  deployer: SignerWithAddress;
  user: SignerWithAddress;
}

describe("Payments", function () {
  let ctx: DemoTokenContext;
  beforeEach(async () => {
    const [deployer, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Demo", deployer);
    const token = await Token.deploy();
    await token.deployed();
    ctx = { token, deployer, user };
    console.log(deployer.address);
  });

  async function sendMoney(amount: number, sender: SignerWithAddress) {
    const txData = {
      to: ctx.token.address,
      value: amount,
    };
    const tx = await sender.sendTransaction(txData);
    await tx.wait();
    return [tx, amount];
  }

  it("should allow to send money", async () => {
    const [sendMoneyTx, amount] = await sendMoney(100, ctx.user);
    await expect(() => sendMoneyTx).to.changeEtherBalance(ctx.token, amount);
    console.log(sendMoneyTx);
    // const timestamp = (await ethers.provider.getBlock(sendMoneyTx.blockNumber)).timestamp;
    // await expect(sendMoneyTx)
    //   .to.emit(ctx.token, "Paid")
    //   .withArgs(ctx.user.address, amount, timestamp);
  });

  it("should be deployed", async () => {
    expect(ctx.token.address).to.be.properAddress;
  });

  it("should allow owner to whithdraw balance", async () => {
    const [_, amount] = await sendMoney(100, ctx.user);
    const tx = await ctx.token.withdraw(ctx.deployer.address);
    await expect(() => tx).to.changeEtherBalances(
      [ctx.token, ctx.deployer],
      [-amount, amount]
    );
  });
  it("should not allow to other accounts whithdraw balance", async () => {
    await sendMoney(100, ctx.user);
    await expect(
      ctx.token.connect(ctx.user).withdraw(ctx.user.address)
    ).to.be.revertedWith("you are not an owner!");
  });
});
