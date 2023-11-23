export default function Resume({textField, file, isPDF}){
    return(
        <>
            <h3>Resume:</h3>
            { isPDF ?
                <>
                    <p>File Name : {file[0]}</p>
                    <p>File Size : {file[1]}</p>
                </>
                :
                (<p>{textField}</p>)
            }
        </>
    )
}