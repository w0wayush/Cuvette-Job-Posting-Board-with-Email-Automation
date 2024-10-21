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
import { X, Loader2 } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "../hooks/use-toast";

interface FormData {
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  candidatesList: string[];
  endDate: string;
}

interface JobPostingProps {
  onClose?: () => void;
  refreshJobs?: () => void;
}

export const JobPosting: React.FC<JobPostingProps> = ({
  onClose,
  refreshJobs,
}) => {
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
  const userData = useSelector((state: any) => state.user.userData);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = userData?.token || localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found");
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please log in to create a job posting.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/job/createJob`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Form submitted:", response.data);
      toast({
        title: "Success",
        description: "Job posting created successfully!",
      });
      if (onClose) {
        onClose();
      }
      if (refreshJobs) {
        refreshJobs();
      }
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
    <form
      onSubmit={handleSubmit}
      className="w-[75%] pl-4 pr-8 md:pl-8 md:pr-16 lg:pr-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr] items-start gap-2 md:gap-6">
        <label className="font-medium md:text-right md:pt-2">Job Title</label>
        <Input
          placeholder="Enter Job Title"
          value={formData.jobTitle}
          onChange={(e) =>
            setFormData({ ...formData, jobTitle: e.target.value })
          }
          className="w-full focus:outline-blue-500"
          disabled={isLoading}
          required
        />

        <label className="font-medium md:text-right md:pt-2">
          Job Description
        </label>
        <Textarea
          placeholder="Enter Job Description"
          value={formData.jobDescription}
          onChange={(e) =>
            setFormData({ ...formData, jobDescription: e.target.value })
          }
          className="min-h-[120px] resize-none"
          disabled={isLoading}
          required
        />

        <label className="font-medium md:text-right md:pt-2">
          Experience Level
        </label>
        <Select
          onValueChange={(value) =>
            setFormData({ ...formData, experienceLevel: value })
          }
          disabled={isLoading}
        >
          <SelectTrigger>
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

        <label className="font-medium md:text-right md:pt-2">
          Add Candidate
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="xyz@gmail.com"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleAddCandidate}
              variant="outline"
              type="button"
              disabled={isLoading}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidates.map((email) => (
              <div
                key={email}
                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{email}</span>
                <X
                  className="h-4 w-4 cursor-pointer hover:text-red-500"
                  onClick={() => handleRemoveCandidate(email)}
                />
              </div>
            ))}
          </div>
        </div>

        <label className="font-medium md:text-right md:pt-2">End Date</label>
        <Input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          className="w-full"
          disabled={isLoading}
          required
        />
      </div>

      <div className="flex justify-end mt-8 md:mt-10">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send"
          )}
        </Button>
      </div>
    </form>
  );
};
