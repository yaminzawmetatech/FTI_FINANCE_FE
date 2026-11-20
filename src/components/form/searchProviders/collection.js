import { getAllocateActivities } from "modules/collection/slices/allocateActivitiesSlice";
import { getFollowUpResults } from "modules/collection/slices/followUpResultSlice";

const collectionSearchProvider = {
  moduleId: "collection",
  optionTypes: ["autocomplete_activity", "autocomplete_follow_up_result"],
  selectState: (state) => ({
    allocateActivities: state.allocateActivities.allocateActivities,
    followUpResults: state.followUpResults.followUpResults,
  }),
  loaders: {
    autocomplete_activity: (dispatch) => dispatch(getAllocateActivities()),
    autocomplete_follow_up_result: (dispatch) =>
      dispatch(getFollowUpResults()),
  },
};

export default collectionSearchProvider;
