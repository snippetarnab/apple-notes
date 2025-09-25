import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUi from "../components/RateLimitedUi.jsx";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/applenotes");
        
        console.log(res.data);
      } catch (error) {
        console.log("Error in fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen" data-theme="forest">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
    </div>
  );
}

export default HomePage;
