import React, { useRef, useState } from "react";
import "./styles.css";
import { FaImage } from "react-icons/fa"; 
const UploadButton = ({setImage,image}) => {
    const fileInputRef = useRef(null); 
    const [imageName, setImageName] = useState('');  
  
    const handleButtonClick = () => {
      fileInputRef.current.click();  
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];  
      if (file) {
        setImage(URL.createObjectURL(file));  
        setImageName(file.name);  
      }
    };
  return (
    <div>
      <button className="upload-button" onClick={handleButtonClick}>
        <FaImage className="upload-icon" />
        Upload Image
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      {image && (
        <div className="image-preview">
          <p className="image-title">{imageName}</p>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
