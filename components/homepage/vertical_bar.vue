<template>
  <div>
    <transition name="slide-width">
      <UCard
        class="border border-1 border-solid border-slate-500 w-[20%] h-screen pt-2"
        v-if="screen.isToggle"
      >
        <div
          class="flex flex-row flex-start items-center p-2 gap-[20px] hover:bg-[#E5E5E5] hover:rounded-[20px]"
          @click="addNewPage"
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
          <!-- Render page items -->
          <div
            v-for="(page, index) in pages"
            :key="index"
            class="flex flex-row justify-between items-center gap-[10px] hover:bg-[#E5E5E5] hover:rounded-[20px] p-2"
            :class="{ 'bg-[#E5E5E5] rounded-[20px]': screen.isClicked === page.id }"
            @click="() => navPage(page.id)"
          >
          <div class="flex flex-row items-center gap-[10px]">
            <UIcon
              name="i-heroicons-clipboard-document-20-solid"
              class="w-[30px] h-[30px]"
            ></UIcon>
            <h1 class="text-xl font-bold">{{ page.name }}</h1>
            </div>
            <div><UIcon name="i-heroicons-trash-16-solid" class="w-[20px] h-[20px]" @click.stop="deletePage(page.id)"></UIcon></div>
          </div>
        </div>
      </UCard>
      <UCard class="w-[5%] h-screen" v-else>
        <div>
          <UIcon
            name="i-heroicons-plus-16-solid"
            class="w-[30px] h-[30px]"
          ></UIcon>
        </div>
      </UCard>
    </transition>
  </div>
</template>

<script setup lang="js">
import { useScreen } from '~/store/userHome';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const screen = useScreen();
const router = useRouter();
const pages = reactive([{ id: 1, name: 'Get started' }]);

const navPage = (id) => {
  screen.handleComponent('started');
  router.push(`/${id}`);
};

const addNewPage = computed(() => {
  const newPageId = pages.length + 1;
  pages.push({ id: newPageId, name: `Page ${newPageId}` });
});

const deletePage = (id) => {
  pages.splice(
    pages.findIndex((page) => page.id === id),
    1
  );
};
</script>

<style lang="css">
.slide-width-enter-active,
.slide-width-leave-active {
  transition: 0.1s ease all;
}

.slide-width-enter,
.slide-width-leave-to {
  transform: translateX(-250px);
}

.slide-width-enter-to,
.slide-width-leave {
  transform: translateX(0);
}
</style>
