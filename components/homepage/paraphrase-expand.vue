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
                  class="w-full h-full p-4 outline-none text-2xl"
                  v-model="rawText"
                ></textarea>
                <div v-show="isLoading === 'loading'"><img src="~/public/loading.gif" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="loading"></div>
                <div v-show="isLoading === 'success'"><p class="text-2xl text-justify p-4 font-semibold">Paraphrase: {{ paragraph.body }}</p></div>
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
  let isLoading = ref('pending');
  const handleSubmit = async () => {
    try{
      isLoading.value = 'loading',
      paragraph.value = await getParaphrase("expand", rawText);
      if(await paragraph.value.body){
        isLoading.value = 'success';
      } 
    }
    catch(error){
      console.log(error);
    }
    finally{
      if(isLoading.value !== 'success'){
        isLoading.value = 'pending';
      }
    }
  };
  
  </script>
  
  <style lang="">
  
  </style>
  