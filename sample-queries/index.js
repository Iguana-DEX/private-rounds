const { request, gql } = require('graphql-request');

// This query returns the first 5 blocks of the first 10 minutes of 2020.
const fastQuery = gql`
  {
    investorRefundeds(
      first: 5
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: "1577836800", timestamp_lt: "1577837400" }
    ) {
      id
      roundId
      caller
      amount
    }
  }
`;

// Note that the id field that gets returned is the hash of the block.
const query = gql`
  {
    newRoundCreateds(first: 1, skip: 0, orderBy: id, orderDirection: desc) {
      id
      roundId
      target
      groupAllocation
    }
  }
`;

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
      where: { groupAddress: "0x8cE9b0EDcc98bDcc2698984EBC389F0db580C135" }
    ) {
      endAt
      groupAddress
      groupAllocation
      roundId
      startAt
      target
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

request(
  'https://api.thegraph.com/subgraphs/name/iguana-dex/bsctestnet',
  roundInfoQuery
).then((data) => console.log(data));
