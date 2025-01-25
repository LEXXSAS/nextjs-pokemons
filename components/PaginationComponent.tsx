import { useStore } from "@/store/useStore";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from './pagination-component.module.scss';

export const PaginationComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const querypage = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';

  const searchtrigger = useStore((state) => state.searchtrigger);

  const totalPage = useStore((state) => state.totalPage);

  const setCurrentPage = (page: string) => {
    router.push(`?page=${Number(page)}`);
  }

  const generatePagination = () => {
    // if (totalPage <= 7) {
    //   return (
    //     Array.from({ length: totalPage }, (_, index) => index + 1).map((page, index) => {
    //       return (
    //         <button key={index} onClick={() => setCurrentPage(String(page))}
    //         className={page == querypage ? 'bg-violet-400/25 font-bold' : ''}
    //         >
    //           {page}
    //         </button>
    //         )
    //     })
    //   )
    // }
    if (querypage) {
      return (
        <>
        <button className={'1' == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage('1')}>1</button>
        
        <button>...</button>
        
        {Number(querypage) > 1 && <button className={String(Number(querypage) - 1) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage) - 1))}>{Number(querypage) - 1}</button>}

        <button className={String(Number(querypage)) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage)))}>{Number(querypage)}</button>

        {Number(querypage) <= totalPage - 1 && <button className={String(Number(querypage) + 1) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage) + 1))}>{Number(querypage) + 1}</button>}

        {Number(querypage) <= totalPage - 2 && <button className={String(Number(querypage) + 1) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage) + 2))}>{Number(querypage) + 2}</button>}

        <button>...</button>
        
        {totalPage > 0 && <button className={String(totalPage) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(totalPage))}>{totalPage}</button>}
        </>
      )
    } 
    // else {
    //   return (
    //     <>
    //     <button className={'1' == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage('1')}>1</button>
    //     <button>...</button>
    //     <button className={'1' == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage('1')}>1</button>
    //     </>
    //   )
    // }
  }

  return (
    <div className={styles.pagination_container} >
      {generatePagination()}
    </div>
  )
}
