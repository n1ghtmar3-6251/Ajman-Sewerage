import styled, {keyframes} from "styled-components";
import spinnerSVG from "../assets/spinner.svg"

const rotation = keyframes`
    100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    }
`

export const SpinnerRaw = styled.img.attrs({ 
    src: spinnerSVG,
  })`
    animation:${rotation} 2s linear infinite;
`;

export const Spinner = ()=>{
    return (
        <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <SpinnerRaw/>
        </div>
    )
}