<script setup>
import {ref, onMounted} from 'vue';
import {GetPolls} from '../api.js';
import { getPollsClicked, createPollClicked, voteClicked, PollsTrue, CreatePollTrue, VoteTrue, pollId, selectedOption } from './state.js';

const polls = ref([]);

onMounted(async () => {
  try{
    const response = await GetPolls();
    polls.value = response;
  } catch (error) {
    console.log(error);
  }
})

console.log('pollssi', polls)
</script>

<template>
    <section class="box" v-if="getPollsClicked">
        <div class="box-info">
          <span class="question">List of all the polls</span>
        </div>
        <div class="options">
          <a
            v-for = "(poll, index) in polls" 
            :key = "index"
            class = "option"
            @click = "VoteTrue(poll)"
            >
              <span>{{ poll.title }}</span>
          </a>
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
</style>
  
<script>
export default {
  name: 'Poll',
  setup() {
    return {
      polls
    };
  },
  props: {
    pollId: {
      type: Number,
      required: true
    },
    selectedOption: {
      type: Number,
      default: null
    },
    submitVote: {
      type: Function,
      required: true
    }
  }
};
</script>