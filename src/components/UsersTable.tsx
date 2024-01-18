import React, {useState} from "react";
import styled from "styled-components";
import Block from "./styled/block";
import InputField from "./InputField";
import SearchIcon from "./styled/SearchIcon";
import {useGetUsersQuery} from "../api";
import UpArrow from "../icons/UpArrow";
import DownArrow from "../icons/DownArrow";
import Table from "./styled/Table";
import Pagination from "./Pagination";
import IconButton from "./styled/IconButton";
import EditIcon from "../icons/EditIcon";
import RemoveIcon from "../icons/RemoveIcon";
import TokenUsageModal from "./TokenUsageModal";
import {useDebounce} from 'usehooks-ts'

const Header = styled.div`
  padding:24px 34px;
  /* desktop text/body-xl-semibold */
  font-family: IBM Plex Sans;
`

const Spacer = styled.div`
  height:1px;
  background: #222B44;
`

const Content = styled.div`
  padding: 29px 34px;
  display:flex;
  flex-direction:column;
  gap: 24px;
`


const Title = styled.div`
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px; /* 131.818% */
`

const PaginationWrapper = styled.div`
  margin:auto
`

const ActionButttons = styled.div`
  display: flex;
  justify-content: center;
`

const UsersTable = () => {
  const [page, setPage] = useState(1)
  const [tokensAsc, setTokensAsc] = useState(false)
  const [viewing, setViewing] = useState(null)
  const toggleTokensSorting = () => setTokensAsc(v => !v)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce<string>(search, 300)
  const {data: users, isFetching} = useGetUsersQuery({
    page,
    orderBy: tokensAsc ? 'tokens:asc' : 'tokens:desc',
    search: debouncedSearch
  })
  return (
    <Block>
      <Header>
        <Title>Моя организация</Title>
      </Header>
      <Spacer />
      <Content>
        <Title>Пользователи</Title>
        <InputField
          placeholder="Поиск"
          startIcon={<SearchIcon />}
          value={search}
          onChange={newSearch => setSearch(newSearch)}
        />
        <Table $cols={6} $loading={isFetching} $horizontalScroll>
          <Table.Header>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.HeaderCell>Роль</Table.HeaderCell>
            <Table.HeaderCell>Подписка</Table.HeaderCell>
            <Table.HeaderCell>
              Токены
              <IconButton onClick={() => toggleTokensSorting()}>
                {tokensAsc ? <UpArrow /> : <DownArrow />}
              </IconButton>
            </Table.HeaderCell>
            <Table.HeaderCell>Действия</Table.HeaderCell>
          </Table.Header>
          {users?.data?.map((user: any, idx: number) => (
            <Table.Row>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.subscription.plan.type}</Table.Cell>
              <Table.Cell>{user.subscription.tokens}</Table.Cell>
              <Table.Cell>
                <ActionButttons>
                  <IconButton onClick={() => setViewing(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton><RemoveIcon /></IconButton>
                </ActionButttons>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <PaginationWrapper>
          <Pagination page={page} pages={users?.pages} onChange={v => setPage(v)} />
        </PaginationWrapper>
      </Content>
      {viewing &&
        <TokenUsageModal
          user={viewing}
          onClose={() => setViewing(null)}
        />
      }
    </Block>
  )
}

export default UsersTable
