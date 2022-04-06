const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VolcanoCoin", function () {
  //TODO
  xit("Should return the new greeting once it's changed", async function () {
    const VolcanoCoin = await ethers.getContractFactory("VolcanoCoin");
    const volcanoCoin = await VolcanoCoin.deploy("Hello, world!");
    await volcanoCoin.deployed();

    expect(await volcanoCoin.greet()).to.equal("Hello, world!");

    const setGreetingTx = await volcanoCoin.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await volcanoCoin.greet()).to.equal("Hola, mundo!");
  });
});
