var Ownable = artifacts.require("./Ownable.sol");
var ProductFactory = artifacts.require("./ProductFactory.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var Bizzar = artifacts.require("./Bizzar.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(ProductFactory);
  deployer.deploy(SafeMath);
  deployer.deploy(Bizzar);
};
