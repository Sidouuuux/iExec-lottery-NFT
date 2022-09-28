// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat")

async function main() {
    // const MyNFT = await ethers.getContractFactory("NFT1Collection")
    // const mynft = await MyNFT.deploy(
    //     "NFT2Test",
    //     "SIDXT",
    //     "ipfs://QmdgSRHNSpnVkRZenJFyDRfWThABLm9LcWaTh6inJ7JwEC/"
    // )

    // await mynft.deployed()

    // console.log(`mynft deployed to ${mynft.address}`)
    // const Lottery = await ethers.getContractFactory("Lottery")
    // const lottery = await Lottery.deploy("0x03C815b7497c90B650C3f4Ad8F1A1c87a98f8894")

    // await lottery.deployed()

    // console.log(`mynft deployed to ${lottery.address}`)
    const MyNFT = await ethers.getContractFactory("NFT1Collection")
    const mynft = MyNFT.attach("0x03C815b7497c90B650C3f4Ad8F1A1c87a98f8894")
    const Lottery = await ethers.getContractFactory("Lottery")
    const lottery = Lottery.attach("0x31A6E70B87D73EA6cA968292fBfc4Fed3778A0fC")

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log(
            "Waiting for block confirmations to be sure etherscan know about our deployment..."
        )
        // await mynft.deployTransaction.wait(6)
        await verify(mynft.address, [
            "NFT2Test",
            "SIDXT",
            "ipfs://QmdgSRHNSpnVkRZenJFyDRfWThABLm9LcWaTh6inJ7JwEC/",
        ])
        await verify(lottery.address, ["0x03C815b7497c90B650C3f4Ad8F1A1c87a98f8894"])
    }

    // Update the current value
    // const transactionResponse = await mynft.setPaused(false)
    // console.log(`Unpaused`)
    // await transactionResponse.wait(1)
    // const updatedValue = await mynft.mint(1,{value: ethers.utils.parseEther("0.001"),gasPrice: 8000000000})
    // await transactionResponse.wait(6)

    console.log(`Mint ok`)
}
async function verify(contractAddress, args) {
    // const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
