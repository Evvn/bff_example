import gstService from '../gstService';
import extractor from '../../extractor/Extractor';

describe('GstService', () => {
  const service = gstService({ buildGstReport: jest.fn() }, extractor);

  it('should test if gstService is defined', () => {
    expect(service).toBeDefined();
  });

  it('getGstReport is defined', () => {
    expect(service.getGstReport).toBeDefined();
  });

  it('should test if getGstReport method invokes the success callback correctly', () => {
    const { getGstReport } = service;
    const onSuccessMock = jest.fn().mockImplementation(() => { });
    const onFailureMock = jest.fn().mockImplementation(() => { });
    const params = {
      context: {},
      onSuccess: onSuccessMock,
      onFailure: onFailureMock,
    };
    getGstReport(params);
    expect(onSuccessMock.mock.calls.length).toBe(1);
  });
});
