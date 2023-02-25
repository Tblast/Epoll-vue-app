<script setup>
import {ref, onMounted} from 'vue';
import {GetPollById} from '../api.js';
import { getPollsClicked, createPollClicked, voteClicked, PollsTrue, CreatePollTrue, VoteTrue, pollId, selectedOption } from './state.js';

console.log('vittu saatana',pollId.value);


onMounted(async () => {
  try{
    const response = await GetPollById(pollId.value.id);
    return response;
  } catch (error) {
    console.log(error);
  }
})

const submitVote = async () => {
  console.log('submitVote called');
  
  const selectedOptionIndex = parseInt(selectedOption.value)
  
  if (isNaN(selectedOptionIndex) || selectedOptionIndex < 0 || selectedOptionIndex >= pollId.value.options.length) {
    return console.log('Error try again only one option')
  }
  
  // Increment the vote count of the selected option
  pollId.value.options[selectedOptionIndex].votes++
  
  console.log(polls)

    // Reset the selectedOption to null
    selectedOption.value = null

    // Set the state to show the list of polls
    getPollsClicked.value = true;
    createPollClicked.value = false;
    voteClicked.value = false;
}

</script>

<template>
    <section class="box">
      <div class="box-info">
        <span class="question">{{pollId.title}}</span>
      </div>
      <div class="options">
          <label v-for="(option, index) in pollId.options" :key="option.id" :class="{ option: true, selected: selectedOption === index }" @click="selectedOption = index">
            <input type="radio" :value="index"> 
              <span>{{ option.title }}</span>
          </label>
          <button class="vote-button" @click="submitVote()">Vote</button>
      </div>
    </section>
</template>

<style>

</style>

<script>
    export default {
        name: 'Vote',
        props: {
            selectedPoll: {
                type: Object,
                required: true,
            },
    },
    setup(props) {
        poll.value = props.selectedPoll;
        return {
            poll,
            selectedOption,
            submitVote,
        };
    },
};
</script>