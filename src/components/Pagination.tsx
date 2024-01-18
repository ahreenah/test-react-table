import React from "react"
import styled from "styled-components"
import {useMediaQuery} from 'usehooks-ts'

type PaginationProps = {
  page: number,
  onChange: (v: number) => void,
  pages: number
}

const TablePagination = styled.div`
  display: flex;
  gap:4px;
  margin:autostyled.div;
`

const TablePaginationButton = styled.button<{$active?: boolean, $hideOnMobile?: boolean}>`
  color:white;
  background: ${({$active}) => $active ? 'var(--Accent-Strong, #1C64F2)' : 'transparent'};
  border:none;
  padding: 6px 14px;
  border-radius: 8px;
  ${({$active}) => (!$active && `
    &:hover{
      background: var(--darktheme-Gray-scale-Gray-2, #313E62);
    }
  `)}
  ${({$hideOnMobile}) => ($hideOnMobile && `
    @media(max-width:400px){
      display: none;
    }
  `)}
  color: var(--darktheme-base-white, #FFF);
  font-family: IBM Plex Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  cursor:pointer;
`
const Pagination = ({page, onChange, pages}: PaginationProps) => {
  const nextPage = () => {if (page < pages) onChange(page + 1)}
  const prevPage = () => {if (page > 1) onChange(page - 1)}
  const isMobile = useMediaQuery('(max-width: 400px)')
  const showLimit = isMobile?1:2;
  return (
    <TablePagination>
      <TablePaginationButton onClick={prevPage}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.62421 8.82421C4.51169 8.9367 4.3591 8.99988 4.20001 8.99988C4.04091 8.99988 3.88832 8.9367 3.77581 8.82421L1.37581 6.42421C1.26332 6.3117 1.20013 6.15911 1.20013 6.00001C1.20013 5.84091 1.26332 5.68833 1.37581 5.57581L3.77581 3.17581C3.88897 3.06652 4.04053 3.00604 4.19785 3.00741C4.35516 3.00877 4.50565 3.07188 4.6169 3.18312C4.72814 3.29437 4.79124 3.44485 4.79261 3.60217C4.79398 3.75949 4.7335 3.91105 4.62421 4.02421L3.24841 5.40001H10.2C10.3591 5.40001 10.5117 5.46323 10.6243 5.57575C10.7368 5.68827 10.8 5.84088 10.8 6.00001C10.8 6.15914 10.7368 6.31175 10.6243 6.42428C10.5117 6.5368 10.3591 6.60001 10.2 6.60001H3.24841L4.62421 7.97581C4.73669 8.08833 4.79988 8.24091 4.79988 8.40001C4.79988 8.55911 4.73669 8.7117 4.62421 8.82421Z" fill="#616D8D" />
        </svg>
      </TablePaginationButton>
      {page > showLimit + 1 && (
        <TablePaginationButton $hideOnMobile>
          ...
        </TablePaginationButton>
      )}
      {new Array(pages).fill(undefined).map((i, idx) => (
        ((idx >= page - showLimit - 1) && (idx <= page + showLimit - 1)) &&
        <TablePaginationButton
          $active={idx + 1 === page}
          onClick={() => onChange(idx + 1)}
        >
          {idx + 1}
        </TablePaginationButton>
      ))}
      {page < pages - showLimit && (
        <TablePaginationButton $hideOnMobile>
          ...
        </TablePaginationButton>
      )}
      <TablePaginationButton onClick={nextPage}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.37584 3.17579C7.48836 3.06331 7.64094 3.00012 7.80004 3.00012C7.95914 3.00012 8.11173 3.06331 8.22424 3.17579L10.6242 5.57579C10.7367 5.68831 10.7999 5.8409 10.7999 5.99999C10.7999 6.15909 10.7367 6.31168 10.6242 6.42419L8.22424 8.82419C8.11108 8.93349 7.95952 8.99396 7.8022 8.9926C7.64488 8.99123 7.4944 8.92813 7.38315 8.81688C7.27191 8.70564 7.20881 8.55515 7.20744 8.39783C7.20607 8.24052 7.26655 8.08895 7.37584 7.97579L8.75164 6.59999H1.80004C1.64091 6.59999 1.4883 6.53678 1.37578 6.42426C1.26326 6.31174 1.20004 6.15912 1.20004 5.99999C1.20004 5.84086 1.26326 5.68825 1.37578 5.57573C1.4883 5.46321 1.64091 5.39999 1.80004 5.39999H8.75164L7.37584 4.02419C7.26336 3.91168 7.20017 3.75909 7.20017 3.59999C7.20017 3.4409 7.26336 3.28831 7.37584 3.17579Z" fill="#616D8D" />
        </svg>
      </TablePaginationButton>
    </TablePagination>
  )
}

export default Pagination
