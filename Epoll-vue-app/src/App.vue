<script setup>
import {ref,computed} from 'vue'
import {GetPolls} from './api.js';
import Poll from './components/Poll.vue';
import CreatePoll from './components/CreatePoll.vue';
import Vote from './components/Vote.vue';
import { getPollsClicked, createPollClicked, voteClicked, PollsTrue, CreatePollTrue, VoteTrue, pollId, selectedOption } from './components/state.js';

GetPolls();

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

    <section v-if="getPollsClicked">
      <div id="app">
       <Poll :getPollsClicked="getPollsClicked"/>
      </div>
    </section>

    <section v-if="createPollClicked">
      <div id="app">
        <CreatePoll :createPollClicked="createPollClicked"/>
      </div>
    </section>

    <section v-if="voteClicked">
      <div id="app">
        <Vote :selectedPoll="selectedPoll" :voteClicked="voteClicked"/>
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