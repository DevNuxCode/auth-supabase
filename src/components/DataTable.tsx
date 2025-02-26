import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';

interface Column {
  id: string;
  label: string;
  type: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onUpdate: (id: string, updatedData: any) => Promise<void>;
}

export default function DataTable({ columns, data, onUpdate }: DataTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<any>({});

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setEditedValues(row);
  };

  const handleSave = async () => {
    if (editingId) {
      await onUpdate(editingId, editedValues);
      setEditingId(null);
      setEditedValues({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValues({});
  };

  const handleChange = (column: string, value: any) => {
    setEditedValues((prev: any) => ({
      ...prev,
      [column]: value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {editingId === row.id ? (
                    <TextField
                      type={column.type}
                      value={editedValues[column.id] || ''}
                      onChange={(e) => handleChange(column.id, e.target.value)}
                      size="small"
                    />
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Box>
                  {editingId === row.id ? (
                    <>
                      <IconButton onClick={handleSave} color="primary">
                        <Save />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="error">
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEdit(row)} color="primary">
                      <Edit />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}