import React, { useState, useEffect, useMemo } from 'react';
import { FeedbackSubmission, FeedbackAnswer } from '../../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

type SortKey = 'date' | 'question' | 'rating';
type SortDirection = 'asc' | 'desc';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [feedback, setFeedback] = useState<FeedbackSubmission[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'date', direction: 'desc' });

  useEffect(() => {
    const storedFeedback = localStorage.getItem('ksdmBankFeedback');
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  const flattenedData = useMemo(() => {
    return feedback.flatMap(submission => 
      submission.answers.map(answer => ({
        submissionId: submission.id,
        date: submission.date,
        question: answer.questionText,
        answer: answer.answer,
        isRating: typeof answer.answer === 'number',
      }))
    );
  }, [feedback]);

  const sortedData = useMemo(() => {
    let sortableItems = [...flattenedData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'rating') {
            aValue = a.isRating ? a.answer : -1;
            bValue = b.isRating ? b.answer : -1;
        } else if (sortConfig.key === 'question') {
            aValue = a.question;
            bValue = b.question;
        } else { // date
            aValue = new Date(a.date).getTime();
            bValue = new Date(b.date).getTime();
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [flattenedData, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Feedback Dashboard</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-ksdm-deep-blue rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('date')}
              >
                Date{getSortIndicator('date')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('question')}
              >
                Question{getSortIndicator('question')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('rating')}
              >
                Rating / Answer{getSortIndicator('rating')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={`${item.submissionId}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-800 font-medium">
                  {item.question}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">
                  {item.isRating ? (
                    <span className="text-yellow-500">{'★'.repeat(item.answer as number)}{'☆'.repeat(5 - (item.answer as number))}</span>
                  ) : (
                    item.answer
                  )}
                </td>
              </tr>
            ))}
             {sortedData.length === 0 && (
                <tr>
                    <td colSpan={3} className="text-center py-10 text-gray-500">No feedback submissions yet.</td>
                </tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;