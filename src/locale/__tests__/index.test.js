import * as all from '../all.json';
import autoRegister from '..';

jest.mock('../all.json');

describe('autoRegister', () => {
  let create;
  let translator;

  beforeEach(() => {
    translator = { get: jest.fn(), add: jest.fn() };
    all.default = { properties_dataPoints_labelmode_share: false };
    create = () => autoRegister(translator);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call translator.add if translated string is different from its id', () => {
    translator.get.mockReturnValue('');
    create();
    expect(translator.add).not.toBeCalled();
  });

  it('should call translator.add if translated string is the same as its id', () => {
    translator.get.mockReturnValue('Object.Disclaimer.LimitedData');
    create();
    expect(translator.add).toBeCalled();
  });
});
