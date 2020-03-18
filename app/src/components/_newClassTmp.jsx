import React from "react";
import api from "../api/api";
import {
  Input,
  Radio,
  SubmitButton,
  DatePicker,
  TimePicker,
  Checkbox
} from "formik-antd";
import { Button } from "antd";

export const newClassForm = (() => {
  const fields = props => {
    console.log(props);
    const daysOptions = [
      { label: "Sunday", value: 0 },
      { label: "Monday", value: 1 },
      { label: "Tuesday", value: 2 },
      { label: "Wednesday", value: 3 },
      { label: "Thursday", value: 4 },
      { label: "Friday", value: 5 },
      { label: "Saturday", value: 6 }
    ];
    const field = {
      newClass: (
        <React.Fragment>
          <div>
            Title
            <Input name="title" placeholder="Title" />
          </div>
          <div>
            Recurring Dates
            <Checkbox.Group name="daysOfWeek" options={daysOptions} />
          </div>
          <div>
            Start Date
            <DatePicker name="start" />
          </div>
          <div>
            End Date
            <DatePicker name="end" />
          </div>
          <div>
            Start Time
            <TimePicker name="startTime" format="HH:mm" />
          </div>
          <div>
            End Time
            <TimePicker name="endTime" format="HH:mm" />
          </div>
          <div>
            Level
            <Input name="level" placeholder="Level" />
          </div>
          <div>
            Group Type
            <Radio.Group name="classType">
              <Radio.Button value="individual">Individual</Radio.Button>
              <Radio.Button value="group">Group</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            Origin
            <Input name="origin" type="text" placeholder="Origin" />
          </div>

          <Button htmlType="submit" type="primary">
            {props.method != "put" ? "Submit" : "Update"}
          </Button>
          {props.method == "put" && (
            <Button onClick={props.handleDelete} type="danger">
              Delete
            </Button>
          )}
        </React.Fragment>
      ),
      newWord: (
        <React.Fragment>
          <Input type="text" name="phrase" placeholder="Phrase" />
          <Input type="text" name="definition" placeholder="Definition" />
          <Input type="text" name="example" placeholder="Example" />
          <Input type="text" name="topic" placeholder="Topic" />
          <Input type="text" name="source" placeholder="Source" />
          <SubmitButton>Save</SubmitButton>
        </React.Fragment>
      ),
      newVocabulary: (
        <React.Fragment>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="text" name="topic" placeholder="Topic" />
          <Input type="text" name="level" placeholder="Level" />
          <SubmitButton>Save</SubmitButton>
        </React.Fragment>
      )
    };
    return field[props.formType];
  };
  //
  const dbPath = {
    post: (props, submitValues) => {
      return api(props, submitValues);
    },
    put: (props, submitValues) => {
      return api(props, submitValues);
    },
    delete: props => {
      return api(props);
    },
    get: props => {
      return api(props);
    }
  };
  return {
    fields: fields,
    dbPath: dbPath
  };
})();
