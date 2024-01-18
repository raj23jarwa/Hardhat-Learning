const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    let Token, owner, addr1, addr2, hardhatToken, addrs;

    // This function is executed before each test case
    beforeEach(async function () {
        // Get the first three accounts (owner, addr1, addr2) from the list of signers
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        // console.log("Signers object", owner);

        // Get the contract factory for the "Token" contract
        const Token = await ethers.getContractFactory("Token");

        // Deploy an instance of the Token contract
        hardhatToken = await Token.deploy();
    });

    // Test suite for the deployment phase of the contract
    describe("Deployment", function () {
        // Test case to check if the owner is set correctly
        it("should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        // Test case to check if the total supply is assigned to the owner
        it("should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    // Test suite for transactions involving token transfers
    describe("Transaction", function () {
        // Test case to check if tokens can be transferred between accounts
        it("should transfer tokens between accounts", async function () {
            // Transfer 5 tokens from owner to addr1
            await hardhatToken.transfer(addr1.address, 5);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            // Transfer 5 tokens from addr1 to addr2
            await hardhatToken.connect(addr1).transfer(addr2.address, 5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(5);
        });

        // Test case to check if a transfer fails when the sender has insufficient tokens
        it("should fail if sender does not have enough tokens", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

            // Attempt to transfer 1 token from addr1 to owner (should fail)
            await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");

            // Check if the owner's balance remains unchanged
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balance after successfully transfers", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address, 5);
            await hardhatToken.transfer(addr2.address, 10);
        
            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(BigInt(initialOwnerBalance) - 15n);
        
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);
        
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(10);
        });
        
    });
});
