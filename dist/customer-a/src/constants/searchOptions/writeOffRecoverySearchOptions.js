export const WRITE_OFF_RECOVERY_SEARCH_OPTIONS = [
  { id: "ids", name: "Application ID", type: "text_field" },
  { id: "partner_id", name: "Patner ID", type: "text_field" },
  { id: "recovery_status", name: "Status", type: "autocomplete_status" },
  { id: "write_off_date", name: "Write Off Date", type: "date" },
  { id: "disbursement_date", name: "Disbursement Date", type: "date" },
  { id: "paid_date", name: "Paid Date", type: "date" },
  { id: "category_id", name: "Category", type: "autocomplete_category" },
  {
    id: "sub_category_id",
    name: "Sub Category",
    type: "autocomplete_sub_category",
  },
  { id: "pic", name: "PIC", type: "autocomplete_user" },
];
