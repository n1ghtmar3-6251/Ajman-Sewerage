import React, { FC, ReactElement } from "react";
// @ts-ignore
import happySVG from "../../assets/happy.svg";
import neutralSVG from "../../assets/neutral.svg";
import sadSVG from "../../assets/sad.svg";
import feedbackLogo from "../../assets/feedbackLogo.png";
import axios from "axios";



export const ExperienceFeedback = ({modalOpen, setModalOpen}) => {

    let baseUrl = "http://213.42.234.23:8901/CustomerSelfServiceAPI/";

    const happyface = (rating)=>{
      console.log("rating", rating)
        axios.post(
            `${baseUrl}api/survey/experience`,
            { 
                "deliveryChannelId":"4",  "serviceId":"1", 
                "ratingsId":rating,   "userId":localStorage.getItem("userId") , 
                "transactionID":"9924998028", 
                "language":"EN",   "agentName":null, 
                "deviceVersion":"null",   "userName":localStorage.getItem("username")
             },
            {
              headers: {
                CurrentLanguage: "en-US",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            // data: res ? res.data : null,
            console.log("first",res)
        //    setExperience( res.data.result.surveyExperienceItemId)
    
          })
          .catch((error) => {
            return { statusCode: error };
          });
       }

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
                    <img src={happySVG} onClick={()=>{
                      happyface(1)
                      setModalOpen(false)
                    }} />
                    <p>Happy</p>
                </div>

                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <img src={neutralSVG} onClick={()=>{
                      happyface(2)
                      setModalOpen(false)
                    }} />
                    <p>Neutral</p>
                </div>

                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <img src={sadSVG} onClick={()=>{
                      happyface(3)
                      setModalOpen(false)
                    }} />
                    <p>Unhappy</p>
                </div>
            </div>
        </div>

    </div>
    </div>
  )
};

export default ExperienceFeedback;
