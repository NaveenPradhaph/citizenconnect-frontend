
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
// import axios from 'axios';

const NewPetitionPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    governmentLevel: "",
    priority: "Medium",
    attachments: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [category,setCategory] = useState("");
  const [summary,setSummary] = useState("");
  const [urgency,setUrgency] = useState("");

  const token = localStorage.getItem("token");
  // const categories = [
  //   'Infrastructure',
  //   'Public Safety',
  //   'Healthcare',
  //   'Environment',
  //   'Education',
  //   'Transportation',
  //   'Housing',
  //   'Economic Development',
  //   'Social Services',
  //   'Other'
  // ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...fileList] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.governmentLevel) {
      newErrors.governmentLevel = 'Government level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
    if (!localStorage.getItem("token")) {
      setErrors({ submit: 'Authentication token missing.' });
      return;
    }
  
    const token = localStorage.getItem("token");
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5001/predict",{
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({"description":formData.description})
      });

      if (response.ok) {
        const data = await response.json();
        // setSummary(data.summary);
        setCategory(data.department);
        setUrgency(data.prediction);
      } else {
        throw new Error('Failed to fetch AI predictions.');
      }
    } catch {
      // setErrors({ submit: 'Failed to AI petition part. Try again later.' });
      setErrors({ submit: 'Failed to AI petition part. Try again later.' });
    }
  
    const petitionData = {
      title: formData.title,
      description: formData.description,
      category: category,
      governmentLevel: formData.governmentLevel,
      priority:urgency,
      aiSummary:summary
    };


    const formDataToSend = new FormData();
    formDataToSend.append("title", petitionData.title);
    formDataToSend.append("description", petitionData.description);
    formDataToSend.append("category", petitionData.category);
    formDataToSend.append("governmentLevel", petitionData.governmentLevel);
    formDataToSend.append("priority", petitionData.priority);
    formDataToSend.append("aiSummary", petitionData.aiSummary);


    formData.attachments.forEach(file => {
      formDataToSend.append("attachments", file);
    });
  

    console.log(summary);
    try {
      const response = await fetch('https://citizenconnect-backend.vercel.app/api/petitions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      console.log(response);
  
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => navigate('/petitions'), 2000);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Error submitting petition' });
      }
    } catch {
      setErrors({ submit: 'Failed to submit petition. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!token) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to submit a petition.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Submit a New Petition</h1>

      {showSuccess ? (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
            <div>
              <p className="text-green-800 font-medium">Petition submitted successfully!</p>
              <p className="text-green-700">Your petition has been received and will be processed shortly.</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Petition Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter a clear, descriptive title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Provide a detailed description of the issue or proposal"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Include relevant details such as location, impact, and proposed solutions if applicable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div> */}

            <div>
              <label htmlFor="governmentLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Government Level <span className="text-red-500">*</span>
              </label>
              <select
                id="governmentLevel"
                name="governmentLevel"
                value={formData.governmentLevel}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.governmentLevel ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="">Select government level</option>
                <option value="Local">Local</option>
                <option value="State">State</option>
                <option value="Central">Central</option>
              </select>
              {errors.governmentLevel && (
                <p className="mt-1 text-sm text-red-500">{errors.governmentLevel}</p>
              )}
            </div>
          </div>

          {/* <div className="mb-6">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex flex-wrap gap-4">
              {['Low', 'Medium', 'High', 'Urgent'].map(priority => (
                <label key={priority} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div> */}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB each
                </p>
              </div>
            </div>

            {formData.attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Attached Files:</h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {formData.attachments.map((file, index) => (
                    <li key={index} className="py-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{file.name}</span>
                        <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-800">Important Information</h4>
                <p className="mt-1 text-sm text-gray-600">
                  By submitting this petition, you acknowledge that:
                </p>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>All information provided is accurate to the best of your knowledge</li>
                  <li>This petition will be publicly visible</li>
                  <li>Your petition will be recorded on a blockchain for transparency</li>
                  <li>AI technology may be used to analyze and process your petition</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/petitions')}
              className="mr-4 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors disabled:bg-indigo-300 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Petition'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewPetitionPage;

