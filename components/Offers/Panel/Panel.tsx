import Image from "next/image";
import classes from "./panel.module.scss";

const Panel = () => {
  return (
    <div className={classes.panel}>
      <Image
        width={700}
        height={700}
        alt="house"
        src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  );
};

export default Panel;
