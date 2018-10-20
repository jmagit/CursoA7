import { IndraCoreModule } from './indra-core.module';

describe('IndraCoreModule', () => {
  let indraCoreModule: IndraCoreModule;

  beforeEach(() => {
    indraCoreModule = new IndraCoreModule(null);
  });

  it('should create an instance', () => {
    expect(indraCoreModule).toBeTruthy();
  });
});
