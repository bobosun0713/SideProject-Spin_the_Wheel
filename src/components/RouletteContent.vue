<script setup lang="ts">
import { ref, onMounted } from "vue";

interface RouletteDataInfo {
  id: string;
  price: string;
  deg: number;
  background: string;
  color: string;
}
const props = withDefaults(defineProps<{ data: Array<RouletteDataInfo> }>(), {
  data: () => []
});

const emit = defineEmits(["transition-end"]);

const rouletteContentRef = ref<HTMLElement | null>(null);

onMounted(() => {
  transitionEvent();
});

const transformCircleOutside = (idx: number) => {
  const deg = (360 / props.data.length) * idx + 90 / Number((props.data.length / 2).toFixed(2));
  return `rotate(${deg}deg)`;
};

const transformCircleInside = () => {
  const deg = (180 - 360 / props.data.length).toFixed(2);
  return `rotate(${deg}deg)`;
};

const transformAwardText = () => {
  const outDeg = Number((360 / props.data.length) * 1 + 90 / Number((props.data.length / 2).toFixed(2)));
  const inDeg = Number((180 - 360 / props.data.length).toFixed(2));
  return `rotate(-${outDeg + inDeg - 180}deg)`;
};

const transitionEvent = () => {
  if (rouletteContentRef.value) {
    rouletteContentRef.value.addEventListener("transitionend", () => {
      emit("transition-end", false);
    });
  }
};
</script>

<template>
  <div
    ref="rouletteContentRef"
    class="relative md:w-[500px] md:h-[500px] sm:w-[425px] sm:h-[425px] xs:w-[341px] xs:h-[341px] xxxs:w-[290px] xxxs:h-[290px] transition-transform duration-[6000ms] ease-[cubic-bezier(0.25, 0, 0,1)]"
  >
    <div
      v-for="(item, idx) in data"
      :key="idx"
      :style="{ transform: transformCircleOutside(idx) }"
      class="absolute top-0 left-0 lg:w-[250px] md:w-[250px] sm:w-[212.5px] xs:w-[170.5px] xxxs:w-[145px] h-[100%] origin-[100%_50%] overflow-hidden"
    >
      <div
        class="w-[100%] h-[100%] bg-[brow] rounded-[252.5px_0_0_252.5px;] origin-[100%_50%]"
        :style="{ transform: transformCircleInside(), background: item.background }"
      ></div>
      <div
        class="absolute top-0 right-0 w-[50%] h-[50%] mr-[calc(-50%/2)] xs:pt-[65px] xxs:pt-[40px] lg:text-[2rem] md:text-[1.5rem] sm:text-[1.25rem] xxxs:text-[1rem] text-[#fff] text-center font-bold origin-[50%_100%]"
        :style="{ transform: transformAwardText(), color: item.color }"
      >
        {{ item.price }}
      </div>
    </div>
  </div>
</template>
