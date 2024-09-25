'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface DescriptionEditorProps {
  fieldName: string;
  initialValue?: string;
  onDescriptionChange: (fieldName: string, content: string) => void;
  placeholder?: string;
}

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
  fieldName,
  initialValue = '',
  onDescriptionChange,
  placeholder = '',
}) => {
  const [description, setDescription] = useState(initialValue || '');

  useEffect(() => {
    setDescription(initialValue || '');
  }, [initialValue]);

  const handleChange = (content: string) => {
    setDescription(content);
    onDescriptionChange(fieldName, content); // Pass the content back to the parent form
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: '1' }, { header: '2' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'header',
    'list',
    'bullet',
    'link',
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={description}
      style={{ width: '100%' }}
      onChange={handleChange}
      placeholder={placeholder}
      className="text-white bg-gray-800 overflow-hidden job-description-editor text-wrap max-w-[537px]"
    />
  );
};

export default DescriptionEditor;
