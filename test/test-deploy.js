const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        try {
            simpleStorageFactory =
                await ethers.getContractFactory("SimpleStorage")
            simpleStorage = await simpleStorageFactory.deploy()
            await simpleStorage.deployed() // Ensure the contract is deployed before running tests
        } catch (error) {
            console.error("Error in beforeEach:", error)
        }
    })

    it("should start with fav no 0", async function () {
        try {
            const currentValue = await simpleStorage.retrieve()
            const expectedValue = "0"
            console.log("Current Value:", currentValue.toString())
            assert.equal(currentValue.toString(), expectedValue)
        } catch (error) {
            console.error("Error in test 'should start with fav no 0':", error)
        }
    })

    it("should update when we call store", async function () {
        try {
            const expectedValue = "7"
            const transactionResponse = await simpleStorage.store(expectedValue)
            await transactionResponse.wait(1)
            const currentValue = await simpleStorage.retrieve() // Await the retrieve function
            console.log("Current Value:", currentValue.toString())
            assert.equal(currentValue.toString(), expectedValue)
        } catch (error) {
            console.error(
                "Error in test 'should update when we call store':",
                error,
            )
        }
    })
    it("should add person", async function () {
        try {
            const favoriteNumber = 7
            const name = "Omar"

            // Add a person
            const transactionResponse = await simpleStorage.addPerson(
                name,
                favoriteNumber,
            )
            await transactionResponse.wait(1)

            // Retrieve the favorite number by name
            const retrievedFavoriteNumber =
                await simpleStorage.getFavoriteNumberByName(name)

            // Verify the favorite number is correct
            assert.equal(
                retrievedFavoriteNumber.toString(),
                favoriteNumber.toString(),
            )
        } catch {
            console.error(error)
        }
    })
})
