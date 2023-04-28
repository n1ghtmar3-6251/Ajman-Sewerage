import React, { useEffect, useState } from "react";

const CrouselCard = ({ element }) => {
    // const [fontSize, setFontSize] = useState(14);
    // useEffect(()=>{
    //     const storedFontSize = localStorage.getItem("fontSizeLocal");
    //     if (storedFontSize) {
    //       setFontSize(storedFontSize);
    //     }
    // })

    // console.log("firstq", element.fontSize)

    return (
        <div className="div d-flex w-100 ">
            <div className="crousel-left-border"></div>

            <div className="row p-0 m-0 d-flex w-100 bg-light justify-content-between">
                <div className="col-3 pl-1 d-flex align-items-end ">
                    <span className="crousel-text-1 mb-1"
                     style={{ fontSize: element.fontSize == 1 ? '26px' 
                     : element.fontSize ==2 ? '28px'
                     : element.fontSize == 3 ? '30px' 
                     : element.fontSize == 4 ? '32px'
                     : element.fontSize == 5 ? '34px'
                     : '30px' }}
                    >
                        {element.num}
                    </span>

                </div>
                <div className="col-9">
                    <div className="d-flex justify-content-center">
                        <div className="crousel-img mt-2 d-flex justify-content-center align-items-center">
                        <img className="" src={element.pic} alt="" />
                        </div>
                    </div>
                    <div>
                        <span className="crousel-text-2 pt-2 d-flex justify-content-center"
                         style={{ fontSize: `${element.fontSize == 1 ? '8px' 
                         : element.fontSize == 2 ? '10px'
                         : element.fontSize == 3 ? '12px' 
                         : element.fontSize == 4 ? '14px'
                         : element.fontSize == 5 ? '16px'
                         : '12px'}` }}
                        >
                            {element.data}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrouselCard;
