import { defineStore } from 'pinia';

export const useScreen = defineStore('screen', () => {
 const screenMode = ref('light');
 const changeScreenMode = (value) => {
    screenMode.value = value;
    console.log(screenMode.value);
 };

 return { screenMode, changeScreenMode };
});