import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default ({ contentName, onChange, form }) => {
  return (
    <div className="App">
      <label className="form-label">Content</label>
      <CKEditor
        editor={ClassicEditor}
        config={{ minHeight: 300 }}
        data="<p>Enter your content here</p>"
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          form.setFieldValue("text", data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};
