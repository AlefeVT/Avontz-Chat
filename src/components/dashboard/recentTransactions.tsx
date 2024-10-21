'use client';

import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { TransactionsIcon } from '@/icons/transactions-icon';

interface Transaction {
  id: string;
  calculated_statement_descriptor: string | null;
  amount: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center gap-2 mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue text-white ' : 'bg-lightBluePearl dark:text-black'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col mr-10">
      <div className="w-full flex justify-between items-start mb-5">
        <div className="flex gap-3 items-center">
          <TransactionsIcon />
          <p className="font-bold">Transações recentes</p>
        </div>
      </div>
      <Separator orientation="horizontal" />
      {paginatedTransactions.map((transaction) => (
        <div
          className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
          key={transaction.id}
        >
          <p className="font-bold">
            {transaction.calculated_statement_descriptor}
          </p>
          <p className="font-bold text-xl">R$ {transaction.amount / 100}</p>
        </div>
      ))}
      <div className="mt-4">
        <Pagination
          totalItems={transactions.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RecentTransactions;
