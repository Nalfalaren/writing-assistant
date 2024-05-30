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
              <div
                contenteditable="true"
                class="w-full h-full p-4 outline-none text-2xl"
                @input="onInput"
                @blur="highlightErrors"
                ref="editableDiv"
              >
                Enter something here...
              </div>
              <div v-show="isLoading === 'loading'"><img src="~/public/loading.gif" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="loading"></div>
              <div
                v-if="showModal === true"
                class="flex items-center justify-center z-50"
                id="1"
              >
                <div class="bg-white p-6 rounded shadow-md absolute left-1 top-12">
                  <p>
                    Did you mean: <strong>{{ currentSuggestion }}</strong
                    >?
                  </p>
                  <button
                    @click="applySuggestion"
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
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
              <UButton
                type="submit"
                class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2"
              >
                Submit
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
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import getGrammarCheck from '@/composables/getGrammarCheck.js';
import signInDialog from '../alert/SignInDialog';
const router = useRouter();
console.log(router.currentRoute.value.fullPath);
const showModal = ref(false);
const rawText = ref('');
const hoveredElementId = ref(null);
const modalDiv = ref(null);
const isLoading = ref('pending');
const currentSuggestion = ref('');
const currentErrorIndex = ref(-1);
const data = ref({ body: { word: [] } }); 

if(router.currentRoute.value.fullPath === '/'){
  signInDialog(router.push('/login'));
}

const showSuggestion = (index) => {
  const words = rawText.value.split(' ');
  const errorWord = words[index];
  const error = data.value.body.errors.find(e => e.word === errorWord);
  if (error) {
    currentSuggestion.value = error.suggestion;
    currentErrorIndex.value = index;
    showModal.value = true;
  }
};

const handleSubmit = async () => {
  isLoading.value = 'loading';
  try {
    const result = await getGrammarCheck(rawText.value);
    console.log(result);
    if (result && result.body && result.body.word) {
      data.value = result;
      isLoading.value = 'success';
      updateContent();
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
  words[currentErrorIndex.value] = currentSuggestion.value;
  rawText.value = words.join(' ');
  showModal.value = false;
  updateContent();
};

const onInput = (event) => {
  rawText.value = event.target.innerText;
  updateContent();
};

const highlightedText = computed(() => {
  if (!data.value.body || !data.value.body.word) return rawText.value;
  const wordSet = new Set(data.value.body.errors.map(error => error.word));
  return rawText.value.split(' ').map((word, index) => {
    if (wordSet.has(word)) {
      return `<span id="${index}" class="text-red-400 hover:bg-red-400">${word}</span>`;
    }
    return word;
  }).join(' ');
});

const updateContent = () => {
  nextTick(() => {
    const editableDiv = document.querySelector('[contenteditable]');
    if (editableDiv) {
      editableDiv.innerHTML = highlightedText.value;
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editableDiv);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
};

onMounted(() => {
  document.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target && target.matches('span[id]')) {
      const id = target.getAttribute('id');
      showSuggestion(id);
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

watch(rawText, () => {
  handleSubmit();
});
</script>





<style lang="">
</style>
