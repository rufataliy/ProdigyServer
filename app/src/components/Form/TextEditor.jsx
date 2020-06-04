import React, { useRef } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-plus";

const TextEditor = ({ initialText, form }) => {
  return (
    <div className="App">
      <label className="form-label">Content</label>
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraAllowedContent: "iframe",
          simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl:
              "https://prodigy.rufataliyev.com/api/fileuploads/textEditorImageUpload",

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
              "X-CSRF-TOKEN": "CSFR-Token",
              Authorization: "Bearer <JSON Web Token>",
            },
          },
        }}
        data={initialText}
        onInit={(editor) => {
          // editor = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          form.setFieldValue("text", data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  );
};

export default React.memo(TextEditor);
