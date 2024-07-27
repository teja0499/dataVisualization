import React from "react";

const Loader = () => {
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f0f0',
        position: 'relative',
      };
    
      const ringStyle = {
        position: 'absolute',
        border: '4px solid transparent',
        borderRadius: '50%',
        borderTopColor: '#3498db',
        animation: 'spin linear infinite',
      };
    
      const ring1Style = {
        ...ringStyle,
        width: '100px',
        height: '100px',
        borderWidth: '4px',
        animationDuration: '1s',  // Fastest
        borderTopColor: '#3498db', // Blue
      };
    
      const ring2Style = {
        ...ringStyle,
        width: '80px',
        height: '80px',
        borderWidth: '6px',
        animationDuration: '1.5s', // Medium speed
        borderTopColor: '#e74c3c', // Red
      };
    
      const ring3Style = {
        ...ringStyle,
        width: '60px',
        height: '60px',
        borderWidth: '8px',
        animationDuration: '2s',  // Slowest
        borderTopColor: '#2ecc71', // Green
      };
    
      return (
        <div style={loaderStyle}>
          <div style={ring1Style}></div>
          <div style={ring2Style}></div>
          <div style={ring3Style}></div>
          <style>
            {`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      );
};

// Inline styles for the container


export default Loader;
