import { flush, render } from '@stencil/core/testing';
import { RangeTest } from './range-test';

describe('msrd-test-range', () => {
  it('should build', () => {
    expect(new RangeTest()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [RangeTest],
        html: '<msrd-range-test></msrd-range-test>'
      });
      console.log(element);
    });

    it('should work without parameters', () => {
      expect(element.textContent.trim()).toEqual('0');
    });

    it('should work with a value', async () => {
      element.value = 3;
      await flush(element);
      expect(element.textContent.trim()).toEqual('3');
    });
  });
});
