'use client'
import React from 'react'

const fileHandler = async () =>{
    try {
    const selectedFile = e.target.files[0]

    if (!selectedFile) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

      const formData = new FormData();
      formData.append('file', selectedFile)

      const res = await fetch('api/upload', {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      alert(result.message)
      
    } catch (error) {
      console.log(error.message)
    }
}

const FileUpload = () => {
  return (
    <div 
    className="text-black bg-white text-2xl flex flex-col items-center gap-2 border-4 cursor-pointer border-black p-4 rounded-2xl hover:bg-blue-300"
    onClick={fileHandler}
    >
      <i className="ri-upload-2-line"></i>
      <h3 className="text-lg font-medium">Upload your PDF file</h3>
    </div>
  )
}

export default FileUpload
