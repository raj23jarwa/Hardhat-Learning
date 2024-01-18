// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Token contract", function () {
//     let owner, addr1, addr2, hardhatToken;

//     before(async function () {
//         // Get the first account (owner) from the list of signers
//         [owner, addr1, addr2] = await ethers.getSigners();
//         console.log("Signers object", owner);

//         // Get the contract factory for the "Token" contract
//         const Token = await ethers.getContractFactory("Token");

//         // Deploy an instance of the Token contract
//         hardhatToken = await Token.deploy();
//     });

//     it("Deployment should assign the total supply of tokens to the owner", async function () {
//         // Get the balance of the owner's address using the "balanceOf" function from the Token contract
//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         console.log("owner address", owner.address);

//         // Assert that the total supply of the token is equal to 10,000
//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     });

//     it("should transfer token between accounts", async function () {
//         // Transfer 10 tokens from owner to addr1
//         await hardhatToken.transfer(addr1.address, 10);
//         expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

//         // Transfer 5 tokens from addr1 to addr2
//         await hardhatToken.connect(addr1).transfer(addr2.address, 5);
//         expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
//     });
// });
