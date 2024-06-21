<template>
    <div class="min-[1800px]:px-40">
        <homepage-navigation_bar/>
        <homepage-vertical_bar/>
        <homepage-grammar/>
    </div>
</template>
<script setup lang="js">
useSeoMeta({
    title: 'Correctly homepage',
    ogTitle: 'Correctly homepage',
    description: 'Correctly is the web for checking paragraph',
    ogDescription: 'Correctly is the web for checking paragraph',
})

const router = useRouter();
const access_token = useCookie('access-token', 'get');
// if(!access_token.value){
//     router.push('/login')
// }
</script>
