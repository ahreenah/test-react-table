import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import IconButton from "./styled/IconButton";
import CloseIcon from "../icons/CloseIcon";
import Table from "./styled/Table";
import {useGetTransactionsQuery} from "../api";
import Chart from "./Chart";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  overflow: auto;
`

const Modal = styled.div`
  min-height: 100%;
  background: var(--darktheme-Gray-scale-Gray-4, #121825);
  display: flex;
  margin-left:auto;
  max-width: 470px;
  padding: 56px 20px;
  flex-direction: column;
  align-items: stretch;
  gap: var(--desktop-spacer-lvl_2, 20px);
  box-sizing:border-box;
`

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  display: flex;
  justify-content: space-between;
  align-items:center;
`

const ModalTitle = styled.div`
  color: var(--darktheme-base-white, #FFF);
  /* tablet text/body-xl-semibold */
  font-family: IBM Plex Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 130% */
`

type TokenUsageModalProps = {
  user:{
    email:string,
    id:number
  },
  onClose: () => void
}

const decodeTransactionType = (value: string) =>
  value === 'REPLENISH' ? 'Пополнение' : 'Списание'


const TokenUsageModal = ({user, onClose}: TokenUsageModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = "auto"};
  }, [])
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, () => onClose())

  const {data: transactions} = useGetTransactionsQuery({user: user.id})
  return (
    <Wrapper>
      <Modal ref={modalRef}>
        <ModalHeader>
          <ModalTitle>
            {user.email}
          </ModalTitle>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <ModalTitle>
          Использование токенов
        </ModalTitle>

        <Chart data={transactions} />
        <ModalTitle>
          История операций
        </ModalTitle>
        <Table $cols={3} $noRounding>
          <Table.Header>
            <Table.HeaderCell>Тип</Table.HeaderCell>
            <Table.HeaderCell>Сумма</Table.HeaderCell>
            <Table.HeaderCell>Дата</Table.HeaderCell>
          </Table.Header>
          {transactions?.map((transaction: any, idx: number) => (
            <Table.Row>
              <Table.Cell>
                {decodeTransactionType(transaction.type)}
              </Table.Cell>
              <Table.Cell $color={transaction.type === 'REPLENISH' ? 'GREEN' : 'RED'}>
                {transaction.type === 'REPLENISH' ? '+ ' : '- '}
                {Intl.NumberFormat('ru-RU').format(transaction.amount)} BTKN
              </Table.Cell>
              <Table.Cell>
                {(new Date(transaction.created_at).toLocaleDateString())}, <br />
                {(new Date(transaction.created_at).toLocaleTimeString())}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </Modal>
    </Wrapper>
  )
}

export default TokenUsageModal
