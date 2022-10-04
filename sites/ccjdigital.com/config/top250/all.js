const csv = require('csvtojson');
const path = require('path');

const columns = {
  rank: {
    label: '2022 RANK',
    type: 'number',
  },
  rank2020: {
    label: '2021 RANK',
    type: 'number',
  },
  company: {
    label: 'COMPANY',
    type: 'string',
  },
  city: {
    label: 'CITY',
    type: 'string',
  },
  state: {
    label: 'STATE',
    type: 'string',
  },
  usdot: {
    label: 'US DOT',
    type: 'string',
  },
  executive: {
    label: 'EXECUTIVE',
    type: 'string',
  },
  title: {
    label: 'TITLE',
    type: 'string',
  },
  website: {
    label: 'WEBSITE',
    type: 'string',
  },
  primaryOperation: {
    label: 'PRIMARY OPERATION',
    type: 'string',
  },
  carriers: {
    label: 'CARRIERS',
    type: 'string',
  },
  revenue2020: {
    label: '2021 REVENUE',
    type: 'number',
    numberType: 'usCurrency',
  },
  leasedTrucks: {
    label: 'LEASED TRUCKS',
    type: 'number',
  },
  ownedTrucks: {
    label: 'OWNED TRUCKS',
    type: 'number',
  },
  totalTrucks: {
    label: 'TOTAL TRUCKS',
    type: 'number',
  },
  leasedTractors: {
    label: 'LEASED TRACTORS',
    type: 'number',
  },
  ownedTractors: {
    label: 'OWNED TRACTORS',
    type: 'number',
  },
  totalTractors: {
    label: 'TOTAL TRACTORS',
    type: 'number',
  },
  leasedTrailers: {
    label: 'LEASED TRAILERS',
    type: 'number',
  },
  ownedTrailers: {
    label: 'OWNED TRAILERS',
    type: 'number',
  },
  totalTrailers: {
    label: 'TOTAL TRAILERS',
    type: 'number',
  },
  companyDrivers: {
    label: 'COMPANY DRIVERS',
    type: 'number',
  },
  independentContractors: {
    label: 'INDEPENDENT CONTRACTORS',
    type: 'number',
  },
  totalDrivers: {
    label: 'TOTAL DRIVERS',
    type: 'number',
  },
};
const headerLabels = Object.keys(columns).map(key => key);
const colParser = Object.keys(columns).map((key) => {
  const obj = {};
  const colKey = columns[key].label;
  const { type } = columns[key];
  obj[colKey] = type;
  return (obj);
});
process.on('unhandledRejection', (e) => {
  throw e;
});

const getTableRows = async () => {
  const csvFile = path.resolve(process.cwd(), 'config/top250/_csv/top250.csv');
  return csv({
    noheader: false,
    headers: headerLabels,
    colParser,
    trim: true,
    ignoreEmpty: true,
    delimiter: ',',
    checkType: true,
  }).fromFile(csvFile);
};

module.exports = {
  title: 'All operation types',
  teaser: 'Want to sort the <em>CCJ</em> Top 250 by revenues or number of trucks, tractors, trailers or drivers? Want to see and sort carriers by type of haul or geographic region? Want a copy of the <em>CCJ</em> Top 250 data sent to you in a PDF file? All of that is available completely free by providing the requested information below.',
  description: '<div clas="mb-block"><p><strong>Get the data how you want it!</strong></p> <p>Want to sort the <em>CCJ</em> Top 250 by revenues or number of trucks, tractors, trailers or drivers? Want to see and sort carriers by type of haul or geographic region? Want a copy of the <em>CCJ</em> Top 250 data in a PDF file?</p></div>',
  downloadLink: '/##########',
  tableRows: getTableRows(),
  columns,
  initialPrimaryOperation: null,
};
