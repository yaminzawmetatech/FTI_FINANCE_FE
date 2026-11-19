import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getSurveyQuestionAnswer } from "modules/credit-management/slices/surveyResultSlice";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

const InHouseSurveyApplicant = ({ open, onClose, survey_header_id }) => {
  const { applicationId: application_id } = useParams();

  const { data: surveyQuestionAnswerData, isLoading } = useSelector(
    (state) => state.surveyResult.surveyQuestionAnswer
  );
  const dispatch = useDispatch();

  const { control, reset } = useForm({
    defaultValues: {
      surveyQuestions: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "surveyQuestions",
  });

  useEffect(() => {
    if (survey_header_id && application_id) {
      dispatch(getSurveyQuestionAnswer({ survey_header_id, application_id }));
    }
  }, [application_id, dispatch, reset, survey_header_id]);

  useEffect(() => {
    reset({
      surveyQuestions: surveyQuestionAnswerData,
    });
  }, [reset, surveyQuestionAnswerData]);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="md"
      open={open}
    >
      <DialogTitle
        id="scroll-dialog-title"
        variant="h5"
        sx={{ color: "#1890ff" }}
      >
        {surveyQuestionAnswerData[0]?.survey_header}
      </DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box sx={{ width: "100%", height: "50vh" }}>
            <LinearProgress />
          </Box>
        ) : (
          <List>
            {fields.map((surveyQuestion, index) => (
              <ListItem key={`${surveyQuestion.uuid}`}>
                <ListItemText>
                  <FormControl
                    component="fieldset"
                    variant="standard"
                    fullWidth
                  >
                    <FormLabel
                      component="legend"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {surveyQuestion.text}
                    </FormLabel>
                    <FormGroup>
                      {surveyQuestion.answers
                        .filter((item) => item.answer_type === "checkbox")
                        .map((item, i) => (
                          <Controller
                            name={`surveyQuestions[${index}].answers[${i}].checked`}
                            control={control}
                            key={item.uuid}
                            render={({ field: { onChange, value } }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={value}
                                    onChange={(e) => onChange(e.target.checked)}
                                  />
                                }
                                label={item.text}
                              />
                            )}
                          />
                        ))}
                    </FormGroup>
                    <Controller
                      name={`surveyQuestions[${index}].survey_responses.radio_answer_value`}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup row {...field}>
                          {surveyQuestion.answers
                            .filter((item) => item.answer_type === "radio")
                            .map((item, radioIndex) => (
                              <FormControlLabel
                                key={item.uuid}
                                value={item.text}
                                control={<Radio size="small" />}
                                label={item.text}
                              />
                            ))}
                        </RadioGroup>
                      )}
                    />
                    {surveyQuestion.answers
                      .filter((item) => item.answer_type === "text")
                      .map((item) => {
                        return (
                          <Controller
                            name={`surveyQuestions[${index}].survey_responses.text_response`}
                            control={control}
                            key={item.uuid}
                            render={({ field }) => (
                              <TextField
                                sx={{ mt: 1 }}
                                multiline
                                rows={3}
                                {...field}
                                size="small"
                                label={item.text}
                                fullWidth
                              />
                            )}
                          />
                        );
                      })}
                    {surveyQuestion.answers
                      .filter((item) => item.answer_type === "remark")
                      .map((item) => {
                        return (
                          <Controller
                            name={`surveyQuestions[${index}].survey_responses.answer_remark`}
                            control={control}
                            key={item.uuid}
                            render={({ field }) => (
                              <TextField
                                sx={{ mt: 1 }}
                                multiline
                                rows={3}
                                {...field}
                                size="small"
                                label={item.text}
                                fullWidth
                              />
                            )}
                          />
                        );
                      })}
                  </FormControl>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(InHouseSurveyApplicant);
