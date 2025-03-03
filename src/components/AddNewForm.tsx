import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Column {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select';
  options?: string[];
}

interface AddNewFormProps {
  tableName: string;
  columns: Column[];
  onSuccess: () => void;
}

const AddNewForm: React.FC<AddNewFormProps> = ({ tableName, columns, onSuccess }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from(tableName)
        .insert([formData]);

      if (error) throw error;

      setFormData({});
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Error adding record:', error);
      alert('Error adding record');
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Add New
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Record</h2>
            <form onSubmit={handleSubmit}>
              {columns.map((column) => (
                <div key={column.key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {column.label}
                  </label>
                  {column.type === 'select' ? (
                    <select
                      className="w-full border rounded-md px-3 py-2"
                      value={formData[column.key] || ''}
                      onChange={(e) => handleChange(column.key, e.target.value)}
                      required
                    >
                      <option value="">Select {column.label}</option>
                      {column.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={column.type}
                      className="w-full border rounded-md px-3 py-2"
                      value={formData[column.key] || ''}
                      onChange={(e) => handleChange(column.key, e.target.value)}
                      required
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewForm;