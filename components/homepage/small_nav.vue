<template>
  <div class="ml-72">
    <UHorizontalNavigation
      :links="links"
      class="border-b border-[#c1b6fc] dark:border-[#5424b3] absolute top-0 mt-[-100px] w-1/2 bg-[#f4f3ff] rounded-[20px] flex flex-row justify-center items-center gap-[20px]"
    >
      <template #default="{ link }">
        <div class="relative group">
          <span class="text-[#753fea] relative text-xl p-2 cursor-pointer">{{ link.label }}</span>
          <div v-if="link.submenu" class="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
            <a 
              v-for="sublink in link.submenu" 
              :key="sublink.label" 
              :href="sublink.to" 
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {{ sublink.label }}
            </a>
          </div>
        </div>
      </template>
      <template #icon="{ link }">
        <UIcon :name="link.icon" class="text-[#753fea] relative text-xl p-2 ">{{ link.icon }}</UIcon>
      </template>
    </UHorizontalNavigation>
  </div>
</template>


<script setup lang="js">
const route = useRoute();
const id = route.params.id;
console.log(route.params.id);
const links = [{
  label: 'Grammar',
  icon: 'i-heroicons-sparkles-solid',
}, {
  label: 'Paraphrase',
  icon: 'i-heroicons-arrow-path-rounded-square-solid',
  submenu: [
    { label: 'Expand', to: `/home/${id}/paraphrase/expand` },
    { label: 'Shorten', to: `/home/${id}/paraphrase/shorten` },
  ]
}, {
  label: 'Plagiarism',
  icon: 'i-heroicons-document-check-16-solid',
}, {
  label: 'Text completion',
  icon: 'i-heroicons-paint-brush-20-solid',
  submenu: [
    { label: 'Paragraph', to: `/home/${id}/text-completion/paragraph` },
    { label: 'Sentence', to: `/home/${id}/text-completion/sentence` },
  ]
}]
</script>

<style lang="">
</style>