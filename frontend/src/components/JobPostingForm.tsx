import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { X, Loader2, Calendar } from "lucide-react"; // Added Calendar icon
import axios from "axios";
import { toast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";

interface FormData {
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  candidatesList: string[];
  endDate: string;
}

const JobPostingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    candidatesList: [],
    endDate: "",
  });

  const [candidates, setCandidates] = useState<string[]>([]);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCandidate = () => {
    if (candidateEmail && !candidates.includes(candidateEmail)) {
      setCandidates([...candidates, candidateEmail]);
      setCandidateEmail("");
      setFormData((prevData) => ({
        ...prevData,
        candidatesList: [...prevData.candidatesList, candidateEmail],
      }));
    }
  };

  const handleRemoveCandidate = (email: string) => {
    setCandidates(candidates.filter((c) => c !== email));
    setFormData((prevData) => ({
      ...prevData,
      candidatesList: prevData.candidatesList.filter((c) => c !== email),
    }));
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/job/createJob`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Job posting created successfully!",
      });

      navigate("/home");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Failed to create job posting. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-50px)] border-t-2">
      {/* Sidebar */}
      <div className="w-20 md:w-24 lg:w-32 border-r-2 flex justify-center border-gray-200 shrink-0">
        <GoHomeFill
          size={32}
          className="text-gray-600 mt-10"
          onClick={() => navigate("/home")}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mt-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              {/* Job Title */}
              <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                <label className="text-right font-medium text-gray-700">
                  Job Title
                </label>
                <Input
                  placeholder="Enter Job Title"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  className="focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Job Description */}
              <div className="grid grid-cols-[200px_1fr] items-start gap-8">
                <label className="text-right font-medium text-gray-700 pt-2">
                  Job Description
                </label>
                <Textarea
                  placeholder="Enter Job Description"
                  value={formData.jobDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, jobDescription: e.target.value })
                  }
                  className="min-h-[200px] focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Experience Level */}
              <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                <label className="text-right font-medium text-gray-700">
                  Experience Level
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, experienceLevel: value })
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry Level">Entry Level</SelectItem>
                    <SelectItem value="Intermediate Level">
                      Intermediate Level
                    </SelectItem>
                    <SelectItem value="Mid Level">Mid Level</SelectItem>
                    <SelectItem value="Senior Level">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Add Candidate */}
              <div className="grid grid-cols-[200px_1fr] items-start gap-8">
                <label className="text-right font-medium text-gray-700 pt-2">
                  Add Candidate
                </label>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="xyz@gmail.com"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      className="flex-1 focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleAddCandidate}
                      variant="outline"
                      type="button"
                      className="hover:bg-gray-100"
                      disabled={isLoading}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {candidates.map((email) => (
                      <div
                        key={email}
                        className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-sm">{email}</span>
                        <X
                          className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleRemoveCandidate(email)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* End Date */}
              <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                <label className="text-right font-medium text-gray-700">
                  End Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full pl-4 pr-10 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    disabled={isLoading}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-[200px_1fr] items-center gap-8">
              <div></div>
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="w-32 hover:bg-gray-100"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-32 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;
