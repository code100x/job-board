'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const DescriptionEditor = ({
  fieldName,
  initialValue,
  onDescriptionChange,
  placeholder,
}) => {
  const [description, setDescription] = useState(initialValue || '');

  useEffect(() => {
    setDescription(initialValue || '');
  }, [initialValue]);

  const handleChange = (content) => {
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
      onChange={handleChange}
      placeholder={placeholder}
      className="text-white bg-gray-800 overflow-hidden job-description-editor"
    />
  );
};

export default DescriptionEditor;
