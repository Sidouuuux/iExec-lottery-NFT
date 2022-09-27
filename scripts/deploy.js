// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat")

async function main() {
    // const MyNFT = await ethers.getContractFactory("NFT1Collection")
    // const mynft = await MyNFT.deploy(10)

    // await mynft.deployed()

    // console.log(`mynft deployed to ${mynft.address}`)
    const MyNFT = await ethers.getContractFactory("NFT1Collection")
    const mynft = await MyNFT.attach("0x32e87ef083D3EB58E3fB03d70Abb42F23Ff85553")
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log(
            "Waiting for block confirmations to be sure etherscan know about our deployment..."
        )
        // await mynft.deployTransaction.wait(6)
        console.log(mynft.address);
        await verify(mynft.address, [])
    }

    // Update the current value
    // const transactionResponse = await mynft.setBaseURI("ipfs://QmdgSRHNSpnVkRZenJFyDRfWThABLm9LcWaTh6inJ7JwEC/")
    // console.log(`Unpaused1`)
    // await transactionResponse.wait(1)
    // const transactionResponse = await mynft.tokenURI(1)
    // console.log(`Unpaused1`)
    // await transactionResponse.wait(1)
    // console.log(`Updated Value is: ${transactionResponse}`)
    // const transactionResponse2 = await mynft.setController("0x3261C4874735cd681B652AD927E778D88B2b96C6")
    // console.log(`Unpaused2`)
    // await transactionResponse2.wait(1)
    // const updatedValue = await mynft.mint(1/*,{value: ethers.utils.parseEther("0.001"),gasPrice: 8000000000}*/)
    // await transactionResponse.wait(6)

    console.log(`Mint ok`)
}
async function verify(contractAddress, args) {
    // const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: [10],
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
