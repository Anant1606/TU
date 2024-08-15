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
                    Date of Associate Professor Appointment
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfAssociateProfessorAppointment"
                        value={updatedProfile.dateOfAssociateProfessorAppointment?.split('T')[0] || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      new Date(profile.dateOfAssociateProfessorAppointment).toLocaleDateString() || "N/A"
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
                {/* Research and Publications */}
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
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    i10-index
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="i10Index"
                        value={updatedProfile.i10Index || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.i10Index || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Total Citations (Google Scholar)
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="totalCitationsGoogleScholar"
                        value={updatedProfile.totalCitationsGoogleScholar || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.totalCitationsGoogleScholar || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Total Citations (Web of Science)
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="totalCitationsWebOfScience"
                        value={updatedProfile.totalCitationsWebOfScience || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.totalCitationsWebOfScience || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Total Journal Publications
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="totalJournalPublications"
                        value={updatedProfile.totalJournalPublications || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.totalJournalPublications || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Total Conference Publications
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="totalConferencePublications"
                        value={updatedProfile.totalConferencePublications || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.totalConferencePublications || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Total Book Chapters
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="totalBookChapters"
                        value={updatedProfile.totalBookChapters || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.totalBookChapters || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Total Book Publications
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="totalBookPublications"
                        value={updatedProfile.totalBookPublications || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.totalBookPublications || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Total Patent Publications
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="totalPatentPublications"
                        value={updatedProfile.totalPatentPublications || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.totalPatentPublications || 0
                    )}
                  </td>
                </tr>
                {/* Links */}
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    ORCID ID
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="orcidId"
                        value={updatedProfile.orcidId || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.orcidId
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Google Scholar ID
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="googleScholarId"
                        value={updatedProfile.googleScholarId || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.googleScholarId
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Scopus ID
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="text"
                        name="scopusId"
                        value={updatedProfile.scopusId || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.scopusId
                    )}
                  </td>
                </tr>
                {/* Professional Metrics */}
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
                    Number of M.Tech/M.Sc Guided
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="numberOfMTechGuided"
                        value={updatedProfile.numberOfMTechGuided || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.numberOfMTechGuided || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Number of Projects
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="numberOfProjects"
                        value={updatedProfile.numberOfProjects || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.numberOfProjects || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Number of Consultancy Projects
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="numberOfConsultancyProjects"
                        value={updatedProfile.numberOfConsultancyProjects || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.numberOfConsultancyProjects || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Number of External Collaborations
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="numberOfExternalCollaborations"
                        value={updatedProfile.numberOfExternalCollaborations || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.numberOfExternalCollaborations || 0
                    )}
                  </td>
                </tr>
                <tr className="border-t-[1px] border-slate-400 last:border-b-0">
                  <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                    Number of Collaborations
                  </th>
                  <td className="px-4 py-2">
                    {editing ? (
                      <input
                        type="number"
                        name="numberOfCollaborations"
                        value={updatedProfile.numberOfCollaborations || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    ) : (
                      profile.numberOfCollaborations || 0
                    )}
                  </td>
                </tr>
                {/* Save/Cancel Buttons */}
                {editing && (
                  <tr>
                    <td colSpan="2" className="text-center">
                      <button
                        onClick={handleSaveChanges}
                        className="mr-4 bg-green-500 text-white p-2 rounded"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleEditToggle}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!editing && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Edit Profile
              </button>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Profile;
