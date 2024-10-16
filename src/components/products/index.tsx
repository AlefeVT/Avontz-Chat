import React from 'react'

import { Plus } from 'lucide-react'
import { TabsContent } from '../ui/tabs'
import { DataTable } from '../table'
import { TableCell, TableRow } from '../ui/table'
import Image from 'next/image'
import { getMonthName } from '@/lib/utils'
import TabsMenu from '../tabs'
import { SideSheet } from '../sheet'
import { CreateProductForm } from './product-form'

type Props = {
  products: {
    id: string
    name: string
    price: number
    image: string
    createdAt: Date
    domainId: string | null
  }[]
  id: string
}

const ProductTable = ({ id, products }: Props) => {
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Produtos</h2>
        <p className="text-sm font-light">
        Adicione produtos à sua loja e coloque-os no ar para aceitar pagamentos de
        clientes.
        </p>
      </div>
      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          {
            label: 'Todos os produtos',
          },
          { label: 'Ao vivo' },
          { label: 'Desativado' },
        ]}
        button={
          <div className="flex-1 flex justify-end">
            <SideSheet
              description="Adicione produtos à sua loja e coloque-os no ar para aceitar pagamentos de clientes."
              title="Adicionar um produto"
              className="flex items-center gap-2 bg-blue px-4 py-2 text-black font-semibold rounded-lg text-sm"
              trigger={
                <>
                  <Plus
                    size={20}
                    className="text-white"
                  />
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
          <DataTable headers={['Imagem em destaque', 'Nome', 'Preços', 'Criado']}>
            {products.map((product) => (
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
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default ProductTable