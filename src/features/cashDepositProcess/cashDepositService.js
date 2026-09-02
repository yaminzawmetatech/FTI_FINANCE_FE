import axiosInstance from "../api/axiosInstance";

const createCashDeposit = async (body) => {
  const response = await axiosInstance.post(`cash-deposits`, body);
  return response.data;
};

const updateCashDeposit = async (body, uuid) => {
  const response = await axiosInstance.put(
    `cash-deposits/${uuid}`,
    body
  );
  return response.data;
};

const changeStatusCashDeposit = async (status, uuid, id) => {
  const response = await axiosInstance.post(
    `cash-deposits-approved-rejected/${uuid}`,
    {
      status,
      id
    }
  );
  return response.data;
};

const postCashDeposit = async (uuid, id) => {
  const response = await axiosInstance.get(
    `post-cash-deposit/${uuid}`,
    {
      id
    }
  );
  return response.data;
};

const changeStatusCashDepositByTable = async (status, uuid,id) => {
  const response = await axiosInstance.post(
    `cash-deposits-approved-rejected/${uuid}`,
    {
      status,
      id
    }
  );
  return response.data;
};

const getAllCashDeposits = async (params, url = "cash-deposits") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getCashDepositByUuid = async (uuid) => {
  const response = await axiosInstance.get(`cash-deposits/${uuid}`);
  return response.data;
};

const getCashDepositBalance = async (categoryId,cashDepositUuid) => {
  const response = await axiosInstance.get(`update-cashdeposit-balance/${categoryId}`, {
    params: {
      uuid: cashDepositUuid
    }
  });
  return response.data;
};

const getCashDepositHistory = async (cashDepositUuid) => {
  const response = await axiosInstance.get(`update-cashdeposit-balance/${cashDepositUuid}`);
  return response.data;
};

const cashDepositService = {
  createCashDeposit,
  getAllCashDeposits,
  getCashDepositByUuid,
  changeStatusCashDeposit,
  postCashDeposit,
  updateCashDeposit,
  getCashDepositBalance,
  changeStatusCashDepositByTable,
  getCashDepositHistory
};

export default cashDepositService;
