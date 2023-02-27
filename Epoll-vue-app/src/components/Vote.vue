<script setup>
import {ref, onMounted} from 'vue';
import {GetPollById, VoteOption} from '../api.js';
import { getPollsClicked, createPollClicked, voteClicked, PollsTrue, CreatePollTrue, VoteTrue, pollId, selectedOption } from './state.js';

console.log('pollId sisältö',pollId.value);

const poll =ref();

onMounted(async () => {
  try{
    const response = await GetPollById(pollId.value.id);
    poll.value = response;
  } catch (error) {
    console.log(error);
  }
})

const submitVote = async (optionIndex) => {
  console.log('submitVote called with param', optionIndex);
  
  const selectedOptionIndex = parseInt(selectedOption.value)
  
  if (isNaN(selectedOptionIndex) || selectedOptionIndex < 0 || selectedOptionIndex >= poll.value.options.length) {
    return console.log('Error try again only one option')
  }
  console.log('poll id before api call', poll.value.id)
  console.log('option id before api call', poll.value.options[optionIndex].id)

  try{
    const response = await VoteOption(poll.value.id, poll.value.options[optionIndex].id);
    poll.value.options[selectedOptionIndex].votes++;
    return response;
  } catch (error) {
    console.log(error);
  }

    // Reset the selectedOption to null
    selectedOption.value = null

    // Set the state to show the list of polls
    getPollsClicked.value = true;
    createPollClicked.value = false;
    voteClicked.value = false;
}

</script>

<template>
    <section class="box" v-if="poll">
      <div class="box-info">
        <span class="question">{{poll.title}}</span>
      </div>
      <div class="options">
          <label v-for="(option, index) in poll.options" :key="option.id" :class="{ option: true, selected: selectedOption === index }" @click="selectedOption = index">
            <input type="radio" :value="index"> 
              <span>{{ option.title }}</span>
          </label>
          <button class="vote-button" @click="submitVote(selectedOption)">Vote</button>
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