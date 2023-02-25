import {ref, onMounted} from 'vue';
import { GetPollById } from '../api';

export const getPollsClicked = ref(true)
export const createPollClicked = ref(false)
export const voteClicked = ref(false)
export const pollId = ref(null);
export const selectedOption = ref(null);

export const PollsTrue = () => {
    console.log('PollsTrue');
  getPollsClicked.value = true;
  createPollClicked.value = false;
  voteClicked.value = false;
}

export const CreatePollTrue = () => {
    console.log('CreatePollTrue');
  getPollsClicked.value = false;
  createPollClicked.value = true;
  voteClicked.value = false;
}

export const VoteTrue = (poll) => {
console.log('VoteTrue');
  getPollsClicked.value = false;
  createPollClicked.value = false;
  voteClicked.value = true;
  selectedOption.value = null;
  pollId.value = poll;
}