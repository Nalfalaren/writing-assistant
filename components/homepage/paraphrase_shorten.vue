<template>
  <div class="flex flex-col justify-center">
    <homepage-small_nav/>
    <UContainer class="">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3 mt-16">
        <div class="">
          <div class="relative">
            <form @submit.prevent="handleSubmit" @keydown.enter.prevent="handleSubmit">
              <textarea
                color="white"
                variant="outline"
                placeholder="Type something here..."
                class="max-w-full max-h-[300px] p-4 outline-none text-xl resize-none"
                v-model="rawText"
                v-show="isLoading !== 'success'"
                :disabled="isLoading === 'loading'"
                rows="15"
                cols="100"
              ></textarea>
              <div v-show="paraphrasedAnswer">
                <h1 class="font-bold text-xl">{{ paraphrasedAnswer }}</h1>
              </div>
              <div v-show="isLoading === 'loading'">
                <img src="~/public/loading.gif" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="loading">
              </div>
              <div v-show="isLoading === 'success'" class="mt-[50px]">
                <select v-model="selectedChoice" @change="handleAnswer" class="p-4 w-1/2 text-2xl truncate border border-2 border-solid border-gray-500 mt-[50px]">
                  <option disabled value="" class="h-[200px]">Choose your answer: </option>
                  <option v-for="(choice, index) in answerList" :value="choice" :key="index" class="truncate">
                    {{ choice }}
                  </option>
                </select>
              </div>
              <div class="mt-[100px]"><span class="text-xl">Word count: {{ isLoading === 'success' ? paraphrasedAnswer.split(' ').length : wordCount }}</span>
              </div>
              <div class="flex flex-row justify-between items-center">
                <UButton class="px-12 py-8 text-xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]" @click="reset" :class="isLoading === 'success' ? '' : 'hidden'">Reset</UButton>
                <UButton type="submit" class="px-12 py-8 text-xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]" :disabled="isLoading !== 'pending'" :class="isLoading === 'success' ? 'hidden' : ''">Submit</UButton>
                <UButton @click="handleSave" class="px-12 py-8 text-xl font-bold absolute bottom-2 left-2 bg-[#753fea] hover:bg-[#5424b3]" :class="paraphrasedAnswer ? '' : 'hidden'">Save</UButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="js">
import getParaphrase from '~/composables/getParaphrase.js';
import SuccessMessage from '../alert/SuccessAlert';

let rawText = ref('');
let isLoading = ref('pending');
let paraphrasedAnswer = ref('');
let selectedChoice = ref('');
let answerList = ref([]);

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
  try {
    isLoading.value = 'loading';
    answerList.value = await getParaphrase('shorten', rawText.value);
    if (answerList.value) {
      isLoading.value = 'success';
    } 
  } catch (error) {
    console.log(error);
  } finally {
    if (isLoading.value !== 'success') {
      isLoading.value = 'pending';
    }
  }
};

const handleSave = async () => {
  const saveData = await saveChoice(rawText.value, selectedChoice.value, 'paraphrase');
  if(saveData){
    SuccessMessage('Saved successfully!')
  }
}

</script>
