import {Msg} from './msg.model';

describe('Msg', () => {
  it('should create an instance', () => {
    expect(new Msg(1, 2, 3)).toBeTruthy();
  });
});
