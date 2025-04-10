import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const NationalIdReader = () => {
  const [image, setImage] = useState(null); // State for the uploaded image
  const [idData, setIdData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    address: '',
    idNumber: '',
    dateOfBirth: '',
  }); // Structured data extracted from OCR
  const [isProcessing, setIsProcessing] = useState(false); // Processing state
  const [error, setError] = useState(''); // Error state

  // Handle file input change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image
  };

  // Process the image file with Tesseract.js
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image!');
      return;
    }

    setIsProcessing(true); // Set processing state
    setError('');
    setIdData({
      lastName: '',
      firstName: '',
      middleName: '',
      address: '',
      idNumber: '',
      dateOfBirth: '',
    });

    try {
      // OCR processing with Tesseract.js
      const { data: { text } } = await Tesseract.recognize(
        image,
        'eng', // Language to use
        {
          logger: (m) => console.log(m), // Log progress
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ', // Limit to alphanumeric characters
          psm: 6, // Page Segmentation Mode (best for text blocks)
          oem: 3, // OCR Engine Mode (default: 3, which uses both the neural net and traditional algorithms)
        }
      );

      extractData(text); // Extract structured data from OCR text
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false); // Stop processing
    }
  };

  // Extract structured data from raw OCR result
  const extractData = (text) => {
    console.log("OCR Output:", text); // Log OCR output for debugging

    // Refined regex patterns to capture the First Name and other data
    const lastNameMatch = text.match(/Apelyido\/Last Name\s*([A-Za-z\s]+)/i); // Last Name regex
    const firstNameMatch = text.match(/Pangalan\/First Name\s*([A-Za-z\s]+)/i); // First Name regex
    const middleNameMatch = text.match(/Pangalan\/Middle Name\s*([A-Za-z\s]+)/i); // Middle Name regex
    const addressMatch = text.match(/Tirahan\/Address\s*(.*?)(?=\n|$)/i); // Address regex
    const idNumberMatch = text.match(/Philippine Identification Number\s*([0-9]+)/i); // ID Number regex
    const dateOfBirthMatch = text.match(/Date of Birth\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/i); // Date of Birth regex

    // Set the extracted data in the state
    setIdData({
      lastName: lastNameMatch ? lastNameMatch[1].trim() : 'Not Found',
      firstName: firstNameMatch ? firstNameMatch[1].trim() : 'Not Found',
      middleName: middleNameMatch ? middleNameMatch[1].trim() : 'Not Found',
      address: addressMatch ? addressMatch[1].trim() : 'Not Found',
      idNumber: idNumberMatch ? idNumberMatch[1].trim() : 'Not Found',
      dateOfBirth: dateOfBirthMatch ? dateOfBirthMatch[1].trim() : 'Not Found',
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>National ID Reader</h1>
      <form onSubmit={handleFileUpload} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ marginRight: '10px' }} 
        />
        <button 
          type="submit" 
          disabled={isProcessing} 
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          {isProcessing ? 'Processing...' : 'Upload ID Image'}
        </button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Display Extracted Data with Labels */}
      {idData.firstName && (
        <div 
          style={{
            marginTop: '20px', 
            border: '1px solid #ccc', 
            padding: '20px', 
            borderRadius: '10px', 
            backgroundColor: 'black'
          }}
        >
          <h3>Extracted ID Information:</h3>
          <p><strong>Last Name:</strong> {idData.lastName}</p>
          <p><strong>First Name:</strong> {idData.firstName}</p>
          <p><strong>Middle Name:</strong> {idData.middleName}</p>
          <p><strong>Address:</strong> {idData.address}</p>
          <p><strong>ID Number:</strong> {idData.idNumber}</p>
          <p><strong>Date of Birth:</strong> {idData.dateOfBirth}</p>
        </div>
      )}
    </div>
  );
};

export default NationalIdReader;
