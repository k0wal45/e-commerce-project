import classes from "./offers.module.scss";
import Panel from "./Panel/Panel";

const OffersSection = () => {
  return (
    <section className={classes.offers}>
      <Panel />
      <Panel />
      <Panel />
    </section>
  );
};

export default OffersSection;
