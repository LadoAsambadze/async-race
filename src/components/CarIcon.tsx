interface CarIconProps {
  color: string;
  size?: number;
}

const DEFAULT_SIZE = 48;
const ASPECT_RATIO = 0.45;

// Simple car silhouette; `fill` is driven by the car's selected colour.
const CarIcon = ({ color, size = DEFAULT_SIZE }: CarIconProps) => (
  <svg
    width={size}
    height={size * ASPECT_RATIO}
    viewBox="0 0 100 45"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="car"
  >
    <path
      fill={color}
      d="M6 34c0-2 1-4 4-4h2l8-12c2-3 5-5 9-5h20c4 0 8 2 11 5l8 9 12 3c3 1 5 3 5 6v3c0 2-1 3-3 3h-6a8 8 0 0 1-16 0H35a8 8 0 0 1-16 0h-9c-2 0-4-2-4-4z"
    />
    <circle cx="27" cy="37" r="6" fill="#222" />
    <circle cx="27" cy="37" r="2.5" fill="#bbb" />
    <circle cx="73" cy="37" r="6" fill="#222" />
    <circle cx="73" cy="37" r="2.5" fill="#bbb" />
    <path fill="rgba(255,255,255,0.35)" d="M32 18h16l5 8H27z" />
  </svg>
);

export default CarIcon;
