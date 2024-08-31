import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const JobDescriptionEditor = () => {
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
    <div className="bg-gray-900 p-4  rounded mx-auto w-[37rem]">
      <h2 className="text-sm font-semibold  text-white">Job description</h2>
      <div className="bg-gray-800 rounded-xl mt-2 overflow-hidden">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Tell us about your job"
          className="text-white bg-gray-800 overflow-hidden job-description-editor"
        />
      </div>
    </div>
  );
};

export default JobDescriptionEditor;
