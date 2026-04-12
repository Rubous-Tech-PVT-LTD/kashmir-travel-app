import { useEffect, useState } from "react";
import {
  Calendar,
  Check,
  Heart as HeartIcon,
  Share2,
  Star as StarIcon,
  User
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { itineraryAPI } from "../utils/api";
import TripReviews from "../components/TripReviews";

const Heart = ({ filled }) => (
  <HeartIcon
    className={`w-4 h-4 ${filled ? "text-red-500 fill-red-500" : "text-slate-600"}`}
  />
);

const Star = () => (
  <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
);

const UserIcon = () => <User className="w-4 h-4 text-slate-500" />;
const CalendarIcon = () => <Calendar className="w-4 h-4 text-slate-500" />;
const CheckIcon = () => <Check className="w-4 h-4 text-green-600" />;

export default function TripDetail() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917006259761";

  const [wishlisted, setWishlisted] = useState(false);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      const data = await itineraryAPI.getById(tripId);

      if (!data) {
        setError("Trip not found");
        setTrip(null);
      } else {
        setTrip(data);
      }
      setLoading(false);
    };

    fetchTrip();
  }, [tripId]);

  const handleTripInquiry = () => {
    const message = encodeURIComponent(
      `Hi, I want to check availability for ${trip.title}. Please share dates and best pricing.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-semibold text-slate-800">
        Loading trip details...
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 p-5 text-center">
        <div className="text-6xl">🏔️</div>
        <h2 className="text-xl font-semibold text-slate-800">
          {error || "Trip not found"}
        </h2>
        <p className="text-slate-500 max-w-md">
          The trip you're looking for might be unavailable.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/alltrips")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
          >
            Browse Trips
          </button>
          <button
            onClick={() => navigate("/")}
            className="border px-6 py-3 rounded-lg font-bold text-slate-500 hover:bg-slate-100"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = trip.gallery?.length
    ? trip.gallery
    : [trip.coverImage].filter(Boolean);

  const [heroImage, ...smallImages] = galleryImages;

  return (
    <div className="bg-white text-slate-800 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-emerald-500 font-bold mb-2"
        >
          ← Back to trips
        </button>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          {trip.title}
        </h1>

        {/* Top Row */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-indigo-50 text-blue-700 border px-3 py-1 text-xs font-bold rounded">
              {trip.tag}
            </span>

            <span className="text-sm text-slate-500">
              By Haba Khatoon Travels
            </span>

            <span className="text-slate-400">•</span>

            <div className="flex items-center gap-1 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
              <span className="text-slate-500">(4.9)</span>
            </div>
          </div>

          <div className="flex gap-5">
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="flex items-center gap-2 font-semibold text-slate-600"
            >
              <Heart filled={wishlisted} /> Wishlist
            </button>

            <button className="flex items-center gap-2 font-semibold text-slate-600">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Left */}
          <div>
            {/* Gallery */}
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-2 mb-5">
              <img
                src={heroImage}
                alt=""
                className="w-full h-full object-cover rounded-xl shadow"
              />

              <div className="grid grid-cols-2 gap-2">
                {smallImages.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-full h-full object-cover rounded-xl shadow"
                  />
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="border rounded-xl p-5 mb-4">
              <h3 className="text-lg font-semibold mb-2">Trip Overview</h3>
              <p className="text-sm text-slate-600 leading-7">
                {trip.description}
              </p>
            </div>

            {/* Includes */}
            <div className="border rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">What you get</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckIcon /> {trip.duration}
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon /> Private transport
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon /> Local guide
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon /> Free cancellation
                </div>
              </div>
            </div>

            <TripReviews
              tripId={trip._id || trip.id}
              tripTitle={trip.title}
            />
          </div>

          {/* Sidebar */}
          <aside className="sticky top-20">
            <div className="border rounded-xl p-5 shadow-md">
              <div className="mb-4">
                <p className="text-sm text-slate-500">From</p>
                <p className="text-3xl font-bold">{trip.price}</p>
                <p className="text-sm text-slate-500">per person</p>
              </div>

              <button className="w-full flex justify-between items-center border rounded-lg px-3 py-2 mb-2 bg-slate-50">
                <span className="flex items-center gap-2">
                  <UserIcon /> Adult x 1
                </span>
                ⌄
              </button>

              <button className="w-full flex justify-between items-center border rounded-lg px-3 py-2 mb-3 bg-slate-50">
                <span className="flex items-center gap-2">
                  <CalendarIcon /> Select date
                </span>
                ⌄
              </button>

              <button
                onClick={handleTripInquiry}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg mb-3"
              >
                Check Availability
              </button>

              <div className="border-t pt-3 text-sm text-slate-600">
                <p className="text-green-600 font-bold">
                  Free cancellation
                </p>
                <p>Cancel up to 24 hours in advance.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}