<template>
    <div :class="screen.screenMode === 'dark' ? 'bg-gray-900 w-full h-full' : ''">
        <homepage-navigation_bar/>
        <homepage-vertical_bar/>
        <homepage-text_completion_sen/>
    </div>
</template>
<script setup lang="js">
import { useScreen } from '~/store/userHome.js';
const screen = useScreen();
useSeoMeta({
    title: 'Correctly homepage',
    ogTitle: 'Correctly homepage',
    description: 'Correctly is the web for checking paragraph',
    ogDescription: 'Correctly is the web for checking paragraph',
})

const route = useRoute();

</script>
