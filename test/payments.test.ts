import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Payments } from "../typechain";

describe("Payments", function () {
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;
  let payments: Payments;

  beforeEach(async () => {
    [acc1, acc2] = await ethers.getSigners();
    const Payments = await ethers.getContractFactory("Payments", acc1);
    payments = await Payments.deploy();
    await payments.deployed();
  });

  it("should be deployed", async () => {
    expect(payments.address).to.be.properAddress;
  });

  it("should have 0 ethers by default", async () => {
    const balance = await payments.currentBalance();
    expect(balance).to.eq(0);
  });

  it("should be posible send funds", async () => {
    const sum = 200;
    const message = "from seccond account";
    const tx = await payments.connect(acc2).pay(message, { value: 200 });
    await expect(() => tx).to.changeEtherBalances(
      [acc2, payments],
      [-sum, sum]
    );
    await tx.wait();
    const newPayment = await payments.getPayment(acc2.address, 0);
    expect(newPayment.message).to.eq(message);
  });
});
