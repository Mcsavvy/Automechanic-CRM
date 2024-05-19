"use client"
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { faker } from "@faker-js/faker";
import { DataTable } from "@/components/ui/goodsDataTable";
import { Plus } from 'lucide-react'
import EditGoodModal from "@/app/components/modals/EditGoodModal";
import DeleteGoodModal from "@/app/components/modals/DeleteGoodModal";
import AddGoodModal from "@/app/components/modals/AddGoodModal";
import axios from 'axios';


interface Good {
    id: string;
    productName: string;
    category: string;
    productId: string;
    unitPrice: number;
    qty: number;
    totalValue: number;
    status: string;
}


const tableHeaders = [
  { id: 'productName', name: "Product Name", isVisible: true, isPresent: true },
  { id: 'category', name: "Category", isVisible: true },
  { id: 'productId', name: "Product ID", isVisible: true },
  { id: 'unitPrice', name: "Unit Price", isVisible: true },
  { id: 'qty', name: "In Stock", isVisible: true },
  { id: 'totalValue', name: "Total Value", isVisible: true },
  { id: 'status', name: "Status", isVisible: true },
];
const dataFilters = [
  { id: 'productName', name: "Product Name", type: "text" },
  { id: 'productId', name: "Product ID", type: "text" },
  { id: 'qty', name: "In Stock", type: "number" },
  { id: 'status', name: "Status", type: "text" },
]
export default function Home() {
  const [goodId, setGoodId] = useState('')
  const [goodTitle, setGoodTitle] = useState('')
  const [goods, setGoods] = useState<Good[]>([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const hasNextPage = useRef(false);
  const hasPrevPage = useRef(false);
  
  function changeCurrGood (id: string, title: string) {
    console.log(id, title)
    setGoodId(id)
    setGoodTitle(title)
  }

  useEffect(() => {
    axios.get(`/api/goods/all?limit=${limit}&page=${page}`)
      .then((res) => {
        setGoods(res.data.goods.map((good: any) => ({
          id: good.id,
          productName: good.name,
          category: 'Category',
          productId: good.productId,
          unitPrice: good.costPrice,
          qty: good.qty,
          totalValue: good.costPrice * good.qty,
          status: good.qty > good.minQty ? 'In Stock' : 'Low on Stock',
        })));
        setPageCount(res.data.totalPages)
        hasNextPage.current = res.data.hasNextPage
        hasPrevPage.current = res.data.hasPrevPage
      });
  }, [page, limit])
  return (
    <>
    <EditGoodModal goodId={goodId} goodTitle={goodTitle} onClose={setGoodId}/>
    <DeleteGoodModal goodId={goodId} goodTitle={goodTitle} onClose={changeCurrGood}/>
    <AddGoodModal onClose={changeCurrGood}/>
      <div className="flex flex-col absolute h-[calc(100vh-60px)] top-[60px] w-full">
        <div className="h-full relative">
          <div className="flex flex-row justify-between items-center p-4 px-[30px]">
            <h1 className="text-xl font-heading font-semibold">Inventory Summary</h1>
            <a href="#goods/new"><Button className="flex flex-row gap-2"><Plus size={20} strokeWidth={1.5} />Add Product</Button></a>
          </div>
          <div className="flex flex-row flex-wrap gap-[30px] px-[30px] mx-0 items-center justify-evenly">
            <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
              <h3 className="text-2xl text-pri-5">Categories</h3>
              <p className="text-lg text-neu-8">Total: 17 </p>
            </div>
            <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
              <h3 className="text-2xl text-pri-5">Goods</h3>
              <p className="text-lg text-neu-8">Total: 45 (Goods)</p>
            </div>
            <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
              <h3 className="text-2xl text-pri-5">Low on Stock</h3>
              <p className="text-lg text-neu-8">Total: 34 (Goods)</p>
            </div>
          </div>
          <DataTable
            data={goods}
            headers={tableHeaders}
            filters={dataFilters}
            onChangeGood={changeCurrGood}
            page={page}
            pageCount={pageCount}
            hasNextPage={hasNextPage.current}
            hasPrevPage={hasPrevPage.current}
            onNext={() => setPage(page + 1)}
            onPrev={() => setPage(page - 1)}
          />
        </div>
      </div>
    </>
  );
}