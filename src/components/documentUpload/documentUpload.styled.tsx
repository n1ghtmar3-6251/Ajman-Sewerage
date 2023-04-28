import styled from "styled-components";

import documentSVG from "../../assets/document.svg";

import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useRef, useState } from "react";

//************************************************************

const DocumentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  border: 1px solid;
  height: 50px;
  background-color: #e5eff2;

  @media (max-width: 991px) {
    display: block !important;
    min-height: 182px ;
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 15px !important;
    }

`;
//margin-bottom: 10px;

//border: 1px solid ${props => props.exists ? "black" : "orange"} ;
interface Props {
  flex: boolean;
}
const DocumentLeading = styled.img`
  flex: 1;
  align-items: start;
  justify-content: start;
  padding-top: 10px;
  padding-bottom: 10px;

  @media (max-width: 991px) {
    padding-left: 2.8%;
    }
`;

const DocumentTextWrapper = styled.div<Props>`
  flex: ${(flex) => (flex ? 6 : 3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: start;
  margin-top: auto;
  margin-bottom: auto;

  // @media (max-width: 991px) {
  //   display: block !important;
  //   min-height: 200px ;
  //   padding-left: 0px;
  //   padding-right: 0px;
  //   margin-bottom: 15px !important;
  //   }


`;

const DocumentMainText = styled.div`
  font-size: 16px;
  font-weight: bold;
  align-self: start;

  @media (max-width: 991px) {
    padding-left: 3.5%;
    }

`;

const DocumentSubText = styled.div`
  font-size: 14px;
  align-self: start;

  @media (max-width: 991px) {
    padding-left: 3.5%;
    }
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

  @media (max-width: 991px) {
    width: 100%;
    
    }
`;

// const DocumentFileButtonOLD = styled.input.attrs({
//     type: 'file'
//   })`
// color: transparent;
//   :-webkit-file-upload-button {
//     visibility: hidden;
//   }

//   &:before{
//     content: 'Choose File';
//     display: inline-block;
//     background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
//     background: linear-gradient(top, #f9f9f9, #e3e3e3);
//     border: 1px solid #999;
//     border-radius: 3px;
//     padding: 5px 8px;
//     outline: none;
//     white-space: nowrap;
//     -webkit-user-select: none;
//     cursor: pointer;
//   }
// `;

const DocumentFileButton = styled.input.attrs({
  type: "file",
  accept: "application/pdf",
})`
  display: none;
  
`;



const DocumentButton = styled.button`
  box-sizing: border-box;
  color: #101e8e;
  background-color: #fff;
  border: 1px solid #101e8e;
  width: 144px;
  height: 36px;
  margin-right: 10px;
  font-weight: 700;

  @media (max-width: 991px) {
    width: 100%;
    
    margin-left: 3.5%;
    margin-right: 3.3%;
    margin-top: 10px;
    }
`;

const DocumentSize = styled.span`
  font-size: 16px;
  align-self: start;
`;

export const Document = ({
  exists,
  mainText,
  subText,
  name,
  size,
  inputName,
  onChange,
}: {
  exists: Boolean;
  mainText: string;
  subText: string;
  name?: String | undefined;
  size?: String | undefined;
  inputName: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [documentName, setDocumentName] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.files![0].name);

    onChange!(e);
  };

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 991);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [language, setLanguage] =  useState<any>()

  useEffect(()=>{
    const reciveLanguage:any = localStorage.getItem('LanguageChange');
    const reciveLanguage1:any = JSON.parse(reciveLanguage)
    setLanguage(reciveLanguage1)
  })

  return (
    <>
      
        <DocumentWrapper>
          <DocumentLeading src={documentSVG} />

          <DocumentTextWrapper flex={name ? false : true}>
            <DocumentMainText>{mainText}</DocumentMainText>
            <DocumentSubText>{subText}</DocumentSubText>
          </DocumentTextWrapper>

          {name || documentName ? (
            <DocumentName>{name || documentName}</DocumentName>
          ) : null}

          <DocumentTrailing>
            {exists ? (
              <>
                <DocumentSize>{size + " MB"}</DocumentSize>
                <DownloadIcon />
              </>
            ) : (
              <>
                <DocumentFileButton
                  ref={inputRef}
                  name={inputName}
                  onChange={handleChange}
                />
                <DocumentButton onClick={handleClick}>
                {language?.result?.cm_choosefile ? language?.result?.cm_choosefile.label:'CHOOSE FILE' }
                </DocumentButton>
              </>
            )}
          </DocumentTrailing>
        </DocumentWrapper>
     
    </>
  );
};

export const DocumentList = ({ list }: { list: Object[] }) => {};
