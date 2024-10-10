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

  // @ts-ignore
  const handleChange = (content: string, _delta, _source, editor) => {
    setDescription(content);
    onDescriptionChange(fieldName, editor.getText());
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
    <div data-text-editor={fieldName}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={description}
        style={{ width: '100%' }}
        onChange={handleChange}
        placeholder={placeholder}
        bounds={`[data-text-editor="${fieldName}"]`}
        className="text-white bg-gray-800  job-description-editor text-wrap max-w-[537px]"
      />
    </div>
  );
};

export default DescriptionEditor;
