import { ethers } from "hardhat";

async function main() {
  const Artwork = await ethers.getContractFactory("Artwork");
  const artwork = await Artwork.deploy("Artwork Contract", "ART");

  await artwork.deployed();

  console.log("Artwork deployed to:", artwork.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
