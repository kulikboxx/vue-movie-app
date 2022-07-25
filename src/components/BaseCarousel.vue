<template>
  <div
    :class="[
      'base-carousel',
      { 'base-carousel--disabled': isCarouselDisabled },
    ]"
    ref="baseCarouselRef"
    @transitionstart="toggleCarouselDisabled(true)"
    @transitionend="toggleCarouselDisabled(false), checkShiftX()"
  >
    <div class="base-carousel__line">
      <ul
        class="base-carousel__wrapper"
        @touchstart="onTouch($event)"
        @touchend="onTouch($event)"
      >
        <li
          v-for="(item, index) in computedItems"
          :key="index"
          class="base-carousel__item"
        >
          <slot v-bind="{ item }" name="baseCarouselItem" />
        </li>
      </ul>
    </div>

    <div class="base-carousel__actions">
      <div class="base-carousel__prev" @click="swipeItem(1)">
        <slot name="baseCarouselPrev" />
      </div>

      <div class="base-carousel__next" @click="swipeItem(-1)">
        <slot name="baseCarouselNext" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount } from 'vue';

interface Props {
  breakpoints?: Record<PropertyKey, Record<string, number>>;
  items: Array<Record<PropertyKey, unknown>>;
  itemsPerView?: number;
  loopDuration?: number;
  spaceBetween?: number;
  transitionDuration?: number;
  timing?: string;
}

const props = withDefaults(defineProps<Props>(), {
  breakpoints: () => ({ 200: { itemsPerView: 1 } }),
  itemsPerView: 1,
  loopDuration: 6000,
  spaceBetween: 0,
  transitionDuration: 1200,
  timing: 'ease',
});

const baseCarouselRef = ref<HTMLDivElement>();
const isCarouselDisabled = ref(false);
const loopTimer = ref<NodeJS.Timer>();

const carousel = reactive({
  currentItem: 0,
  itemWidth: '',
  itemsGap: `${props.spaceBetween}px`,
  lineShift: '',
  minItemWidth: 200,
  shiftX: '',
  transition: '',
  touchStart: 0,
  whiteSpaces: 0,
  visibleItems: 1,
});

const computedBreakpoints = computed(() => {
  const breakpoints = [];

  for (const key in props.breakpoints) {
    breakpoints.push({
      breakpoint: +key,
      visibleItems: props.breakpoints[key].itemsPerView,
    });
  }

  return breakpoints;
});

const lastBreakpoint = computed(
  () => computedBreakpoints.value[computedBreakpoints.value.length - 1]
);

const computedItems = computed(() => [
  ...props.items.slice(-lastBreakpoint.value.visibleItems),
  ...props.items,
  ...props.items.slice(0, lastBreakpoint.value.visibleItems),
]);

function computeItemWidth(carouselWidth: number) {
  const breakpointsArray = computedBreakpoints.value;
  const screenWidth = window.innerWidth;

  for (let i = 0; i < breakpointsArray.length; i++) {
    if (
      screenWidth < lastBreakpoint.value.breakpoint &&
      screenWidth >= breakpointsArray[i].breakpoint &&
      screenWidth <= breakpointsArray[i + 1].breakpoint
    ) {
      carousel.visibleItems = breakpointsArray[i].visibleItems;
    } else if (screenWidth >= lastBreakpoint.value.breakpoint) {
      carousel.visibleItems = lastBreakpoint.value.visibleItems;
    }
  }

  computeWhiteSpaces(carouselWidth);
}

function computeWhiteSpaces(carouselWidth: number) {
  carousel.whiteSpaces =
    parseFloat(carousel.itemsGap) * (carousel.visibleItems - 1);

  setItemWidth(carouselWidth);
}

function setItemWidth(carouselWidth: number) {
  carousel.itemWidth =
    (carouselWidth - carousel.whiteSpaces) / carousel.visibleItems + 'px';

  setLineShift();
}

function setLineShift() {
  carousel.lineShift =
    -(parseFloat(carousel.itemWidth) + props.spaceBetween) *
      lastBreakpoint.value.visibleItems +
    'px';

  observeTransition(swipeItem);
}

function swipeItem(num: number = 0) {
  const number = (carousel.currentItem += num);

  updateLoopTimer(true);

  carousel.shiftX =
    number * parseFloat(carousel.itemWidth) +
    number * props.spaceBetween +
    'px';
}

function switchTransition(isTransition: boolean = true) {
  carousel.transition = isTransition
    ? `transform ${props.transitionDuration}ms ${props.timing}`
    : 'none';
}

function observeTransition(callback: Function) {
  switchTransition(false);
  callback();
  setTimeout(() => switchTransition(true));
}

function toggleCarouselDisabled(val: boolean) {
  isCarouselDisabled.value = val;
}

function checkShiftX() {
  const itemWidthWithWhiteSpace =
    parseFloat(carousel.itemWidth) + props.spaceBetween;
  const startX =
    parseFloat(carousel.shiftX) <=
    -(itemWidthWithWhiteSpace * props.items.length);
  const endX =
    parseFloat(carousel.shiftX) >= itemWidthWithWhiteSpace * props.itemsPerView;

  if (startX || endX) {
    observeTransition(() => {
      carousel.shiftX = startX
        ? '0px'
        : `${
            -(props.items.length - props.itemsPerView) * itemWidthWithWhiteSpace
          }px`;

      carousel.currentItem = startX
        ? 0
        : -(props.items.length - props.itemsPerView);
    });
  }
}

function updateLoopTimer(start?: boolean) {
  clearInterval(loopTimer.value);

  if (!start) return;

  loopTimer.value = setInterval(loopCarousel, props.loopDuration);
}

function onTouch(e: TouchEvent) {
  let touchEnd = 0;

  if (e.type === 'touchstart') {
    carousel.touchStart = e.touches[0].clientX;
  } else {
    touchEnd = e.changedTouches[0].clientX;
  }

  if (carousel.touchStart && touchEnd) {
    swipeItem(carousel.touchStart - touchEnd < 0 ? 1 : -1);
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') swipeItem(1);
  if (e.key === 'ArrowRight') swipeItem(-1);
}
function loopCarousel() {
  swipeItem(-1);
}

const carouselObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    computeItemWidth(entry.contentBoxSize[0].inlineSize);
  });
});

onMounted(() => {
  switchTransition(true);
  updateLoopTimer(true);

  if (baseCarouselRef.value) {
    carouselObserver.observe(baseCarouselRef.value);
  }

  document.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
  if (baseCarouselRef.value) {
    carouselObserver.unobserve(baseCarouselRef.value);
  }

  updateLoopTimer(false);
  document.removeEventListener('keydown', onKeyDown);
});
</script>

<style lang="scss">
.base-carousel {
  margin-inline: auto;
  padding-inline: 0.0625em;
  max-width: 1200px;
  overflow: hidden;

  &--disabled {
    pointer-events: none;
  }

  &__line {
    transform: translateX(v-bind('carousel.lineShift'));
  }

  &__line,
  &__wrapper {
    width: max-content;
  }

  &__wrapper {
    display: flex;
    align-items: stretch;
    gap: v-bind('carousel.itemsGap');
    transition: v-bind('carousel.transition');
    transform: translateX(v-bind('carousel.shiftX'));
    list-style: none;
  }

  &__item {
    width: v-bind('carousel.itemWidth');
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.75em;
    gap: 1rem;
  }
}
</style>
