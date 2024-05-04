<template>
  <div class="ml-72">
    <UHorizontalNavigation
      :links="links"
      class="border-b border-[#c1b6fc] dark:border-[#5424b3] absolute top-0 mt-[-100px] w-1/2 bg-[#f4f3ff] rounded-[20px] flex flex-row justify-center items-center gap-[20px]"
    >
      <template #default="{ link }">
        <span class="text-[#753fea] relative text-xl p-2 ">{{ link.label }}</span>
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
}, {
  label: 'Paraphrase',
  icon: 'i-heroicons-arrow-path-rounded-square-solid',
}, {
  label: 'Plagiarism',
  icon: 'i-heroicons-document-check-16-solid',
}, {
  label: 'Text completion',
  icon: 'i-heroicons-paint-brush-20-solid',
}]

</script>
<style lang="">
</style>