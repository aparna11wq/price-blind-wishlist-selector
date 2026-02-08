import { Link } from "react-router-dom";

export default function Home() {
  const recipientName = import.meta.env.VITE_RECIPIENT_NAME;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6 max-w-[40rem]">
        <p className="text-gray-700 text-lg mb-7">
          <p className="pb-4">Hey {recipientName} 👋</p>
          <p>
            I have a list of products that I want you to choose from. <br />
            Please choose the product that you want me to get you. <br />
            You can start browsing the products by clicking the button below.
          </p>
        </p>
        <Link
          to="/explore"
          className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Let's Begin
        </Link>
      </div>
    </div>
  );
}
