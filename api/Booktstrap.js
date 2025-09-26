import { useQuery } from "@tanstack/react-query";
import api from "../conf/conf";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setBranches,
  setCountries,
  setStatuses,
  setSubstatuses,
  setRoles,
  setUsers,
  setForms,
} from "../global/bootstrapSlice";

export default function Booktstrap() {
  const dispatch = useDispatch();
  const branchConfigs = useQuery({
    queryKey: ["branches"],
    queryFn: () => api.get("/branch"),
  });
  const countryConfigs = useQuery({
    queryKey: ["countries"],
    queryFn: () => api.get("/country"),
  });
  const statusConfigs = useQuery({
    queryKey: ["statuses"],
    queryFn: () => api.get("/status"),
  });
  const substatusConfigs = useQuery({
    queryKey: ["substatuses"],
    queryFn: () => api.get("/status/substatus"),
  });
  const roleConfigs = useQuery({
    queryKey: ["roles"],
    queryFn: () => api.get("/role"),
  });
  const userConfigs = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/user"),
  });
  const formConfigs = useQuery({
    queryKey: ["forms"],
    queryFn: () => api.get("/form"),
  });

  useEffect(() => {
    if (branchConfigs.data)
      dispatch(setBranches(branchConfigs.data?.data ?? branchConfigs.data));
    if (countryConfigs.data)
      dispatch(setCountries(countryConfigs.data?.data ?? countryConfigs.data));
    if (statusConfigs.data)
      dispatch(setStatuses(statusConfigs.data?.data ?? statusConfigs.data));
    if (substatusConfigs.data)
      dispatch(
        setSubstatuses(substatusConfigs.data?.data ?? substatusConfigs.data)
      );
    if (roleConfigs.data)
      dispatch(setRoles(roleConfigs.data?.data ?? roleConfigs.data));
    if (userConfigs.data)
      dispatch(setUsers(userConfigs.data?.data ?? userConfigs.data));
    if (formConfigs.data)
      dispatch(setForms(formConfigs.data?.data ?? formConfigs.data));
  }, [
    branchConfigs.data,
    countryConfigs.data,
    statusConfigs.data,
    substatusConfigs.data,
    roleConfigs.data,
    userConfigs.data,
    formConfigs.data,
    dispatch,
  ]);

  return null;
}
