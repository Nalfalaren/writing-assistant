<template>
  <div>
    <nav>
      <UCard
        :class="
          screen.screenMode === 'dark'
            ? 'bg-slate-800 sticky'
            : 'sticky border border-1 border-solid border-slate-500'
        "
      >
        <div class="flex flex-row justify-between items-center px-4">
          <div class="flex flex-row items-center gap-[20px]">
            <UTooltip text="Click on here to expand and narrow!">
              <UIcon
                :name="
                  screen.isToggle
                    ? 'i-heroicons-chevron-double-left-16-solid'
                    : 'i-heroicons-chevron-double-right-16-solid'
                "
                :class="
                  screen.screenMode === 'dark'
                    ? 'w-[30px] h-[30px] text-white hover:bg-green-900 mt-[10px]'
                    : 'w-[30px] h-[30px] hover:bg-green-900 mt-[10px] text-[#753fea]'
                "
                @click="screen.handleToggle()"
              ></UIcon>
            </UTooltip>
          </div>
          <div>
            <h1
              :class="
                screen.screenMode === 'dark'
                  ? 'font-bold text-3xl text-white '
                  : 'font-bold text-3xl text-[#753fea]'
              "
            >
              Correctly
            </h1>
          </div>
          <div class="flex flex-row items-center gap-[20px]">
            <UTooltip text="User account">
              <div
                class="bg-[#EDEDED] rounded-full w-[40px] h-[40px] relative"
                @click="$router.push('/login')"
              >
                <UIcon
                  name="i-heroicons-user-16-solid"
                  class="absolute top-2 left-2.5 w-[20px] h-[20px] hover:text-green-700 text-[#753fea]"
                ></UIcon>
              </div>
            </UTooltip>
          </div>
        </div>
      </UCard>
    </nav>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import { useScreen } from '~/store/userHome.js';
const screen = useScreen();
</script>


