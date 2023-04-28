import React, { FC, ReactElement } from "react";
// @ts-ignore
import happySVG from "../../assets/happy.svg";
import neutralSVG from "../../assets/neutral.svg";
import sadSVG from "../../assets/sad.svg";
import feedbackLogo from "../../assets/feedbackLogo.png";


export const ExperienceFeedback: FC = (): ReactElement => {
  return (
    <div style={{display: 'flex'}}>
    <div style={{height:'35vh', width: '400px', margin: 'auto'}}>
        <div style={{height:'81px', backgroundColor: '#101E8E', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={feedbackLogo}/>
        </div>

        <div style={{backgroundColor: '#fff',height: 'inherit', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px'}}>
            <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '24px'}}>How was you experience ?</h3>

            <div style={{display: 'flex', flexDirection: 'row', gap: '50px', color: '#101E8E', fontWeight: 'bold', fontSize: '18px' }}>
                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <img src={happySVG} />
                    <p>Happy</p>
                </div>

                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <img src={neutralSVG} />
                    <p>Neutral</p>
                </div>

                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <img src={sadSVG} />
                    <p>Unhappy</p>
                </div>
            </div>
        </div>

    </div>
    </div>
  )
};

export default ExperienceFeedback;
