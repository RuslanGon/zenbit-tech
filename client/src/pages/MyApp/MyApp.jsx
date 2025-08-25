import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications, setAuthToken } from "../../features/applications/applicationsSlice";
import css from "./MyApp.module.css";

const MyApp = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); 
  const { list, loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    if (token) {
      setAuthToken(token); 
      dispatch(fetchApplications()); 
    }
  }, [dispatch, token]);

  return (
    <div className={css.container}>
      <h2>My Applications</h2>

      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      <div className={css.list}>
        {list.map((app) => (
          <div key={app._id} className={css.item}>
            <h3>{app.title}</h3>
            <p>{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApp;
