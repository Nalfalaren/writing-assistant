<template lang="">
    <div class="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-[30%] flex flex-col">
        <UContainer>
          <h1 class="text-3xl font-bold mb-[20px] text-[#753fea]">Dashboard</h1>
                <div v-for="(history, index) in paginatedHistory" :key="index" class="mb-[20px]">
                    <UCard class="w-[1500px] flex-1" @click="() => handleDetail(index)">
                        <div class="mb-[5px] flex flex-row"><h1 class="text-xl"><span class="font-bold">Type:</span> {{ history.type }}</h1></div>
                        <div class="mb-[5px]"><h1 :class="click[index] === false ? 'truncate' : ''" class="text-xl"><span class="font-bold">Input text :</span> {{history.inputText}}</h1></div>
                        <div class="mb-[5px]"><h1 :class="click[index] === false ? 'truncate' : ''" class="text-xl"><span class="font-bold">Output text:</span> {{history.outputText}}</h1></div>
                        <div><h1 class="truncate text-xl"><span class="font-bold">Updated at:</span> {{formatDate(history.updatedAt)}}</h1></div>
                        <!-- <div class="ml-[90%]"><h1 class="text-[#753fea] hover:font-bold">More details...</h1></div> -->
                    </UCard>
                </div>
                <UPagination
      :max="5"
      :page-count="5"
      :total="userHistory.length"
      v-model="currentPage"
    />
        </UContainer>
    </div>
</template>
<script setup lang="js">
const isLoading = ref('loading');
const userHistory = ref([]);
const model_value = ref(1);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const click = ref([]);
const updatedAt = ref('');
const handleDetail = (index) => {
  click.value[index] = !click.value[index];
}

const handleSubmit = async () => {
  try {
    userHistory.value = await getHistory();
    if (userHistory.value) {
      isLoading.value = 'success';
       click.value = Array(history.length).fill(false);
    } 
  } catch (error) {
    console.log(error);
  } finally {
    if (isLoading.value !== 'success') {
      isLoading.value = 'pending';
    }
  }
};

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return userHistory.value.slice(start, end);
});

const pageCount = computed(() => {
  return Math.ceil(userHistory.value.length / itemsPerPage.value);
});

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

updatedAt.value = formatDate();


handleSubmit();


</script>
<style lang="">
</style>