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
            <h1 class="text-3xl text-[#0A2FB6] font-bold" @click="$router.push('/home')">Correctly</h1>
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
                    : 'w-[30px] h-[30px] hover:bg-green-900 mt-[10px]'
                "
                @click="screen.handleToggle()"
              ></UIcon>
            </UTooltip>
          </div>
          <div>
            <h1
              :class="
                screen.screenMode === 'dark'
                  ? 'font-bold text-2xl text-white'
                  : 'font-bold text-2xl'
              "
            >
              Correctly {{ param === "index" ? "grammar" : param }}
            </h1>
          </div>
          <div class="flex flex-row items-center gap-[20px]">
            <UTooltip text="Switch to Dark Mode">
              <div
                class="bg-[#EDEDED] rounded-full w-[40px] h-[40px] relative"
                v-if="screen.screenMode === 'light'"
              >
                <UIcon
                  name="i-heroicons-moon-20-solid"
                  class="absolute top-2 left-2.5 w-[20px] h-[20px] hover:text-green-700 duration-300 ease-in-out"
                  @click="screen.changeScreenMode('dark')"
                ></UIcon>
              </div>
            </UTooltip>
            <UTooltip
              text="Switch to Light Mode"
              v-if="screen.screenMode === 'dark'"
            >
              <div
                class="bg-[#EDEDED] rounded-full w-[40px] h-[40px] relative"
                v-if="screen.screenMode === 'dark'"
              >
                <UIcon
                  name="i-heroicons-sun"
                  class="absolute top-2 left-2.5 w-[20px] h-[20px] hover:text-green-700 duration-300 ease-in-out"
                  @click="screen.changeScreenMode('light')"
                ></UIcon>
              </div>
            </UTooltip>
            <UTooltip text="User account">
              <div
                class="bg-[#EDEDED] rounded-full w-[40px] h-[40px] relative"
                @click="$router.push('/login')"
              >
                <UIcon
                  name="i-heroicons-user-16-solid"
                  class="absolute top-2 left-2.5 w-[20px] h-[20px] hover:text-green-700"
                ></UIcon>
              </div>
            </UTooltip>
          </div>
        </div>
      </UCard>
    </nav>
    <!-- <USlideover v-model="isOpen" prevent-close>
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Choose the function!
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div>
          <ul class="flex flex-col justify-between gap-[30px] text-2xl">
            <li class="hover:bg-gray-300 py-2">
              <ULink to="/">Grammar</ULink>
            </li>
            <li class="hover:bg-gray-300 py-2">
              <ULink to="/plagiarism">Plagiarism check</ULink>
            </li>
            <li class="hover:bg-gray-300 py-2">
              <ULink to="/completion">Text completion</ULink>
            </li>
            <li class="hover:bg-gray-300 py-2">
              <ULink to="/paraphrase">Paraphrase</ULink>
            </li>
          </ul>
        </div>

        <Placeholder class="h-full" />
      </UCard>
    </USlideover> -->
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import { useScreen } from '~/store/userHome.js';
import successMessage from '../alert/SuccessAlert.js';
const isOpen = ref(false);
const isExpand = ref(false);
const router = useRouter();
const errorURL = router.currentRoute.value.query.error;
const code = router.currentRoute.value.query.code;
if(errorURL){
  router.push('/login');
}
else if(code){
  successMessage('Login successfully')
}
const screen = useScreen();

</script>


