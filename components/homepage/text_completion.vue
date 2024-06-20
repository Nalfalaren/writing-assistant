<template>
  <div>
    <homepage-small_nav />
    <UContainer class="">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3 mt-16"
      >
        <div class="">
          <div class="relative aspect-video w-[1400px] h-[600px]">
            <form
              @submit.prevent="handleSubmit"
              @keydown.enter.prevent="handleSubmit"
            >
              <textarea
                color="white"
                variant="outline"
                placeholder="Type something here..."
                class="w-full max-h-[400px] p-4 outline-none text-2xl resize-none"
                v-model="rawText"
                v-show="isLoading !== 'success'"
                rows="20"
              ></textarea>
              <div v-show="paraphrasedAnswer" class="mb-[30px]">
                <h1 class="text-2xl">
                  {{ rawText + " " }}
                  <span class="font-bold">{{ paraphrasedAnswer }}</span>
                </h1>
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
                  @change="handleAnswer"
                  class="p-4 w-1/2 text-2xl truncate border border-2 border-solid border-gray-500"
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
              <div class="mt-[100px]">
                <span class="text-2xl"
                  >Word count:
                  {{
                    isLoading === "success"
                      ? paraphrasedAnswer.split(" ").length +
                        rawText.split(" ").length
                      : wordCount
                  }}</span
                >
              </div>
              <UButton
                class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]"
                @click="reset"
                :class="isLoading === 'success' ? '' : 'hidden'"
                >Reset</UButton
              >
              <UButton
                type="submit"
                class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]"
                :disabled="isLoading !== 'pending'"
                :class="isLoading === 'success' ? 'hidden' : ''"
                >Submit</UButton
              >
              <UButton
                @click="handleSave"
                class="px-16 py-8 text-2xl font-bold absolute bottom-2 left-2 bg-[#753fea] hover:bg-[#5424b3]"
                :class="paraphrasedAnswer ? '' : 'hidden'"
                >Save</UButton
              >
            </form>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import SuccessMessage from '../alert/SuccessAlert';
import GetTextCompletion from '~/composables/getTextCompletion';

let rawText = ref('');
let paraphrasedAnswer = ref('');
let choices = ref([]);
let selectedChoice = ref('');
let isLoading = ref('pending');

const wordCount = computed(() => {
  return rawText.value.split(/\s+/).filter(word => word.length > 0).length;
});

const handleAnswer = (event) => {
  const ans = event.target.value;
  paraphrasedAnswer.value = ans;
};

const reset = () => {
  paraphrasedAnswer.value = '';
  rawText.value = '';
  isLoading.value = 'pending';
};


const handleSubmit = async () => {
  try{
  isLoading.value = 'loading'
  const data = await GetTextCompletion(rawText.value);
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

const handleSave = async () => {
  const saveData = await saveChoice(rawText.value, selectedChoice.value, 'text-completion');
  if(saveData){
    SuccessMessage('Saved successfully!')
  }
}

watch(rawText, () => {
  console.log(`Word count: ${wordCount.value}`);
});

</script>

<style lang="">
</style>
