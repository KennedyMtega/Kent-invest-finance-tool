import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { CloseIcon } from '../icons/Icons';
import { BasicNeedItem } from '../../types';

type GoalFormData = Omit<BasicNeedItem, 'id' | 'value'>;

interface ManageBasicNeedGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
  initialData?: BasicNeedItem | null;
}

const ManageBasicNeedGoalModal: React.FC<ManageBasicNeedGoalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<GoalFormData>({
    name: '',
    description: '',
    goal: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        goal: initialData.goal,
      });
    } else {
      setFormData({ name: '', description: '', goal: 0 });
    }
  }, [initialData, isOpen]);
  
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: name === 'goal' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if(formData.name.trim() === '' || formData.goal <= 0) {
        alert('Please provide a valid name and a goal amount greater than zero.');
        return;
    }
    onSubmit(formData);
  };
  
  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <Card className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-ksdm-deep-blue">{isEditing ? 'Edit Goal' : 'Add New Goal'}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Goal Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
             <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Target Amount</label>
                <input type="number" id="goal" name="goal" value={formData.goal} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="mt-6 text-right">
                <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ksdm-deep-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    {isEditing ? 'Save Changes' : 'Create Goal'}
                </button>
            </div>
        </form>
      </Card>
    </div>
  );
};

export default ManageBasicNeedGoalModal;
