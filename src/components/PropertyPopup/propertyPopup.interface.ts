import React from "react";

export interface PropertyDetail {
  PropertyType: string
  PropertyCount: 0,
  AreaSquareFeet: 0
}

export interface Props {
  onClose: React.MouseEventHandler<HTMLImageElement> | undefined;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  propertyTypeList:[];
}
