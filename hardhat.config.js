/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
const ALCHEMY_API_KEY = "jNYM9AlM4BK5AwCPHPSHSkAnvG4ck2D8";
const  GOERLI_PRIVATE_KEY ="1b0e4873f041fb53d85958dd4c6468f91c94cbb9b6a9416cbf9ffa27092a7658";
module.exports = {
  solidity: "0.8.19",
 
  networks:{
    goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${GOERLI_PRIVATE_KEY}`],
    }
  }
};
