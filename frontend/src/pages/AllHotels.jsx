import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { hotelAPI } from '../utils/api'

export default function AllHotels() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await hotelAPI.getAll()
        setHotels(data)
      } catch (err) {
        setError('Failed to load hotels from server')
        setHotels([])
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [])

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="font-sans w-full">
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-6 px-4">
        
        {/* Heading */}
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            All Kashmir Hotels
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Browse through our complete collection of handpicked hotels and stays across Kashmir
          </p>

          {/* Search */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 w-full max-w-md shadow-sm">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search hotel name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {loading ? (
            <p className="col-span-full text-center text-gray-600 text-lg py-10">
              Loading hotels...
            </p>
          ) : error ? (
            <p className="col-span-full text-center text-red-600 text-lg py-10">
              {error}
            </p>
          ) : filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl overflow-hidden border shadow-md hover:shadow-lg hover:-translate-y-1 transition"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">
                  <p className="text-xs font-bold text-gray-500 mb-1">
                    {hotel.location} • {hotel.nights}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {hotel.name}
                  </h3>

                  <div className="flex justify-between items-center mb-3">
                    <p className="text-yellow-500 text-sm">
                      {'★'.repeat(hotel.rating)}
                      {'☆'.repeat(5 - hotel.rating)}
                    </p>

                    <p className="font-bold text-gray-900">
                      ₹{hotel.price}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    className="w-full bg-linear-to-r from-blue-800 to-blue-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-600">
                No hotels found matching "{searchQuery}"
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try different keywords
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}