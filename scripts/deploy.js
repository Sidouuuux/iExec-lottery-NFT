// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat")

async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT")
    const mynft = await MyNFT.deploy(
        "Sidoux Test",
        "SDXT",
        "ipfs://QmTqwXK5mMYPMYm9eAxtHZmE9bucqA4fhvJxwR9mx2q12B/"
    )

    await mynft.deployed()

    console.log(`mynft deployed to ${mynft.address}`)
    // const MyNFT = await ethers.getContractFactory("MyNFT")
    // const mynft = await MyNFT.attach("0xCa3B19fB7877330B745978D4ed344D8BB6Bc3474")
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log(
            "Waiting for block confirmations to be sure etherscan know about our deployment..."
        )
        await mynft.deployTransaction.wait(6)
        await verify(mynft.address, [])
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
            constructorArguments: ["Sidoux Test",
            "SDXT",
            "ipfs://QmTqwXK5mMYPMYm9eAxtHZmE9bucqA4fhvJxwR9mx2q12B/"],
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
