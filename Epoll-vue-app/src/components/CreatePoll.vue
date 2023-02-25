<script setup>
import {ref} from 'vue';
import {newPolls} from './polls.js';

// Reactive reference for the new poll title
const newPollTitle = ref('');

// Reactive reference for the new poll options
const newPollOptions = ref(['','']);

const addOption = () => {
  console.log('addOption activated')
  const updatedOptions = [...newPollOptions.value, ''];
  newPollOptions.value = updatedOptions;
}

// Method to add a new poll
const addPoll = () => {
  console.log('addPoll activated');
        newPolls.push({
          id: newPolls.length + 1,
          title: newPollTitle.value,
          options: newPollOptions.value.map((option, index) => ({
            id: index + 1,
            title: option,
            votes: 0
          })),
        });
      newPollTitle.value = '';
      newPollOptions.value = ['',''];
  }

</script>

<template>
    <section class="box">
        <div class="box-info">
          <span class="question">Create a new poll here</span>
        </div>
        <div class="options">
            <label>
              <input class="input" type="text" placeholder="Poll title" v-model="newPollTitle">
            </label>
            <div v-for="(option, index) in newPollOptions" :key="index">
              <label>
                <input type="text" placeholder="Option" v-model="newPollOptions[index]">
              </label>
            </div> 
            <button type="button" @click="addOption()">Add option</button>
            <button type="submit" @click="addPoll(), PollsTrue">Submit</button>          
        </div>
      </section>
</template>

<style>
    .box {
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  border-radius: 0.5rem;
}

.box-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.box-info .question {
  color: #8f8f8f;
  font-size: 1.25rem;
  align-items: center;
}

.options {
  margin-bottom: 2rem;
  text-align: center;
  flex-direction: column;
  display: flex;
}

.option{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #271C36;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 50px;
  padding: 0 20px;
  margin-bottom: 10px;
  cursor: pointer;
}

.option:hover {
  background-color: #2d213f;
}

.option.selected {
  background-color: #25D366;
}

.option.correct{
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type{
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display:none;
}

.labeli {
  padding: 0.5rem 1rem;
  text-align: right;
}
</style>

<script>
    export default {
        name: 'CreatePoll',
        setup() {
            return {
                newPollTitle,
                newPollOptions,
                addOption,
                addPoll
            };
        },
    };
</script>