"use client";
import { useEffect, useState } from "react";
import React from "react";
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
    axios.get('https://www.bkarogyam.com/lapiskidneytreatments/')
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
          <button
            className="bg-[#cab641] hover:bg-red-900 hover:text-white text-black font-bold mt-5 py-2 px-4 rounded w-full md:w-[500px] relative overflow-hidden group"
            onClick={() => window.open(data.book_now_link, "_blank")} 
          >
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
        <p className="text-lg text-gray-600 mb-4">{item.sort_description}</p>
        <a href="#" className="text-black text-lg font-semibold py-3 px-6 rounded-lg mb-5">
          {item.sort_description}
        </a>
      </div>
    ))}

    <div className="flex flex-col justify-center">
      <div className="mb-4">
        {data.how_this_help_you.map((item) => (
          <React.Fragment key={item.id}>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-lg text-gray-600">{item.options1}</span>
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-lg text-gray-600">{item.options2}</span>
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-lg text-gray-600">{item.options3}</span>
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-lg text-gray-600">{item.options4}</span>
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-lg text-gray-600">{item.options5}</span>
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-lg text-gray-600">{item.options6}</span>
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-lg text-gray-600">{item.options7}</span>
            </label>
          </React.Fragment>
        ))}
      </div>

      <button className="bg-[#cab641] hover:text-white hover:bg-red-900 text-black font-bold mt-5 py-2 px-4 rounded w-full md:w-[500px] relative overflow-hidden group"  onClick={() => window.open(data.book_now_link, "_blank")} >
        <span className="z-10 relative">{data.book_now_text}</span>
        <div className="absolute inset-0 w-full h-full bg-transparent animate-wave3 group-hover:animate-wave-hover"></div>
      </button>

      
    </div>
  </div>
</div>





<div className="bg-red-900 py-10 px-5">
  <h2 className="text-3xl font-bold mb-4 text-white text-center py-5">
    Lal Kitab Webinar में आप सीखेगें
  </h2>

  {/* Central Vertical Line */}
  <div className="max-w-4xl mx-auto flex items-start relative">
    <div className="absolute left-1/2 top-0 h-full border-l-4 border-white transform -translate-x-1/2" />

    {/* Left Section for 01 */}
    {data.whatyouget[0] && (
      <div className="w-1/2 p-4 flex flex-col items-end mb-8">
        <ul className="text-white list-disc list-inside ml-2">
          <p className="text-7xl text-white text-left">{data.whatyouget[0].countnumber.toString().padStart(2, '0')}</p>
          <h3 className="text-2xl font-semibold mb-2 text-white">{data.whatyouget[0].title}</h3>
          <div dangerouslySetInnerHTML={{ __html: data.whatyouget[0].description }} />
        </ul>
      </div>
    )}

    {/* Right Section for 02 */}
    {data.whatyouget[1] && (
      <div className="w-1/2 p-4 flex flex-col items-start mb-8 ml-6">
        <ul className="text-white list-disc list-inside ml-4">
          <p className="text-7xl text-white">{data.whatyouget[1].countnumber.toString().padStart(2, '0')}</p>
          <h3 className="text-2xl font-semibold mb-2 text-white">{data.whatyouget[1].title}</h3>
          <div dangerouslySetInnerHTML={{ __html: data.whatyouget[1].description }} />
        </ul>
      </div>
    )}
  </div>

  {/* Centered Bottom Section for 03 */}
  {data.whatyouget[2] && (
    <div className="max-w-4xl mx-auto flex flex-col items-center mb-8 mt-5">
      <ul className="text-white list-disc list-inside ml-4">
        <p className="text-7xl text-white text-center">{data.whatyouget[2].countnumber.toString().padStart(2, '0')}</p>
        <h3 className="text-2xl font-semibold mb-2 text-white">{data.whatyouget[2].title}</h3>
        <div dangerouslySetInnerHTML={{ __html: data.whatyouget[2].description }} />
      </ul>
    </div>
  )}
</div>








{/* Countdown Timer Section */}
<div
  className="py-4 rounded-lg grid grid-cols-3 items-center gap-0 md:px-40" 
  style={{
    backgroundImage: "url('/Group-35371.webp')", 
    backgroundSize: "cover", 
    backgroundPosition: "center",
    minHeight: "170px",
  }}
>
  {/* First Grid Item: Text */}
  <div className="text-xl font-bold text-black flex justify-center items-center px-1"> {/* Added horizontal padding */}
    <span className="text-red-900 font-bold text-2xl">Time is Running Out. Grab Your Spot Fast!</span>
  </div>

  {/* Second Grid Item: Button */}
  <div className="flex justify-center items-center px-1"> {/* Added horizontal padding */}
    <button className="bg-[#cab641] hover:bg-red-900 text-black hover:text-white font-bold py-2 px-4 rounded relative overflow-hidden group"  onClick={() => window.open(data.book_now_link, "_blank")}>
      <span className="z-10 relative">{data.book_now_text}</span>
      <div className="absolute inset-0 w-full h-full bg-transparent animate-wave4 group-hover:animate-wave-hover"></div>
    </button>
  </div>

  {/* Third Grid Item: Countdown Timer */}
  <div className="flex items-center justify-center gap-2 text-xl font-bold px-1">
    <span className="flex flex-col items-center justify-center w-20 h-20 bg-red-900 text-white rounded-lg animate-zoom-out">
      <span className="text-4xl">{countdown.days}</span>
      <span className="text-sm">Days</span>
    </span>
    <span className="flex flex-col items-center justify-center w-20 h-20 bg-red-900 text-white rounded-lg animate-zoom-out">
      <span className="text-4xl">{countdown.hours}</span>
      <span className="text-sm">Hours</span>
    </span>
    <span className="flex flex-col items-center justify-center w-20 h-20 bg-red-900 text-white rounded-lg animate-zoom-out">
      <span className="text-4xl">{countdown.minutes}</span>
      <span className="text-sm">Minutes</span>
    </span>
    <span className="flex flex-col items-center justify-center w-20 h-20 bg-red-900 text-white rounded-lg animate-zoom-out">
      <span className="text-4xl">{countdown.seconds}</span>
      <span className="text-sm">Seconds</span>
    </span>
  </div>
