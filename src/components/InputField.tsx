import React, {InputHTMLAttributes} from "react";
import styled from "styled-components";

const InputWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--const-spacer-lvl_1, 8px);
  padding:14px 16px;
  gap: var(--mobile-spacer-lvl_1, 10px);
  border-radius: var(--const-spacer-lvl_1, 8px);
  border: 1px solid var(--darktheme-Gray-scale-Gray-2, #313E62);
  background: var(--darktheme-Gray-scale-Gray-4, #121825);
  gap:10px;
`
const StyledInput = styled.input`
  height: 18px;
  line-height: 18px;
  width:100%;
  background:transparent;
  border:none;
  outline:none;
  color: var(--darktheme-base-white, #FFF)
  flex-grow:1;
  &::placeholder,
  &::-webkit-input-placeholder {
    color: var(--darktheme-Gray-scale-Gray-1, #616D8D);
  }
  &:-ms-input-placeholder {
     color: var(--darktheme-Gray-scale-Gray-1, #616D8D);
  }
`

type InputFieldProps = {
  value?: string,
  onChange?: (v: string) => void,
  startIcon?: React.ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const InputField = ({
  value,
  onChange,
  startIcon,
  ...props
}: InputFieldProps) => (
  <InputWrapper>
    {startIcon}
    <StyledInput
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  </InputWrapper>
)

export default InputField
