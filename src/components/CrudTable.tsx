 
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

interface Column {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select';
  options?: string[];
}

interface CrudTableProps {
  tableName: string;
  columns: Column[];
  data: any[];
  onRefresh: () => void;
}

const CrudTable: React.FC<CrudTableProps> = ({ tableName, columns, data, onRefresh }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>({});

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setEditingData(row);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from(tableName)
        .update(editingData)
        .eq('id', editingId);

      if (error) throw error;

      setEditingId(null);
      setEditingData({});
      onRefresh();
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Error updating record');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      onRefresh();
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Error deleting record');
    }
  };

  const handleChange = (key: string, value: string) => {
    setEditingData({ ...editingData, [key]: value });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                  {editingId === row.id ? (
                    column.type === 'select' ? (
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={editingData[column.key] || ''}
                        onChange={(e) => handleChange(column.key, e.target.value)}
                      >
                        {column.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={column.type}
                        className="border rounded px-2 py-1 w-full"
                        value={editingData[column.key] || ''}
                        onChange={(e) => handleChange(column.key, e.target.value)}
                      />
                    )
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editingId === row.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-900"
                    >
                      <FaSave className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(row)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;