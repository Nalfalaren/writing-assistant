<template lang="">
    <div>
        <nav>
        <UCard>
            <div class="flex flex-row justify-between items-center px-8">
            <div class="flex flex-row items-center gap-[20px]">
                <div class="flex flex-row items-center gap-[20px]">
            <UTooltip text="Click on here to expand and narrow!">
              <UIcon
                :name="
                  screen.isToggle
                    ? 'i-heroicons-chevron-double-left-16-solid bg-[#753fea]'
                    : 'i-heroicons-chevron-double-right-16-solid bg-[#753fea]'
                "
                :class="
                  screen.screenMode === 'dark'
                    ? 'w-[30px] h-[30px] text-white hover:bg-green-900 mt-[10px]'
                    : 'w-[30px] h-[30px] hover:bg-green-900 mt-[10px]'
                "
                @click="screen.handleToggle()"
              ></UIcon>
            </UTooltip>
          </div>
          <div>
            <h1
              :class="'font-bold text-3xl text-[#753fea]'"
            >
                Correctly 
            </h1>
        </div>
            </div>
            <div class="flex flex-row items-center gap-[20px]">
                <div><span class="text-xl font-bold text-[#753fea]">{{ userName }}</span></div>
            </div>
        </div>
        </UCard>
        </nav>
    </div>
</template>
<script setup lang="js">
import { useScreen } from '~/store/userHome.js'
const screen = useScreen();
</script>
<style lang="">
</style>