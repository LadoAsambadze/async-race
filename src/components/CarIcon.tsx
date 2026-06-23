interface CarIconProps {
  color: string;
  size?: number;
}

const DEFAULT_SIZE = 56;
const ASPECT_RATIO = 0.5;

const CarIcon = ({ color, size = DEFAULT_SIZE }: CarIconProps) => (
  <svg
    width={size}
    height={size * ASPECT_RATIO}
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="car"
    style={{ filter: `drop-shadow(0 0 4px ${color})` }}
  >
    <path
      fill={color}
      fillOpacity={0.12}
      stroke={color}
      strokeWidth={2.5}
      strokeLinejoin="round"
      d="M6 36c0-2 1-4 4-4h2l8-12c2-3 5-5 9-5h20c4 0 8 2 11 5l8 9 12 3c3 1 5 3 5 6v3c0 2-1 3-3 3h-6a8 8 0 0 1-16 0H35a8 8 0 0 1-16 0h-9c-2 0-4-2-4-4z"
    />
    <circle cx="27" cy="39" r="6" fill="#05010f" stroke={color} strokeWidth={2} />
    <circle cx="73" cy="39" r="6" fill="#05010f" stroke={color} strokeWidth={2} />
    <path fill="none" stroke={color} strokeWidth={1.8} d="M32 20h16l5 8H27z" />
  </svg>
);

export default CarIcon;
