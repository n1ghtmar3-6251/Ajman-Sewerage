import React, { FC } from "react";

export interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  name?: string;
  value?: string;
  children?: React.ReactElement;
  styles?: any;
}
