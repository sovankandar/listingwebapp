import { MoreVertical, MapPin, Calendar, ExternalLink } from "lucide-react"

function DeviceCard({ device, fullWidth }) {
  return (
    <div className={`device-card ${fullWidth ? "full-width" : ""}`}>
      <div className="device-card-header">
        <div className="device-image-container">
          <img src={device.image || "/placeholder.svg"} alt={device.title} className="device-image" />
        </div>

        <div className="device-header-content">
          <h3 className="device-title">{device.title}</h3>

          <div className="device-meta-row">
            <div className="status-id-container">
              <span className="status-badge">{device.status}</span>
              <span className="device-id">ID# {device.id}</span>
            </div>

            <div className="location-date-container">
              <div className="device-location">
                <MapPin size={16} />
                <span>{device.location}</span>
              </div>

              <div className="device-date">
                <Calendar size={16} />
                <span>{device.date}</span>
              </div>
            </div>
          </div>

          <div className="device-tags">
            {device.tags.map((tag, index) => (
              <span key={index} className="device-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="more-options">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="device-divider"></div>

      {device.seller && (
        <div className="seller-section">
          <div className="seller-info">
            <img src={device.seller.avatar || "/placeholder.svg"} alt={device.seller.name} className="seller-avatar" />
            <div className="seller-details">
              <div className="seller-name">{device.seller.name}</div>
              <div className="seller-title">{device.seller.title}</div>
            </div>
          </div>
          {device.seller.link && (
            <button className="seller-link">
              <ExternalLink size={16} />
            </button>
          )}
        </div>
      )}

      <div className="device-footer">
        <div className="transaction-type">
          <span className={`transaction-badge ${device.transactionType.toLowerCase().replace("/", "-")}`}>
            {device.transactionType}
          </span>
        </div>
        <div className="device-price">
          <span className="price-amount">${device.price.toLocaleString()}</span>
          <span className="price-unit">
            {device.currency} - {device.unit}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DeviceCard
