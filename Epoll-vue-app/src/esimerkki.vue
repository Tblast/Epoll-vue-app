<script setup>

const questions = ref([
  {
    question: 'what is VUE JS?',
    answer: 0,
    options: [
      'A front end framework',
      'A library',
      'An ice cream maker'
    ],
    selected: null
  },
  {
    question: 'what is Vuex?',
    answer: 2,
    options: [
      'Vue with an x',
      'A cheese selection',
      'A state management library'
    ],
    selected: null
  },
  {
    question: 'what is Vue Router used for?',
    answer: 1,
    options: [
      'Walking in space',
      'A routing library for VUE JS',
      'Burger sauce',
      'Quizzez'
    ],
    selected: null
  }
])

const quizCompleted = ref(false)
const currentQuestion = ref(0)
const score = computed(() => {
  let value = 0
  questions.value.map(q => {
    if (q.selected == q.answer){
      value++
    }
  })
  return value
})

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const SetAnswer = evt => {
  questions.value[currentQuestion.value].selected = evt.target.value
  evt.target.value = null
}

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
  } else {
    quizCompleted.value = true
  }
}
</script>

<template>
    <main class="app">
      <h1>Epoll</h1>
      <tr>
        <td>
          <button>Polls</button>
          <button>Create</button>
          <button>vote</button>
        </td>
      </tr>
      <section class="poll" v-if="!quizCompleted">
        <div class="poll-info">
          <span class="question">{{ getCurrentQuestion.question }}</span>
          <span class="score">Score {{ score }} / {{ questions.length }}</span>
        </div>
        <div class="options">
          <label 
            v-for="(option, index) in getCurrentQuestion.options" 
            :key="index"
            :class="`option ${
              getCurrentQuestion.selected == index 
                ? index == getCurrentQuestion.answer
                  ? 'correct'
                  : 'wrong'
                : ''
            } ${
                getCurrentQuestion.selected != null && 
                index != getCurrentQuestion.selected
                  ? 'disabled'
                  : ''
            }`">
            <input 
              type="radio" 
              :name="getCurrentQuestion.index" 
              :value="index"
              v-model="getCurrentQuestion.selected"
              :disabled="getCurrentQuestion.selected"
              @change="SetAnswer">
              <span>{{ option }}</span>
          </label>
        </div>
        <button
          @click="NextQuestion"
          :disabled="!getCurrentQuestion.selected">
          {{ 
              getCurrentQuestion.index == questions.length -1
                  ? 'Finish'
                  : getCurrentQuestion.selected == null
                      ? 'Select an option'
                      : 'Next question'
          }}
        </button>
      </section>
  
      <section v-else>
          <h2>You have finished the quiz!</h2>
          <p>Your score is {{ score }} / {{ questions.length }}</p>
      </section>
      <section>
        <h1>Create a new poll</h1>
      </section>
    </main>
  </template>