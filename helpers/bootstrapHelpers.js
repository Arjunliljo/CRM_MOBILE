const getBranchName = (branch, branches) => {
  const branchData = branches.find((b) => b._id === branch);
  return branchData ? branchData.name : "N/A";
};

const getStatusName = (status, statuses) => {
  const statusData = statuses.find((s) => s._id === status);
  return statusData ? statusData.name : "N/A";
};

const getCountryName = (country, countries) => {
  const countryData = countries.find((c) => c._id === country);
  return countryData ? countryData.name : "N/A";
};

const getSubStatusName = (subStatus, substatuses) => {
  const subStatusData = substatuses.find((s) => s._id === subStatus);
  return subStatusData ? subStatusData.name : "N/A";
};

export { getBranchName, getStatusName, getCountryName, getSubStatusName };
