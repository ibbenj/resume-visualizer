import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Graphics from './Graphics.js'
import Resume from './Resume.js'

// Toggle between Text and PDF mode
function Toggle({isPDF, togglePDF}) {
    return (
        <Button variant="secondary" onClick={togglePDF}>{isPDF ? "Switch to Text Field" : "Switch to PDF"}</Button>
    )
}

// Resume info and Graphics
function Analysis({textField, file, isPDF}){
    return( <>
        <Resume textField={textField} file={file} isPDF={isPDF}/>
        {!isPDF ? <Graphics textField={textField}/> : <></>}
    </> )
}


function UploadPage() {
    const [isPDF, setIsPDF] = useState(false);

    function togglePDF(){
        setIsPDF(!isPDF)
    }

    // Store both current state and final state once value is finalized
    const [textField, setTextField] = useState("");
    const [finalText, setFinalText] = useState("N/A");
    const [preFile, setPreFile] = useState(["N/A","0"])
    const [file, setFile] = useState(["N/A","0"])

    const analyzeResume = () => {
        if(isPDF){
            setFile(preFile)
        } else {
            setFinalText(textField)
        }
    }

    const updateText = (e) => {
        if(isPDF){
            const fileInfo = e.target.files[0]
            setPreFile([fileInfo.name, String(fileInfo.size)])
        } else{
            setTextField(e.target.value)
        }
    }

    return (
        <>
            <br/>
            <Stack gap={4}>
                { isPDF ? (<input name="pdf-resume" type="file" accept=".pdf" onChange={updateText}/>) : (<textarea name="text-resume" onChange={updateText}/>)}
                <Stack direction="horizontal" gap={4}>
                    <Toggle isPDF={isPDF} togglePDF={togglePDF} />
                    <Button variant="primary" onClick={analyzeResume}>Analyze Resume</Button>
                </Stack>
                <br/>
                <Analysis textField={finalText} file={file} isPDF={isPDF} />
            </Stack>
            
        </>
    );
}

export default UploadPage;
