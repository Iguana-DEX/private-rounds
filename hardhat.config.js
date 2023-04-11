/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-etherscan');

module.exports = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 97,
      allowUnlimitedContractSize: true,
    },
    bsc: {
      url: 'https://rpc.ankr.com/bsc',
      chainId: 56,
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      url: 'https://rpc.ankr.com/eth',
      chainId: 1,
      allowUnlimitedContractSize: true,
    },
    polygon: {
      url: 'https://rpc.ankr.com/polygon',
      chainId: 137,
      allowUnlimitedContractSize: true,
    },
    arbitrumOne: {
      url: 'https://rpc.ankr.com/arbitrum',
      chainId: 42161,
      allowUnlimitedContractSize: true,
    },
    optimisticEthereum: {
      url: 'https://rpc.ankr.com/optimism',
      chainId: 10,
      allowUnlimitedContractSize: true,
    },
    bscTestnet: {
      url: 'https://rpc.ankr.com/bsc_testnet_chapel',
      chainId: 97,
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: 'https://rpc.ankr.com/eth_goerli',
      chainId: 5,
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: {
      bsc: 'MDWSE9W9DI3IIZSTK698PZQG6M11QVUU6R',
      mainnet: '34UWR1V93HDJ4K2Z89V1C5EE2EM4NX7AI3',
      polygon: '3UMUEEA56DV3SJ2KFCENJJDHRFJD2EUYJ6',
      arbitrumOne: 'EXV3KBHN4GZSPTBV2SR8326P9TCKZV4WYU',
      optimisticEthereum: 'QNHQSRAAK1H8GMI2S1BB57JKNMFIH2JK9G',
      bscTestnet: 'MDWSE9W9DI3IIZSTK698PZQG6M11QVUU6R',
      goerli: '34UWR1V93HDJ4K2Z89V1C5EE2EM4NX7AI3',
    },
  },
};
