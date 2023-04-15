import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import '../index.css';
import './FileListItem.css';


function FileListItem(props) {
    return (
        <div className='divMainStylized'>
            <Document id="document_fileListItem_title" file="path/to/your/pdf.pdf"/>
            <h2 id='h2_fileListItem_title'>{props.title}</h2>
            <h3 id='h3_fileListItem_description'>{props.description}</h3>
        </div>
    )
}

export default FileListItem;