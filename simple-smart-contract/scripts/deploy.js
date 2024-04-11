const hre = require("hardhat");

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEARS_IN_SECONDS = 356 * 24 * 50 * 60;
    const unlockedTime = currentTimestampInSeconds + ONE_YEARS_IN_SECONDS;

    const lockedAmount = hre.ethers.parseEther("1")

    const MyTest = await hre.ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unlockedTime, {
        value: lockedAmount
    });

    await myTest.waitForDeployment();

    console.log(`Contract contain 1 ETH & address : ${await myTest.getAddress()}`);
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})