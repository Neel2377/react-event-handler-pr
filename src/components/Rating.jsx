import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../components/Rating.css";
import userImage from "../assets/user.png";

function Rating() {
  const [star, setStar] = useState(0);
  const [state, setState] = useState(0);

  const handleMouseEnter = (value) => setStar(value);
  const handleMouseLeave = () => setStar(0);
  const handleClick = (value) => setState(value);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");

  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("feedbackList");
    if (stored) setSavedData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("feedbackList", JSON.stringify(savedData));
  }, [savedData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: Date.now(),
      username: name,
      role: role,
      comment: comment,
      rating: state,
    };

    setSavedData((prev) => [...prev, newFeedback]);

    setName("");
    setRole("");
    setComment("");
    setState(0);
    setStar(0);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "720px" }}>
      <div
        className="card p-4 shadow-sm rounded-4 border-0"
        style={{ background: "#fafafa" }}
      >
        <h4 className="mb-4 text-center fw-bold">Share Your Feedback</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3 py-2 rounded-3"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-3 py-2 rounded-3"
            placeholder="Your Role (e.g. Frontend Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <textarea
            className="form-control mb-4 p-2 rounded-3"
            placeholder="Write something..."
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <div className="text-center mb-3">
            <h6 className="fw-semibold mb-2">Rate Your Experience</h6>

            <div className="d-flex justify-content-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  fontSize="35px"
                  color={value <= (star || state) ? "#ffb600" : "#5c5c5cff"}
                  onMouseEnter={() => handleMouseEnter(value)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(value)}
                  style={{ cursor: "pointer", transition: "0.2s" }}
                />
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
            type="submit"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      <h4 className="mt-5 mb-3 text-center fw-bold">Recent Feedback</h4>

      <div className="testimonial-grid">
        {savedData.map((item, index) => {
          const colors = ["#f59e0b", "#ec4899", "#f97316", "#1e3a8a"];
          const color = colors[index % colors.length];

          return (
            <div className="testimonial-box mt-5" key={item.id}>
              <div className="profile-wrapper" style={{ borderColor: color }}>
                <div
                  className="profile-icon"
                  style={{
                    backgroundColor: color,
                    backgroundImage: `url(${userImage})`,
                  }}
                ></div>
              </div>

              <div className="content-area">
                <h5 className="client-name" style={{ color }}>
                  {item.username}
                </h5>
                <p className="client-role">{item.role}</p>

                <hr className="divider" />

                <p className="client-comment">{item.comment}</p>
              </div>

              <div className="bottom-section" style={{ background: color }}>
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <FaStar
                      key={v}
                      fontSize="20px"
                      color={
                        v <= item.rating ? "#fff" : "rgba(255,255,255,0.4)"
                      }
                    />
                  ))}
                </div>
                <div className="quote-mark">❞</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rating;
