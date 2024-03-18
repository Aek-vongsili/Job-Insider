import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js

// Load React Quill dynamically on the client side
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import DOMPurify from "dompurify";
const TextEditor = () => {
  const [content, setContent] = useState("");

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ align: [] }],
        [{ color: [] }],
        [{ background: [] }],
        ["code-block"],
        ["clean"],
      ],
    }),
    []
  );

  const quillFormats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "link",
      "image",
      "align",
      "color",
      "code-block",
      "background",
    ],
    []
  );
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };
  const handleSubmit = () => {
    const sanitizedMessage = DOMPurify.sanitize(content);
    console.log(sanitizedMessage);
  };
  return (
    <div className="h-full w-[90vw]">
      <QuillEditor
        value={content}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        style={{ height: "300px" ,marginBottom:"5rem"}}
      />
     
    </div>
  );
};

export default TextEditor;
