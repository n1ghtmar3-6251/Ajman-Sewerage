import styled from "styled-components";
import documentSVG from "../../assets/document.svg";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef, useState } from "react";
import RequestEngine from "../../core/RequestEngine";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//************************************************************

const DocumentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  border: 1px solid ;
  height: 65px;
  background-color: #E5EFF2;
  
  @media (min-width: 991px) {
    width: 111%;
  }

`;

interface Props {
  flex: boolean;
}
const DocumentLeading = styled.img`
  flex: 1;
  align-items: start;
  justify-content: start;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const DocumentTextWrapper = styled.div<Props>`
  flex: ${flex => flex ? 6 : 3};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: start;
  margin-top: auto;
  margin-bottom: auto;
`;

const DocumentMainText = styled.div`
  font-size: 16px;
  font-weight: bold;
  align-self: start;
`;

const DocumentSubText = styled.div`
  font-size: 14px;
  align-self: start;
  font-weight:300;
`;

const DocumentName = styled.div`
  flex: 3;
  font-size: 12px;
  align-items: center;
  margin: auto;
`;

const DocumentTrailing = styled.div`
  flex: 3;
  display: flex;
  margin: auto;
  flex-direction: row;
  width: 25%;
  justify-content: center;
  align-items: center;
  color: #101e8e;
  padding: 0px;

  @media (min-width: 991px) {
    justify-content: end;
    padding: 10px;
  }


`;

const DocumentFileButton = styled.input.attrs({
  type: 'file',
  accept: "application/pdf"
})`
  display:none;
`;

const DocumentButton = styled.button`
  box-sizing: border-box;
  color: #101E8E;
  background-color: #fff;
  border: 1px solid #101E8E;
  width: 144px;
  height: 36px;
  margin-right: 10px;
  font-weight: 700;
`;

const DocumentSize = styled.p`
    font-size: 16px;
    align-self: start;
`;





export const DocumentDownload = ({ exists, mainText, subText, name, size, inputName }: { exists: Boolean, mainText: string, subText: string, name?: String | undefined, size?: String | undefined, inputName: string }) => {

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [documentName, setDocumentName] = useState<string | null>(null)
  const [errorWaiting, setErrorWaiting] = useState<string>('')
  const [error, setError] = useState(null)

  const [errorPDF, setErrorPDF] = useState(false);


  const handleError = (response: any) => {
    setError(response.data.error);
  }
  
  const handleClick = () => {
    let engine = new RequestEngine();
    engine.exportPDF(subText, inputName, handleError);
  }

console.log("inputName 1", inputName)

const notify = () => toast("Failed to download PDF!");

  const downloadPDF = async (inputName1:any) => {
    try {
      const response = await fetch(inputName1);
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = subText;
      setErrorWaiting('')
      link.click();
    } catch (error) {
      setErrorPDF(true);
      setErrorWaiting('')
      toast.error('Failed to download PDF', { autoClose: 3000 });
    }
  };

  return (

    <>
    <DocumentWrapper>
      <DocumentLeading src={documentSVG} />
      <DocumentTextWrapper flex={name ? false : true}>
        <DocumentMainText>{mainText}</DocumentMainText>
        <DocumentSubText>{subText}</DocumentSubText>
      </DocumentTextWrapper>
      {name || documentName ? <DocumentName>{name || documentName}</DocumentName> : null}
      {error && <div style={{color:'red'}}><i>{error}</i></div>}
      <DocumentTrailing>
        {exists &&   <div onClick={()=>{
          handleClick()
         
        }}>  
        
<div onClick={()=>{
downloadPDF(inputName)
setErrorWaiting('Please, wait.')
}}>

        <DownloadIcon />

        </div>

        </div>}
        <ToastContainer />
      </DocumentTrailing>



    </DocumentWrapper>
    {
  errorPDF === true ? '' : ''
}
{
  <p style={{fontWeight:"500"}}> {errorWaiting}  </p>
}

    </>

  )
}

export const DocumentList = ({ list }: { list: Object[] }) => {


}
