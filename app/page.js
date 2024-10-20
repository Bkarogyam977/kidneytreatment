"use client";
import { useEffect, useState } from "react";
import { FaClock, FaCalendarAlt, FaGift, FaVideo } from "react-icons/fa";
import Image from 'next/image';
import axios from 'axios';
import { Collapse } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const { Panel } = Collapse;

export default function Home() {
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Fetch data from the API on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/lapiskidneytreatments/')
      .then(response => {
        setData(response.data[0]);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Set countdown for the event
  useEffect(() => {
    if (data && data.end_time) {
      // Log the end_time to verify correct formatting
      console.log("End time:", data.end_time);
      
      const countdownDate = new Date(data.end_time).getTime();  // Convert to timestamp
      console.log("Countdown date (timestamp):", countdownDate);
      
      const interval = setInterval(() => {
        const now = new Date().getTime();  // Get current time as timestamp
        const distance = countdownDate - now;
  
        if (distance >= 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
          setCountdown({ days, hours, minutes, seconds });
        } else {
          clearInterval(interval);  // Clear interval when time is up
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          console.log("Countdown finished");
        }
      }, 1000);
  
      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, [data]);

  

  if (!data) {
    return <div>Loading...</div>;  // Show loading state until data is fetched
  }

  return (
    <div className="bg-white">
      {/* Marquee with Tailwind styling */}
      <marquee className="bg-red-900 text-white py-1 text-xl font-bold">
        ✨ | ✨ {data.marquetext} ✨ | ✨
      </marquee>

      {/* Grid Layout with Video and Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:px-40 mt-5">
        {/* Left side - Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4 text-black">
            {data.title}
          </h1>
          <p className="text-3xl text-red-900 font-bold"> {data.sort_heading}</p>
          <p className="text-lg mb-2 text-black mt-5" dangerouslySetInnerHTML={{ __html: data.sort_description }}></p>
          <button className="bg-[#cab641] hover:bg-red-900 hover:text-white text-black font-bold mt-5 py-2 px-4 rounded w-full md:w-[500px] relative overflow-hidden group">
            <span className="z-10 relative">{data.book_now_text}</span>
          </button>
          
        </div>

        {/* Right side - YouTube Video */}
        <div className="flex justify-center items-center">
          <iframe
            width="100%"
            height="315"
            src={data.video_link.replace("youtu.be", "www.youtube.com/embed").split("?")[0]}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>

      <div className="bg-white py-10 md:px-40">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.info_cards.map((card) => (
            <div key={card.id} className="bg-gray-100 px-2 rounded-lg shadow-lg flex items-start border border-red-900">
              <Image
                src={card.icon}
                width={50}
                height={50}
                className="mb-2 mt-3"
              />
              <div className="mt-3 ml-3">
                <h2 className="text-sm font-bold text-black">{card.title}</h2>
                <p className="text-sm text-gray-700">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown Timer Section */}
        <div className="mt-10 py-4 text-center bg-red-900 rounded-lg animate-zoom-out">
          <div className="flex justify-center gap-10 text-4xl font-bold text-white">
            <span>{countdown.days} Days</span>
            <span>{countdown.hours} Hours</span>
            <span>{countdown.minutes} Minutes</span>
            <span>{countdown.seconds} Seconds</span>
          </div>
        </div>
      </div>

      {/* Bonus Section */}
      <div className="p-4 md:px-40 mt-5 text-center bg-yellow-50">
        <h2 className="text-4xl font-bold mb-4 p-5">{data.get_bonuses.length ? 'Get FREE Bonuses Worth ₹999/-' : ''}</h2>
        <div className="flex flex-row justify-center space-x-4">
          {data.get_bonuses.map((bonus) => (
            <div key={bonus.id} className="bg-yellow-500 p-4 flex flex-col items-center h-[300px] w-[350px] rounded-lg">
              <h3 className="text-lg font-semibold mt-5">{bonus.title}</h3>
              <Image
                src={bonus.image}
                alt={bonus.title}
                width={200}
                height={200}
                className="mb-2 mt-3"
              />
              <p className="mt-3">{bonus.content}</p>
            </div>
          ))}
        </div>
      </div>



      
      <div className="bg-white py-10 px-5">
  <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center py-5">
    क्या आपने कभी सोचा है लाल किताब कैसे आपकी मदद कर सकती है?
  </h2>

  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    {data.how_this_help_you.map((item) => (
      <div key={item.id} className="flex flex-col justify-center items-center">
        <div className="flex justify-center mb-6">
          <Image
            src={item.image}
            width={200}
            height={200}
            className="mb-2 mt-3"
          />
        </div>
        <p className="text-2xl font-semibold mb-4 text-red-900">{item.title}</p>
        <a href="#" className="text-black text-lg font-semibold py-3 px-6 rounded-lg mb-5">
          Join our live webinar and learn A to Z of Lal Kitab & its remedies
        </a>
      </div>
    ))}

    <div className="flex flex-col justify-center">
      <div className="mb-4">
        <label className="flex items-center mb-4">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">क्या Relationship में लगातार समस्याएं आ रही हैं?</span>
        </label>
        <label className="flex items-center mb-4">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">शादी और लाइफ पार्टनर के उपाय कर-कर के थक गये हैं?</span>
        </label>
        <label className="flex items-center mb-4">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">क्या Business/ Career में सफलता नहीं मिल रही?</span>
        </label>
        <label className="flex items-center mb-4">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">क्या पैसों की तंगी से जूझ रहे हैं?</span>
        </label>
        <label className="flex items-center mb-4">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">क्या Health issues ने जीवन को कठिन बना दिया है?</span>
        </label>
        <label className="flex items-center mb-4">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">क्या आप हमेशा Stress और Anxiety महसूस करते हैं?</span>
        </label>
        <label className="flex items-center mb-4">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">कुछ न कुछ स्‍वास्‍थ्‍यर समस्‍यायें घर में बनी ही रहती हैं?</span>
        </label>
      </div>

      <button className="bg-[#cab641] hover:text-white hover:bg-red-900 text-black font-bold mt-5 py-2 px-4 rounded w-full md:w-[500px] relative overflow-hidden group">
        <span className="z-10 relative">Avail Yours! Register Now</span>
        <div className="absolute inset-0 w-full h-full bg-transparent animate-wave3 group-hover:animate-wave-hover"></div>
      </button>

      <style jsx>{`
        @keyframes wave3 {
          0% {
            background: linear-gradient(90deg, #7f1d1d, #991b1b);
          }
          50% {
            background: linear-gradient(90deg, #991b1b, #7f1d1d);
          }
          100% {
            background: linear-gradient(90deg, #7f1d1d, #991b1b);
          }
        }

        .animate-wave3 {
          animation: wave 2s infinite;
          background: linear-gradient(90deg, rgba(127, 29, 29, 0.1), rgba(127, 29, 29, 0.4), rgba(127, 29, 29, 0.1));
        }
      `}</style>
    </div>
  </div>
</div>


    </div>
  );
}
