import React, { useState } from "react";
import { UploadCloud, XCircle } from "lucide-react";

function PayrollUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const allowedFileTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      if (!allowedFileTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a CSV or Excel file.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("payrollFile", file);

    try {
      setUploading(true);
      const response = await fetch("http://127.0.0.1:8000/api/payroll/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token if needed
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert("File uploaded successfully!");
        setFile(null);
      } else {
        alert(`Upload failed: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Payroll File</h2>

        {/* Custom File Upload */}
        <div className="relative border border-gray-300 p-4 rounded-lg flex flex-col items-center">
          <UploadCloud className="text-blue-500 w-10 h-10 mb-2" />
          <label className="cursor-pointer text-blue-600 font-semibold hover:underline">
            Click to select a file
            <input type="file" className="hidden" onChange={handleFileChange} accept=".csv, .xlsx" />
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Display Selected File */}
        {file && (
          <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded">
            <div>
              <p className="text-gray-700 text-sm truncate">{file.name}</p>
              <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
            <button onClick={handleClearFile} className="text-red-500 hover:text-red-700">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
}

export default PayrollUpload;
