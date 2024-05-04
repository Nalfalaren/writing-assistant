import { defineStore } from 'pinia';

export const useScreen = defineStore('screen', () => {
 const screenMode = ref('light');
 const eyesMode = ref('close');
 const isClicked = ref('');
 const isToggle = ref(true);
 const changeScreenMode = (value) => {
    screenMode.value = value;
    console.log(screenMode.value);
 };
const handleEyeMode = (value) => {
   eyesMode.value = value
   console.log(eyesMode.value);
}

const handleComponent = (data) => {
   isClicked.value = data;
   console.log(isClicked.value);
}

const handleToggle = () => {
   isToggle.value = !isToggle.value;
}
 return { screenMode, eyesMode, changeScreenMode, handleEyeMode, isClicked, handleComponent, isToggle, handleToggle };
});