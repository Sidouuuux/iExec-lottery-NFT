# Sample Hardhat Project
## Prerequest :

- [NodeJS](https://nodejs.org/en/ "NodeJS")
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/ "Yarn")


Try running some of the following tasks:
# Usage :toolbox:

Deploy :

```
npx hardhat run scripts/deploy.js
```

## Testing :hammer_and_wrench:

```
npx hardhat test
```

### Test Coverage :memo:

```
npx hardhat coverage
```

## Estimate gas :heavy_dollar_sign:

You can estimate how much gas things cost by running :

```
npx hardhat test
```

And you'll see and output file called `gas-report.txt`

## Local Deployment :chains:

If you'd like to run your own local hardhat network, you can run:

```
npx hardhat node
```

And then **in a different terminal**

```
npx hardhat run scripts/deploy.js --network localhost
```

And you should see transactions happen in your terminal that is running `npx hardhat node`

### ToDo :

- :heavy_check_mark: :bookmark_tabs: Create lottery smart contract
- :heavy_check_mark: :bookmark_tabs: Create NFT smart contract
- :heavy_check_mark: Test lottery smart contract
- :x: Test NFT smart contract
- :heavy_check_mark: Create iExec oracle to generate random number ([iExec Oracle](https://oracle-factory.iex.ec/gallery/63302bf4033f264f17214bb4))
- :x: Link iExec oracle to smart contract ([ref](https://github.com/iExecBlockchainComputing/flight-pronostics-contracts))
- [ ] Create a ReactJS UI
