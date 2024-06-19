<template>
  <div>
    <homepage-small_nav />
    <UContainer class="">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3  mt-16"
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
                :disabled="isLoading === 'loading'"
                rows="20"
              ></textarea>
              <div v-show="isLoading === 'loading'">
                <img
                  src="~/public/loading.gif"
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  alt="loading"
                />
              </div>
              <div v-show="isLoading === 'success'">
                <div v-for="(text, index) in plagiarism" :key="index" class="flex flex-col mt-[50px]">
                  <div class="flex flex-col justify-between gap-[20px]">
                    <div class="basis-[50%]">
                      <h1 class="text-red-500 text-2xl font-bold truncate">
                        Website: <ULink :to="text.link">{{ text.link }}</ULink>
                      </h1>
                    </div>
                    <div class="basis-[30%]">
                      <h1 class="text-2xl">Similarity: <span :class="Math.round(+text.similarity) > 30 ? 'text-red-400 font-bold text-2xl' : 'text-green-400 text-2xl font-bold'">{{ (+text.similarity).toFixed(2) }}%</span></h1>
                      <template>
                        <UMeter :value="25" indicator label="Plagiarism rate" />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <UButton type="submit" class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]" :disabled="isLoading !== 'pending'" :class="isLoading === 'success' ? 'hidden' : ''">Submit</UButton>
              <UButton class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]" @click="reset" :class="isLoading === 'success' ? '' : 'hidden'">Reset</UButton>
              <UButton @click="handleSave" class="px-16 py-8 text-2xl font-bold absolute bottom-2 left-2 bg-[#753fea] hover:bg-[#5424b3]" :class="isLoading === 'success' ? '' : 'hidden'">Save</UButton>
            </form>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="js">
import successMessage from '../alert/SuccessAlert';
import WaitingAlert from '../alert/WaitingAlert';
let rawText = ref('');
const plagiarism = ref([]);
const isLoading = ref('pending')

const handleSubmit = async () => {
    try{
      isLoading.value = 'loading';
      if(isLoading.value === 'loading'){
        WaitingAlert();
      }
      plagiarism.value = await getPlagiarism(rawText.value);
      if(plagiarism.value){
        isLoading.value = 'success';
        successMessage("Check plagiarism successfully!")
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

  const reset = () => {
    rawText.value = '';
    plagiarism.value = '',
    isLoading.value = 'pending'
    successMessage("Reset successfully!")
  }

  const handleSave = async () => {
  const saveData = await saveChoice(rawText.value, plagiarism.value, 'plagiarism-checking');
  if(saveData){
    successMessage('Saved successfully!')
  }
}

</script>

<style lang="">
</style>
