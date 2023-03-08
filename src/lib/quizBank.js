import IMAGES from "../components/img/icons/images";

// For debugging purpose
// const DUMMY_QUIZZES = [
//   {
//     question: "What year was Queen Elizabeth II born?",
//     correct_answer: "1926",
//     incorrect_answers: ["1923", "1929", "1930"],
//   },
//   {
//     question: "Which one of these is not a typical European sword design?",
//     correct_answer: "Scimitar",
//     incorrect_answers: ["Falchion", "Ulfberht", "Flamberge"],
//   },
//   {
//     question:
//       "Which of the following languages does NOT use gender as a part of its grammar?",
//     correct_answer: "Turkish",
//     incorrect_answers: ["German", "Danish", "Polish"],
//   },
//   {
//     question: "How many furlongs are there in a mile?",
//     correct_answer: "Eight",
//     incorrect_answers: ["Two", "Four", "Six"],
//   },
//   {
//     question: "Which of the following is not an Ivy League University?",
//     correct_answer: "Stanford",
//     incorrect_answers: ["University of Pennsylvania", "Harvard", "Princeton"],
//   },
// ];

// export const quizBank = DUMMY_QUIZZES.map((quiz) => {
//   const options = [...quiz.incorrect_answers, quiz.correct_answer];
//   return {
//     question: quiz.question,
//     options: options.sort(() => Math.random() - 0.5),
//     correctAnswer: quiz.correct_answer,
//   };
// });

export const quizCategories = [
  {
    id: 9,
    name: "General Knowledge",
    desc: `Knowledge sharpens our skills like reasoning and problem-solving.`,
    img: {
      url: IMAGES.generalKnowledge.url,
      alt: IMAGES.generalKnowledge.alt,
    },
  },

  {
    id: 17,
    name: "Science & Nature",
    desc: `To develop new technologies, solve practical problems, and make informed decisions.`,
    img: { url: IMAGES.scienceNature.url, alt: IMAGES.scienceNature.alt },
  },
  {
    id: 23,
    name: "History",
    desc: `History helps us develop a better understanding of the world.`,
    img: { url: IMAGES.history.url, alt: IMAGES.history.alt },
  },
  {
    id: 27,
    name: "Animals",
    desc: `Improving confidence and learning about unconditional love.`,
    img: { url: IMAGES.animal.url, alt: IMAGES.animal.alt },
  },
];
