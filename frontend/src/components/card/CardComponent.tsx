import React from "react";
import "./CardComponent.css";

interface CardProps {
  children: React.ReactNode;
}

const CardComponent: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="responsive-card">
      {children}
    </div>
  );
};

export default CardComponent;
