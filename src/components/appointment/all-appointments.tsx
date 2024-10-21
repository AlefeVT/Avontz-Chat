'use client';

import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu';
import React, { useState } from 'react';
import { TableCell, TableRow } from '../ui/table';
import { getMonthName } from '@/lib/utils';
import { CardDescription } from '../ui/card';
import { DataTable } from '../table';
import { Button } from '../ui/button';

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string;
          } | null;
        } | null;
        id: string;
        email: string;
        domainId: string | null;
        date: Date;
        slot: string;
        createdAt: Date;
      }[]
    | undefined;
};

const ITEMS_PER_PAGE = 5;

const AllAppointments = ({ bookings }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!bookings || bookings.length === 0) {
    return <CardDescription>Não há compromissos disponíveis</CardDescription>;
  }

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const getCurrentPageBookings = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return bookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <DataTable headers={APPOINTMENT_TABLE_HEADER}>
        {getCurrentPageBookings().map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.email}</TableCell>
            <TableCell>
              <div>
                {getMonthName(booking.date.getMonth())} {booking.date.getDate()}{' '}
                {booking.date.getFullYear()}
              </div>
              <div className="uppercase">{booking.slot}</div>
            </TableCell>
            <TableCell>
              <div>
                {getMonthName(booking.createdAt.getMonth())}{' '}
                {booking.createdAt.getDate()} {booking.createdAt.getFullYear()}
              </div>
              <div>
                {booking.createdAt.getHours()}:{booking.createdAt.getMinutes()}{' '}
                {booking.createdAt.getHours() >= 12 ? 'PM' : 'AM'}
              </div>
            </TableCell>
            <TableCell className="text-right">
              {booking.Customer?.Domain?.name ?? 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      {/* Controles de paginação */}
      <div className="flex justify-center gap-6 items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </Button>
        <div>
          Página {currentPage} de {totalPages}
        </div>
        <Button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default AllAppointments;
