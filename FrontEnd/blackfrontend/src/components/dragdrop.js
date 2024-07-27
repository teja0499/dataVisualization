import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import Home from './Home';
import Loader from './Loader';

export default function DragDrop() {
    const [files, setFiles] = useState([]);
    const [nextpage,setNextpage]=useState(false)

    const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const { files } = event.dataTransfer;
      if (files.length) {
        setFiles([...files]); 
      }
    };
  
    const handleFileChange = (event) => {
      const { files } = event.target;
      if (files.length) {
        setFiles([...files]);
      }
    };

    const removeFile=(name)=>{
        const newFile=files.filter((file)=>{
            if(file.name!==name)return file;
        })
        setFiles(newFile)
    }
    const submit=async ()=>{
      try {
        if(files.length!==0)
          {
            console.log("start");
            const formData = new FormData();
            const file = files[0];
            formData.append('file', file);
            const response = await axios.post('http://localhost:3001/data/upload',formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }}
            );
            console.log("end");
             setNextpage(true);  
          }
      } catch (error) {
        console.log(error);
      }
       
    }
  
    return (
   <> 
    {/* <ToastContainer /> */}
  {nextpage ? <Home/>: <><div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    width: '300px',
                    margin: '20px auto',
                    textAlign: 'center',
                }}
            >
               
                <p>Drag and drop files here, or click to select files</p>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput" />
                <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                    Browse Files
                </label>
              
                    {files.map((file, index) => (
                        <div><li key={index}>{file.name}</li>
                            <span style={{ cursor: 'pointer' }} onClick={() => { removeFile(file.name); } }>X</span></div>
                    ))}
              
            </div>
            <button className='btn btn-outline-success' onClick={submit}>Submit</button></>
      }
      </>  
    );
}
