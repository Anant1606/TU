import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const FellowshipForm = () => {
  const { user } = useContext(UserContext);
  const [newFellowship, setNewFellowship] = useState({
    name: "",
    financialSupport: "",
    purpose: "",
    stature: "",
    awardingAgency: "",
    year: "",
    unit: "",
    proofLink: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addFellowship = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/fellowship", newFellowship);
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleFormChange = (e) => {
    setNewFellowship({
      ...newFellowship,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" || "admin" ? (
        <main className="fellowship-form" style={{ color: "black" }}>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Add Fellowship
          </h2>
          <form className="w-full md:w-1/3" onSubmit={addFellowship}>
            <label htmlFor="name">Name of Fellowship:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="name"
              id="name"
              value={newFellowship.name}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="financialSupport">Financial Support (INR):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="financialSupport"
              id="financialSupport"
              value={newFellowship.financialSupport}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="purpose">Purpose of Grant:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="purpose"
              id="purpose"
              value={newFellowship.purpose}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="stature">Stature of Fellowship:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="stature"
              name="stature"
              value={newFellowship.stature}
              onChange={handleFormChange}
              required
            >
              <option defaultValue hidden>
                Select Stature
              </option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
            <label htmlFor="awardingAgency">Awarding Agency:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="awardingAgency"
              id="awardingAgency"
              value={newFellowship.awardingAgency}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="year">Year of Award:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              min="2000"
              max="2030"
              step="1"
              required
              id="year"
              value={newFellowship.year}
              onChange={handleFormChange}
            />
            <label htmlFor="unit">Unit:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="unit"
              id="unit"
              value={newFellowship.unit}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="proofLink">Proof (Link to Award Letter):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="proofLink"
              id="proofLink"
              value={newFellowship.proofLink}
              required
              onChange={handleFormChange}
            />
            <button
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              type="submit"
            >
              <FaPlus />
              Add Fellowship
            </button>
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default FellowshipForm;
