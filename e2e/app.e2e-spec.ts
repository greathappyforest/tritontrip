import { TritontripPage } from './app.po';

describe('tritontrip App', () => {
  let page: TritontripPage;

  beforeEach(() => {
    page = new TritontripPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
