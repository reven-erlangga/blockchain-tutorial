const {time, loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("MyTest", function() {
    async function runEveryTime() {
        const ONE_YEAR_IN_SECONDS = 356 * 24 * 60 * 60;
        const ONE_GEWI = 1_000_000_000;

        const lockedAmount = ONE_GEWI;
        const unlockedTime = (await time.latest()) + ONE_YEAR_IN_SECONDS;

        // Get accounts
        const [owner, otherAccount] = await ethers.getSigners();

        const MyTest = await ethers.getContractFactory("MyTest");
        const myTest = await MyTest.deploy(unlockedTime, {
            value: lockedAmount
        });

        return {
            myTest,
            unlockedTime,
            lockedAmount,
            owner, 
            otherAccount
        }
    }

    describe("Deployment", function() {
        it("Should check unlocked time", async function() {
            const {myTest, unlockedTime} = await loadFixture(runEveryTime);

            expect(await myTest.unlockedTime()).to.equal(unlockedTime);
        });

        it("Should set the right owner", async function() {
            const {myTest, owner} = await loadFixture(runEveryTime);

            expect(await myTest.owner()).to.equal(owner.address);
        });

        it("Should receive and store the funds to MyTest", async function() {
            const {myTest, lockedAmount} = await loadFixture(runEveryTime);
            console.log(myTest.address)
            // expect(await ethers.provider.getBalance(myTest.address)).to.equal(lockedAmount);
        });
    })

    // runEveryTime();
});