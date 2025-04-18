"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

function FilterSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="filter-section">
      <div className="filter-section-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>{title}</h4>
        <ChevronRight size={16} className={`chevron ${isOpen ? "open" : ""}`} />
      </div>
      {isOpen && <div className="filter-section-content">{children}</div>}
    </div>
  )
}

export default FilterSection
