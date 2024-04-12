import { defineStore } from 'pinia';

export const useScreen = defineStore('screen', () => {
 const screenMode = ref('light');
 const eyesMode = ref('close');
 const changeScreenMode = (value) => {
    screenMode.value = value;
    console.log(screenMode.value);
 };
const handleEyeMode = (value) => {
   eyesMode.value = value
   console.log(eyesMode.value);
}
 return { screenMode, eyesMode, changeScreenMode, handleEyeMode };
});