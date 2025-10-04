import { Link } from "react-router-dom";
import roadmaps from "./data/roadmaps.json";
import UserDashboard from "./Userdashboard";
import { Helmet } from "react-helmet-async";
function RoadmapGrid() {
  return (
    <div className="p-5">
      <Helmet>
        <title>BinaryKeeda | Roadmaps</title>
        <meta
          name="description"
          content="Master your learning journey with BinaryKeeda's structured roadmaps for DSA, Web Development, Java, and more. Start your roadmap today!"
        />
        <meta
          name="keywords"
          content="developer roadmaps, BinaryKeeda, DSA roadmap, Web Development roadmap, Java roadmap, programming guide, coding roadmap"
        />
        <meta name="author" content="BinaryKeeda" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Explore Developer Roadmaps | BinaryKeeda"
        />
        <meta
          property="og:description"
          content="Get started with curated learning paths in DSA, Web Dev, Java, and more. BinaryKeeda roadmaps help you stay on track."
        />
        <meta
          property="og:image"
          content="https://binarykeeda.com/assets/roadmaps-cover.png"
        />
        <meta property="og:url" content="https://binarykeeda.com/roadmaps" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta
          name="twitter:title"
          content="Explore Developer Roadmaps | BinaryKeeda"
        />
        <meta
          name="twitter:description"
          content="Structured roadmaps for DSA, Java, and Web Dev. Learn step-by-step with BinaryKeeda."
        />
        <meta
          name="twitter:image"
          content="https://binarykeeda.com/assets/roadmaps-cover.png"
        />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Additional Meta */}
        <link rel="canonical" href="https://binarykeeda.com/roadmaps" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      {roadmaps.length === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500 text-lg">
            No roadmaps available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {roadmaps.map((i, index) => (
            <Link
              key={index}
              className="relative rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              to={`/user/binarykeeda-roadmap-sheet/blog/${i.slug}`}
            >
              <img
                className="w-full h-[200px] object-cover"
                src={i.image}
                alt={i.title || "Roadmap"}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <p className="text-white font-semibold text-lg">{i.title}</p>
                <p className="text-gray-300 text-sm">{i.time}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoadmapGrid;
