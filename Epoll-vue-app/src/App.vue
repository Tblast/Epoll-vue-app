<script setup>
import {ref,computed} from 'vue'
import {GetPolls} from './api.js';

GetPolls();

const pollListEx = ref([
  {
    title: 'Do you like ice cream?'
  },
  {
    title: 'Do you like videogames?'
  },
  {
    title: 'Do you like sports?'
  },
  {
    title: 'Do you like comic books?'
  }
])

const newPolls = ref([
  {
    id: 1,
    title: 'Do you like to live?',
    options: [
      {
        id: 1,
        title: 'yes',
        votes: 0,
      },
      {
        id: 2,
        title: 'no',
        votes: 0,
      },
      {
        id: 3,
        title: 'hell nah',
        votes: 0,
      },
    ]
    },
  {
    id: 2,
    title: 'Do you like to die?',
    options: [
      {
        id: 1,
        title: 'yes',
        votes: 0,
      },
      {
        id: 2,
        title: 'no',
        votes: 0,
      },
      {
        id: 3,
        title: 'hell nah',
        votes: 0,
      },
    ]
  }
])

// Reactive reference for the new poll title
const newPollTitle = ref('');

// Reactive reference for the new poll options
const newPollOptions = ref(['','']);

// Method to add a new poll
const addPoll = () => {
  if (newPollTitle.value.trim() !== '') {
    const options = newPollOptions.value.filter((option) => option.trim() !== '');

    if (options.length >=2) {
      newPolls.value.push({
        id: newPolls.value.length + 1,
        title: newPollTitle.value,
        options: options.map((option, index) => ({
          id: index + 1,
          title: option,
          votes: 0
        })),
      });

      newPollTitle.value = '';
      newPollOptions.value = ['',''];
    }
  }
}

const addOption = () => {
  newPollOptions.value.push('');
}

const getPollsClicked = ref(false)
const createPollClicked = ref(false)
const voteClicked = ref(false)

const PollsTrue = () => {
  getPollsClicked.value = true;
  createPollClicked.value = false;
  voteClicked.value = false;
}

const CreatePollTrue = () => {
  getPollsClicked.value = false;
  createPollClicked.value = true;
  voteClicked.value = false;
}

let pollId = ref(null);

let selectedOption = null;

const VoteTrue = (id) => {
  getPollsClicked.value = false;
  createPollClicked.value = false;
  voteClicked.value = true;
  selectedOption = null;

  pollId = id;
}

const submitVote = async () => {
  console.log('submitVote called');
  const selectedOptionIndex = parseInt(selectedOption)

  if (isNaN(selectedOptionIndex) || selectedOptionIndex < 0 || selectedOptionIndex >= pollId.options.length) {
    return console.log('Error try again only one option')
  }

  // Increment the vote count of the selected option
  pollId.options[selectedOptionIndex].votes++

  // Update the polls array with the new vote count
  newPolls.value = newPolls.value.map(poll => {
    if (poll.id === pollId.id) {
      return {
        ...poll,
        options: poll.options.map((option, index) => {
          if (index === selectedOptionIndex) {
            return {
              ...option,
              votes: option.votes + 1
            }
          }
          return option
        })
      }
    }
    return poll
  })

  console.log(newPolls.value)

    // Reset the selectedOption to null
    selectedOption = null

    // Set the state to show the list of polls
    getPollsClicked.value = true;
    createPollClicked.value = false;
    voteClicked.value = false;
}
</script>

<template>
  <main class="app">
    <h1>Epoll</h1>
    <tr>
      <td>
        <button
        @click="PollsTrue">
        Polls
        </button>
        <button
        @click="CreatePollTrue">
          Create
        </button>
        <button
        @click="VoteTrue">
          vote
        </button>
      </td>
    </tr>

    <section class="box" v-if="getPollsClicked">
      <div class="box-info">
        <span class="question">List of all the polls</span>
      </div>
      <div class="options">
        <a
          v-for = "(poll, index) in newPolls" 
          :key = "index"
          class = "option"
          @click = "VoteTrue(poll)"
          >
            <span>{{ poll.title }}</span>
        </a>
      </div>
    </section>

    <section class="box" v-if="createPollClicked">
      <div class="box-info">
        <span class="question">Create a new poll here</span>
      </div>
      <div class="options">
        <form @submit.prevent="addPoll">
          <label class="labeli">
            <input class="input" type="text" placeholder="Poll title" v-model="newPollTitle">
          </label>
          <div v-for="(option, index) in newPollOptions" :key="index">
            <label class="labeli">
              <input type="text" placeholder="Option" v-model="newPollOptions[index]">
            </label>
          </div> 
          <button type="button" @click="addOption">Add option</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>

    <section class="box" v-if="voteClicked">
      <div class="box-info">
        <span class="question">{{pollId.title}}</span>
      </div>
      <div class="options">
          <a v-for="(option, index) in pollId.options" :key="option.id" :class="{ option: true, selected: selectedOption === index }" @click="selectedOption = index">
              {{ option.title }}
          </a>
          <button class="vote-button" @click="submitVote">Vote</button>
      </div>
    </section>

  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {
  background-color: #271C36 ;
  color: #FFF;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

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

.box-info .score {
  color: #8f8f8f;
  font-size: 1.25em;
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
  background-color: rgb(25, 220, 11);
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

input {
  padding: 0.5rem 1rem;
  text-align: left;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;

  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}

.vote-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2cce7d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.vote-button:hover {
  background-color: #0a6f07;
}

.labeli {
  padding: 0.5rem 1rem;
  text-align: right;
}

button:disabled{
  opacity: 0.5;
}

h2{
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: #8f8f8f;
  font-size: 1.25rem;
  text-align: center;
}

</style>
