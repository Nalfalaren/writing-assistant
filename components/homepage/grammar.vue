<template>
  <div>
    <UContainer>
      <div class="absolute top-[20%] left-[20%]">
        <div class="px-32">
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
              <div v-html="highlightedText" v-show="isLoading === 'success'" class="text-2xl"></div>
              <div v-show="isLoading === 'loading'"><img src="~/public/loading.gif" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="loading"></div>
              <div
                v-if="showModal"
                class="flex items-center justify-center z-50"
                id="1"
              >
                <div class="bg-white p-6 rounded shadow-md absolute left-1 top-12">
                  <p>
                    Did you mean: <strong>{{ currentSuggestion }}</strong>?
                  </p>
                  <button
                    @click="applySuggestion"
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded bg-[#753fea] hover:bg-[#5424b3]"
                  >
                    Apply
                  </button>
                  <button
                    @click="showModal = false"
                    class="mt-4 px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div class="mt-[100px]">
                <span class="text-2xl">Word count: {{ wordCount }}</span>
              </div>
              <UButton type="submit" class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]" :disabled="isLoading === 'loading'" v-show="isLoading !== 'success'">
                Submit
              </UButton>
              <UButton class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]" v-show="isLoading === 'success'" @click="reset">
                Reset
              </UButton>
            </form>
          </div>
          <homepage-small_nav v-if="$router.currentRoute.value.fullPath !== '/'"/>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="js">
import { ref, computed, onMounted } from 'vue';
import getGrammarCheck from '@/composables/getGrammarCheck.js';
import { useRouter } from 'vue-router';
import signInDialog from '../alert/SignInDialog';
import successMessage from '../alert/SuccessAlert';

const router = useRouter();
const showModal = ref(false);
const rawText = ref('');
const hoveredElementId = ref(null);
const modalDiv = ref(null);
const isLoading = ref('pending');
const currentSuggestion = ref('');
const currentErrorIndex = ref(-1);
const data = ref({ body: { errors: [] } });
const highlightedText = ref('');

if(router.currentRoute.value.fullPath === '/'){
  signInDialog(router.push('/login'));
}

const wordCount = computed(() => {
  return rawText.value.split(/\s+/).filter(word => word.length > 0).length;
});

const reset = () => {
  rawText.value = '';
  highlightedText.value = '';
  isLoading.value = 'pending';
  successMessage("Reset successfully");
};

const showSuggestion = (errorIndex) => {
  const error = data.value.body.errors[errorIndex];
  if (error) {
    currentSuggestion.value = error.suggestion;
    currentErrorIndex.value = errorIndex;
    showModal.value = true;
  }
};

const handleSubmit = async () => {
  isLoading.value = 'loading';
  try {
    const result = await getGrammarCheck(rawText.value);
    console.log(result);
    if (result && result.body && result.body.errors) {
      data.value = result;
      highlightedText.value = generateHighlightedText();
      isLoading.value = 'success';
    } else {
      isLoading.value = 'pending';
    }
  } catch (error) {
    console.error(error);
    isLoading.value = 'pending';
  }
};

const applySuggestion = () => {
  const words = rawText.value.split(' ');
  const error = data.value.body.errors[currentErrorIndex.value];
  const errorWords = error.word.split(' ');
  const suggestionWords = error.suggestion.split(' ');

  const errorStartIndex = words.join(' ').indexOf(error.word);
  const errorWordCount = errorWords.length;

  words.splice(errorStartIndex, errorWordCount, ...suggestionWords);
  
  rawText.value = words.join(' ');
  showModal.value = false;
  successMessage('Fixed successfully!');
};

const generateHighlightedText = () => {
  let highlighted = rawText.value;
  data.value.body.errors.forEach((error, index) => {
    const errorWord = error.word;
    console.log(errorWord);
    const highlightedWord = `<span id="${index}" class="text-red-400 hover:bg-red-400 underline cursor-pointer">${errorWord}</span>`;
    highlighted = highlighted.replace(new RegExp(`\\b${errorWord}\\b`, 'g'), highlightedWord);
    console.log(highlightedWord);
  });
  return highlighted;
};

onMounted(() => {
  document.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target && target.matches('span[id]')) {
      const id = target.getAttribute('id');
      showSuggestion(Number(id));
      hoveredElementId.value = id;
      showModal.value = true;
    }
  });

  modalDiv.value = document.getElementById('1');
  if (modalDiv.value) {
    modalDiv.value.addEventListener('mouseleave', () => {
      showModal.value = false;
      hoveredElementId.value = null;
    });
  }
});
</script>

<style lang="">
</style>
