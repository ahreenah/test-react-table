import styled from "styled-components"

const IconButton = styled.button`
  background:transparent;
  border:none;
  cursor: pointer;
  width: var(--mobile-spacer-lvl_3, 24px);
  height: var(--mobile-spacer-lvl_3, 24px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  &:hover{
    background:var(--darktheme-Gray-scale-Gray-3, #222B44);
  }
`

export default IconButton
