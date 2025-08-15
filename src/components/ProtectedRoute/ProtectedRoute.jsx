import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      if (currentUser !== null) {
        setIsLoading(false);
      } else if (currentUser === null) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
