"use client";

import React, { useEffect, useState } from 'react'

export default function ImageSlider({url, limit = 5, page = 1}) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true)

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`)
      const data = await response.json()

      if (data) {
        setImages(data)
        setLoading(false)
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url !== '') fetchImages(url)
  }, [url])

  console.log(images);

  if (loading) {
    return <div>Loading data, please wait.</div>
  }

  if (errorMessage !== null) {
    return <div>Error occurred: {errorMessage}</div>
  }

  return (
    <div>Image Slider</div>
  )
}
