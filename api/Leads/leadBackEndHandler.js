import api from "../../conf/conf";

const updateLead = async (leadId, data) => {
  try {
    const response = await api.patch(`/lead/${leadId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateLeadDetails = async (leadId, data) => {
  try {
    const response = await api.patch(`/lead/updateLeadPersonalDetails`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const upLoadDocument = async (data) => {
  try {
    const response = await api.post(`/lead/uploadLeadFile`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export { updateLead, updateLeadDetails, upLoadDocument };
