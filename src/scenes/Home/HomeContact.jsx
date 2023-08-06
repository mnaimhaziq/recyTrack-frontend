import React, { useState } from "react";

const HomeContact = () => {
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageTextChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSendMessageUpdate = () => {
    // Add your logic here to handle sending the recycling tracking update via email.
    // For demonstration purposes, we'll just log the email and trackingText to the console.
    console.log("Email:", email);
    console.log("Message Text:", messageText);

    // You can implement the actual email sending functionality using backend services like Node.js,
    // or through an API like SendGrid or similar email delivery services.
  };

  return (
    <div className="w-full py-10 bg-black text-white px-4">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 my-3">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Recycling Tracking System
          </h1>
          <p>
            Got questions about recycling or our system? We're here to help!
            Engage with us to make a positive impact on the environment.
            Experience the simplicity of our user-friendly tracking platform
            today. At RecyclingTrackers, customer satisfaction is our top
            priority, and we're dedicated to providing exceptional support.
          </p>
          <br />
          <p>
            We value your privacy and ensure that any information you provide is
            handled securely in accordance with <br />
            <a
              href="https://www.malaysia.gov.my/portal/content/654"
              target="_blank"
            >
              <span className="text-[#00df9a]">Data Protection Laws</span>
            </a>{" "}
            . Your data will not be shared with third parties without your
            consent.{" "}
          </p>
        </div>
        <div className="my-4">
          <div className="flex flex-col xs:flex-row items-center justify-between w-full">
            <input
              className="p-3 m-2 flex w-full rounded-md text-black"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              className="p-3 m-2 flex w-full rounded-md text-black"
              type="text"
              placeholder="Enter Your Message"
              value={messageText}
              onChange={handleMessageTextChange}
            />
            <div className="text-black">
              <button
                className="bg-[#00df9a] hover:bg-transparent border-2 border-[#00df9a] rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3 hover:text-[#00df9a]"
                onClick={handleSendMessageUpdate}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
