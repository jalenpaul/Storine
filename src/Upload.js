import React, { useState } from 'react';

import { authenticateAccountStatus, firestore, addDoc, setDoc, ref, storage, uploadBytes, doc, collection } from './server/FirebaseConfig';

import './Upload.css';

import { v4 as uuidv4 } from 'uuid';

function Upload() {
    const titleMaxLength = 25;
    const descriptionMaxLength = 300;
    const [fileValue, setFileValue] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [intErrorLevel, setIntErrorLevel] = useState(0);
    const [user, setUser] = useState(sessionStorage.getItem('UID'));

    authenticateAccountStatus();

    const titleColorStyle = {
        color: title.length > titleMaxLength? 'red' : 'gray'
    };

    const descriptionColorStyle = {
        color: description.length > descriptionMaxLength? 'red' : 'gray'
    };

    function handleTitleChange(event) {
        event.preventDefault();
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        event.preventDefault();
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (title.trim() === '' || description.trim() === '' || fileValue == null) {
            alert('Missing either title, description, or pdf file.');
        } else if (!user) {
            alert('Please login under the "Profile" tab before you upload');
        } else {
            return new Promise(function(resolve, reject) {
                switch (intErrorLevel) {
    
                    case 1: 
                        uploadPost(resolve, reject);
                        break;
    
                    default:
                        uploadFile(resolve, reject);
                        break;
                }
            });
        }
    };

    function uploadFile(resolve, reject) {
        const storageRef = ref(storage, 'Files/' + uuidv4() + ".pdf");
        uploadBytes(storageRef, fileValue).then((snapshot) => {
            const docRef = snapshot.ref;
            if (docRef == null) {
                alert("Error while uploadiing pdf file.");
                reject();
            } else {
                uploadPost(resolve, reject, docRef.toString());
            }
        });
    }

    function uploadPost(resolve, reject, docRef) {
        addDoc(collection(firestore, "Files"), {
            ownerUID: user,
            fileLocation: docRef,
            title: title,
            description: description,
        }).then(() => {
            alert("Upload Successful");
            setFileValue(null);
            setTitle('');
            setDescription('');
            resolve();
        }).catch((error) => {
            alert("Error while uploading post.");
            console.log(error);
            setIntErrorLevel(1);
            reject();
        })
    }
    
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    
    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    
    // triggers when file is dropped, and checks if file is below 50kb
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        var file = e.dataTransfer.files[0];
        if (file && (file.size / 1024) < 100) {
            if (file.type === 'application/pdf') {
                setFileValue(file);
            } else {
                alert('Can only upload a PDF');
            }
        } else {
            alert('File is either unavailable or too large (> 100kb).')
        }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        var file = e.target.files[0];
        if (file && (file.size / 1024) < 100) {
            if (file.type === 'application/pdf') {
                setFileValue(file);
            } else {
                alert('Can only upload a PDF');
            }
        } else {
            alert('File is either unavailable or too large (> 100kb).')
        }
    };
    
    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <form id='div_body' onSubmit={handleSubmit}>
                <div id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <input ref={inputRef} type="file" accept=".pdf" id="input-file-upload" multiple={false} onChange={handleChange} />
                    <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                        <div>
                            <p>{fileValue == null? "Drag and drop your file here or" : fileValue.name}</p>
                            <button className="upload-button" type='button' onClick={onButtonClick}>{fileValue == null? "Upload a file" : "Change file"}</button>
                        </div> 
                    </label>
                    { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                </div>

                <div className='divTextInputs'>
                    <label htmlFor="input_title">Title</label>
                    <input type="text" id="input_title" value={title} onChange={handleTitleChange}/>
                    <h5 id='h5DescriptionLength' style={titleColorStyle}>{title.length} / {titleMaxLength}</h5>
                </div>

                <div className='divTextInputs'>
                    <label htmlFor="ta_description">Description</label>
                    <textarea type="text" id="ta_description" value={description} onChange={handleDescriptionChange} rows="10"/>
                    <h5 id='h5DescriptionLength' style={descriptionColorStyle}>{description.length} / {descriptionMaxLength}</h5>
                </div>

                <button className='BtnSubmit' onClick={handleSubmit} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Upload;