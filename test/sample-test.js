const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VolcanoCoin", function () {

  let VolcanoCoin, volcanoCoin, owner, addr1, addr2;
  const BALANCE_ERROR = "ERC20: transfer amount exceeds balance";
  const OWNER_ERROR = "Ownable: caller is not the owner";

  before(async () => {
    VolcanoCoin = await ethers.getContractFactory("VolcanoCoin");
    volcanoCoin = await VolcanoCoin.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });


  describe("Deployment", () => {
    it("Verify onwnership", async function () {

      //await volcanoCoin.deployed();
      expect(owner.address).to.equal(await volcanoCoin.owner());
    });

    it("Check initial Balance", async function () {

      await volcanoCoin.deployed();
      expect(await volcanoCoin.totalSupply()).to.equal(10000);
    });
  });

  describe("Total Supply", () => {
    it("Should increase Total Supply", async function () {

      //await volcanoCoin.deployed();
      await volcanoCoin.increaseTotalSupply();
      expect(await volcanoCoin.totalSupply()).to.equal(11000);
    });

    it("Should not increase Total Supply", async function () {
      //await volcanoCoin.deployed();
      expect(() => volcanoCoin.increaseTotalSupply({ from: addr1 }).to.be.revertedWith(OWNER_ERROR));
      expect(await volcanoCoin.totalSupply()).to.equal(11000);
    });

  });

  describe("Transfer", () => {
    it("Should tranfer and register payment", async function () {

      //await volcanoCoin.deployed();
      await volcanoCoin.transfer(addr2.address, 2000);
      expect(await volcanoCoin.balanceOf(addr2.address)).to.equal(2000);
      expect(await volcanoCoin.balanceOf(owner.address)).to.equal(9000);
      console.log(await volcanoCoin.getPayments(owner.address));
      //expect(await volcanoCoin.getPayments(owner.address)).to.deep.equal({transferAmount: 2000, recipient: addr2.address});
      expect(await volcanoCoin.getPayments(owner.address)).to.be.an('array').that.have.lengthOf(1);
      //expect(await volcanoCoin.getPayments(owner.address)).to.nested.include([{recipient:addr2.address}]);
    });

    it("Should not transfer", async function () {
      //await volcanoCoin.deployed();
      expect(() => volcanoCoin.transferFrom({ from: addr1, to: addr1.address, amount: 100 }).to.be.revertedWith(BALANCE_ERROR));
    });
  });


});
