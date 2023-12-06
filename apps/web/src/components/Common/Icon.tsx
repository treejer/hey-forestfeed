type IconProps = {
  className?: string;
};

export function TreeCollectIcon(props: IconProps) {
  const { className } = props;

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.5 33H22.5M18 33V25.5M18 3L7.5 25.5H28.5L18 3Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function TreeCollectedIcon(props: IconProps) {
  const { className } = props;

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="#78B682"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.5 33H22.5M18 33V25.5M18 3L7.5 25.5H28.5L18 3Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
