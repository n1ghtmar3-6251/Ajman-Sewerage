import { FC } from "react";
import { ButtonContainer } from "./button.primary.styled";
import { Props } from "./button.primary.interface";

const ButtonPrimary: FC<Props> = ({
  onClick,
  label,
  name,
  value,
  children,
  styles,
}: Props) => {
  return (
    <ButtonContainer
      onClick={onClick}
      name={name}
      value={value}
      style={styles}
    >
      <>
        {label}
        {children}
      </>
    </ButtonContainer>
  );
};

export default ButtonPrimary;
