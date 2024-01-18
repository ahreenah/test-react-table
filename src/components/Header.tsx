import styled from "styled-components"
import React from "react"
import OrganizationIcon from "../icons/organization"
import UserIcon from "../icons/user"
import Block from "./styled/block"


const HeaderDiv = styled(Block)`
  padding: var(--desktop-spacer-lvl_1, 16px) var(--mobile-spacer-lvl_3, 24px);
  display:flex; flex-direction:row;
  gap:44px;
  align-items:center;
  @media(max-width:606px){
    justify-content: right;
  }
`

const Title = styled.div`
  color: #FFF;
  height: fit-content;

  /* desktop text/body-xl-semibold */
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px; /* 131.818% */
  @media(max-width:606px){
    display: none;
  }
`

const OrganizationName = styled.div`
  display: flex;
  align-items: center;
  gap: var(--mobile-spacer-lvl_1, 10px);
  flex-grow: 1;
  div {
    color: var(--darktheme-base-white, #FFF);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
  }
  @media(max-width:606px){
    flex-grow:0;
  }
`

const UserInfo = styled.div`
  display: flex;
  padding: var(--const-spacer-lvl_1, 8px) 14px;

  align-items: center;
  gap: 14px;
  border-radius: 6px;
  border: 1px solid var(--darktheme-Gray-scale-Gray-3, #222B44);
  background: var(--darktheme-Gray-scale-Gray-4, #121825);
  @media(max-width:606px){
    display: none;
  }
`

const UserInfoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const UserAuthInfo = styled.div`
  color: var(--darktheme-Gray-scale-Gray-1, #616D8D);
  /* desktop text/body-xs-regular */
  font-family: IBM Plex Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
`

const UserRoleInfo = styled.div`
  color: var(--darktheme-base-white, #FFF);
  /* desktop text/body-s-medium */
  font-family: IBM Plex Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`

const Header = () => {
  return (
    <HeaderDiv>
      <Title>BitTest</Title>
      <OrganizationName>
        <OrganizationIcon />
        <div>Моя организация</div>
      </OrganizationName>
      <UserInfo>
        <UserIcon />
        <UserInfoData>
          <UserAuthInfo>
            Вы авторизованы
          </UserAuthInfo>
          <UserRoleInfo>
            Администратор
          </UserRoleInfo>
        </UserInfoData>
      </UserInfo>
    </HeaderDiv>
  )
}

export default Header