</div>




<div className="p-6 px-10 bg-white">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Why Learn Lal Kitab If You&apos;ve Learned Astrology?
      </h2>
      
      <h3 className="text-3xl font-semibold text-gray-700 mb-2 text-center">
        ज्‍योतिष और लाल किताब में क्‍या अतंर है?
      </h3>

      {data.whatdefrent.map((item, index) => ( // Added index as second parameter
        <div key={item.id} className={`flex flex-col md:flex-row items-center justify-center mt-6 md:px-[10em] ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
          {/* Section for Image and Text */}
          <div className="flex flex-col mt-5">
            <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
            <p className="text-lg mb-1 pl-10 mt-3" dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
          
          {/* Image Section */}
          <div className="flex mt-14 ml-10">
            <Image
              src={item.image} // Use the image URL from the provided data
              alt={item.title}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>



    <div className="bg-red-900 text-white py-8">
      {/* Mentor Section */}
      <h2 className="text-2xl font-bold mb-2 text-center">Meet Our Mentors</h2>
      {data.ourmentor.map((mentor, index) => (
        <div key={mentor.id} className="flex flex-col md:flex-row items-center justify-center mt-6 md:px-28">
          {/* Left Section: Mentor Information */}
          <div className="flex flex-col md:w-1/2 text-center md:text-left md:mr-4">
            <h3 className="text-xl font-semibold mb-4">{mentor.name}</h3>
            <p className="text-lg font-bold mb-1">{mentor.title}</p>
            <p className="text-sm mb-4" dangerouslySetInnerHTML={{ __html: mentor.description }} />

            {/* Achievement Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-4">
              {data.ourmentorcarddata.map((item) => (
                <div key={item.id} className="bg-white text-black rounded-lg p-4 text-center shadow-lg">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Section: Mentor Image */}
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <Image
              src={mentor.image} 
              alt={mentor.name}
              width={500}
              height={500}
              className="rounded-lg"
            />
            <button className="w-[20em] bg-[#cab641] hover:bg-blue-800 text-black hover:text-white font-bold py-2 px-4 rounded relative overflow-hidden group mt-10" onClick={() => window.open(data.book_now_link, "_blank")}>
              <span className="z-10 relative">{data.book_now_text}</span>
              <div className="absolute inset-0 w-full h-full bg-transparent animate-wave5 group-hover:animate-wave-hover"></div>
            </button>
          </div>
        </div>
      ))}
    </div>


    <div className="p-6 px-10 bg-white">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Who Should Join This Webinar?
      </h2>
    {data.whoshouldjoin.map((item, index) => ( // Added index as second parameter
        <div key={item.id} className={`flex flex-col md:flex-row items-center justify-center mt-6 md:px-[10em] ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
          {/* Section for Image and Text */}
          <div className="flex flex-col mt-5">
            <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
            <p className="text-lg mb-1 pl-10 mt-3" dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
          
          {/* Image Section */}
          <div className="flex mt-5 ml-10">
            <Image
              src={item.iconimage} // Use the image URL from the provided data
              alt={item.title}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>

















{/* Countdown Timer Section */}
<div className="fixed bottom-0 left-0 right-0 py-1 text-center flex items-center justify-between px-10 bg-red-900 z-10">
  <div className="text-center text-2xl font-bold text-white">
    <p>{data.price}</p>
  </div>

  <div className="flex justify-center gap-10 text-3xl font-bold text-white">
    <span className="animate-zoom-out">{countdown.days} Days</span>
    <span className="animate-zoom-out">{countdown.hours} Hours</span>
    <span className="animate-zoom-out">{countdown.minutes} Minutes</span>
    <span className="animate-zoom-out">{countdown.seconds} Seconds</span>
  </div>

  {/* Button Section */}
  <button className="bg-[#cab641] hover:bg-red-900 hover:text-white text-white font-bold py-2 px-4 rounded relative overflow-hidden group" onClick={() => window.open(data.book_now_link, "_blank")}>
    <span className="z-10 relative">{data.book_now_text}</span>
    <div className="absolute inset-0 w-full h-full bg-transparent animate-wave5 group-hover:animate-wave-hover"></div>
  </button>
  
  <style jsx>{`
    @keyframes wave5 {
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

    .animate-wave5 {
      animation: wave 2s infinite;
      background: linear-gradient(90deg, rgba(127, 29, 29, 0.1), rgba(127, 29, 29, 0.4), rgba(127, 29, 29, 0.1));
    }
  `}</style>
</div>




    </div>
  );
}
