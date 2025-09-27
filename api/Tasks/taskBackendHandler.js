import api from "../../conf/conf";

const updateTask = async (taskId, data) => {
  try {
    const response = await api.patch(`dashboard/update-lead/${taskId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export { updateTask };
