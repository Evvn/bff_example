/* eslint-disable array-callback-return */
import * as balanceSheetIntents from '../../../balanceSheet/balanceSheetIntents';
import * as budgetIntents from '../../../budget/budgetIntents';
import * as businessIntents from '../../../business/businessIntents';
import * as cashFlowIntents from '../../../cashFlow/cashFlowIntents';
import * as profitLossIntents from '../../../profitLoss/profitLossIntents';
import * as commonIntents from '../../../common/commonIntents';
import rootMapping from '../rootMapping';

describe('intentMapping', () => {
  it('should test if all intents are defined in rootMapping', () => {
    Object.keys(rootMapping).map((key) => {
      expect(rootMapping[key]).toBeDefined();
    });
  });

  it('should test if balanceSheetIntents are defined as keys in rootMapping', () => {
    Object.keys(balanceSheetIntents).map((key) => {
      expect(rootMapping[key]).toBeDefined();
    });
  });

  it('should test if budgetIntents are defined as keys in rootMapping', () => {
    Object.keys(budgetIntents).map((key) => {
      expect(rootMapping[key]).toBeDefined();
    });
  });

  it('should test if businessIntents are defined as keys in rootMapping', () => {
    Object.keys(businessIntents).map((key) => {
      expect(rootMapping[key]).toBeDefined();
    });
  });

  it('should test if cashFlowIntents are defined as keys in rootMapping', () => {
    Object.keys(cashFlowIntents).map((key) => {
      expect(rootMapping[key]).toBeDefined();
    });
  });

  it('should test if profitLossIntents are defined as keys in rootMapping', () => {
    Object.keys(profitLossIntents).map((key) => {
      expect(rootMapping[key]).toBeDefined();
    });
  });

  it('should test if commonIntents are defined as keys in rootMapping', () => {
    Object.keys(commonIntents).map((key) => {
      expect(rootMapping[key]).toBeDefined();
    });
  });
});
