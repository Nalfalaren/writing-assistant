<template>
  <div class="w-full h-screen bg-[#0A2FB6]">
    <h1 class="text-3xl text-[#0A2FB6] font-bold p-8">Correctly</h1>
    <UContainer
      :ui="{ constrained: 'max-w-7xl' }"
      class="flex flex-row gap-[40px] justify-between items-center"
    >
      <UCard class="py-8">
        <div><h1 class="text-4xl font-semibold">Login with Correctly</h1></div>
        <div class="pt-4">
          <p class="text-[#8E8E8E]">
            Collaborate with an AI writing companion that assists you in
            discovering the right language—whether it's for composing a
            challenging email, expressing your ideas effectively, or ensuring
            productivity in your tasks.
          </p>
        </div>
        <div>
          <!-- <UForm class="space-y-4 mt-8" @submit="$router.push('/home')">
            <UFormGroup label="Username" name="user_name" size="xl">
              <UInput
                placeholder="Type the username here..."
                size="xl"
                v-model="userInfo.userInfo.userName"
              ></UInput>
            </UFormGroup>
            <UFormGroup label="Password" name="password" size="xl">
              <UInput
                placeholder="Type the password here..."
                size="xl"
                v-model="userInfo.userInfo.password"
              />
              <UIcon
                name="i-heroicons-eye"
                class="absolute top-3 right-2"
              ></UIcon>
            </UFormGroup>
            <div
              class="flex flex-row justify-between items-center text-[#8E8E8E]"
            >
              <UCheckbox name="remember_me" label="Remember me"></UCheckbox>
              <ULink>Forget password ?</ULink>
            </div>
            <UButton
              class="bg-[#0A2FB6] py-4 text-xl w-full flex justify-center hover:bg-blue-500"
              type="submit"
              @click="loading"
              >Login</UButton
            >
          
          </UForm> -->
          <UButton
              class="bg-[#0A2FB6] py-4 text-xl w-full flex justify-center bg-white text-[#8E8E8E] hover:text-white border border-2 border-solid border-[#8E8E8E] hover:bg-blue-600 my-8"
              >
              <div class="w-[30px] h-[30px]"><NuxtImg src="../public/google.png" class="w-full h-full object-cover"></NuxtImg></div>
              <a :href="googleLoginUrl">Login by Google</a>
              </UButton
            >
          <hr class="mb-4" />
          <!-- <div class="flex flex-row items-center gap-[5px] justify-center">
            <p class="text-[#8E8E8E]">Don't have account?</p>
            <ULink to="/sign-up">Register</ULink>
          </div> -->
          
        </div>
      </UCard>
      <div class="w-full h-full relative xl:block hidden">
        <div>
          <nuxt-img
            src="/login_img.png"
            class="w-full h-full object-cover"
          ></nuxt-img>
        </div>
      </div>
    </UContainer>
  </div>
</template>
<script setup lang="js">
import { userStore } from '~/store/userStore';
import getConfigObject from '~/env/config';
useSeoMeta({
  title: 'Login page',
  description: 'This is the login page of Correctly',
  ogTitle: 'Login page',
  ogDescription: 'This is the login page of Correctly'
})

// const data = {
//   root: 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount',
//   client_id: getConfigObject('PRO').CLIENT_ID,
//   url: getConfigObject('PRO').REDIRECT_URI,
//   status: getConfigObject('PRO').ACCESS_TYPE,
//   respond_type: getConfigObject('PRO').RESPONSE_TYPE,
//   scope: getConfigObject('PRO').SCOPE,
//   prompts: getConfigObject('PRO').PROMPT,
//   service: getConfigObject('PRO').SERVICE,
//   o2v: getConfigObject('PRO').O2V,
//   theme: getConfigObject('PRO').THEME,
//   ddm: getConfigObject('PRO').DDM,
//   authFlow: getConfigObject('PRO').FLOWNAME,
// }
// const googleLoginUrl = `${data.root}?client_id=${data.client_id}&response_type=${data.respond_type}&access_type=${encodeURIComponent(data.status)}&redirect_uri=${encodeURIComponent(data.url)}&prompt=${encodeURIComponent(data.prompts)}&scope=${encodeURIComponent(data.scope)}&service=${data.service}&o2v=${data.o2v}&theme=${data.theme}&ddm=${data.o2v}&flowName=${data.authFlow}`;

const params = {
        client_id: '405525693953-aa8k0fp1bpb6h8he2hts4bcf6r7tndec.apps.googleusercontent.com',
        response_type: 'code',
        access_type: 'offline',
        redirect_uri: 'https://writing-assistant-app.onrender.com/api/auth/oauth/sign-in',
        prompt: "consent",
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' ')
    }

    const searchParams = new URLSearchParams(params);
    const root = 'https://accounts.google.com/o/oauth2/v2/auth';
    const googleLoginUrl = `${root}?${searchParams.toString()}`
    

</script>
