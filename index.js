"use client";

import React, { useEffect, useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function ImageSlider({url, limit = 5, page = 1}) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true)
      const response = await fetch(`${getUrl}?limit=${limit}&skip=${(page - 1) * limit}`);
      const data = await response.json()
      console.log(data);
      
      if (data && data.products) {
        setImages(data.products);
        setLoading(false);
      } else {
        setErrorMessage("No products found");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url !== '') fetchImages(url)
  }, [url, page, limit])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading data, please wait.</div>
  }
  if (errorMessage !== null) {
    return <div className="flex items-center justify-center h-64 text-red-500">Error occurred: {errorMessage}</div>
  }

  function handlePrevSlide() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }
  function handleNextSlide() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
  }

  return (
    <div className="relative w-full max-w-lg mx-auto mt-8">
      {images.length > 0 && (
        <img
        key={images[currentSlide].id}
        alt={images[currentSlide].title}
        src={images[currentSlide].images[0]}
          className="object-cover w-full h-64 rounded-lg shadow-lg"
        />
      )}
      
      <button
        onClick={handlePrevSlide}
        className="absolute p-1 text-3xl text-white transition-opacity transform -translate-y-1/2 bg-gray-800 rounded-full opacity-75 top-1/2 left-2 hover:opacity-100"
      >
        <BsArrowLeftCircleFill />
      </button>
      
      <button
        onClick={handleNextSlide}
        className="absolute p-1 text-3xl text-white transition-opacity transform -translate-y-1/2 bg-gray-800 rounded-full opacity-75 top-1/2 right-2 hover:opacity-100"
      >
        <BsArrowRightCircleFill />
      </button>
      
      <div className="flex justify-center mt-4">
        {images.length > 0 &&
          images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
      </div>
    </div>
  );
}
