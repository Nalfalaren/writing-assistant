<template>
    <div>
      <UContainer class="">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3">
          <div class="">
            <div class="relative aspect-video w-[1400px] h-[800px]">
              <form @submit.prevent="handleSubmit" @keydown.enter.prevent="handleSubmit">
                <textarea
                  color="white"
                  variant="outline"
                  placeholder="Type something here..."
                  class="w-full h-full p-4 outline-none"
                  v-model="rawText"
                ></textarea>
                <div>{{ paragraph.body }}</div>
                <UButton type="submit" class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2">Submit</UButton>
              </form>
            </div>
            <homepage-small_nav/>
          </div>
        </div>
      </UContainer>
    </div>
  </template>
  
  <script setup lang="js">
  import { ref } from 'vue';
  import getParaphrase from '~/composables/getParaphrase.js'

  let rawText = '';
  let paragraph = ref('');
  let message = ref('');
  const handleSubmit = async () => {
   paragraph.value = await getParaphrase("expand", rawText); 
  };
  
  </script>
  
  <style lang="">
  
  </style>
  