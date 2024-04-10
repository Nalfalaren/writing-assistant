<template>
    <div :class="screen.screenMode === 'dark' ? 'bg-gray-900 w-full h-full' : ''">
       <homepage-navigation_bar/>
       <homepage-plagiarism/>
    </div>
</template>
<script setup lang="js">
import { useScreen } from '~/store/userHome.js';
const screen = useScreen();
</script>
