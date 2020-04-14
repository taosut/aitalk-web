import {Message} from './message.model';

describe('Message', () => {
  it('should create an instance', () => {
    expect(new Message(1, 2, 3)).toBeTruthy();
  });
});
