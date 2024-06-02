<template>
    <div :class="screen.screenMode === 'dark' ? 'bg-gray-900 w-full h-full' : ''">
        <dashboard-nav_bar></dashboard-nav_bar>
        <homepage-vertical_bar></homepage-vertical_bar>
        <dashboard-history></dashboard-history>
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

const router = useRouter();
const access_token = useCookie('access-token', 'get');
if(!access_token.value){
    router.push('/login')
}

</script>