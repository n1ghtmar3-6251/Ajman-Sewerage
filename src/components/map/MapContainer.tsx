import { useState, useEffect } from "react";
import { Map } from "@esri/react-arcgis";
import { loadModules } from "esri-loader";
import { ButtonSecondary } from "../consultationTabs.tsx/consultation.styled";
import { ComplaintContainer } from "../../screens/ApplyWWPR/Apply.styled";
import { Memory } from "../../core/Memory";

// @ts-ignore
var graphicObj = null;
// @ts-ignore
var globalView = null;

// @ts-ignore
var globalMap = null;
// @ts-ignore
var rings = [];

var canDraw = false;

// @ts-ignore
const MapContainer = (props) => {
  const [graphicItem, setGraphicItem] = useState(null);

  useEffect(() => {
    loadModules(["esri/Graphic"])
      .then(([Graphic]) => {
        // Create a polygon geometry
        graphicObj = Graphic;
      })
      .catch((err) => console.error(err));

    return function cleanup() {};
  }, []);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 991);
    }
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div>
      <div>
        <ComplaintContainer style={{  width: 220, margin: 0, padding: 0 }}>
          <ButtonSecondary
            onClick={() => {
              canDraw = true;
            }}
            style={{
              background: "#fff",
              width: isLargeScreen? "100px" :"100%",
              placeSelf: "start",
              position: "relative",
              border: "1px solid #101e8e",
              height: 42,
              top: 60,
              left: isLargeScreen?  11: 0,
              color: "#101e8e",
              marginBottom: isLargeScreen? "":"10px",
            }}
          >
            DRAW
          </ButtonSecondary>

          <ButtonSecondary
            onClick={() => {
              rings = [];
              // @ts-ignore
              globalView?.graphics.removeAll();
              // @ts-ignore
              globalMap?.notifyChange();
            }}
            style={{
              background: "#fff",
              width: isLargeScreen? "100px" :"100%",
              
              placeSelf: "start",
              position: "relative",
              border: "1px solid #101e8e",
              height: 42,
              top: 60,
              color: "#101e8e",
            }}
          >
            RESET
          </ButtonSecondary>
        </ComplaintContainer>
      </div>

      <Map
        onClick={(e) => {
          if (!canDraw) {
            return;
          }
          // @ts-ignore
          const position = [e.mapPoint.longitude, e.mapPoint.latitude];
          //const position2 = [-25.4052, 55.5136];
          // @ts-ignore
          rings.push(position);
          //rings.push(position2);
          // @ts-ignore
          const polygon = { type: "polygon", rings: rings };

          // Create a symbol for rendering the graphic
          const fillSymbol = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [227, 139, 79, 0.8],
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: [255, 255, 0],
              width: 1,
            },
          };
          // Add the geometry and symbol to a new graphic
          // @ts-ignore
          const graphic = new graphicObj({
            geometry: polygon,
            symbol: fillSymbol,
          });
          setGraphicItem(graphic);

          // console.log('Polygin: ' + JSON.stringify(polygon.rings));
          // console.log('fillSymbol: ' + JSON.stringify(fillSymbol));
          Memory.setItemInfo('Rings', polygon.rings);


          // @ts-ignore
          globalView.graphics.add(graphic);
          // @ts-ignore
          globalMap.notifyChange();
        }}
        onLoad={(map, view) => {
          globalView = view;
          globalMap = map;
        }}
        className={"mapWrapper"}
      />
    </div>
  );
};

export default MapContainer;
