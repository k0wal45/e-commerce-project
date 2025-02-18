import type { Features } from "@/utils/Types";
import classes from "./features.module.scss";

const Features = ({ features }: { features: Features }) => {
  return (
    <div className={classes.features}>
      <h2>Features</h2>
      <div className={classes.container}>
        {Object.entries(features).map(
          ([key, value]) =>
            value !== 0 &&
            value !== null &&
            value !== undefined &&
            value !== false && (
              <div key={key} className={classes.feature}>
                <span className={classes.label}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </span>
                <span>
                  {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                  {key === "area" ? " m²" : ""}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Features;
