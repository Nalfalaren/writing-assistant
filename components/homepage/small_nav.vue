<template>
  <div class="">
    <UHorizontalNavigation
      :links="links"
      class="border-b border-[#c1b6fc] absolute top-[10%] left-[30%] dark:border-[#5424b3] bg-[#f4f3ff] rounded-[20px] flex flex-row justify-center items-center gap-[20px]"
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
const links = [{
  label: 'Grammar',
  icon: 'i-heroicons-sparkles-solid',
  to: `/home/grammar`
}, {
  label: 'Paraphrase',
  icon: 'i-heroicons-arrow-path-rounded-square-solid',
  submenu: [
    { label: 'Expand text', to: `/home/paraphrase/expand` },
    { label: 'Shorten text', to: `/home/paraphrase/shorten` },
  ]
}, {
  label: 'Plagiarism',
  icon: 'i-heroicons-document-check-16-solid',
  to: '/home/plagiarism'
}, {
  label: 'Text completion',
  icon: 'i-heroicons-paint-brush-20-solid',
  to: '/home/text-completion'
},]
</script>

<style lang="">
</style>