import React from "react"
import {useState, useRef} from "react";
import "./styles/FileUpload.css";
import {CloudUpload, RotateLeft} from "@material-ui/icons";
const DEFAULT_MAX_FILE_SIZE = 8388608;

//This component handles file uploads
function FileUpload({
    callback,
    setPreview,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    ...props
                    })
{
    //State to store files
    const [files,setFiles] = useState([]);
    const fileInputField = useRef(null);
    //State to store errors
    const [error,setError] = useState(null);
    let fileType;
    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const handleNewFileUpload = (e) => {

        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFiles(updatedFiles);
            setPreview(URL.createObjectURL(updatedFiles.file));
        }
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSize) {
                fileType = file.type.split("/")[0];
                //Validate files
                if(fileType === "image"){
                    setError("");
                    if (!props.multiple) {
                        return { file };
                    }
                    files[file.name] = file;
                }else{
                    setError("Only image files can be uploaded");
                }

            }else{
                setError("Please make sure your file size is less than 10mb");
            }
        }
        return { ...files };
    };

    const callUpdateFiles = (files) => {
        callback(files);
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFiles({ ...files });
        setPreview("");
        setError("");
    };

    return (
        <div>
            <div className="file-upload-container">
                <CloudUpload fontSize="large" opacity={0.25} />
                <p className="drag-drop-text">Drag & Drop</p>
                <p className="drag-drop-text small">or</p>
                <button type="button" className="upload-file-btn" onClick={handleUploadBtnClick}>
                    <span> Browse {props.multiple ? "Images" : "Image"}</span>
                </button>
                <p className="error">{error}</p>

                <input
                    className="form-field"
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...props}
                />

                <div className="file-icon-container">
                        {Object.keys(files).map((fileName) => (
                            <div
                                key={fileName}
                                className="remove-file"
                                onClick={() => removeFile(fileName)}
                            >
                                <RotateLeft />
                                <span style={{float: "right", marginInlineStart: "4px"}}>Reset</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default FileUpload;