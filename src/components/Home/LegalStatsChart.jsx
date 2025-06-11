import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const ProductChartJatim = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('https://jdih.pisdev.my.id/api/v2/overview-by-id/10')
      .then((response) => {
        const children = response.data[0]?.children || []
        const transformed = children.map((item) => ({
          name: item.title_id,
          total: parseInt(item.jml) || 0,
        }))
        setData(transformed)
      })
      .catch((error) => console.error(error))
  }, [])

  const totalProduk = data.reduce((acc, cur) => acc + cur.total, 0)

  return (
<div className="px-4 py-15 sm:px-8 md:px-16 lg:px-30 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-green-800">Jumlah Produk Hukum Jawa Timur</h2>
        <p className="mb-4">Grafik produk hukum Jawa Timur.</p>
        <div className="bg-green-50 p-4 rounded-md">
          <p className="font-semibold">Total Produk: {totalProduk}</p>
          <p>{data.length} Kategori</p>
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} height={150} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProductChartJatim
