import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { GoHomeFill } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";
import { setError } from "../redux/slices/userSlice";
import { toast } from "../hooks/use-toast";
import { JobCard } from "./JobCard";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchJobPostings = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/job/getJobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);

      if (response.data.jobPostings) {
        // Store the job postings in reverse order
        setJobPostings([...response.data.jobPostings].reverse());
      } else {
        toast({
          variant: "default",
          description: "No job postings found.",
        });
      }
    } catch (err) {
      console.error("Error fetching job postings:", err);
      dispatch(setError("Failed to load job postings."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, [dispatch]);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-50px)] border-t-2">
      {/* Sidebar */}
      <div className="w-20 md:w-24 lg:w-32 border-r-2 flex justify-center border-gray-200 shrink-0 cursor-pointer">
        <GoHomeFill
          size={32}
          className="text-gray-600 mt-10"
          onClick={() => navigate("/home")}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        <div>
          <div className="mb-8">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/job")}
            >
              Create Interview
              <FaPlus className="ml-2" size={12} />
            </Button>
          </div>

          {/* Loading and Error States */}
          {loading ? (
            <div className="flex-grow h-[calc(100vh-200px)] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>No interviews created yet</p>
                <p className="text-sm">
                  Click "Create Interview" to get started
                </p>
              </div>
            </div>
          ) : jobPostings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mr-28">
              {jobPostings.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
