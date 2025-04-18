"use client"

import { useState, useEffect } from "react"
import MainLayout from "./components/Layout/MainLayout"
import DeviceList from "./components/DeviceList/DeviceList"
import FilterSidebar from "./components/FilterSidebar/FilterSidebar"
import { deviceData } from "./lib/data"
import "./App.css"

export default function App() {
  const [visibleDevices, setVisibleDevices] = useState(8)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    datePosted: [],
    sellerRole: [],
    transactionType: [],
    status: [],
    warranty: [],
    shipping: [],
    country: "",
  })

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth <= 768) {
        setSidebarOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const loadMore = () => {
    setVisibleDevices((prev) => Math.min(prev + 8, deviceData.length))
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setVisibleDevices(8)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const clearFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      datePosted: [],
      sellerRole: [],
      transactionType: [],
      status: [],
      warranty: [],
      shipping: [],
      country: "",
    })
    setVisibleDevices(8)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <MainLayout>
      <div className="device-listing-container">
        <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            isOpen={sidebarOpen}
          />
          {isMobile && (
            <button className="close-sidebar-button" onClick={toggleSidebar}>
              &times;
            </button>
          )}
        </div>

        {isMobile && sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

        <DeviceList
          devices={deviceData}
          visibleDevices={visibleDevices}
          loadMore={loadMore}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </MainLayout>
  )
}
