/**
 * @typedef RigDigTruckReport
 *
 * @prop {String}   vin
 * @prop {String}   createdAtUri
 * @prop {String}   linkId
 * @prop {Boolean}  hasAccidentRecords
 * @prop {Boolean}  hasJunkOrSalvageRecords
 * @prop {Boolean}  hasTotalLostRecords
 * @prop {Boolean}  hasBrandRecords
 * @prop {Number}   highestBrandSeverity
 * @prop {Number}   totalAlertRecords
 * @prop {Number}   totalRecords
 * @prop {Boolean}  hasException
 * @prop {String}   exceptionMessage
 * @prop {String}   status
 * @prop {PoweredByVinLink}  PoweredByVinLink
 *
 * @typedef PoweredByVinLink
 * @prop {String}   bodyType
 * @prop {String}   brakeType
 * @prop {String}   cabType
 * @prop {String}   chassisType
 * @prop {Boolean}  checkDigitValid
 * @prop {String}   driveLineType
 * @prop {String}   engineMake
 * @prop {String}   engineSeriesCode
 * @prop {String}   engineType
 * @prop {String}   fuelType
 * @prop {String}   make E.g; Peterbilt
 * @prop {String}   model E.g; 386
 * @prop {String}   year E.g; 2012
 * @prop {String}   transmission
 * @prop {String}   trimLevel
 * @prop {String}   weightClass
 *
 * @returns {RigDigTruckReport}
 */
module.exports = class RigDigTruckReport {
  constructor(data = {}) {
    Object.entries(data).forEach(([key, value]) => {
      this[key] = value;
    });
  }
};
