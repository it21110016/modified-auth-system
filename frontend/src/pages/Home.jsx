const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to My App</h1>
      <p className="text-lg text-gray-700 mb-8">Please log in to continue and explore the dashboard.</p>

      <div className="space-y-4">
        <a
          href="/user-profile"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Go to User Dashboard
        </a>
        <br />
        <a
          href="/admin-dashboard"
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-300 transition"
        >
          Go to Admin Dashboard
        </a>
      </div>
    </div>
  );
};

export default Home;
