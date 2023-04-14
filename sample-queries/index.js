const { request, gql } = require('graphql-request');

const groupsQuery = gql`
  {
    newGroupCreateds(first: 5, skip: 0, orderBy: groupId, orderDirection: asc) {
      blockNumber
      blockTimestamp
      groupAddress
      groupCreator
      groupId
      transactionHash
    }
    groupInfoChangeds(
      first: 1
      orderBy: blockTimestamp
      orderDirection: desc
      where: { groupName: "Dewhales" }
    ) {
      groupId
      groupDescription
      groupImageUrl
      groupInfoUrl
      groupName
    }
  }
`;

// This query will return the latest information for the specified group
const groupInfoQuery = gql`
  {
    groupInfoChangeds(
      first: 1
      orderBy: blockTimestamp
      orderDirection: desc
      where: { groupName: "Dewhales" }
    ) {
      groupId
      groupDescription
      groupImageUrl
      groupInfoUrl
      groupName
    }
  }
`;

const roundsQuery = gql`
  {
    newRoundCreateds(
      first: 20
      skip: 0
      orderBy: roundId
      orderDirection: asc
      where: { groupAddress: "0xe25cc4d9ec77915e1edecefda454f4fb4c448ca4" }
    ) {
      endAt
      groupAllocation
      roundId
      startAt
      target
    }
    roundInfoChangeds(
      first: 75
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      roundId
      roundImageUrl
      roundInfoUrl
      roundStory
      roundTitle
    }
  }
`;

const roundInfoQuery = gql`
  {
    roundInfoChangeds(
      first: 75
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      roundId
      roundImageUrl
      roundInfoUrl
      roundStory
      roundTitle
    }
  }
`;

const totalRaisedQuery = gql`
  {
    totalEthPledgedChangeds(
      first: 50
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      roundId
      totalEthPledged
    }
  }
`;

request(
  'https://api.thegraph.com/subgraphs/name/iguana-dex/bsctestnet',
  roundsQuery
).then((data) => console.log(data));
