import React, { useRef, useState } from "react";

const Home = () => {
  const [loadedFeedbacks, setLoadedFeedback] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    if (!enteredEmail || !enteredFeedback) {
      return;
    }

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, feedback: enteredFeedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e.message));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setLoadedFeedback(data.feedback))
      .catch((e) => console.log(e.message));
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea type="text" rows={5} id="feedback" ref={feedbackInputRef} />
        </div>
        <button>Send feedback</button>
      </form>

      <hr />

      <button onClick={loadFeedbackHandler}>Load feedbacks</button>
      <ul>
        {loadedFeedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.text}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
