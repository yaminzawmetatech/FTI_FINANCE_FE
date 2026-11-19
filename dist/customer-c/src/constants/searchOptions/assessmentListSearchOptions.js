export const ASSESSMENT_SEARCH_OPTIONS = [
  { id: "generated_application_ids", name: "Application ID", type: "text_field" },
  {
    id: "category_id",
    name: "Category",
    type: "autocomplete_category",
  },
  {
    id: "sub_category_id",
    name: "Sub Category",
    type: "autocomplete_sub_category",
  },
  { id: "conduct_at", name: "Conduct Date", type: "date" },
  { id: "assessment_type", name: "Assessment Type", type: "text_field" },
  { id: "status_array", name: "Status", type: "autocomplete_status" },
  { id: "approved_by", name: "Approved By", type: "autocomplete_user" },
];
