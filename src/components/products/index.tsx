'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TabsContent } from '../ui/tabs';
import { DataTable } from '../table';
import { TableCell, TableRow } from '../ui/table';
import Image from 'next/image';
import { getMonthName } from '@/lib/utils';
import TabsMenu from '../tabs';
import { SideSheet } from '../sheet';
import { CreateProductForm } from './product-form';
import { CardDescription } from '../ui/card';

type Props = {
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    createdAt: Date;
    domainId: string | null;
  }[];
  id: string;
};

const ITEMS_PER_PAGE = 5;

const ProductTable = ({ id, products }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Produtos</h2>
        <p className="text-sm font-light">
          Adicione produtos à sua loja e coloque-os no ar para aceitar
          pagamentos de clientes.
        </p>
      </div>
      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          {
            label: 'Todos os produtos',
          },
        ]}
        button={
          <div className="flex-1 flex justify-end">
            <SideSheet
              description="Adicione produtos à sua loja e coloque-os no ar para aceitar pagamentos de clientes."
              title="Adicionar um produto"
              className="flex items-center gap-2 bg-blue px-4 py-2 text-black font-semibold rounded-lg text-sm"
              trigger={
                <>
                  <Plus size={20} className="text-white" />
                  <p className="text-white">Adicionar produto</p>
                </>
              }
            >
              <CreateProductForm id={id} />
            </SideSheet>
          </div>
        }
      >
        <TabsContent value="Todos os produtos">
          {!products || products.length === 0 ? (
            <CardDescription>
              Sem produtos disponíveis no momento.
            </CardDescription>
          ) : (
            <DataTable
              headers={['Imagem em destaque', 'Nome', 'Preços', 'Criado']}
            >
              {getCurrentPageProducts().map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={`https://ucarecdn.com/${product.image}/`}
                      width={50}
                      height={50}
                      alt="image"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>R$ {product.price}</TableCell>
                  <TableCell className="text-right">
                    {product.createdAt.getDate()}{' '}
                    {getMonthName(product.createdAt.getMonth())}{' '}
                    {product.createdAt.getFullYear()}
                  </TableCell>
                </TableRow>
              ))}
            </DataTable>
          )}

          {/* Controles de paginação */}
          {products.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center gap-6 items-center mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Anterior
              </button>
              <div>
                Página {currentPage} de {totalPages}
              </div>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Próxima
              </button>
            </div>
          )}
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default ProductTable;
