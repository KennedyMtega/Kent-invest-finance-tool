import React, { useState } from 'react';
import { FeedbackQuestion, FeedbackAnswer } from '../../types';
import { CloseIcon } from '../icons/Icons';
import Card from '../ui/Card';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: FeedbackQuestion[];
  onSubmit: (answers: FeedbackAnswer[]) => void;
}

const StarRating: React.FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => onChange(star)}
          className={`w-8 h-8 cursor-pointer ${value >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, questions, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  if (!isOpen) return null;

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const formattedAnswers: FeedbackAnswer[] = questions.map(q => ({
      questionId: q.id,
      questionText: q.text,
      answer: answers[q.id] || (q.type === 'rating' ? 0 : ''),
    }));
    onSubmit(formattedAnswers);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-ksdm-deep-blue">Share Your Feedback</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2 space-y-6 no-scrollbar">
          {questions.map(question => (
            <div key={question.id}>
              <label className="block text-md font-medium text-gray-700 mb-2">{question.text}</label>
              {question.type === 'rating' ? (
                <StarRating
                  value={(answers[question.id] as number) || 0}
                  onChange={value => handleAnswerChange(question.id, value)}
                />
              ) : (
                <textarea
                  value={(answers[question.id] as string) || ''}
                  onChange={e => handleAnswerChange(question.id, e.target.value)}
                  rows={3}
                  className="bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Your thoughts..."
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ksdm-deep-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit Feedback
          </button>
        </div>
      </Card>
    </div>
  );
};

export default FeedbackModal;