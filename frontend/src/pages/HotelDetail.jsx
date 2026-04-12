import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  UserCircle2,
} from "lucide-react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { hotelAPI } from "../utils/api";

export default function HotelDetail() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await hotelAPI.getById(hotelId);
        setHotel(data);
        setAllReviews(data?.reviews || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return <div className="h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (!hotel) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <p>Hotel not found</p>
        <button
          onClick={() => navigate("/all-hotels")}
          className="bg-emerald-500 text-white px-5 py-2 rounded-md"
        >
          Back
        </button>
      </div>
    );
  }

  const images = hotel.images?.length ? hotel.images : [hotel.image];

  const next = () =>
    setCurrentImageIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Back */}
        <button
          onClick={() => navigate("/all-hotels")}
          className="flex items-center gap-2 text-blue-900 font-semibold mb-6"
        >
          <ArrowLeft size={18} />
          Back to All Hotels
        </button>

        {/* IMAGE */}
        <div className="relative mb-8">
          <img
            src={images[currentImageIndex]}
            className="w-full h-100 object-cover rounded-xl"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* TITLE */}
        <div className="bg-white p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold mb-3">{hotel.name}</h1>

          <div className="flex flex-wrap gap-6 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-emerald-500" />
              {hotel.location}
            </div>

            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              {hotel.rating}.0
            </div>

            <div className="font-bold text-lg">₹{hotel.price}</div>
          </div>

          <p className="text-gray-600">{hotel.description}</p>
        </div>

        {/* INFO */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl">
            <Clock className="mb-2 text-blue-900" />
            <p className="text-sm text-gray-500">Check-in/out</p>
            <p className="font-semibold">
              {hotel.checkInTime} / {hotel.checkOutTime}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl">
            <Users className="mb-2 text-blue-900" />
            <p className="text-sm text-gray-500">Capacity</p>
            <p className="font-semibold">{hotel.capacity}</p>
          </div>

          <div className="bg-white p-4 rounded-xl">
            <Clock className="mb-2 text-blue-900" />
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">{hotel.nights}</p>
          </div>
        </div>

        {/* AMENITIES */}
        <div className="bg-white p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {hotel.amenities?.map((a, i) => (
              <p key={i} className="text-gray-600">• {a}</p>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        <div className="bg-white p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>

          {allReviews.map((r) => (
            <div key={r.id} className="mb-4 border-b pb-4">
              <div className="flex gap-3 mb-2">
                <UserCircle2 className="text-emerald-500" />
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.date}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < r.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* REVIEW FORM */}
        <div className="bg-white p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Review</h2>

          <input
            placeholder="Your name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border p-2 rounded mb-3"
          />

          <textarea
            placeholder="Your review"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className="w-full border p-2 rounded mb-3"
          />

          <button className="bg-emerald-500 text-white px-5 py-2 rounded">
            Submit
          </button>
        </div>

        {/* BOOK */}
        <div className="bg-white p-6 rounded-xl text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to Book?</h3>
          <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg">
            Book Now ₹{hotel.price}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}