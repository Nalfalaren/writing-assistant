<template>
  <div>
    <homepage-small_nav v-if="$router.currentRoute.value.fullPath !== '/'" />
    <div>
      <UContainer>
        <div class="absolute top-[25%] left-[25%] mt-[100px]">
          <div>
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
                  v-model="currentText"
                  v-show="isLoading !== 'success'"
                  :disabled="isLoading === 'loading'"
                  rows="20"
                ></textarea>
                <div
                  v-html="highlightedText"
                  v-show="isLoading === 'success'"
                  class="text-2xl"
                ></div>
                <div v-show="isLoading === 'loading'">
                  <img
                    src="~/public/loading.gif"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    alt="loading"
                  />
                </div>
                <div
                  v-if="showModal"
                  class="flex items-center justify-center z-50"
                  id="1"
                >
                  <div
                    class="bg-white p-6 rounded shadow-md absolute left-1 top-12"
                  >
                    <p>
                      Did you mean: <strong>{{ suggestion }}</strong
                      >?
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
                <div class="flex flex-row justify-between items-center">
                  <UButton
                    type="submit"
                    class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]"
                    :disabled="isLoading === 'loading'"
                    v-show="isLoading !== 'success'"
                  >
                    Submit
                  </UButton>
                  <UButton
                    class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2 bg-[#753fea] hover:bg-[#5424b3]"
                    v-show="isLoading === 'success'"
                    @click="reset"
                  >
                    Reset
                  </UButton>
                  <UButton
                    @click="handleSave"
                    class="px-16 py-8 text-2xl font-bold absolute bottom-2 left-2 bg-[#753fea] hover:bg-[#5424b3]"
                    :class="isLoading === 'success' ? '' : 'hidden'"
                  >
                    Save
                  </UButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SignInDialog from '../alert/SignInDialog';
import SuccessMessage from '../alert/SuccessAlert';
import getGrammarCheck from '~/composables/getGrammarCheck.js';

const router = useRouter();
const showModal = ref(false);
const currentText = ref('');
const hoveredElementId = ref(null);
const modalDiv = ref(null);
const isLoading = ref('pending');
const suggestion = ref('');
const currentErrorIndex = ref(-1);
const highlightedText = ref('');
const firstText = ref('');
const data = ref({ body: { errors: [] } });
const appliedFixes = ref(new Set());

const wordCount = computed(() => {
  return currentText.value.split(/\s+/).filter(word => word.length > 0).length;
});

if (router.currentRoute.value.fullPath === '/') {
  SignInDialog(router.push('/login'));
}

const reset = () => {
  currentText.value = '';
  highlightedText.value = '';
  isLoading.value = 'pending';
  appliedFixes.value.clear(); 
  SuccessMessage("Reset successfully");
};

const showSuggestion = (errorIndex) => {
  const error = data.value.body.errors[errorIndex];
  if (error) {
    suggestion.value = error.suggestion;
    currentErrorIndex.value = errorIndex;
    showModal.value = true;
  }
};

const handleSubmit = async () => {
  firstText.value = currentText.value;
  isLoading.value = 'loading';
  try {
    const result = await getGrammarCheck(currentText.value);
    if (result && result.body) {
      if (result.body.errors.length === 0 && result.body.originalText === result.body.fixedText) {
        isLoading.value = 'pending';
        successMessage('No errors found!');
        return;
      }
        data.value = result;
        highlightedText.value = generateHighlightedText();
        isLoading.value = 'success';
        return;
    }
      isLoading.value = 'pending';
  } catch (error) {
    console.error(error);
    isLoading.value = 'pending';
  }
};

const applySuggestion = () => {
  const error = data.value.body.errors[currentErrorIndex.value];
  const errorWord = error.word;
  const suggestionWord = error.suggestion;
  if (!appliedFixes.value.has(errorWord)) {
    const regExp = new RegExp(`\\b${errorWord}\\b`, 'g'); 
    currentText.value = currentText.value.replace(regExp, suggestionWord);
    appliedFixes.value.add(errorWord);
    appliedFixes.value.add(suggestionWord); 

    showModal.value = false;
    SuccessMessage('Fixed successfully!');
    highlightedText.value = generateHighlightedText();
  } else {
    showModal.value = false;
  }
};

const generateHighlightedText = () => {
  let highlighted = currentText.value;
  data.value.body.errors.forEach((error, index) => {
    const errorWord = error.word;
    if (!appliedFixes.value.has(errorWord)) {
      const highlightedWord = `<span id="${index}" class="text-red-400 hover:font-bold underline cursor-pointer">${errorWord}</span>`;
      highlighted = highlighted.replace(new RegExp(`\\b${errorWord}\\b`, 'g'), highlightedWord);
    }
  });
  return highlighted;
};

const handleSave = async () => {
  const saveData = await saveChoice(firstText.value, currentText.value, 'grammar-checking');
  if (saveData) {
    SuccessMessage('Saved successfully!')
  }
}


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
});

onUnmounted(() => {
  modalDiv.value = document.getElementById('1');
  if (modalDiv.value) {
    modalDiv.value.addEventListener('mouseleave', () => {
      showModal.value = false;
      hoveredElementId.value = null;
    });
  }
})

</script>

<style lang=""></style>
