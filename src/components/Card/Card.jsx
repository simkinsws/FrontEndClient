import "./Card.scss";

import React from "react";

const Card = ({ color, background, icon, title, count }) => {
  return (
    <div className="card-container" style={{ background: `${background}` }}>
      <div className="icon"></div>
      <div className="title" style={{ color: `${color}` }}>
        {title}
      </div>
      <div className="count" style={{ color: `${color}` }}>
        {count}
      </div>
    </div>
  );
};

export default Card;
