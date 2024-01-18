import styled from "styled-components"

type TableProps = {
  $cols: number,
  $loading?: boolean,
  $noRounding?: boolean,
  $horizontalScroll?: boolean
}

const Table = styled.div<TableProps>`
  width:100%;
  display:grid;
  overflow-x:auto;
  grid-template-columns: repeat(${({$cols}) => $cols}, minmax(max-content, 1fr));
  ${({$loading}) => $loading && `
    ${TableWrapper.Row} * {
      opacity:0.5;
    }
  `}
  ${({$noRounding}) => $noRounding && `
    ${TableWrapper.HeaderCell} {
      border-bottom-left-radius:0 !important;
      border-bottom-right-radius:0 !important;
    }
  `}
`
const TableWrapper = ({children, ...rest}: TableProps & {children: any}) => (
  <Table {...rest}>{children}</Table>
);

TableWrapper.Header = styled.div`
  display:contents;
`

TableWrapper.Cell = styled.div<{$color?: 'GREEN' | 'RED'}>`
  padding:14px 20px;
  font-size: 14px;
  text-align: center;
  display: flex;
  ${({$color}) => $color === 'RED' && `color:var(--Other-Critic, #FE4242);`}
  ${({$color}) => $color === 'GREEN' && `color:var(--Other-Green, #1ABB34);`}
  justify-content:center;
  align-items: center;
`

TableWrapper.Row = styled.div`
  display:contents;
`

TableWrapper.Spacer = styled.div`
  height:1px;
  background: #222B44;
`

TableWrapper.HeaderCell = styled(TableWrapper.Cell)`
  position: sticky;
  top:0;
  background: var(--darktheme-base-black, #0E0C15);
  &:first-child{
    border-radius:var(--const-spacer-lvl_1, 8px) 0px 0px var(--const-spacer-lvl_1, 8px);
  }
  &:last-child{
    border-radius:0px var(--const-spacer-lvl_1, 8px) var(--const-spacer-lvl_1, 8px) 0px;
  }
  display: flex;
  gap: var(--mobile-spacer-lvl_1, 10px);
  justify-content:center;
`


export default TableWrapper
