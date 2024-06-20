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
              ></textarea>
              <div class="pb-[50px]">
                <p class="text-2xl text-justify p-4 font-semibold">
                  {{ selectedChoice }}
                </p>
              </div>
              <div v-show="isLoading === 'loading'"><img src="~/public/loading.gif" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="loading"></div>
              <select v-model="selectedChoice" class="p-4 w-1/2 text-2xl truncate border border-2 border-solid border-gray-500" v-show="isLoading === 'success'">
                <option disabled value="" class="h-[100px]">Choose your answer: </option>
                <option v-for="(choice, index) in choices" :value="choice" :key="index" class="">
                {{ choice }}
                </option>
              </select>
              <UButton
                type="submit"
                class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]"
                >Submit</UButton
              >
              <UButton @click="handleSave" class="px-16 py-8 text-2xl font-bold absolute bottom-2 left-2 bg-[#753fea] hover:bg-[#5424b3]" :class="selectedChoice ? '' : 'hidden'">Save</UButton>
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
import getTextCompletion from '~/composables/GetTextCompletion';

let rawText = '';
let choices = ref([]);
let selectedChoice = ref('');
let isLoading = ref('pending');

const handleSubmit = async () => {
  try{
  isLoading.value = 'loading'
  const data = await getTextCompletion(rawText, "paragraph");
  if(data.body.completions){
  choices.value = await data.body.completions;
  }
  if(await choices.value.body)
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
  const saveData = await saveChoice(rawText, selectedChoice.value, 'text-completion');
  if(saveData){
    successMessage('Saved successfully!')
  }
}

</script>

<style lang="">
</style>
