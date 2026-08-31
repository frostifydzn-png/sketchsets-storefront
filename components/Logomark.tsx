/**
 * SketchSets mark: three offset sheets, stacked and sheared, reading as a set
 * of assets. Original geometry, built to stay legible down to 20px and to work
 * as a favicon or avatar later on.
 */
export function Logomark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="SketchSets"
      className={className}
    >
      {/*
        Y positions are set from measured render, not from the raw geometry.
        The shear lifts the stack, so the bars sit lower in the viewBox than
        arithmetic centring would suggest in order to land optically centred.
      */}
      <g transform="skewY(-10)">
        <rect
          x="5"
          y="9.3"
          width="22"
          height="5"
          rx="1.5"
          fill="currentColor"
          opacity="0.35"
        />
        <rect
          x="5"
          y="16.3"
          width="22"
          height="5"
          rx="1.5"
          fill="currentColor"
          opacity="0.6"
        />
        <rect
          x="5"
          y="23.3"
          width="22"
          height="5"
          rx="1.5"
          fill="var(--color-accent)"
        />
      </g>
    </svg>
  );
}
