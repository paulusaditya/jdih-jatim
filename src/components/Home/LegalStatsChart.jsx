import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

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
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800">
              Jumlah Produk Hukum Jawa Timur
            </h2>
            <p className="mb-4">Grafik produk hukum Jawa Timur.</p>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="font-semibold">Total Produk: {totalProduk}</p>
              <p>{data.length} Kategori</p>
            </div>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductChartJatim
