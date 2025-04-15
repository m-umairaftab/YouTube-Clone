import React from "react";
import clsx from "clsx";

const SkeletonLoader = ({
  count = 1,
  className = "",
  width = "100%",
  height = "100%",
  borderRadius = "8px",
  layout = "card", // 'text' | 'circle' | 'card'
}) => {
  const baseClasses = clsx(
    "animate-pulse bg-gray-200 dark:bg-gray-700",
    className
  );

  const style = {
    width,
    height,
    borderRadius,
  };

  const getSkeletonShape = () => {
    switch (layout) {
      case "circle":
        return (
          <div
            className={clsx(baseClasses, "rounded-full")}
            style={{ width, height }}
          />
        );
      case "text":
        return (
          <div
            className={clsx(baseClasses, "rounded")}
            style={{ width, height: height || "1rem" }}
          />
        );
      case "card":
      default:
        return <div className={baseClasses} style={style} />;
    }
  };

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="mb-2">
            {getSkeletonShape()}
          </div>
        ))}
    </>
  );
};

export default SkeletonLoader;
