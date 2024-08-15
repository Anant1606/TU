import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin } from "react-icons/pi";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`/teacher/${user._id}`);
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, [user]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`/teacher/edit/${user._id}`, updatedProfile);
      setProfile(updatedProfile);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <main
      className="flex w-full flex-col justify-center md:w-fit"
      style={{ color: "black" }}
    >
      {profile.name ? (
        <>
          <div className="my-4 flex w-full justify-center overflow-auto dark:border-slate-500 dark:p-[1px]">
            <PiUserThin className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            <div
              className="flex flex-col items-start justify-center"
              style={{ color: "black" }}
            >
              <h2 className="whitespace-break-spaces text-3xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                {profile.name}
              </h2>
              <p className="text-lg capitalize sm:text-xl md:text-2xl">
                {profile.role || "N/A"}
              </p>
            </div>
          </div>
          <div className="w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
            <table className="w-full">
              <tbody>
                {/* Basic Information */}
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Name
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={updatedProfile.name || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.name
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Email
                  </th>
                  <td className="px-4 py-2">
                    {profile.email}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Qualification
                  </th>
                  <td className="px-4 py-2">
                    {profile.qualification}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Department
                  </th>
                  <td className="px-4 py-2">
                    {profile.department}
                  </td>
                </tr>
                {/* Contact Information */}
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Mobile Number
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="mobileNumber"
                        value={updatedProfile.mobileNumber || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.mobileNumber
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    WhatsApp Number
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="whatsappNumber"
                        value={updatedProfile.whatsappNumber || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.whatsappNumber
                    )}
                  </td>
                </tr>
                {/* Dates */}
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Date of Birth
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={updatedProfile.dateOfBirth?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfBirth).toLocaleDateString() || "N/A"
                    )}
                  </td>
                </tr>
                {/* Professional Appointments */}
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Date of Joining
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfJoining"
                        value={updatedProfile.dateOfJoining?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfJoining).toLocaleDateString() || "N/A"
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Date of Regular Appointment
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfRegularAppointment"
                        value={updatedProfile.dateOfRegularAppointment?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfRegularAppointment).toLocaleDateString() || "N/A"
                    )}
                  </td>
                </tr>
                {/* Numbers and Metrics */}
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Number of PhDs Guided
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="numberOfPhDsGuided"
                        value={updatedProfile.numberOfPhDsGuided || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.numberOfPhDsGuided || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    h-index
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="hIndex"
                        value={updatedProfile.hIndex || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.hIndex || 0
                    )}
                  </td>
                </tr>
                {/* Add more fields as needed */}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {editing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="mx-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleEditToggle}
                  className="mx-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Profile;
