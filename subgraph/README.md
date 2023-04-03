## How to redeploy the Subgraph

### Deploy the new versions of the smart contracts

### Regenerate the subgraph folder for the updated SC versions

In a terminal, navigate to the private-rounds root folder and enter:

```bash
graph init --product hosted-service styliann-eth/iguanadex-private-groups
```

Follow the options and enter 2 contract addresses:

- the address of the PrivateGroupFactory
- the address of the first group deployed using the factory (PrivateRounds smart contract). Usually "Iggies Club" on every chain.

You will need to manually verify the PrivateRounds contract using:
npx hardhat verify --network <network> <contract_address> <constructor_input1> <constructor_input2>

```bash
npx hardhat verify --network bscTestnet <contract_address> 0x712F493C6AdBFaC93bDCE6b83E1C2b48761ACA6F "Iggies Club"
```

### Tweak the generated files in the newly created subgraph folder

In the newly generated schema.graphql file:

- remove the address line in the 'source' section for PrivateRounds.
- add a 'templates: ' line above the - kind: ethereum line for PrivateRounds

In a terminal, navigate to the newly created subgraph folder (e.g. private-rounds/subgraph-test) and type the following:

```bash
graph codegen
```

This will add some files to the 'generated' folder

Finally, go to src/private-group-factory.ts and make sure the system knows to create a new subgraph whenever a new group (PrivateRounds smart contract) gets created from the PrivateGroupFactory:

- import { PrivateRounds } from '../generated/templates'; [top of file]
- PrivateRounds.create(event.params.groupAddress); [in handleNewGroupCreated() function]

### Redeploy the subgraph

```bash
yarn build && yarn deploy
```

### Test the new version of the subgraph

In a terminal, navigate to the private-rounds root folder and enter:

```bash
node subgraph/sample-queries/index.js
```
