import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';

describe('SanitizehtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
