import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs, } from 'react-pdf';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../server/FirebaseConfig.js';

//removes extra space below pdf when renderTextLayer is false
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

import '../index.css';
import './FileListItem.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;



function FileListItem(props) {
    const [fileURL, setFileURL] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const file = props.file;

    useEffect(() => {
        getDownloadURL(ref(storage, file.fileLocation)).then((url) => {
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
    }, [file]);

    function fileItemClick() {
        sessionStorage.setItem('document', file);
    }

    return (
        <div id='div_fileListItem' className='divMainStylized' onClick={fileItemClick}>
            <div className='div_fileListItem_docContainer'>
                {isLoading?
                    <h2>Loading</h2>
                :
                    <Document id="document_fileListItem_title" file={fileURL}>
                        <Page pageNumber={1} renderTextLayer={false}  width={350} height={250}/>
                    </Document>
                }
            </div>
            <div id='div_fileListItem_textContainer'>
                <h3 id='h2_fileListItem_title'>{file.title}</h3>
                <h4 id='h3_fileListItem_description'>{file.description}</h4>
            </div>
        </div>
    )
}

export default FileListItem;