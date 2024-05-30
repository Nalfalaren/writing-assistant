<template>
  <div>
    <UContainer class="">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3"
      >
        <div class="">
          <div class="relative aspect-video w-[1400px] h-[800px]">
            <form
              @submit.prevent="handleSubmit"
              @keydown.enter.prevent="handleSubmit"
            >
              <textarea
                color="white"
                variant="outline"
                placeholder="Type something here..."
                class="w-full h-full p-4 outline-none text-2xl"
                v-model="rawText"
                v-show="isLoading !== 'success'"
              ></textarea>
              <div v-show="paraphrasedAnswer">
                <h1 class="font-bold text-2xl">{{ paraphrasedAnswer }}</h1>
              </div>
              <div v-show="isLoading === 'loading'">
                <img
                  src="~/public/loading.gif"
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  alt="loading"
                />
              </div>
              <div v-show="isLoading === 'success'" class="">
              <select
                v-model="selectedChoice"
                @change="handleAnswer" class="p-4 w-1/2 text-2xl truncate border border-2 border-solid border-gray-500"
              >
                <option disabled value="" class="h-[100px]">
                  Choose your answer:
                </option>
                <option
                  v-for="(choice, index) in choices"
                  :value="choice"
                  :key="index"
                  class=""
                >
                  {{ choice }}
                </option>
              </select>
              </div>
              <div class="mt-[100px]"><span class="text-2xl">Word count: {{ isLoading === 'success' ? paraphrasedAnswer.split(' ').length : wordCount }}</span></div>
              <UButton class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2" @click="reset" :class="isLoading === 'success' ? '' : 'hidden'">Continue</UButton>
                <UButton type="submit" class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2" :disabled="isLoading !== 'pending'" :class="isLoading === 'success' ? 'hidden' : ''">Submit</UButton>
            </form>
          </div>
          <homepage-small_nav />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import getTextCompletion from '~/composables/GetTextCompletion.js';


let rawText = ref('');
let paragraph = ref('');
let paraphrasedAnswer = ref('');
let choices = ref([]);
let selectedChoice = ref('');
let isLoading = ref('pending');

const wordCount = computed(() => {
  return rawText.value.split(/\s+/).filter(word => word.length > 0).length;
});

const handleAnswer = (event) => {
  paraphrasedAnswer.value = event.target.value;
};

const reset = () => {
  paraphrasedAnswer.value = '';
  rawText.value = '';
  isLoading.value = 'pending';
};


const handleSubmit = async () => {
  try{
  isLoading.value = 'loading'
  const data = await getTextCompletion(rawText.value);
  if(data){
  choices.value = await data;
  }
  if(choices.value)
  isLoading.value = 'success'
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

watch(rawText, () => {
  console.log(`Word count: ${wordCount.value}`);
});

// const handleChoice = () => {
//   applyChoice.value = true;
//   if(applyChoice.value = true){
//     selectedChoice.value = rawText + " " + selectedChoice.value
//   } 
// }

</script>

<style lang="">
</style>
