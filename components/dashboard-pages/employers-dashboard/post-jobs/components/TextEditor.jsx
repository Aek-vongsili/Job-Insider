import React, { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const TextEditor = forwardRef(({
  value = "",
  onChange,
  onBlur,
  placeholder = "Start typing...",
  height = "500px",
  readOnly = false,
  theme = "snow",
  className = "",
  style = {},
  sanitizeOnChange = true,
  customModules = {},
  customFormats = [],
  name,
  required = false,
  error = "",
  label = "",
  deleteImageFromFirebase,
  onImageUpload, // Add this prop for custom image upload function
  ...props
}, ref) => {
  const [content, setContent] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const quillRef = useRef(null);
  // Setup custom fonts
  const Quill = ReactQuill.Quill;
  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "Saysettha_OT",
    "Phetsarath_OT",
    "Times-New-Roman",
    "Montserrat",
    "Lato",
    "Rubik",
  ];
  Quill.register(Font, true);

  // Custom image handler
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        if (file) {
          try {
            // Show loading state (optional)
            const range = quillRef.current.getEditor().getSelection(true);
            quillRef.current.getEditor().insertText(range.index, 'Uploading image...', 'user');

            const imageUrl = await onImageUpload(file);

            // Remove the loading text and insert the image
            quillRef.current.getEditor().deleteText(range.index, 'Uploading image...'.length);
            quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
            quillRef.current.getEditor().setSelection(range.index + 1);

          } catch (error) {
            console.error('Image upload failed:', error);
            // Remove loading text on error
            const range = quillRef.current.getEditor().getSelection(true);
            quillRef.current.getEditor().deleteText(range.index, 'Uploading image...'.length);
            // Optionally show error message
            alert('Image upload failed. Please try again.');
          }
        }
      }

    };
  }, []);


  // Improved useEffect with better image tracking
  useEffect(() => {
    if (!deleteImageFromFirebase) return;

    const initializeImageTracking = () => {
      // Check if quillRef.current exists before calling getEditor()
      if (!quillRef.current) return;

      let quill;
      try {
        quill = quillRef.current.getEditor();
      } catch (error) {
        console.warn('Editor not ready yet, retrying...', error);
        // Retry after a short delay
        setTimeout(initializeImageTracking, 100);
        return;
      }

      if (!quill) return;

      // Store previous content to compare
      let previousImages = new Set();

      // Get initial images
      const initialContent = quill.getContents();
      if (initialContent.ops) {
        initialContent.ops.forEach(op => {
          if (op.insert && op.insert.image) {
            previousImages.add(op.insert.image);
          }
        });
      }

      const handleTextChange = async (delta, oldDelta, source) => {
        // Only process user changes, not programmatic ones
        if (source !== 'user') return;

        // Get current images
        const currentImages = new Set();
        const currentContent = quill.getContents();

        if (currentContent.ops) {
          currentContent.ops.forEach(op => {
            if (op.insert && op.insert.image) {
              currentImages.add(op.insert.image);
            }
          });
        }

        // Find deleted images
        const deletedImages = [...previousImages].filter(url => !currentImages.has(url));

        // Delete from Firebase
        if (deletedImages.length > 0) {

          // Delete images from Firebase (don't wait for all to complete)
          deletedImages.forEach(imageUrl => {
            deleteImageFromFirebase(imageUrl).catch(error => {
              console.error('Failed to delete image:', imageUrl, error);
            });
          });
        }

        // Update previous images for next comparison
        previousImages = new Set(currentImages);
      };

      quill.on('text-change', handleTextChange);

      // Return cleanup function
      return () => {
        quill.off('text-change', handleTextChange);
      };
    };

    // Start initialization
    const cleanup = initializeImageTracking();

    // Cleanup on unmount
    return cleanup;
  }, [deleteImageFromFirebase]);
  // Optional: Function to clean up all images when component unmounts or content is discarded
  const cleanupContentImages = async (content) => {
    if (!content || !content.ops) return;

    const imagesToDelete = content.ops
      .filter(op => op.insert && op.insert.image)
      .map(op => op.insert.image);

    if (imagesToDelete.length > 0) {

      const deletePromises = imagesToDelete.map(imageUrl =>
        deleteImageFromFirebase(imageUrl)
      );

      try {
        await Promise.allSettled(deletePromises);
      } catch (error) {
        console.error('Error during content image cleanup:', error);
      }
    }
  };
  const getCurrentContent = () => {
    try {
      return quillRef.current?.getEditor()?.getContents();
    } catch (error) {
      console.error('Error getting current content:', error);
      return null;
    }
  };

  // Get editor instance
  const getEditor = () => {
    try {
      return quillRef.current?.getEditor();
    } catch (error) {
      console.error('Error getting editor:', error);
      return null;
    }
  };

  // Clear editor with cleanup
  const clearEditor = async () => {
    try {
      const content = getCurrentContent();
      if (content) {
        await cleanupContentImages(content);
      }
      const editor = getEditor();
      if (editor) {
        editor.setText('');
      }
    } catch (error) {
      console.error('Error clearing editor:', error);
    }
  };

  // Expose functions to parent component via ref
  useImperativeHandle(ref, () => ({
    // Cleanup functions
    cleanupContentImages,
    clearEditor,

    // Content functions
    getCurrentContent,
    getEditor,

    // Utility functions
    setText: (text) => {
      const editor = getEditor();
      if (editor) editor.setText(text);
    },

    setContents: async (contents) => {
      // Clean up current content first
      const currentContent = getCurrentContent();
      if (currentContent) {
        await cleanupContentImages(currentContent);
      }

      const editor = getEditor();
      if (editor) editor.setContents(contents);
    },

    focus: () => {
      const editor = getEditor();
      if (editor) editor.focus();
    }
  }));

  // Default image upload function (implement based on your backend)
  const defaultImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url; // Assuming your API returns { url: "uploaded-image-url" }
  };



  // Default toolbar configuration with custom image handler
  const defaultModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          // [{ font: Font.whitelist }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },

      },
      ...customModules,
    }),
    [customModules, onImageUpload]
  );

  const defaultFormats = useMemo(
    () => [
      "header",
      "font",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "align",
      "color",
      "background",
      "blockquote",
      "code-block",
      "link",
      "image",
      ...customFormats,
    ],
    [customFormats]
  );

  // Sync with external value changes
  useEffect(() => {
    if (value !== content) {
      setContent(value);
    }
  }, [value]);

  // Handle content changes
  const handleChange = (newContent) => {
    const sanitizedContent =
      DOMPurify.sanitize(newContent)
    setContent(sanitizedContent);

    if (onChange) {
      onChange(sanitizedContent, name);
    }
  };

  // Handle blur events
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(content, name);
    }
  };

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    getValue: () => content,
    getCleanValue: () => DOMPurify.sanitize(content),
    setValue: (newValue) => {
      const sanitized = sanitizeOnChange
        ? DOMPurify.sanitize(newValue)
        : newValue;
      setContent(sanitized);
    },
    clear: () => {
      setContent("");
      if (onChange) onChange("", name);
    },
    focus: () => {
      if (quillRef.current) {
        quillRef.current.focus();
      }
    },
    validate: () => {
      if (required && (!content || content.trim() === "<p><br></p>" || content.trim() === "")) {
        return false;
      }
      return true;
    }
  }));

  const editorStyle = {
    height,
    marginBottom: "2rem",
    ...style,
  };

  const containerClasses = `
  ${className}
  ${error ? 'border-red-500' : ''}
  focus-within:ring-2 focus-within:ring-blue-500
`.trim();
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={containerClasses}>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleChange}
          onBlur={handleBlur}
          // onFocus={handleFocus}
          modules={defaultModules}
          formats={defaultFormats}
          theme={theme}
          readOnly={readOnly}
          placeholder={placeholder}
          style={editorStyle}
        // {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

TextEditor.displayName = "TextEditor";

export default TextEditor;