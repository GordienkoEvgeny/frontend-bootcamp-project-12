import React from 'react';

const World = () => (
  <div className="globe-container">
    <div className="globe">
      <div className="globe-sphere" />
      <div className="globe-outer-shadow" />
      <div className="globe-worldmap">
        <div className="globe-worldmap-back" />
        <div className="globe-worldmap-front" />
      </div>
      <div className="globe-inner-shadow" />
    </div>
  </div>
);
export default World;
