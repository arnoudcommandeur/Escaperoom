var Collectables = artifacts.require('Collectables')

module.exports = (deployer) => {
    deployer.deploy(Collectables)
}