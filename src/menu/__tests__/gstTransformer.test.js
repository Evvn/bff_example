import gstTransformer, {
  getTotalLabel, getAttributeTotal, getTotals,
} from '../gstTransformer';
import transformedGstReport from '../../../data/gst/transformedGstReport';
import rawGstReport from '../../../data/gst/gstReport';

describe('gstTransformer', () => {
  it('should transform report as expected', () => {
    expect(gstTransformer.buildGstReport(rawGstReport)).toEqual(transformedGstReport);
  });

  it('getTotalLabel should modify strings so that they are camelcased with total at the front', () => {
    expect(getTotalLabel('testName')).toEqual('totalTestName');
  });

  it('getAttributeTotal should sum every attribute in a list of objects', () => {
    expect(
      getAttributeTotal([
        { testVal: 1, testName: 'test' },
        { testVal: 6, testName: 'test' },
        { testVal: 3, testName: 'test' },
        { testVal: 4, testName: 'test' },
        { testVal: 3, testName: 'test' },
      ], 'testVal'),
    ).toEqual(17);
  });

  it('getTotals should calculate totals for a list of transactions', () => {
    expect(
      getTotals([
        {
          date: '30/07/2018',
          id: 191,
          name: 'Interest for the month',
          rate: 0,
          saleValue: 14.35,
          taxCollected: 0,
        },
        {
          date: '30/08/2018',
          id: 192,
          name: 'Monthly Interest',
          rate: 0,
          saleValue: 12.45,
          taxCollected: 0,
        }], 'salesAndIncome'),
    ).toEqual({ totalRate: 0, totalSaleValue: 26.8, totalTaxCollected: 0 });
  });
});
