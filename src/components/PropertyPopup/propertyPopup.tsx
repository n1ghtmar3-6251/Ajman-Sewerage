import { FC, ReactElement, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "../../assets/CloseIcon.svg";
import { Card, CardHeader } from "./propertyPopup.styled";
import { Props } from "./propertyPopup.interface";
import { Label } from "../extras/styled";
import { ButtonSecondary } from "../consultationTabs.tsx/consultation.styled";
import { Memory } from "../../core/Memory";

const Popup: FC<Props> = ({ onClose, onSubmit, propertyTypeList }: Props): ReactElement => {

  const [PropertyTypeId, setPropertyTypeId] = useState(0);
  const [PropertyType, setPropertyType] = useState("");
  const [PropertyCount, setPropertyCount] = useState("");
  const [AreaSqMeter, setAreaSqMeter] = useState("");
  const [ShowAreaSqMeter, setShowAreaSqMeter] = useState(true);

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {

    //Get Property Type List
    let propertyTypes = Memory.getItemInfo("WWPRPropertyTypes");

    //Add the new field
    propertyTypes.push({ PropertyType: PropertyType, PropertyTypeId: PropertyTypeId, PropertyCount: PropertyCount, AreaSqMeter: AreaSqMeter });

    //Set the property List
    Memory.setItemInfo("WWPRPropertyTypes", propertyTypes);

    setPropertyTypeId(0);
    setPropertyType('');
    setPropertyCount('');
    setAreaSqMeter('');
    setShowAreaSqMeter(false);
    onSubmit(e);

  }
  let propertyTypes = Memory.getItemInfo("WWPRPropertyTypes");
  console.log("AreaSqMeter", propertyTypes)

  return (
    <Card>
      <CardHeader
        style={{
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          zIndex:'0'
        }}
      >
        <h1 style={{ color: "#fff", justifySelf: "flex-start", zIndex:"0" }}>
          Add Property Type
        </h1>
        <img src={CloseIcon} alt="Close" onClick={onClose}/>
      </CardHeader>
      <CardContent
        sx={{
          width: "100%",
          background: "#fff",
          overflowY: "scroll",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >

        <div
          style={{
            width: "95%",

            placeItems: "center",
            gridTemplateColumns: "1fr 1fr",
            margin: "0 auto",
          }}
          className="add-property-type"
        >
          <p style={{ fontWeight: "700", gridColumn: ShowAreaSqMeter ? "1 / span 3" : "1 / span 2", placeSelf: "start" }}></p>

          <Label>
            Property Type*
            <select name="propertyType" defaultValue={PropertyTypeId}  value={PropertyTypeId} onChange={(e) => {

              //Selected Property Type Id
              setPropertyTypeId(Number(e.target.value));

              //Selected Index
              var selectedIndex = e.target.selectedIndex;

              //Set Property Text
              setPropertyType(e.target[selectedIndex].innerText);

              let isAreaRequired = propertyTypeList[selectedIndex]["isAreaRequired"];

              if (isAreaRequired) {
                setShowAreaSqMeter(isAreaRequired);
                setAreaSqMeter("");
              }
              else {
                setShowAreaSqMeter(false);
                setAreaSqMeter("N/A");
              }

            }}

              style={{ width:"100%", background: "#e5eff2" }}>
                
              <option value="select">Select</option>
              {propertyTypeList.map((item: any) => { return <option key={item.id} value={item.id}>{item.propertyType}</option>; })}
            </select>
          </Label>

          <Label>
            Property Count*
            <input  type="text" defaultValue={PropertyCount} value={PropertyCount} placeholder="Property Count" onChange={(e) => { setPropertyCount(e.target.value); }} />
          </Label>

          <Label style={{ visibility: ShowAreaSqMeter ? 'visible' : 'hidden' }}>
            Area Square Feet
            <input type="text" defaultValue={AreaSqMeter} value={AreaSqMeter} placeholder="Area Square Feet" onChange={(e) => { setAreaSqMeter(e.target.value); }} />
          </Label>

        </div>

        <div
          style={{
            width: "95%",
            display: "grid",
            placeItems: "end",
            gridTemplateColumns: "1fr",
            margin: "10px auto"
          }}
        >
          <p className="add-property-type-button-secondary" style={{ fontWeight: "700", gridColumn: "1 / span 1", placeSelf: "end",  }}>
            <ButtonSecondary onClick={(e) => { submit(e) }} style={{ width: "100px" }}>ADD</ButtonSecondary>
          </p>

        </div>
      </CardContent>
    </Card>
  );
};

export default Popup;
