import axiosInstance from "core/services/api/axiosInstance";
import { sortBy } from "lodash";

const getSurveyQuestionAnswerApi = async ({
  survey_header_id,
  application_id,
}) => {
  const [responseQaSetup, surveyTransactionResponse] = await Promise.all([
    axiosInstance.get(`survey-qa-setups`, {
      params: {
        survey_header_id,
      },
    }),
    axiosInstance.get(`survey-transactions`, {
      params: {
        application_id,
        survey_header_id,
      },
    }),
  ]);

  const data = sortBy(responseQaSetup.data.data, [
    (item) => {
      const regex = /\d+/; // This regular expression matches one or more digits
      const match = item.text?.match(regex);
      if (match.length) {
        return +match[0];
      }
      return 0;
    },
  ]).map((item) => {
    const surveyQuestionTransaction = surveyTransactionResponse.data.data.find(
      (transaction) => transaction.survey_qa_setup_id === item.id
    );
    if (surveyQuestionTransaction) {
      const {
        textfield_answer_value,
        answer_remark,
        radio_answer_value,
        checkbox_answer_value,
      } = surveyQuestionTransaction;
      item.survey_responses = {
        textfield_answer_value,
        answer_remark,
        radio_answer_value,
      };
      if (checkbox_answer_value && checkbox_answer_value.length) {
        item.answers = item.answers.map((answer) => ({
          ...answer,
          checked: !!checkbox_answer_value.find(
            (value) => value === answer.text
          ),
        }));
      }
    } else {
      item.answers = item.answers.map((answer) => ({
        ...answer,
        checked: false,
      }));
    }
    return item;
  });

  return { data };
};

const getSurveyHeaderApi = async ({ category_id, survey_type }) => {
  const response = await axiosInstance.get(`survey-headers`, {
    params: {
      category_id,
      survey_type,
    },
  });
  return response.data;
};
const createSurveyResultApi = async (body) => {
  const response = await axiosInstance.post(`survey-results`, body);
  return response.data;
};
const updateSurveyResultApi = async (uuid, body) => {
  const response = await axiosInstance.put(`survey-results/${uuid}`, body);
  return response.data;
};

const updateSurveyResultInvestigationStatusApi = async (
  uuid,
  investigation_status
) => {
  const response = await axiosInstance.put(
    `survey-results/${uuid}/updateSurveyResultInvestigationStatus`,
    { investigation_status }
  );
  return response.data;
};

const getSurveyResultApi = async () => {
  const response = await axiosInstance.get(`survey-results`);
  return response.data;
};

const surveyResultService = {
  createSurveyResultApi,
  updateSurveyResultApi,
  updateSurveyResultInvestigationStatusApi,
  getSurveyHeaderApi,
  getSurveyQuestionAnswerApi,
  getSurveyResultApi,
};

export default surveyResultService;
