import axios from 'axios';

export const GetPolls = () => {
    axios.get('https://localhost:44377/api/Polls')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
}

export const PostPolls = () => {
    axios.post('https://localhost:44377/api/Polls/add')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
}
