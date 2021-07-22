import { DynamicFieldTemplatePage } from './app.po';

describe('DynamicField App', function() {
  let page: DynamicFieldTemplatePage;

  beforeEach(() => {
    page = new DynamicFieldTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
