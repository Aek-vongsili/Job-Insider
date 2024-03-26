import React, { useMemo, useState } from "react";
// Load React Quill dynamically on the client side
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import DOMPurify from "dompurify";
const TextEditor = () => {
  const [content, setContent] = useState("");
  const Quill = ReactQuill.Quill;
  var font = Quill.import("formats/font");
  font.whitelist = [
    "Saysettha_OT",
    "Phetsarath_OT",
    "Times-New-Roman",
    "Montserrat",
    "Lato",
    "Rubik",
  ];
  Quill.register(font, true);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ font: font.whitelist }],
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
      "font",
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
    <div>
      <ReactQuill
        value={content}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        style={{ height: "500px", marginBottom: "5rem" }}
      />
    </div>
  );
};

export default TextEditor;
