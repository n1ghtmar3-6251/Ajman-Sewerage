import React, { useEffect, useState } from "react";

// @ts-ignore
import happySVG from "../../assets/happy.svg";
import neutralSVG from "../../assets/neutral.svg";
import sadSVG from "../../assets/sad.svg";
import feedbackLogo from "../../assets/feedbackLogo.png";

import happySelectedSVG from "../../assets/happysmileselected.png";
import neutralselected from "../../assets/neutralselected.png";
import sadselected from "../../assets/sadselected.png";

import axios from "axios";
import "./experience-feedback.css";

export const ExperienceFeedback = ({ modalOpen, setModalOpen }) => {
  //
  const [happyFaceNum, setHappyFaceNum] = useState(0);
  const [shareComments, setShareCommit] = useState(0);
  const [thanksPage, setThanksPage] = useState(0);
  const [happyFaceNum1, setHappyFaceNum1] = useState(0);
  const [happyFaceNum2, setHappyFaceNum2] = useState(0);
  const [happyFaceNum3, setHappyFaceNum3] = useState(0);
  const [happyFaceComment, setHappyFaceComment] = useState(0);
  const [experience, setExperience] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question1, setQuestion1] = useState();
  const [question2, setQuestion2] = useState();
  const [question3, setQuestion3] = useState();
  const [happySelected, setHappaySelected] = useState(0);
  const [sadSelected, setSadSelected] = useState(0);
  const [neturalSelected, setNeturalSelected] = useState(0);

  const [happySelected1, setHappaySelected1] = useState(0);
  const [sadSelected1, setSadSelected1] = useState(0);
  const [neturalSelected1, setNeturalSelected1] = useState(0);

  const [happySelected2, setHappaySelected2] = useState(0);
  const [sadSelected2, setSadSelected2] = useState(0);
  const [neturalSelected2, setNeturalSelected2] = useState(0);
  const [mobileNum, setMobileNum] = useState(0);
  const [comments, setComments] = useState(0);

  let baseUrl = "http://213.42.234.23:8901/CustomerSelfServiceAPI/";
  const currentLanguage = localStorage.getItem("currentLanguage") || 'en-US';

  useEffect(() => {
    if (modalOpen === false) {
      setHappyFaceNum(0);
      setShareCommit(0);
      setThanksPage(0);
    }

    if (shareComments === 1) {
      setHappyFaceNum(11);
      // setShareCommit(0)
    }

    if (happyFaceNum === 15) {
      setHappyFaceNum(15);
      setShareCommit(0);
    }
    if (thanksPage === 1) {
      setHappyFaceNum(10);
      setShareCommit(0);
    }
    if (thanksPage === 10) {
      setModalOpen(false);
    }
  }, [ modalOpen,shareComments, happyFaceNum, thanksPage]);
  const happycomment = () => {
    axios
      .post(
        `${baseUrl}api/survey/comments`,
        {
          mobileNumber: mobileNum,
          overallExperienceId: experience,
          comments: comments,
        },
        {
          headers: {
            CurrentLanguage: currentLanguage ,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // data: res ? res.data : null,

        setExperience(res.data.result.surveyExperienceItemId);
      })
      .catch((error) => {
        return { statusCode: error };
      });
  };

  const happyquestion = () => {
    axios
      .post(
        `${baseUrl}api/survey/questions`,

        [
          {
            overallExperienceId: experience,
            questionId: question1,
            ratingId: happyFaceNum1,
          },
          {
            overallExperienceId: experience,
            questionId: question2,
            ratingId: happyFaceNum2,
          },
          {
            overallExperienceId: experience,
            questionId: question3,
            ratingId: happyFaceNum3,
          },
        ],
        {
          headers: {
            CurrentLanguage: currentLanguage ,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => ({
        data: res ? res.data : null,
      }))
      .catch((error) => {
        return { statusCode: error };
      });
  };

  const happyface = (rating) => {
    axios
      .post(
        `${baseUrl}api/survey/experience`,
        {
          deliveryChannelId: "5",
          serviceId: "1",
          ratingsId: rating,
          userId: localStorage.getItem("userId"),
          // transactionID: "9924998028",
          language: currentLanguage,
          agentName: null,
          deviceVersion: "null",
          userName: localStorage.getItem("username"),
        },
        {
          headers: {
            CurrentLanguage: "en-US",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setExperience(res.data.result.surveyExperienceItemId);
      })
      .catch((error) => {
        return { statusCode: error };
      });

    getQuestion();
  };

  const getQuestion = async () => {
    await axios
      .get(`${baseUrl}api/survey/questions/4/1`, {
        headers: {
          CurrentLanguage: currentLanguage,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setQuestions(res?.data?.result);
      })
      .catch((error) => {
        return { statusCode: error };
      });
  };

  useEffect(() => {
    if (questions.length > 0) {
      setQuestion1(questions[0]?.surveyQuestionId);
      setQuestion2(questions[1]?.surveyQuestionId);
      setQuestion3(questions[2]?.surveyQuestionId);
    }
  }, [questions]);

  return (
    <>
      {happyFaceNum === 1 ||
      happyFaceNum === 2 ||
      happyFaceNum === 3 ||
      happyFaceNum === 15 ? (
        <div style={{ display: "flex" }}>
          <div
            className="experience-feedback-width"
            style={{ margin: "auto" }}
          >
            <div
              style={{
                height: "81px",
                backgroundColor: "#101E8E",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={feedbackLogo} />
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                height: "auto",
                // overflowY: "scroll",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "7px",
                padding: "30px 0px",
              }}
            >
              <div
                className=""
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "22.08px",
                    height: "22.08px",
                    marginRight: "10px",
                  }}
                  src={
                    happyFaceNum === 1
                      ? happySVG
                      : happyFaceNum === 2
                      ? neutralSVG
                      : sadSVG
                  }
                  alt=""
                />
                <p
                  className="mb-0 "
                  style={{
                    fontSize: "16px",
                    color: "#101E8E",
                    fontWeight: "bolder",
                  }}
                >
                  What made you neutral?
                </p>
              </div>

              <div
                style={{
                  width: "80%",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "between",
                }}
              >
                <div style={{ width: "50%", display: "flex" }}>
                  <p
                    className=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#101e8e",
                    }}
                  >
                    {questions.length > 0
                      ? currentLanguage == "en-US"
                        ? questions[0].surveyQuestionEN
                        : currentLanguage == "ar"
                        ? questions[0].surveyQuestionAR
                        : currentLanguage == "hi"
                        ? questions[0].surveyQuestionHI
                        : null
                      : null}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    width: "50%",
                    alignContent: "center",
                  }}
                >
                  <img
                    onClick={() => {
                      setHappyFaceNum1(1);
                      setHappaySelected(1);
                      setNeturalSelected(0);
                      setSadSelected(0);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={happySelected ? happySelectedSVG : happySVG}
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setHappyFaceNum1(2);
                      setHappaySelected(0);
                      setNeturalSelected(1);
                      setSadSelected(0);
                      // setHappaySelected(1)
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={neturalSelected ? neutralselected : neutralSVG}
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setHappyFaceNum1(3);
                      setHappaySelected(0);
                      setNeturalSelected(0);
                      setSadSelected(1);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={sadSelected ? sadselected : sadSVG}
                    alt=""
                  />
                </div>
              </div>

              <hr
                style={{
                  width: "80%",
                  borderBottom: "2px dotted #101e8e",
                  borderTop: "none",
                }}
              />

              <div
                style={{
                  width: "80%",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "between",
                }}
              >
                <div style={{ width: "70%", display: "flex" }}>
                  <p
                    className=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#101e8e",
                    }}
                  >
                    {questions.length > 0
                      ? currentLanguage == "en-US"
                        ? questions[1].surveyQuestionEN
                        : currentLanguage == "ar"
                        ? questions[1].surveyQuestionAR
                        : currentLanguage == "hi"
                        ? questions[1].surveyQuestionHI
                        : null
                      : null}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    width: "30%",
                    alignContent: "center",
                  }}
                >
                  <img
                    onClick={() => {
                      setHappyFaceNum2(1);
                      setHappaySelected1(1);
                      setNeturalSelected1(0);
                      setSadSelected1(0);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={happySelected1 ? happySelectedSVG : happySVG}
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setHappyFaceNum2(2);
                      setHappaySelected1(0);
                      setNeturalSelected1(1);
                      setSadSelected1(0);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={neturalSelected1 ? neutralselected : neutralSVG}
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setHappyFaceNum2(3);
                      setHappaySelected1(0);
                      setNeturalSelected1(0);
                      setSadSelected1(1);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={sadSelected1 ? sadselected : sadSVG}
                    alt=""
                  />
                </div>
              </div>

              <hr
                style={{
                  width: "80%",
                  borderBottom: "2px dotted #101e8e ",
                  borderTop: "none",
                }}
              />

              <div
                style={{
                  width: "80%",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "between",
                }}
              >
                <div style={{ width: "70%", display: "flex" }}>
                  <p
                    className=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#101e8e",
                    }}
                  >
                    {questions.length > 0
                      ? currentLanguage == "en-US"
                        ? questions[2].surveyQuestionEN
                        : currentLanguage == "ar"
                        ? questions[2].surveyQuestionAR
                        : currentLanguage == "hi"
                        ? questions[2].surveyQuestionHI
                        : null
                      : null}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    width: "30%",
                    alignContent: "center",
                  }}
                >
                  <img
                    onClick={() => {
                      setHappyFaceNum3(1);
                      setHappaySelected2(1);
                      setNeturalSelected2(0);
                      setSadSelected2(0);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={happySelected2 ? happySelectedSVG : happySVG}
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setHappyFaceNum3(2);

                      setHappaySelected2(0);
                      setNeturalSelected2(1);
                      setSadSelected2(0);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={neturalSelected2 ? neutralselected : neutralSVG}
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setHappyFaceNum3(3);

                      setHappaySelected2(0);
                      setNeturalSelected2(0);
                      setSadSelected2(1);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      marginLeft: "10px",
                    }}
                    src={sadSelected2 ? sadselected : sadSVG}
                    alt=""
                  />
                </div>
              </div>

              <hr
                style={{
                  width: "80%",
                  borderTop: "none",
                  borderBottom: "1px solid #101e8e ",
                }}
              />

              <div style={{ width: "80%" }}>
                <div className="question-all-btn" style={{}}>
                  <div className="question-all-btn-back">
                    <div
                      className="back-full-screen"
                      style={{
                        width: "93px",
                        height: "50px",
                        borderRadius: "0px",
                        color: "#101E8E",
                        backgroundColor: "white",
                        border: "2px solid #101E8E",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "bolder",
                      }}
                      onClick={() => {
                        setHappyFaceNum(0);
                      }}
                    >
                      BACK
                    </div>
                  </div>

                  <div
                    className="question-bottom-btn"
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      className="question-bottom-btn-add-comment"
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "0px",
                        color: "#101E8E",
                        backgroundColor: "white",
                        border: "2px solid #101E8E",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "bolder",
                      }}
                      onClick={() => {
                        setShareCommit(1);
                      }}
                    >
                      ADD COMMENT
                    </div>
                    <button
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "0px",
                        outline: "none",
                        border: "1px solid #101E8E",
                        color: "white",
                        backgroundColor: "#101E8E",
                        fontWeight: "bolder",
                      }}
                      onClick={() => {
                        happyquestion();
                        // setOpen(false)
                        setThanksPage(1);
                      }}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* comment  */}
      {shareComments === 1 ? (
        <div style={{ display: "flex" }}>
          <div
            className="experience-feedback-width"
            style={{  margin: "auto" }}
          >
            <div
              style={{
                height: "81px",
                backgroundColor: "#101E8E",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={feedbackLogo} />
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                minHeight: "inherit",
                // overflowY: "scroll",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: "30px 0px",
              }}
            >
              <div className="">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={
                    happyFaceNum === 1
                      ? happySVG
                      : happyFaceNum === 2
                      ? neutralSVG
                      : sadSVG
                  }
                  alt=""
                />
                <p
                  className="mb-0 "
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#101E8E",
                    fontWeight: "bolder",
                  }}
                >
                  What made you happy?
                </p>
              </div>

              <div style={{ width: "80%" }}>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <p
                    className=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#101E8E",
                    }}
                  >
                    Tell Us More
                  </p>
                </div>
                <textarea
                  name=""
                  id=""
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "3px",
                    backgroundColor: "rgba(229, 239, 242, 0.7)",
                    outline: "none",
                    color: "#101E8E",
                    border: "none",
                  }}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <p
                    className=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#101E8E",
                    }}
                  >
                    Mobile Number (optional)
                  </p>
                </div>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "3px",
                    backgroundColor: "rgba(229, 239, 242, 0.7)",
                    outline: "none",
                    border: "none",
                  }}
                  onChange={(e) => setMobileNum(e.target.value)}
                />
              </div>

              <hr
                style={{
                  width: "80%",
                  backgroundColor: "#101E8E",
                  color: "#101E8E",
                }}
              />

              <div style={{ width: "80%" }}>
                <div className="question-all-btn" style={{}}>
                  <div className="question-all-btn-back">
                    <div
                      className="back-full-screen"
                      style={{
                        width: "93px",
                        height: "50px",
                        borderRadius: "0px",
                        color: "#101E8E",
                        backgroundColor: "white",
                        border: "2px solid #101E8E",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "bolder",
                      }}
                      onClick={() => {
                        setHappyFaceNum(15);
                      }}
                    >
                      BACK
                    </div>
                  </div>

                  <div
                    className="question-bottom-btn"
                    style={{
                      width: "100%",
                    }}
                  >
                    <button
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "0px",
                        outline: "none",
                        border: "1px solid #101E8E",
                        color: "white",
                        backgroundColor: "#101E8E",
                      }}
                      onClick={() => {
                        happyquestion();
                        happycomment();
                        setModalOpen(false);
                        setThanksPage(1);
                      }}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* question */}

      {happyFaceNum === 0 ? (
        <div style={{ display: "flex" }}>
          <div
            className="experience-feedback-width"
            style={{  margin: "auto" }}
          >
            <div
              style={{
                height: "81px",
                backgroundColor: "#101E8E",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={feedbackLogo} />
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                height: "inherit",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                padding:"10px 0"
              }}
            >
              <h3
                style={{
                  margin: "15px 0",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#101E8E",
                }}
              >
                How was you experience ?
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                  color: "#101E8E",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={happySVG}
                    onClick={() => {
                      happyface(1);
                      // setOpen(false)
                      setHappyFaceNum(1);
                    }}
                  />
                  <p>Happy</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={neutralSVG}
                    onClick={() => {
                      happyface(2);
                      // setOpen(false)
                      setHappyFaceNum(2);
                    }}
                  />
                  <p>Neutral</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={sadSVG}
                    onClick={() => {
                      happyface(3);
                      setHappyFaceNum(3);
                      // setOpen(false)
                    }}
                  />
                  <p>Unhappy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* thanks  */}
      {thanksPage === 1 ? (
        <div style={{ display: "flex" }}>
          <div
            className="experience-feedback-width"
            style={{  margin: "auto" }}
          >
            <div
              style={{
                height: "81px",
                backgroundColor: "#101E8E",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={feedbackLogo} />
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                height: "40vh",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                padding: "30px 0px",
              }}
            >
              <div
                className=""
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  className="mb-0 "
                  style={{
                    fontSize: "24px",
                    fontWeight: "400",
                    color: "#101E8E",
                  }}
                >
                  Thank you!
                </p>
              </div>

              <div style={{ width: "80%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    style={{
                      width: "93px",
                      height: "40px",
                      borderRadius: "0px",
                      outline: "none",
                      border: "1px solid #101E8E",
                      color: "white",
                      backgroundColor: "#101E8E",
                    }}
                    onClick={() => {
                      // setHappyFaceNum(0)
                      setThanksPage(10);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ExperienceFeedback;
