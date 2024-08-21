import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const SupportForm = () => {
  const { user } = useContext(UserContext);
  const [newSupport, setNewSupport] = useState({
    year: "",
    startDate: "",
    endDate: "",
    title: "",
    teacher: "",
    amountProvided: "",
    purpose: "",
    proofLink: ""
  });
  const [error, setError] = useState("");
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const list = await axios.get(`/teacher/list/${user.department}`);
        setTeachers(list.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    getTeachers();
  }, [user]);

  const addSupport = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/support/record", newSupport);
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleFormChange = (e) => {
    setNewSupport({
      ...newSupport,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" || user.role === "admin" || user.role === "teacher" ? (
        <main className="support-form" style={{ color: "black" }}>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Add Support Record
          </h2>
          <form className="w-full md:w-1/3" onSubmit={addSupport}>
            <label htmlFor="year">Year:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="year"
              id="year"
              value={newSupport.year}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="startDate">Start Date (dd-mm-yyyy):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="date"
              name="startDate"
              id="startDate"
              value={newSupport.startDate}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="endDate">End Date (dd-mm-yyyy):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="date"
              name="endDate"
              id="endDate"
              value={newSupport.endDate}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="title">
              Title of the Conference/Workshop/Professional Body:
            </label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="title"
              id="title"
              value={newSupport.title}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="teacher">Select Teacher:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="teacher"
              name="teacher"
              value={newSupport.teacher}
              onChange={handleFormChange}
              required
            >
              <option defaultValue hidden>Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <label htmlFor="amountProvided">Amount Provided (INR):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="amountProvided"
              id="amountProvided"
              value={newSupport.amountProvided}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="purpose">
              Purpose (Membership fee/travel/other expenses/Registration fee):
            </label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="purpose"
              id="purpose"
              value={newSupport.purpose}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="proofLink">
              Proof (Sanction letter/approval letter/Certificate etc. - Enter Link):
            </label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="proofLink"
              id="proofLink"
              value={newSupport.proofLink}
              required
              onChange={handleFormChange}
            />
            <button
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              type="submit"
            >
              <FaPlus />
              Add Support Record
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

export default SupportForm;
