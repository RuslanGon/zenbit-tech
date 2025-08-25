import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications, createApplication, setAuthToken } from "../../features/applications/applicationsSlice";
import css from "./Applications.module.css";

const Applications = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.applications);
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    // Устанавливаем токен в axios
    if (token) {
      setAuthToken(token);
      dispatch(fetchApplications());
    }
  }, [dispatch, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    dispatch(createApplication(form));
    setForm({ title: "", description: "" });
  };

  return (
    <div className={css.container}>
      <h2>Applications</h2>

      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Create Application</button>
      </form>

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

export default Applications;
