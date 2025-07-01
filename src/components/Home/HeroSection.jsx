import SearchHome from "./SearchHome";
import ProfileVideo from "./ProfileVideo";

export default function HeroSection() {
  return (
    <div className="w-full bg-green-50 px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        <SearchHome />
        <ProfileVideo />
      </div>
    </div>
  );
}
