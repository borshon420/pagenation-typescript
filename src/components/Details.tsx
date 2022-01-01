import React from "react";
import { useLocation } from "react-router-dom";

const Details: React.FC = ( ) => {
  
  const {state} = useLocation();
  const post = state
  return (
    <div data-testid="details">
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};

export default Details;
