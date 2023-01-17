import { useState, useEffect } from "react";

//WYSIWYG
import { EditorState, currentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import "../../styles/react-draft-wysiwyg.css";

// EDIT
import htmlToDraft from "html-to-draftjs";

const WYSIWYG = (props) => {
  const [editorData, setEditorData] = useState({
    editorState: EditorState.createEmpty(),
  });

  const onEditorStateChange = (editorData) => {
    let HTMLdata = stateToHTML(editorData.getCurrentContent());

    setEditorData({ editorState: editorData });
    props.setEditorState(HTMLdata);
  };

  return (
    <div>
      <Editor
        editorState={editorData.editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName={`demo-wrapper`}
        editorClassName="demo-editor"
        onBlur={props.setEditorBlur}
      />
    </div>
  );
};

export default WYSIWYG;
