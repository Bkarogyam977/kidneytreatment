"use client";
import { useEffect, useState } from "react";
import { FaClock, FaCalendarAlt, FaGift, FaVideo } from "react-icons/fa";
import Image from 'next/image'
import { Collapse } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const { Panel } = Collapse;

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const countdownDate = new Date("2024-10-19T19:30:00").getTime(); // Set your countdown date here

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      // Calculate time remaining
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the countdown state
      setCountdown({ days, hours, minutes, seconds });

      // Clear interval when countdown is finished
      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [countdownDate]);

  return (
    <div className="bg-white">
      {/* Marquee with Tailwind styling */}
      <marquee className="bg-red-900 text-white py-1 text-xl font-bold">
        ✨ | ✨ Limited Seats: Join India's First Lal Kitab Webinar ✨ | ✨ Get FREE Bonuses worth ₹999/ ✨ | ✨
      </marquee>

      {/* Grid Layout with Video and Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:px-40 mt-5">
        {/* Left side - Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4 text-black">
            Join Astro Arun Pandit&s
          </h1>
          <p className="text-3xl text-red-900 font-bold"> 1st Ever Live Lal Kitab Webinar</p>
          <p className="text-lg mb-2 text-black mt-5">Astrology Reveals, Lal Kitab Heals—</p>
          <p className="text-lg mb-4 text-black mt-3">Learn the Secrets to Master your Destiny!</p>
          <button className="bg-[#cab641] hover:bg-red-900 hover:text-white text-black font-bold mt-5 py-2 px-4 rounded w-full md:w-[500px] relative overflow-hidden group">
            <span className="z-10 relative">Avail Yours! Register Now</span>
            <div className="absolute inset-0 w-full h-full bg-transparent animate-wave group-hover:animate-wave-hover"></div>
          </button>

          <style jsx>{`
            @keyframes wave {
              0% {
                background: linear-gradient(90deg, #7f1d1d, #991b1b); /* Red-900 gradient */
              }
              50% {
                background: linear-gradient(90deg, #991b1b, #7f1d1d); /* Reversed red-900 gradient */
              }
              100% {
                background: linear-gradient(90deg, #7f1d1d, #991b1b); /* Red-900 gradient */
              }
            }

            .animate-wave {
              animation: wave 2s infinite;
              background: linear-gradient(90deg, rgba(127, 29, 29, 0.1), rgba(127, 29, 29, 0.4), rgba(127, 29, 29, 0.1)); /* Red-900 gradient */
            }
          `}</style>

        </div>

        {/* Right side - YouTube Video */}
        <div className="flex justify-center items-center">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/ZVNb45H3ITw"
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
    {/* Card 1 - Time */}
    <div className="bg-gray-100 p-3 rounded-lg shadow-lg flex items-start border border-red-900">
      <FaClock className="text-4xl text-red-900 mr-3" /> {/* Time Icon */}
      <div>
        <h2 className="text-sm font-bold text-black">TIME</h2>
        <p className="text-sm text-gray-700">7:30 PM</p>
      </div>
    </div>

    {/* Card 2 - Date */}
    <div className="bg-gray-100 p-3 rounded-lg shadow-lg flex items-start border border-red-900">
      <FaCalendarAlt className="text-4xl text-red-900 mr-3" /> {/* Date Icon */}
      <div>
        <h2 className="text-sm font-bold text-black">19th October</h2>
        <p className="text-sm text-gray-700">Saturday</p>
      </div>
    </div>

    {/* Card 3 - Bonuses */}
    <div className="bg-gray-100 p-3 rounded-lg shadow-lg flex items-start border border-red-900">
      <FaGift className="text-4xl text-red-900 mr-3" /> {/* Bonus Icon */}
      <div>
        <h2 className="text-sm font-bold text-black">Free Bonuses Worth</h2>
        <p className="text-sm text-gray-700">₹999/-</p>
      </div>
    </div>

    {/* Card 4 - Webinar */}
    <div className="bg-gray-100 p-3 rounded-lg shadow-lg flex items-start border border-red-900">
      <FaVideo className="text-4xl text-red-900 mr-3" /> {/* Webinar Icon */}
      <div>
        <h2 className="text-sm font-bold text-black">3 Hrs Live Webinar</h2>
        <p className="text-sm text-gray-700">Join Now</p>
      </div>
    </div>
  </div>

{/* Countdown Timer Section */}
<div className="mt-10 py-4 text-center bg-red-900 rounded-lg animate-zoom-out">
  <div className="flex justify-center gap-10 text-4xl font-bold text-white">
    <span className="animate-zoom-out">{countdown.days} Days</span>
    <span className="animate-zoom-out">{countdown.hours} Hours</span>
    <span className="animate-zoom-out">{countdown.minutes} Minutes</span>
    <span className="animate-zoom-out">{countdown.seconds} Seconds</span>
  </div>
</div>

<style jsx>{`
  @keyframes zoomOut {
    50% {
      opacity: 5;
      transform: scale(0.9); /* Start slightly larger */
    }
    50% {
      opacity: 1;
      transform: scale(0.9); /* End at normal size */
    }
    100% {
      opacity: 5;
      transform: scale(1); /* End larger again for smooth transition */
    }
  }

  .animate-zoom-out {
    animation: zoomOut 3s ease-in-out infinite;
  }
`}</style>

</div>

{/* Bonus Section */}
<div className="p-4 md:px-40 mt-5 text-center bg-yellow-50">
  <h2 className="text-4xl font-bold mb-4 p-5">Get FREE Bonuses Worth ₹999/-</h2>
  
  <div className="flex flex-row justify-center space-x-4"> {/* Flex container for horizontal alignment */}
    <div className="bg-yellow-500 p-4 flex flex-col items-center h-[300px] w-[350px] rounded-lg"> {/* Fixed width for square cards */}
      <h3 className="text-lg font-semibold mt-5">BONUS - 1</h3>
      <Image
        src='/Untitled-design-9-2-e1727265111821.webp'
        alt="Bonus 1"
        width={200} 
        height={200} 
        className="mb-2 mt-3"
      />
      <p className="mt-3">Missed some key points?</p>
    </div>

    <div className="bg-yellow-500 p-4 flex flex-col items-center h-[300px] w-[350px] rounded-lg"> {/* Fixed width for square cards */}
      <h3 className="text-lg font-semibold mt-5">BONUS - 2</h3>
      <Image
        src='/Untitled-design-9-2-e1727265111821.webp'
        alt="Bonus 2"
        width={200} 
        height={200} 
        className="mb-2 mt-3"
      />
      <p className="mt-3">Access valuable insights.</p>
    </div>
  </div>

  <div className="mt-6">
  <button className="bg-yellow-600 hover:bg-red-900 hover:text-white text-white py-2 px-4 rounded w-full md:w-[500px] relative overflow-hidden group">
    <span className="z-10 relative">Avail Yours! Register Now</span>
    <div className="absolute inset-0 w-full h-full bg-transparent animate-wave group-hover:animate-wave-hover"></div>
  </button>
</div>

<style jsx>{`
  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes wave-hover {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-wave {
    animation: wave 2s infinite;
    background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.4), rgba(255, 215, 0, 0.1)); /* Golden gradient */
  }

  .group-hover .animate-wave-hover {
    animation: wave-hover 2s infinite;
    background: linear-gradient(90deg, rgba(127, 29, 29, 0.1), rgba(127, 29, 29, 0.4), rgba(127, 29, 29, 0.1)); /* Red-900 gradient */
  }
`}</style>
</div>


<div className="bg-white py-10 px-5">
  <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center py-5">
    क्या आपने कभी सोचा है लाल किताब कैसे आपकी मदद कर सकती है?
  </h2>

  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center mb-6">
        <Image
          src='/Group-35391-1-1.webp'
          alt="Bonus 1"
          width={200} 
          height={200} 
          className="mb-2 mt-3"
        />
      </div>
      <p className="text-2xl font-semibold mb-4 text-red-900">अगर आपका जवाब हाँ है तो:</p>
      <a href="#" className="text-black text-lg font-semibold py-3 px-6 rounded-lg mb-5">
        Join our live webinar and learn A to Z of Lal Kitab & its remedies
      </a>
    </div>

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

<div className="bg-red-900 py-10 px-5">
  <h2 className="text-3xl font-bold mb-4 text-white text-center py-5">
    Lal Kitab Webinar में आप सीखेगें
  </h2>

  <div className="max-w-4xl mx-auto flex items-start relative">
    {/* Central Vertical Line */}
    <div className="absolute left-1/2 top-0 h-full border-l-4 border-white transform -translate-x-1/2" />

    {/* Right Section for Step 1 */}
    <div className="w-1/2 p-4 flex flex-col items-end mb-8">
    
      <ul className="text-white list-disc list-inside ml-2">
      <p className="text-7xl text-white text-left">01</p>
      <h3 className="text-2xl font-semibold mb-2 text-white">Personal, Professional, Relationship Tips</h3>

        <li>Learn how to apply Lal Kitab Insights</li>
        <li>In-depth remedies about career, business, relationship, health, etc.</li>
        <li>Mantras, Predictions & more</li>
        <li>Bonus Secret Tips & Tricks</li>
      </ul>
    </div>

    {/* Left Section for Step 2 */}
    <div className="w-1/2 p-4 flex flex-col items-start mb-8 ml-6">

      <ul className="text-white list-disc list-inside ml-4">
      <p className="text-7xl text-white">02</p>
      <h3 className="text-2xl font-semibold mb-2 text-white">Introduction to Lal Kitab</h3>
        <li>Lal Kitab Principles</li>
        <li>Significance of Lal Kitab</li>
        <li>Planetary Influences & its impact</li>
        <li>Karmic Analysis</li>
      </ul>
    </div>
  </div>

  {/* Centered Bottom Section for Step 3 */}
  <div className="max-w-4xl mx-auto flex flex-col items-center mb-8 mt-5">
   
    <ul className="text-white list-disc list-inside ml-4">
    <p className="text-7xl text-white text-center">03</p>
    <h3 className="text-2xl font-semibold mb-2 text-white">Introduction to Lal Kitab</h3>
      <li>Doshas & Dasha Analysis</li>
      <li>Learn Practical Remedies</li>
      <li>Create personalized Lal Kitab Remedies</li>
      <li>Personalized Lal Kitab techniques</li>
    </ul>
  </div>
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
    <button className="bg-[#cab641] hover:bg-red-900 text-black font-bold py-2 px-4 rounded relative overflow-hidden group">
      <span className="z-10 relative">जॉइन करें</span>
      <div className="absolute inset-0 w-full h-full bg-transparent animate-wave4 group-hover:animate-wave-hover"></div>
    </button>

    <style jsx>{`
            @keyframes wave4 {
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

            .animate-wave4 {
              animation: wave 2s infinite;
              background: linear-gradient(90deg, rgba(127, 29, 29, 0.1), rgba(127, 29, 29, 0.4), rgba(127, 29, 29, 0.1));
            }
          `}</style>
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
    Why Learn Lal Kitab If You've Learned Astrology?
  </h2>
  
  <h3 className="text-3xl font-semibold text-gray-700 mb-2 text-center">
    ज्‍योतिष और लाल किताब में क्‍या अतंर है?
  </h3>

 {/* Centered Content Section */}
<div className="flex flex-col md:flex-row items-center justify-center mt-6 md:px-[10em]">
  {/* Left Section: Centered Text */}
  <div className="flex flex-col mt-5">
    <h2 className="text-2xl font-bold mb-1">You've mastered Astrology, Grahs, Rashi’s and more.</h2> {/* Reduced bottom margin */}
    <p className="text-lg mb-1 pl-10 mt-3">But what if there’s a hidden gem waiting to be discovered? Everything you read, hear, or practice related to astrology today is a part of Parashari astrology. Parashari astrology is vast and takes a lifetime to master.</p> {/* Reduced bottom margin */}
  </div>

  {/* Right Section: Centered Image */}
  <div className="flex mt-14 ml-10">
    <Image
      src="/a2z-astrology-book-1.webp"
      alt="Astrology Image"
      width={200}
      height={200}
      className="rounded-lg"
    />
  </div>
</div>

<div className="flex flex-col md:flex-row items-center justify-center mt-6 md:px-[10em]">
    {/* Right Section: Centered Image */}
    <div className="flex mt-14">
    <Image
      src="/a2z-astrology-book-1.webp"
      alt="Astrology Image"
      width={200}
      height={200}
      className="rounded-lg"
    />
  </div>
  {/* Left Section: Centered Text */}
  <div className="flex flex-col mt-5 ml-10">
    <h2 className="text-2xl font-bold mb-1">You've mastered Astrology, Grahs, Rashi’s and more.</h2> {/* Reduced bottom margin */}
    <p className="text-lg mb-1 pl-10 mt-3">But what if there’s a hidden gem waiting to be discovered? Everything you read, hear, or practice related to astrology today is a part of Parashari astrology. Parashari astrology is vast and takes a lifetime to master.</p> {/* Reduced bottom margin */}
  </div>
</div>
</div>










<div className="bg-red-900 text-white py-8"> {/* Background and text color */}
  
  {/* Mentor Section */}
  <h2 className="text-2xl font-bold mb-2 text-center">Meet Your Mentor</h2>
  <div className="flex flex-col md:flex-row items-center justify-center mt-6 md:px-28">

    {/* Left Section: Mentor Information */}
    <div className="flex flex-col md:w-1/2 text-center md:text-left md:mr-4">
      <h3 className="text-xl font-semibold mb-4">Astro Arun Pandit</h3>

      <p className="text-lg font-bold mb-1">Award-Winning Expert in Astrology & More</p>
      <p className="text-sm mb-4">
        Astro Arun Pandit is an award-winning expert in astrology and various related disciplines, such as numerology, Vastu Shastra, palmistry, tarot reading, and Lal Kitab astrology.
      </p>

      <p className="text-lg font-bold mb-1">Spiritual Speaker & Podcaster</p>
      <p className="text-sm mb-4">
        Astro Arun Pandit, a profound spiritual luminary and TEDx speaker, has graced prestigious platforms and conducts Q&A sessions for seekers. His podcast, <em>The Arun Pandit Show</em>, features Astro Arun Pandit inviting famous personalities to engage in enlightening conversations.
      </p>

      {/* Achievement Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-4">
        <div className="bg-white text-black rounded-lg p-4 text-center shadow-lg">
          <h4 className="text-xl font-bold">1 Lakh+</h4>
          <p className="text-sm">Students taught</p>
        </div>
        <div className="bg-white text-black rounded-lg p-4 text-center shadow-lg">
          <h4 className="text-xl font-bold">50 M+</h4>
          <p className="text-sm">Monthly Viewership Across Social Media</p>
        </div>
        <div className="bg-white text-black rounded-lg p-4 text-center shadow-lg">
          <h4 className="text-xl font-bold">49+ yrs</h4>
          <p className="text-sm">Legacy In Field of Astrology</p>
        </div>
        <div className="bg-white text-black rounded-lg p-4 text-center shadow-lg">
          <h4 className="text-xl font-bold">20+</h4>
          <p className="text-sm">Awards in the field of Occult</p>
        </div>
      </div>
    </div>

    {/* Right Section: Mentor Image */}
    <div className="flex flex-col justify-center items-center md:w-1/2">
  <Image
    src="/directorbk.JPG" 
    alt="Astro Arun Pandit"
    width={500} 
    height={500} 
    className="rounded-lg"
  />
 <button className="w-[20em] bg-[#cab641] hover:bg-blue-800 text-black hover:text-white font-bold py-2 px-4 rounded relative overflow-hidden group mt-10">
      <span className="z-10 relative">जॉइन करें</span>
      <div className="absolute inset-0 w-full h-full bg-transparent animate-wave5 group-hover:animate-wave-hover"></div>
    </button>
</div>

  </div>
</div>







<div className="p-6 px-10 bg-white">
  <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
  Who Should Join This Webinar?
  </h2>
  

 {/* Centered Content Section */}
<div className="flex flex-col md:flex-row items-center justify-center md:px-[5em]">
  {/* Left Section: Centered Text */}
  <div className="flex flex-col mt-5">
    <h2 className="text-2xl font-bold mb-1">
    Expert Astrologers </h2> {/* Reduced bottom margin */}
    <p className="text-lg mb-1 pl-10 mt-3">If you’re an experienced astrologer looking to deepen your knowledge of Lal Kitab and explore its unique methodologies, this webinar is perfect for you. </p> {/* Reduced bottom margin */}
  </div>
 

  {/* Right Section: Centered Image */}
  <div className="flex mt-14 ml-10">
    <Image
      src="/no-picture.png"
      alt="Astrology Image"
      width={200}
      height={200}
      className="rounded-lg"
    />
  </div>
</div>

<hr className="border-t-2 border-red-900 my-4" />
<div className="flex flex-col md:flex-row items-center justify-center md:px-[5em]">
    {/* Right Section: Centered Image */}
    <div className="flex mt-14">
    <Image
      src="/no-picture.png"
      alt="Astrology Image"
      width={200}
      height={200}
      className="rounded-lg"
    />
  </div>
  {/* Left Section: Centered Text */}
  <div className="flex flex-col mt-5 ml-10">
    <h2 className="text-2xl font-bold mb-1">Budding Occult Experts </h2> {/* Reduced bottom margin */}
    <p className="text-lg mb-1 pl-10 mt-3">Those who are aspiring to build a successful career in astrology and Lal Kitab will find this webinar invaluable for gaining foundational and advanced insights. </p> {/* Reduced bottom margin */}
  </div>
</div>
  <hr className="border-t-2 border-red-900 my-4" />
</div>



{/* Countdown Timer Section */}
<h2 className="text-black text-3xl text-center font-bold mb-4">
  Time is Running Out. Grab Your Spot Fast!
</h2>
<div className="mt-10 py-4 text-center rounded-lg border-2 border-red-900 max-w-[45em] mx-auto">
  <div className="flex justify-center gap-10 text-4xl font-bold text-red-600">
    <span className="animate-zoom-out">{countdown.days} Days</span>
    <span className="animate-zoom-out">{countdown.hours} Hours</span>
    <span className="animate-zoom-out">{countdown.minutes} Minutes</span>
    <span className="animate-zoom-out">{countdown.seconds} Seconds</span>
  </div>
</div>

{/* Button Section */}
<div className="mt-5 flex justify-center">
  <button className="bg-[#cab641] hover:bg-red-900 hover:text-white text-black font-bold py-2 px-4 rounded w-full md:w-[500px] relative overflow-hidden group">
    <span className="z-10 relative">Avail Yours! Register Now</span>
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




{/* Testimonials Section */}
<div className="testimonial-section md:p-10 bg-blue-500 md:px-[5em] p-5">
  <Swiper
    slidesPerView={1}
    spaceBetween={20}
    pagination={{
      clickable: true,
    }}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }}
    modules={[Pagination, Autoplay]}
    className="mySwiper"
  >
    {/* Static Testimonials */}
    <SwiperSlide className="p-4">
      <div 
        className="border border-gray-300 rounded-lg shadow-lg p-5 bg-blue-500 text-center"
        style={{ minHeight: '400px', maxHeight: '500px' }}
      >
        <img 
          src="/path/to/image1.jpg" 
          alt="Customer Name 1" 
          className="w-24 h-24 rounded-full mx-auto mb-4" 
        />
        <h4 className="text-lg font-bold mb-2 text-white">Customer Name 1</h4>
        <p className="text-sm italic mb-4 text-white">
          &quot;This is a static testimonial description for Customer Name 1.&quot;
        </p>
        <div className="flex justify-center items-center mb-2 space-x-2">
          <div className="flex">
            {[...Array(4)].map((_, index) => (
              <span key={index} className="text-yellow-500 text-xl">★</span>
            ))}
            {[...Array(1)].map((_, index) => (
              <span key={index} className="text-white">★</span>
            ))}
          </div>
          <p className="text-sm font-semibold text-white">4/5</p>
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide className="p-4">
      <div 
        className="border border-gray-300 rounded-lg shadow-lg p-5 bg-blue-500 text-center"
        style={{ minHeight: '400px', maxHeight: '500px' }}
      >
        <img 
          src="/path/to/image2.jpg" 
          alt="Customer Name 2" 
          className="w-24 h-24 rounded-full mx-auto mb-4" 
        />
        <h4 className="text-lg font-bold mb-2 text-white">Customer Name 2</h4>
        <p className="text-sm italic mb-4 text-white">
          &quot;This is a static testimonial description for Customer Name 2.&quot;
        </p>
        <div className="flex justify-center items-center mb-2 space-x-2">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-500 text-xl">★</span>
            ))}
          </div>
          <p className="text-sm font-semibold text-white">5/5</p>
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide className="p-4">
      <div 
        className="border border-gray-300 rounded-lg shadow-lg p-5 bg-blue-500 text-center"
        style={{ minHeight: '400px', maxHeight: '500px' }}
      >
        <img 
          src="/path/to/image3.jpg" 
          alt="Customer Name 3" 
          className="w-24 h-24 rounded-full mx-auto mb-4" 
        />
        <h4 className="text-lg font-bold mb-2 text-white">Customer Name 3</h4>
        <p className="text-sm italic mb-4 text-white">
          &quot;This is a static testimonial description for Customer Name 3.&quot;
        </p>
        <div className="flex justify-center items-center mb-2 space-x-2">
          <div className="flex">
            {[...Array(3)].map((_, index) => (
              <span key={index} className="text-yellow-500 text-xl">★</span>
            ))}
            {[...Array(2)].map((_, index) => (
              <span key={index} className="text-white">★</span>
            ))}
          </div>
          <p className="text-sm font-semibold text-white">3/5</p>
        </div>
      </div>
    </SwiperSlide>

    {/* Add more static testimonials as needed */}

    <SwiperSlide>
      <div className="text-center p-6">
        <p className="text-white">No more testimonials available.</p>
      </div>
    </SwiperSlide>
  </Swiper>
</div>



<div className='md:py-10 py-5'>
  <h2 className="md:text-5xl text-2xl font-bold mb-4 text-center text-black">Frequently Asked Questions</h2>
  <Collapse defaultActiveKey={['1']}>
    {/* Static FAQ Items */}
    <Panel
      header={
        <div className="bg-green-900 text-white p-2 rounded cursor-pointer hover:bg-green-600">
          What is your return policy?
        </div>
      }
      key="1"
    >
      <p>We offer a 30-day return policy on all products. If you are not satisfied with your purchase, you can return it within 30 days for a full refund.</p>
    </Panel>

    <Panel
      header={
        <div className="bg-green-900 text-white p-2 rounded cursor-pointer hover:bg-green-600">
          How long does shipping take?
        </div>
      }
      key="2"
    >
      <p>Shipping typically takes 5-7 business days, depending on your location. We offer expedited shipping options for faster delivery.</p>
    </Panel>

    <Panel
      header={
        <div className="bg-green-900 text-white p-2 rounded cursor-pointer hover:bg-green-600">
          Do you offer customer support?
        </div>
      }
      key="3"
    >
      <p>Yes, our customer support team is available 24/7 to assist you with any inquiries or issues you may have.</p>
    </Panel>

    <Panel
      header={
        <div className="bg-green-900 text-white p-2 rounded cursor-pointer hover:bg-green-600">
          Can I track my order?
        </div>
      }
      key="4"
    >
      <p>Yes, once your order has shipped, you will receive an email with a tracking number so you can monitor its status.</p>
    </Panel>

    <Panel
      header={
        <div className="bg-green-900 text-white p-2 rounded cursor-pointer hover:bg-green-600">
          What payment methods do you accept?
        </div>
      }
      key="5"
    >
      <p>We accept various payment methods, including credit/debit cards, PayPal, and bank transfers.</p>
    </Panel>

    {/* Add more static FAQs as needed */}
  </Collapse>
</div>


    </div>
  );
}
