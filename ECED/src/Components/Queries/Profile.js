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
      if (!user || !user._id) {
        console.error("User object or user ID is missing");
        return;
      }

      try {
        const response = await axios.get(`/teacher/${user._id}`);
        setProfile(response.data);
        setUpdatedProfile({ ...response.data, id: user._id }); // Include ID in updatedProfile
      } catch (error) {
        console.error("Error fetching profile:", error.response ? error.response.data : error.message);
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
    if (!user || !user._id) {
      console.error("User object or user ID is missing");
      return;
    }

    try {
      // Ensure all required fields are present
      const requiredFields = [
        'id', 'name', 'dateOfBirth', 'panNumber', 'aadharNumber',
        'mobileNumber', 'whatsappNumber', 'dateOfJoining', 'dateOfRegularAppointment',
        'dateOfAP1Appointment', 'dateOfAP2Appointment', 'dateOfAP3Appointment',
        'dateOfAssociateProfessorAppointment', 'dateOfProfessorAppointment',
        'numberOfPhDsGuided', 'numberOfPhDsOngoing', 'numberOfMEMTechGuided',
        'numberOfMEMTechOngoing', 'numberOfBEBTechProjectsGuided',
        'numberOfBEBTechProjectsOngoing', 'hIndex', 'i10Index',
        'totalCitationsGoogleScholar', 'totalCitationsWebOfScience',
        'totalJournalPublications', 'totalConferencePublications',
        'totalBookChapters', 'totalBookPublications', 'totalPatentPublications',
        'orcidId', 'tietWebsiteLink', 'googleScholarLink', 'dblpLink',
        'vidwaanLink', 'totalExternalProjects', 'amountExternalProjects',
        'totalInternalProjects', 'amountInternalProjects',
        'totalConsultanciesProvided', 'amountConsultancyProjects',
        'collaborations', 'collaborators', 'numberOfProjectsSubmitted',
        'journalReviewer'
      ];

      for (const field of requiredFields) {
        if (updatedProfile[field] === undefined || updatedProfile[field] === null || updatedProfile[field] === '') {
          console.error(`Missing required field: ${field}`);
          return;
        }
      }

      const response = await axios.patch(`/Teacher/edit`, updatedProfile); // Send all fields in the body
      setProfile(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
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
                {/* Appointment Dates */}
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
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Date of AP1 Appointment
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfAP1Appointment"
                        value={updatedProfile.dateOfAP1Appointment?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfAP1Appointment).toLocaleDateString() || "N/A"
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Date of AP2 Appointment
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfAP2Appointment"
                        value={updatedProfile.dateOfAP2Appointment?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfAP2Appointment).toLocaleDateString() || "N/A"
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Date of AP3 Appointment
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfAP3Appointment"
                        value={updatedProfile.dateOfAP3Appointment?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfAP3Appointment).toLocaleDateString() || "N/A"
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Date of Professor Appointment
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfProfessorAppointment"
                        value={updatedProfile.dateOfProfessorAppointment?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfProfessorAppointment).toLocaleDateString() || "N/A"
                    )}
                  </td>
                </tr>
                {/* Professional Information */}
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Employee ID
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="employeeId"
                        value={updatedProfile.employeeId || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.employeeId
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    PAN Number
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="panNumber"
                        value={updatedProfile.panNumber || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.panNumber
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Aadhar Number
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="aadharNumber"
                        value={updatedProfile.aadharNumber || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.aadharNumber
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Number of PhDs Guided
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="numPhDsGuided"
                        value={updatedProfile.numPhDsGuided || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.numPhDsGuided
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Journal Publications
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="journalPublications"
                        value={updatedProfile.journalPublications || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.journalPublications
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    External Projects
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="externalProjects"
                        value={updatedProfile.externalProjects || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.externalProjects
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Consultancy
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="consultancy"
                        value={updatedProfile.consultancy || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.consultancy
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Collaborations
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="collaborations"
                        value={updatedProfile.collaborations || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.collaborations
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end p-2">
              {editing ? (
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};
export default Profile;
