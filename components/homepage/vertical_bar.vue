<template>
  <div>
    <transition name="slide-width">
      <UCard
        class="border border-1 border-solid border-slate-500 w-[20%] h-screen pt-2"
        v-if="screen.isToggle"
      >
        <div class="flex flex-col justify-between p-4">
          <div class="flex flex-col gap-4 text-2xl">
            <h1 class="text-[#753fea] text-xl mb-8">Welcome <span class="font-bold">{{ name }}</span></h1>
            <div
              class="flex flex-row items-center gap-[20px] text-xl hover:font-semibold hover:bg-[#D9D9D9] p-2 hover:rounded-[10px] cursor-pointer text-[#753fea]"
              @click="() => handleClickFunction('dashboard')"
              :class="screen.isFunctionClicked === 'dashboard' ? 'bg-[#D9D9D9] rounded-[10px]' : ''"
            >
              <UIcon name="i-heroicons-presentation-chart-bar-20-solid"></UIcon>
              <h1>User dashboard</h1>
            </div>

            <div
              class="flex flex-row items-center gap-[20px] text-xl hover:font-semibold hover:bg-[#D9D9D9] p-2 hover:rounded-[10px] cursor-pointer text-[#753fea]"
              @click="
               () => handleClickFunction('function')
              "
              :class="
                screen.isFunctionClicked === 'function' ? 'bg-[#D9D9D9] rounded-[10px]' : ''
              "
            >
              <UIcon name="i-heroicons-cube-16-solid"></UIcon>
              <h1>Functions</h1>
            </div>

            <div
              class="flex flex-row items-center gap-[20px] text-xl hover:font-semibold hover:bg-[#D9D9D9] p-2 hover:rounded-[10px] text-[#753fea]" @click="handleSignOut"
            >
              <UIcon
                name="i-heroicons-arrow-left-start-on-rectangle-16-solid"
              ></UIcon>
              <h1>Log out</h1>
            </div>
          </div>
        </div>
      </UCard>
    </transition>
  </div>
</template>

<script setup lang="js">
import { useScreen } from '~/store/userHome';
import { useRouter } from 'vue-router';

const screen = useScreen();
const router = useRouter();
const userName = await getUserInfo();
const name = ref('');
name.value = userName.name;

const handleClickFunction = (name) => {
  screen.isFunctionClicked = name;
  if(screen.isFunctionClicked === 'dashboard'){
    router.push('/home/dashboard');
  }
  else if(screen.isFunctionClicked === 'function'){
    router.push('/home');
  }
 };

 const handleSignOut = async () => {
  router.push('/login');
 }

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
