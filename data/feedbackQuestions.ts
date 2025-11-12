import { FeedbackQuestion } from '../types';

export const feedbackQuestionPool: FeedbackQuestion[] = [
  {
    id: 'q1',
    text: 'How would you rate the overall design and user interface of the app?',
    type: 'rating',
  },
  {
    id: 'q2',
    text: 'How easy was it to navigate and find the features you were looking for?',
    type: 'rating',
  },
  {
    id: 'q3',
    text: 'Is there any feature you wish the app had?',
    type: 'text',
  },
  {
    id: 'q4',
    text: 'How clear is the presentation of your financial information (balance, portfolio)?',
    type: 'rating',
  },
  {
    id: 'q5',
    text: 'What did you like most about using the KSDM Bank app?',
    type: 'text',
  },
  {
    id: 'q6',
    text: 'What was the most confusing or difficult part of using the app?',
    type: 'text',
  },
  {
    id: 'q7',
    text: 'How satisfied are you with the performance and loading speed of the app?',
    type: 'rating',
  },
  {
    id: 'q8',
    text: 'How likely are you to recommend this app to a friend or colleague?',
    type: 'rating',
  },
  {
    id: 'q9',
    text: 'Do you have any other suggestions for improvement?',
    type: 'text',
  },
  {
    id: 'q10',
    text: 'Was the currency toggle feature (TZS/USD) useful and easy to use?',
    type: 'rating'
  }
];