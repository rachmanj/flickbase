import { useState, useRef } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";

// COMPONENT
import { AdminTitle, errorHelper, Loader } from "../../../../utils/tools";
import { formValues, validation } from "./valisationSchema";
import WYSIWYG from "../../../../utils/form/wysiwyg";

// REDUX
import { useDispatch, useSelector } from "react-redux";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import { visuallyHidden } from "@mui/utils";

const AddArticle = () => {
  const [editorBlur, setEditorBlur] = useState(false);

  // REDUX
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const actorsValue = useRef("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleEditorState = (state) => {
    formik.setFieldValue("content", state, true);
  };

  const handleEditorBlur = (blur) => {
    setEditorBlur(blur);
  };

  return (
    <>
      <AdminTitle title="Add Article" />

      <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="title"
            label="Enter a Title"
            variant="outlined"
            {...formik.getFieldProps("title")}
            {...errorHelper(formik, "title")}
          />
        </div>

        <div className="form-group">
          <WYSIWYG
            setEditorState={(state) => handleEditorState(state)}
            setEditorBlur={(blur) => handleEditorBlur(blur)}
          />
        </div>

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="excerpt"
            label="Enter a short description"
            variant="outlined"
            {...formik.getFieldProps("excerpt")}
            {...errorHelper(formik, "excerpt")}
            multiline
            rows={4}
          />
        </div>

        <Divider className="mt-3 mb-3" />

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="score"
            label="Enter a score"
            variant="outlined"
            {...formik.getFieldProps("score")}
            {...errorHelper(formik, "score")}
          />
        </div>

        <div className="form-group">
          <FormikProvider value={formik}>
            <FieldArray
              name="actors"
              render={(arrayHelpers) => (
                <div>
                  <Paper className="actors_form">
                    <InputBase
                      inputRef={actorsValue}
                      className="input"
                      placeholder="Enter actor nam here"
                    />
                    <IconButton
                      onClick={() => {
                        if (actorsValue.current.value !== "") {
                          arrayHelpers.push(actorsValue.current.value);
                        }
                        actorsValue.current.value = "";
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Paper>
                  {formik.errors.actors && formik.touched.actors ? (
                    <FormHelperText error={true}>
                      {formik.errors.actors}
                    </FormHelperText>
                  ) : null}

                  <div className="chip_container">
                    {formik.values.actors.map((actor, index) => (
                      <div>
                        <Chip
                          key={index}
                          label={`${actor}`}
                          color="primary"
                          onDelete={() => arrayHelpers.remove(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
          </FormikProvider>
        </div>

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="director"
            label="Enter a Director"
            variant="outlined"
            {...formik.getFieldProps("director")}
            {...errorHelper(formik, "director")}
          />
        </div>

        <Divider className="mt-3 mb-3" />

        <FormControl fullWidth>
          <InputLabel>Select a Status</InputLabel>
          <Select
            name="status"
            label="Select a status"
            {...formik.getFieldProps("status")}
            error={formik.touched.status && formik.errors.status ? true : false}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="public">Public</MenuItem>
            {formik.errors.status && formik.touched.status ? (
              <FormHelperText error={true}>
                {formik.errors.status}
              </FormHelperText>
            ) : null}
          </Select>
        </FormControl>

        <Divider className="mt-3 mb-3" />

        <Button variant="contained" color="primary" type="submit" size="small">
          Add Article
        </Button>
      </form>
    </>
  );
};

export default AddArticle;
