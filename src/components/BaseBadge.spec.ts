import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseBadge from './BaseBadge.vue';

describe('BaseBadge.vue', () => {
  let wrapper;

  it('should render without props', () => {
    wrapper = mount(BaseBadge);
    expect(wrapper).toBeDefined();
  });

  it('default slot', () => {
    wrapper = mount(BaseBadge, {
      slots: { default: 'Hello world!' },
    });
    expect(wrapper.text()).toBe('Hello world!');
  });
});
