import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../server/FirebaseConfig.js';

import '../index.css';
import './FileListItem.css';


function FileListItem(props) {
    const [fileURL, setFileURL] = useState(props.fileURL);

    getDownloadURL(ref(storage, fileURL)).then((url) => {
       setFileURL(url);
    })

    return (
        <div className='divMainStylized'>
            <Document id="document_fileListItem_title" file={fileURL}/>
            <h2 id='h2_fileListItem_title'>{props.title}</h2>
            <h3 id='h3_fileListItem_description'>{props.description}</h3>
        </div>
    )
}

export default FileListItem;