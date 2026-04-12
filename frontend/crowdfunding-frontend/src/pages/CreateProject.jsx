// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";
// //
// // const CreateProject = () => {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({
// //     pName: "",
// //     description: "",
// //     maxAmount: "",
// //     endTime: "",
// //     documentUrl: "", // Required for VerificationRequest
// //   });
// //
// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };
// //
// //   const createProject = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Backend now handles creating both the Project and the VerificationRequest
// //       const res = await api.post("/projects", form);
// //       console.log("Response:", res.data); // Look at the structure
// //       alert("Project submitted! It will appear on the platform once an admin verifies it.");
// //       navigate("/");
// //     } catch (err) {
// //       console.error(err);
// //       console.error("Full Error Object:", err);
// //       console.error("Server Response Data:", err.response?.data);
// //     // alert("Error: Check console for details.");
// //       alert("Error creating project. Ensure all fields (including Document URL) are filled.");
// //     }
// //   };
// //
// //   return (
// //     <div className="form-container" style={{ maxWidth: "600px", margin: "40px auto" }}>
// //       <div className="card shadow-lg" style={{ padding: "30px" }}>
// //         <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Start a Campaign</h2>
// //         <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
// //           Launch your idea. Note: New projects require admin approval.
// //         </p>
// //
// //         <form onSubmit={createProject}>
// //           <label>Project Name</label>
// //           <input className="input-field" name="pName" placeholder="e.g. Clean Energy Initiative" onChange={handleChange} required />
// //
// //           <label>Description</label>
// //           <textarea className="input-field" name="description" rows="4" placeholder="How will you use the funds?" onChange={handleChange} required />
// //
// //           <div style={{ display: "flex", gap: "15px" }}>
// //             <div style={{ flex: 1 }}>
// //               <label>Goal Amount (₹)</label>
// //               <input className="input-field" name="maxAmount" type="number" placeholder="50000" onChange={handleChange} required />
// //             </div>
// //             <div style={{ flex: 1 }}>
// //               <label>End Date</label>
// //               <input className="input-field" name="endTime" type="datetime-local" onChange={handleChange} required />
// //             </div>
// //           </div>
// //
// //           <label style={{ marginTop: "15px", display: "block" }}>Verification Document URL</label>
// //           <input
// //             className="input-field"
// //             name="documentUrl"
// //             placeholder="Link to project plan (Google Drive/Dropbox)"
// //             onChange={handleChange}
// //             required
// //           />
// //           <small style={{ color: "#888", marginBottom: "20px", display: "block" }}>
// //             Submit a link to your ID or project proposal for our team to review.
// //           </small>
// //
// //           <button type="submit" className="btn" style={{ height: "50px", fontSize: "1.1rem" }}>
// //             Submit for Review
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default CreateProject;
// import { useState } from "react";
// import api from "../api/axios";
//
// const CreateProject = () => {
//   const [form, setForm] = useState({
//     pName: "",
//     description: "",
//     maxAmount: "",
//     category: "",
//     endTime: "",
//   });
//
//   const [images, setImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//
//   const CLOUD_NAME = "dthywoita";
//   const UPLOAD_PRESET = "crowd-funding-uploading";
//
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//
//   // upload to cloudinary
//   const uploadImages = async () => {
//     setUploading(true);
//     const uploadedUrls = [];
//
//     for (let file of images) {
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", UPLOAD_PRESET);
//
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: data,
//         }
//       );
//
//       const json = await res.json();
//       uploadedUrls.push(json.secure_url);
//     }
//
//     setUploading(false);
//     return uploadedUrls;
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     if (images.length < 3) {
//       alert("Upload at least 3 images");
//       return;
//     }
//
//     const imageUrls = await uploadImages();
//
//     const payload = {
//       ...form,
//       images: imageUrls.map((url) => ({ filePath: url })),
//     };
//
//     await api.post("/projects", payload);
//
//     alert("Project created!");
//   };
//
//   return (
//     <div className="container">
//       <h2>Create Campaign</h2>
//
//       <form onSubmit={handleSubmit} className="form">
//
//         <input
//           name="pName"
//           placeholder="Project Name"
//           onChange={handleChange}
//           required
//         />
//
//         <textarea
//           name="description"
//           placeholder="Full Description"
//           onChange={handleChange}
//           required
//         />
//
//         <input
//           name="maxAmount"
//           type="number"
//           placeholder="Goal Amount"
//           onChange={handleChange}
//           required
//         />
//
//         <input
//           name="category"
//           placeholder="Category (Health, Tech, NGO)"
//           onChange={handleChange}
//         />
//
//         <input
//           name="endTime"
//           type="datetime-local"
//           onChange={handleChange}
//         />
//
//         {/* IMAGE UPLOAD */}
//         <input
//           type="file"
//           multiple
//           onChange={(e) => setImages([...e.target.files])}
//         />
//
//         <button disabled={uploading}>
//           {uploading ? "Uploading..." : "Create Campaign"}
//         </button>
//       </form>
//     </div>
//   );
// };
//
// export default CreateProject;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateProject = () => {
  const navigate = useNavigate();

  // Combined form state
  const [form, setForm] = useState({
    pName: "",
    description: "",
    maxAmount: "",
    category: "",
    endTime: "",
    documentUrl: "",
  });

  // Image handling state
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = "dthywoita";
  const UPLOAD_PRESET = "crowd-funding-uploading";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Image Selection & Drag/Drop Logic ---
  const handleFiles = (incomingFiles) => {
    // Convert to array and filter only images
    const validFiles = Array.from(incomingFiles).filter((file) =>
      file.type.startsWith("image/")
    );

    setImages((prev) => [...prev, ...validFiles]);

    // Generate preview URLs for the UI
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Cloudinary Upload Logic ---
  const uploadImages = async () => {
    setUploading(true);
    const uploadedUrls = [];

    for (let file of images) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: data }
        );
        const json = await res.json();
        uploadedUrls.push(json.secure_url);
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
      }
    }
    return uploadedUrls;
  };

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 3) {
      alert("Please upload at least 3 images to showcase your campaign.");
      return;
    }

    try {
      const urls = await uploadImages();
      // imageUrls.map((url) => ({ filePath: url }))
      // Ensure we map Cloudinary URLs to your backend's expected structure
      const payload = {
        ...form,
        imageUrls: urls,
      };
      console.log("Sending Payload:", payload); // Verify this in your console!
      await api.post("/projects", payload);

      alert("Project submitted! It will appear on the platform once verified.");
      navigate("/");
    } catch (err) {
      console.error("Full Error Object:", err);
      alert("Error creating project. Ensure all fields are filled.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Start a Campaign</h2>
          <p className="mt-2 text-sm text-gray-600">
            Raise funds for your next big idea. All projects require admin verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Project Name & Category Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                name="pName"
                placeholder="e.g. Clean Energy Initiative"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Technology, NGO, Health"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Tell us about your project and how funds will be used..."
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Amount & Date Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Goal Amount (₹)</label>
              <input
                type="number"
                name="maxAmount"
                placeholder="e.g. 100000"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="datetime-local"
                name="endTime"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Verification Document URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification Document URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="documentUrl"
              placeholder="Google Drive or Dropbox link to your ID/Proposal"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">Ensure the link is set to "Anyone with the link can view".</p>
          </div>

          {/* Drag and Drop Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Images (Minimum 3 required)
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
                isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white"
              }`}
            >
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                {previews.map((src, index) => (
                  <div key={index} className="relative group rounded-md overflow-hidden border border-gray-200">
                    <img src={src} alt={`preview ${index}`} className="h-24 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={uploading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                uploading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {uploading ? "Uploading Images & Submitting..." : "Submit Campaign for Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;