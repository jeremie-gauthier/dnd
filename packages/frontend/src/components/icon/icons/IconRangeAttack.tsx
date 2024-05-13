import { IconProps } from "../Icon.type";

export const IconRangeAttack = ({ className, size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      height={size}
      width={size}
      focusable={false}
      style={{ flexShrink: 0 }}
      fill="currentColor"
    >
      <title>Range Attack</title>
      <g>
        <path d="M151.975 27.45L115.607 69.85l207.53 178.013c3.992 3.426 7.737 6.802 11.275 10.14-9.11 10.77-14.737 21.438-16.695 32.28-1.995 11.046.054 21.91 4.777 31.83 8.896 18.685 26.413 35.06 47.666 53.413-10.29 17.038-26.74 30.657-42.906 42.528-10.355 7.605-12.406 15.25-10.744 24.378 1.66 9.13 8.534 19.705 18.746 27.89 10.212 8.186 23.484 13.902 36.7 14.688 13.218.786 26.327-2.924 38.306-14.24 58.46-55.225 51.443-126.42 28.968-164.854l-11.576-19.797 22.116 6.07c20.454 5.61 30.968 1.247 36.492-6.052 4.46-5.893 6.093-15.657 3.404-27.207-9.253 2.936-20.322 5.495-32.64 5.336-16.77-.218-35.753-5.815-53.835-21.325L151.976 27.452zm206.433 0l-88.865 76.226 42.898 36.797 82.335-70.625-36.367-42.397zM197.943 165.095l-90.752 77.844c-18.08 15.51-37.062 21.106-53.835 21.324-12.316.16-23.385-2.4-32.638-5.336-2.69 11.55-1.055 21.314 3.404 27.207 5.525 7.3 16.04 11.663 36.493 6.05l22.116-6.068-11.578 19.797c-22.475 38.433-29.49 109.63 28.97 164.854 11.978 11.316 25.087 15.026 38.304 14.24 13.217-.786 26.49-6.502 36.7-14.688 10.213-8.185 17.085-18.76 18.747-27.89 1.662-9.13-.39-16.773-10.744-24.377-16.166-11.87-32.615-25.49-42.905-42.527 21.252-18.352 38.77-34.728 47.666-53.412 4.724-9.92 6.77-20.784 4.776-31.83-1.958-10.842-7.585-21.51-16.695-32.28 3.538-3.338 7.284-6.714 11.276-10.14l53.594-45.97-42.897-36.796zm-35.158 106.27c6.904 8.463 10.32 15.766 11.49 22.238 1.252 6.928.173 13.266-3.26 20.476-6.01 12.628-20.036 27.048-38.69 43.527-.613-2.15-1.14-4.345-1.542-6.595-4.18-23.354 4.67-49.706 32.002-79.647zm184.813 0c27.33 29.94 36.185 56.292 32.004 79.646-.403 2.25-.93 4.446-1.543 6.597-18.655-16.48-32.68-30.9-38.693-43.53-3.432-7.21-4.51-13.547-3.26-20.475 1.17-6.472 4.587-13.775 11.49-22.24z" />
      </g>
    </svg>
  );
};
