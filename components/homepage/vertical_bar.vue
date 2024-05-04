<template>
  <div>
    <transition name="slide-width" mode="out-in">
    <UCard
      class="border border-1 border-solid border-slate-500 w-[20%] h-screen pt-2" v-if="screen.isToggle"
    >
      <div
        class="flex flex-row flex-start items-center p-2 gap-[20px] hover:bg-[#E5E5E5] hover:rounded-[20px]"
      >
        <UIcon
          name="i-heroicons-plus-16-solid"
          class="w-[30px] h-[30px]"
        ></UIcon>
        <h1 class="text-xl font-bold">New</h1>
      </div>
      <hr class="w-full mt-[40px]" />
      <div class="flex flex-col gap-[20px]">
        <h1 class="text-xl font-bold py-4">Pages</h1>
        <div
          class="flex flex-row items-center gap-[10px] hover:bg-[#E5E5E5] hover:rounded-[20px] p-2"
          :class="{
            'bg-[#E5E5E5] rounded-[20px]': screen.isClicked === 'started',
          }"
          @click="() => navPage('started', id[0])"
        >
          <UIcon
            name="i-heroicons-clipboard-document-20-solid"
            class="w-[30px] h-[30px]"
          ></UIcon>
          <h1 class="text-xl font-bold">Get started</h1>
          <div v-if="screen.isClicked === 'started'">
            <!-- Introduce -->
          </div>
        </div>
        <div @click="$router.push(`/${id}`)">

        </div>
      </div>
    </UCard>
    <UCard class="w-[5%] h-screen" v-else>
        <div>
        <UIcon name="i-heroicons-chevron-double-right-20-solid" class="w-[30px] h-[30px]"></UIcon>
        </div>

    </UCard>
</transition>
  </div>
</template>
<script setup lang="js">
import { useScreen } from '~/store/userHome';
const screen = useScreen();
const router = useRouter();
const id = reactive({
    id: 1,
    id: 2,
    id: 3,
    id: 4,
    id: 5,
    id: 6,
})
const navPage = (value, id) => {
    screen.handleComponent(value)
    router.push(`${id}`);
}
</script>
<style lang="css">
.slide-width-enter-active, .slide-width-leave-active {
 transition: width 3s;
}
.slide-width-enter, .slide-width-leave-to {
 width: 5%; 
}
.slide-width-enter-from, .slide-width-leave-from {
 width: 30%;
}

</style>