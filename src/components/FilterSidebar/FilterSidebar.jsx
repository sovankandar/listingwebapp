"use client"

import FilterSection from "./FilterSection"

function FilterSidebar({ filters, onFilterChange, onClearFilters, isOpen }) {
  const handlePriceChange = (type, value) => {
    if (type === "min") {
      onFilterChange({ priceMin: value })
    } else {
      onFilterChange({ priceMax: value })
    }
  }

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters[filterType] || []
    let newValues = []

    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((v) => v !== value)
    }

    onFilterChange({ [filterType]: newValues })
  }

  const handleCountryChange = (value) => {
    onFilterChange({ country: value })
  }

  return (
    <div className={`filter-sidebar ${!isOpen ? "closed" : ""}`}>
      <div className="filter-header">
        <h3>Filters</h3>
        <span>Apply filters to table data.</span>
      </div>

      <FilterSection title="Price">
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => handlePriceChange("min", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => handlePriceChange("max", e.target.value)}
          />
        </div>
      </FilterSection>

      <FilterSection title="Date Posted">
        <div className="checkbox-group">
          {["Last 24 hours", "Last 7 days", "Last 30 days"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={filters.datePosted.includes(option)}
                onChange={(e) => handleCheckboxChange("datePosted", option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Seller Role">
        <div className="checkbox-group">
          {["Manufacturer", "Dealer", "Hospital"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={filters.sellerRole.includes(option)}
                onChange={(e) => handleCheckboxChange("sellerRole", option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Transaction Type">
        <div className="checkbox-group">
          {["Sale", "Rent/Lease"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={filters.transactionType.includes(option)}
                onChange={(e) => handleCheckboxChange("transactionType", option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Status">
        <div className="checkbox-group">
          {["New", "Pre-owned", "Refurbished"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={filters.status.includes(option)}
                onChange={(e) => handleCheckboxChange("status", option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Warranty">
        <div className="checkbox-group">
          {["Yes", "No"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={filters.warranty.includes(option)}
                onChange={(e) => handleCheckboxChange("warranty", option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Shipping">
        <div className="checkbox-group">
          {["Free shipping", "Paid shipping"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={filters.shipping.includes(option)}
                onChange={(e) => handleCheckboxChange("shipping", option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="filter-section">
        <h4>Country</h4>
        <input
          type="text"
          placeholder="Search country"
          className="country-search"
          value={filters.country}
          onChange={(e) => handleCountryChange(e.target.value)}
        />
      </div>

      <div className="filter-actions">
        <button className="apply-filters">Apply Filters</button>
        <button className="clear-filters" onClick={onClearFilters}>
          Clear All
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar
