import FeatureCard from "./FeatureCard";

const FeatureCardsContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold">New way to get a Job</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon="🌿"
          title="Manage candidates easily"
          description="Our easy-to-use software lets you evaluate candidates and move them faster."
        />
        <FeatureCard
          icon="💖"
          title="User-friendly hiring software"
          description="Make it easy and quick for top candidates to find your jobs."
        />
        <FeatureCard
          icon="📐"
          title="Make the perfect hire"
          description="Reduce hiring time by finding qualified candidates quickly and easily."
        />
      </div>
    </div>
  );
};

export default FeatureCardsContainer;
