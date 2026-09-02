import axiosInstance from "../api/axiosInstance";



const changeStatusWriteOffRecoveryIncome = async (status, uuid) => {
  const response = await axiosInstance.post(
    `update-write-off-recovery-income-contract-status/${uuid}`,
    { status }
  );
  return response.data;
};

const getAllWriteOffRecoveryIncomes = async (params, url = "write-off-recovery-incomes") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getWriteOffRecoveryIncomeByUuid = async (uuid) => {
  const response = await axiosInstance.get(`write-off-recovery-incomes/${uuid}`);
  return response.data;
};

const writeOffRecoveryIncomeService = {
  changeStatusWriteOffRecoveryIncome,
  getAllWriteOffRecoveryIncomes,
  getWriteOffRecoveryIncomeByUuid,
};

export default writeOffRecoveryIncomeService;
