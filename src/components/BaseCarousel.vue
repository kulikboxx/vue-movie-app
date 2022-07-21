<template>
  <div
    class="base-carousel"
    ref="baseCarouselRef"
    @touchstart="onTouch($event)"
    @touchend="onTouch($event)"
    @transitionend="checkShiftX()"
  >
    <div class="base-carousel__line">
      <ul class="base-carousel__wrapper">
        <li
          v-for="(item, index) in transformedItems"
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
import { computed, ref, Ref, onMounted, onBeforeUnmount } from 'vue';

interface Props {
  items: Array<Record<PropertyKey, unknown>>;
  itemsPerView?: number;
  loopDuration?: number;
  spaceBetween?: number;
  transitionDuration?: number;
  timing?: string;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerView: 1,
  loopDuration: 6000,
  spaceBetween: 0,
  transitionDuration: 1200,
  timing: 'ease',
});

const baseCarouselRef = ref<HTMLDivElement>();

const itemSize = ref('');
const itemsGap = ref(props.spaceBetween + 'px');
const lineShift = ref('');
const shiftX = ref('');
const transition = ref('');

const currentItem = ref(0);
const touchStart = ref(0);
const loopTimer: Ref<NodeJS.Timer | undefined> = ref();

const transformedItems = computed(() => [
  ...props.items,
  ...props.items,
  ...props.items,
]);

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const carouselSize = entry.contentBoxSize[0].inlineSize;
    const whiteSpace = props.spaceBetween * (props.itemsPerView - 1);
    const elemSize = (carouselSize - whiteSpace) / props.itemsPerView;

    itemSize.value = elemSize + 'px';
    lineShift.value =
      -(elemSize + props.spaceBetween) * props.items.length + 'px';

    manageTransition(swipeItem);
  });
});

function swipeItem(num: number = 0) {
  updateLoopTimer(true);

  const number = (currentItem.value += num);

  shiftX.value =
    number * parseFloat(itemSize.value) + number * props.spaceBetween + 'px';
}

function switchTransition(isTransition: boolean = true) {
  transition.value = isTransition
    ? `transform ${props.transitionDuration}ms ${props.timing}`
    : 'none';
}

function manageTransition(callback: Function) {
  switchTransition(false);
  callback();
  setTimeout(() => switchTransition(true));
}

function checkShiftX() {
  const itemWidthWithWhiteSpace =
    parseFloat(itemSize.value) + props.spaceBetween;
  const startX =
    parseFloat(shiftX.value) <= -(itemWidthWithWhiteSpace * props.items.length);
  const endX =
    parseFloat(shiftX.value) >= itemWidthWithWhiteSpace * props.itemsPerView;

  if (startX || endX) {
    manageTransition(() => {
      shiftX.value = startX
        ? '0px'
        : `${
            -(props.items.length - props.itemsPerView) * itemWidthWithWhiteSpace
          }px`;
      currentItem.value = startX
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
    touchStart.value = e.touches[0].clientX;
  } else {
    touchEnd = e.changedTouches[0].clientX;
  }

  if (touchStart.value && touchEnd) {
    swipeItem(touchStart.value - touchEnd < 0 ? 1 : -1);
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') swipeItem(1);
  if (e.key === 'ArrowRight') swipeItem(-1);
}

function loopCarousel() {
  swipeItem(-1);
}

onMounted(() => {
  switchTransition(true);
  updateLoopTimer(true);

  if (baseCarouselRef.value) {
    resizeObserver.observe(baseCarouselRef.value);
  }

  document.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
  if (baseCarouselRef.value) {
    resizeObserver.unobserve(baseCarouselRef.value);
  }

  updateLoopTimer(false);
  document.removeEventListener('keydown', onKeyDown);
});
</script>

<style lang="scss">
.base-carousel {
  margin-inline: auto;
  max-width: 1200px;
  overflow: hidden;

  &__line {
    transform: translateX(v-bind(lineShift));
  }

  &__line,
  &__wrapper,
  &__item {
    width: max-content;
  }

  &__wrapper {
    display: flex;
    align-items: stretch;
    gap: v-bind(itemsGap);
    transition: v-bind(transition);
    transform: translateX(v-bind(shiftX));
    list-style: none;
  }

  &__item {
    width: v-bind(itemSize);
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
