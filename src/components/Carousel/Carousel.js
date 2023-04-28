import React, { useEffect, useState } from "react";

// react-slick files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// css
import "../Carousel/Carousel.css";

// img svg

import BoxClockIcon from '../../assets/Home/BoxClockIcon.svg'
import TickIcon from '../../assets/Home/TickIcon.svg'
import ListIcon from '../../assets/Home/ListIcon.svg'
import BoxArrowIcon from '../../assets/Home/BoxArrowIcon.svg'
import NullFolderIcon from '../../assets/Home/NullFolderIcon.svg'
import RefreshIcon from '../../assets/Home/RefreshIcon.svg'
import IIcon from '../../assets/Home/IIcon.svg'

// components
import CrouselCard from "../Carousel/CrouselCard";

const Carousel = ({data}) => {

    const [language, setLanguage] =  useState()

    

  useEffect(()=>{
    const reciveLanguage = localStorage.getItem('LanguageChange');
    const reciveLanguage1 = JSON.parse(reciveLanguage)
    setLanguage(reciveLanguage1)

   
  })

  const [fontSize, setFontSize] = useState(14);
  useEffect(()=>{
      const storedFontSize = localStorage.getItem("fontSizeLocal");
      if (storedFontSize) {
        setFontSize(storedFontSize);
      }
  })

    // console.log("data.pendingApprovalCount", data.pendingApprovalCount)

    const crouselData = [
        {
            id: 1,
            pic: BoxClockIcon,
            num: data.pendingApprovalCount,
            fontSize: fontSize,
            data: language?.result?.cm_pend_apprvl ? language?.result?.cm_pend_apprvl.label: 'APPROVED'
        },
        {
            id: 2,
            pic: TickIcon,
            num: data.approvedCount,
            fontSize: fontSize,
            data: language?.result?.cm_mob_apprvd ? language?.result?.cm_mob_apprvd.label: 'APPROVED'
            

        },
        {
            id: 3,
            pic: ListIcon,
            num: data.completedCount,
            fontSize: fontSize,
            data: language?.result?.cm_noc_status1 ? language?.result?.cm_noc_status1.label: 'APPROVED'
        },
        {
            id: 4,
            pic: BoxArrowIcon,
            num: data.cancelledCount,
            fontSize: fontSize,
            data: 'CANCELED / INCOMPLETE'
        },
        {
            id: 5,
            pic: NullFolderIcon,
            num: data.rejectedCount10,
            fontSize: fontSize,
            data: language?.result?.cm_rejected ? language?.result?.cm_rejected.label: 'APPROVED'
        },
        {
            id: 6,
            pic: RefreshIcon,
            num: data.renewalCount,
            fontSize: fontSize,
            data: 'RENEWAL / COMPLETETION'
        },
        {
            id: 7,
            pic: IIcon,
            num: data.infoNeededCount,
            fontSize: fontSize,
            data: language?.result?.cm_info_needed ? language?.result?.cm_info_needed.label: 'APPROVED'
        },

    ];

    let settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1170,
                settings: {
                    arrows: true,
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 826,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: true,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (

        <div className="col-12">
              <Slider {...settings}>
                        {crouselData &&
                            crouselData.map((element) => {
                                return (
                                    <div className="px-2">
                                        <CrouselCard element={element} />
                                    </div>
                                );
                            })}
                    </Slider>
        </div>
      
    );
};

export default Carousel;
