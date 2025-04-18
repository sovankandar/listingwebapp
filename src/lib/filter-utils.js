export function filterDevices(devices, filters) {
    return devices.filter((device) => {
      if (filters.priceMin && device.price < Number.parseInt(filters.priceMin)) {
        return false
      }
      if (filters.priceMax && device.price > Number.parseInt(filters.priceMax)) {
        return false
      }
  
      if (filters.transactionType.length > 0 && !filters.transactionType.includes(device.transactionType)) {
        return false
      }
      if (filters.status.length > 0) {
        const deviceStatus = getDeviceStatus(device.title)
        if (!filters.status.some((status) => deviceStatus.includes(status.toLowerCase()))) {
          return false
        }
      }
      if (filters.warranty.length > 0 && !filters.warranty.includes(device.warranty || "No")) {
        return false
      }
      if (filters.shipping.length > 0 && !filters.shipping.includes(device.shipping || "Paid shipping")) {
        return false
      }
      if (filters.sellerRole.length > 0 && !filters.sellerRole.includes(device.sellerRole || "")) {
        return false
      }
      if (filters.country && !device.location.toLowerCase().includes(filters.country.toLowerCase())) {
        return false
      }
  
      if (filters.datePosted.length > 0) {
        const deviceDate = new Date(device.date)
        const now = new Date()
  
        const isWithinTimeframe = filters.datePosted.some((timeframe) => {
          if (timeframe === "Last 24 hours") {
            const yesterday = new Date(now)
            yesterday.setDate(now.getDate() - 1)
            return deviceDate >= yesterday
          } else if (timeframe === "Last 7 days") {
            const lastWeek = new Date(now)
            lastWeek.setDate(now.getDate() - 7)
            return deviceDate >= lastWeek
          } else if (timeframe === "Last 30 days") {
            const lastMonth = new Date(now)
            lastMonth.setDate(now.getDate() - 30)
            return deviceDate >= lastMonth
          }
          return false
        })
  
        if (!isWithinTimeframe) {
          return false
        }
      }
  
      return true
    })
  }
  
  function getDeviceStatus(title) {
    const titleLower = title.toLowerCase()
    if (titleLower.includes("new")) {
      return "new"
    } else if (titleLower.includes("refurbished")) {
      return "refurbished"
    } else if (titleLower.includes("pre-owned") || titleLower.includes("used")) {
      return "pre-owned"
    }
    return ""
  }
  