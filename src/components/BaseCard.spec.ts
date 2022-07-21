import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCard from './BaseCard.vue';

describe('BaseCard.vue', () => {
  it('should render without props', () => {
    const wrapper = mount(BaseCard);
    expect(wrapper).toBeDefined();
  });
});
