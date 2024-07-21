const { TransactionResponse } = require("ethers")
const { ethers, run, network } = require("hardhat")

async function main() {
    // Get the contract factory
    // * hardhat gets contract from artifacts folder that is the reason it knows contract with name and we can get this way.
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log("Waiting for contract to deployed...")
    console.log("Contract address")
    console.log(simpleStorage.target)
    if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API) {
        console.log("waiting for block txs")
        await simpleStorage.deploymentTransaction().wait(6)

        await verify(simpleStorage.address, [])
    }
    const currentvalue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentvalue}`)
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}
// Run the main function and handle errors
async function verify(ContractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: ContractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verifieed")) {
            console.log("already verified")
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
