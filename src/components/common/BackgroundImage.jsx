import React from "react";
import PropTypes from "prop-types";

function BackgroundImage({
  src,
  children,
  className,
  style,
  overlayColor = "rgba(0, 0, 0, 0.5)",
}) {
  const backgroundStyle = {
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative", // Nécessaire pour positionner l'overlay
    ...style,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor, // Couleur de l'overlay configurable
  };

  return (
    <div className={`background-image ${className}`} style={backgroundStyle}>
      <div style={overlayStyle}></div> {/* Overlay pour réduire le contraste */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

BackgroundImage.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  overlayColor: PropTypes.string, // Couleur de l'overlay en prop optionnelle
};

export default BackgroundImage;
