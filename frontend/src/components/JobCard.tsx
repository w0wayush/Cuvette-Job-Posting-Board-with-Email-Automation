import { FaBriefcase, FaUserTie, FaUsers, FaCalendarAlt } from "react-icons/fa";

//@ts-ignore
export const JobCard = ({ job }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-blue-50 p-4 border-b border-blue-100">
        <h3 className="text-xl font-bold text-blue-800 mb-2 truncate">
          {job.jobTitle}
        </h3>
        <p className="text-blue-600 text-sm truncate">{job.jobDescription}</p>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <FaBriefcase className="text-blue-400 mr-2" />
          <p className="text-gray-600">
            <span className="font-semibold text-gray-700">Experience:</span>{" "}
            {job.experienceLevel}
          </p>
        </div>
        <div className="mb-3">
          <div className="flex items-center mb-2">
            <FaUsers className="text-blue-400 mr-2" />
            <h4 className="font-semibold text-gray-700">Candidates:</h4>
          </div>
          <ul className="pl-6 max-h-24 overflow-y-auto">
            {job.candidatesList.map((email: any, index: any) => (
              <li
                key={index}
                className="text-sm text-gray-600 mb-1 flex items-center"
              >
                <FaUserTie className="text-blue-300 mr-2" size={12} />
                {email}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="text-blue-400 mr-2" />
          <p>
            <span className="font-semibold text-gray-700">End Date:</span>{" "}
            {new Date(job.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
