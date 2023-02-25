import axios from 'axios';


export const GetPolls = async () => {
    try {
      const response = await axios.get('http://localhost:9000/polls');
      console.log(response.data);
      return response.data.polls;
    } catch (error) {
      console.log(error);
    }
}

export const GetPollById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/polls/${id}`);
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const CreatePoll = async () => {
    try {
      const response = await axios.post('http://localhost:9000/polls/add', newPoll);
      console.log(response.data);
      return response.data.poll;
    } catch (error) {
      console.log(error);
    }
}

export const VoteOption = async (id, option) => {
    try {
      const response = await axios.post(`http://localhost:9000/polls/${id}/vote/${option}`);
      console.log(response.data);
      return response.data.poll;
    } catch (error) {
      console.log(error);
    }
}