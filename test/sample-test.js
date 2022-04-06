const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VolcanoCoin", function () {

  let VolcanoCoin, volcanoCoin, owner, addr1, addr2;

  before(async () => {
    VolcanoCoin = await ethers.getContractFactory("VolcanoCoin");
    volcanoCoin = await VolcanoCoin.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });


  describe("Deployment", () => {
    xit("Verify onwnership", async function () {

      //await volcanoCoin.deployed();
      expect(owner.address).to.equal(await volcanoCoin.owner());
    });

    it("Check initial Balance", async function () {

      await volcanoCoin.deployed();
      expect(await volcanoCoin.getTotalSupply()).to.equal(10000);
    });
  });

  describe("Total Supply", () => {
    it("Should increase Total Supply", async function () {

      //await volcanoCoin.deployed();
      await volcanoCoin.increaseTotalSupply();
      expect(await volcanoCoin.getTotalSupply()).to.equal(11000);
    });

    it("Should not increase Total Supply", async function () {
      //await volcanoCoin.deployed();
      expect(() => volcanoCoin.increaseTotalSupply({ from: addr1 }).to.be.reverted());
      expect(await volcanoCoin.getTotalSupply()).to.equal(11000);
    });
  });

  describe("Transfer", () => {
    it("Should tranfer", async function () {

      //await volcanoCoin.deployed();
      await volcanoCoin.transfer(2000, addr2.address);
      expect(await volcanoCoin.balances(owner.address)).to.equal(9000);
      expect(await volcanoCoin.getTotalSupply()).to.equal(9000);
    });

    it("Should not transfer", async function () {
      //await volcanoCoin.deployed();
      expect(() => volcanoCoin.transfer({ from: addr1 }, 100, addr1.address).to.be.revertedWith("Not enough tokens"));
    });
  });


});
