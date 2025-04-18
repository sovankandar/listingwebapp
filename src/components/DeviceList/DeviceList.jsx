"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, Home, SlidersHorizontal, ArrowUpDown, ChevronDown, ArrowDown } from "lucide-react"
import DeviceCard from "../DeviceCard/DeviceCard"

function DeviceList({ devices, visibleDevices, loadMore, sidebarOpen, toggleSidebar }) {
  const [sortOption, setSortOption] = useState("newest")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
  ]

  const getSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortOption)
    return option ? option.label : "Sort By"
  }

  const sortedDevices = [...devices].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      default:
        return 0
    }
  })

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`device-list ${!sidebarOpen ? "full-width" : ""}`}>
      <button className="mobile-filter-toggle" onClick={toggleSidebar}>
        <SlidersHorizontal size={20} />
        {sidebarOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="breadcrumb">
        <Home size={16} />
        <span>Dashboard</span>
        <ChevronRight size={14} />
        <span className="current">Devices</span>
      </div>

      <div className="listing-header">
        <div>
          <h2>{devices.length} Listings Found</h2>
          <p>You searched based on the following criteria.</p>
        </div>
        <div className="sort-controls" ref={dropdownRef}>
          <button className="sort-button" onClick={() => setShowSortDropdown(!showSortDropdown)}>
            <ArrowUpDown size={16} className="mr-2" style={{ marginRight: "8px" }} />
            <span>{getSortLabel()}</span>
            <ChevronDown size={14} className="ml-2" style={{ marginLeft: "8px" }} />
          </button>

          {showSortDropdown && (
            <div className="sort-dropdown">
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  className={`sort-option ${sortOption === option.value ? "active" : ""}`}
                  onClick={() => {
                    setSortOption(option.value)
                    setShowSortDropdown(false)
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filter-toggle-desktop">
        <button onClick={toggleSidebar}>
          <SlidersHorizontal size={16} />
          <span>{sidebarOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      <div className={`device-grid ${!sidebarOpen ? "full-width" : ""}`}>
        {sortedDevices.slice(0, visibleDevices).map((device) => (
          <DeviceCard key={device.id} device={device} fullWidth={!sidebarOpen} />
        ))}
      </div>

      {visibleDevices < devices.length && (
        <button className="load-more" onClick={loadMore}>
          <ArrowDown />
          Load More
        </button>
      )}
    </div>
  )
}

export default DeviceList
