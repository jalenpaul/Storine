import React, { useState } from 'react';
import { Document } from 'react-pdf';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../server/FirebaseConfig.js';

import '../index.css';
import './FileListItem.css';


function FileListItem(props) {
    const [fileURL, setFileURL] = useState(props.fileURL);
    const [isLoading, setIsLoading] = useState(true);

    if (fileURL != null) {
        getDownloadURL(ref(storage, props.fileURL)).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
                setFileURL(blob);
                setIsLoading(false);
            };
            xhr.open('GET', url);
            xhr.send();
        }).catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
        
              // ...
        
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
          });
    } else {
        alert("error");
    }

    return (
        <div className='divMainStylized'>
            <h2>{fileURL}</h2>
            {isLoading?
                <h2>Loading</h2>
            :
                <Document id="document_fileListItem_title" file={fileURL}/>
            }
            <h2 id='h2_fileListItem_title'>{props.title}</h2>
            <h3 id='h3_fileListItem_description'>{props.description}</h3>
        </div>
    )
}

export default FileListItem;