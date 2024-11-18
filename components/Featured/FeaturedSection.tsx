import Card from "./Card/Card";
import classes from "./featured.module.scss";

const FeaturedSection = () => {
  return (
    <section className={classes.featured}>
      <h2>Home Office Essentials</h2>
      <ul>
        <Card />
      </ul>
    </section>
  );
};

export default FeaturedSection;
