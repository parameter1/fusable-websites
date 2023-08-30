const all = require('./all');

module.exports = {
  rootAlias: 'ccj-top-250',
  title: '<em>CCJ</em> Top 250: Essential data to drive your business',
  teaser: 'Want to sort the <em>CCJ</em> Top 250 by revenues or number of trucks, tractors, trailers or drivers? Want to see and sort carriers by type of haul or geographic region? Click one of the buttons below to see the data sorted by haul type. Click the "All Operations" tab to see the full Top 250 listings. <a href="https://s3.us-east-2.amazonaws.com/randall-reilly-creative/sites/CCJ/2023_CCJ_Top_250_Printable_Download.pdf" target="_blank"><strong>Click here to download a printable PDF version of the CCJ Top 250.</strong></a>',
  description: '',
  guides: {
    all,
    'dedicated-contract-carriage': {
      ...all,
      initialPrimaryOperation: 'Dedicated Contract Carriage',
      title: 'Dedicated Contract Carriage',
    },
    'flatbed-specialized-heavy-haul': {
      ...all,
      initialPrimaryOperation: 'Flatbed/Specialized/Heavy Haul',
      title: 'Flatbed/Specialized/Heavy Haul',
    },
    'general-freight': {
      ...all,
      initialPrimaryOperation: 'General Freight',
    },
    'household-goods': {
      ...all,
      initialPrimaryOperation: 'Household Goods',
      title: 'Household Goods',
    },
    intermodal: {
      ...all,
      initialPrimaryOperation: 'Intermodal',
      title: 'Intermodal',
    },
    'motor-vehicles': {
      ...all,
      initialPrimaryOperation: 'Motor Vehicles',
      title: 'Motor Vehicles',
    },
    packages: {
      ...all,
      initialPrimaryOperation: 'Packages',
      title: 'Packages',
    },
    refrigerated: {
      ...all,
      initialPrimaryOperation: 'Refrigerated',
      title: 'Refrigerated',
    },
    'tank-bulk-commodities': {
      ...all,
      initialPrimaryOperation: 'Tank/Bulk Commodities',
      title: 'Tank/Bulk Commodities',
    },
  },
};
