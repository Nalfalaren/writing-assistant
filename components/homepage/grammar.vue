<template>
  <div>
    <UContainer>
      <div class="absolute top-[20%] left-[20%]">
        <div>
          <div class="relative aspect-video w-[1400px] h-[800px]">
            <form @submit.prevent="handleSubmit" @keydown.enter.prevent="handleSubmit">
              <div
                contenteditable="true"
                class="w-full h-full p-4 outline-none relative"
                @input="onInput"
                @blur="highlightErrors"
                ref="editableDiv"
              >
              <div>{{ currentSuggestion }}</div>
                <div v-if="showModal === true" class="flex items-center justify-center z-50">
                  <div class="bg-white p-6 rounded shadow-md">
                    <p>
                      Did you mean: <strong>{{ currentSuggestion }}</strong>?
                    </p>
                    <button @click="applySuggestion" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                      Apply
                    </button>
                    <button @click="showModal = false" class="mt-4 px-4 py-2 bg-gray-300 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              <UButton type="submit" class="px-16 py-8 text-2xl font-bold absolute bottom-2 right-2">
                Submit
              </UButton>
            </form>
          </div>
          <homepage-small_nav />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="js">
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const data = {
  status: 200,
  code: 4953,
  body: {
    originalPara: "This si th best",
    fixedData: "This is the best",
  },
  errors: [
    {
      word: "si",
      suggestion: "is",
    },
    {
      word: "th",
      suggestion: "the",
    },
  ],
};

let showModal = ref(false);
let rawText = ref('');
let hoveredElementId = ref(null);
const currentSuggestion = ref('');
const currentErrorIndex = ref(-1);
const errorWordsSet = new Set(data.errors.map(error => error.word));

const showSuggestion = (index) => {
  const words = rawText.value.split(' ');
  if(index){
  const errorWord = words[index];
  const error = data.errors.find(e => e.word === errorWord);
  if (error) {
    console.log(1);
    currentSuggestion.value = error.suggestion;
    currentErrorIndex.value = index;
    showModal.value = true;
  }
}
};

const applySuggestion = () => {
  console.log(1);
  const words = rawText.value.split(' ');
  words[currentErrorIndex.value] = currentSuggestion.value;
  rawText.value = words.join(' ');
  showModal.value = false;
  updateContent();
};

const onInput = (event) => {
  rawText.value = event.target.innerText;
};

const highlightedText = computed(() => {
  return rawText.value.split(' ').map((word, index) => {
    if (errorWordsSet.has(word)) {
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



watch(rawText, () => {
  updateContent();
});
</script>

<style lang="">
</style>
