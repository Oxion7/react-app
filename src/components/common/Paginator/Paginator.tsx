import React, {useState} from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames";

type PaginatorPropsType = {
    totalItemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (pageNumber: number) => void;
    portionSize?: number;
    isLoading?: boolean;
}
const Paginator: React.FC<PaginatorPropsType> = ({
                                                     totalItemsCount,
                                                     pageSize,
                                                     currentPage,
                                                     onPageChanged,
                                                     portionSize = 10,
                                                     isLoading = false
                                                 }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    // Show ellipsis when too many peges
    const showLeftEllipsis = portionNumber > 1;
    const showRightEllipsis = portionCount > portionNumber;

    return (
        <div className={cn(styles.paginator, {[styles.loading]: isLoading})}>
            <div className={styles.paginationControls}>
                {portionNumber > 1 && (
                    <button
                        className={styles.paginationButton}
                        onClick={() => {
                            setPortionNumber(portionNumber - 1)
                        }}
                        disabled={isLoading}
                    >
                        ← Prev
                    </button>
                )}

                <div className={styles.pagesContainer}>
                    {showLeftEllipsis && (
                        <>
                            <span
                                className={styles.pageNumber}
                                onClick={() => {
                                    setPortionNumber(1);
                                    onPageChanged(1);
                                }}
                            >
                                1
                            </span>
                            <span className={styles.ellipsis}>...</span>
                        </>
                    )}

                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map((p) => (
                            <span
                                className={cn(styles.pageNumber, {
                                    [styles.selectedPage]: currentPage === p
                                })}
                                key={p}
                                onClick={(e) => {
                                    if (!isLoading) {
                                        onPageChanged(p);
                                    }
                                }}
                            >
                                {p}
                            </span>
                        ))
                    }

                    {showRightEllipsis && (
                        <>
                            <span className={styles.ellipsis}>...</span>
                            <span
                                className={styles.pageNumber}
                                onClick={() => {
                                    setPortionNumber(portionCount);
                                    onPageChanged(pagesCount);
                                }}
                            >
                                {pagesCount}
                            </span>
                        </>
                    )}
                </div>

                {portionCount > portionNumber && (
                    <button
                        className={styles.paginationButton}
                        onClick={() => {
                            setPortionNumber(portionNumber + 1)
                        }}
                        disabled={isLoading}
                    >
                        Next →
                    </button>
                )}
            </div>

            <div className={styles.pageInfo}>
                Page {currentPage} of {pagesCount} • {totalItemsCount} total items
            </div>
        </div>
    );
}

export default Paginator;
