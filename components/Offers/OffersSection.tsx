import classes from "./offers.module.scss";
import Panel from "./Panel/Panel";

const OffersSection = () => {
  return (
    <section className={classes.offers}>
      <Panel
        image="https://images.unsplash.com/photo-1628744448839-170bf324f27e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Detached House"
        link="houses"
      />
      <Panel
        image="https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Apartment in estate building"
        link="apartments"
      />
      <Panel
        image="https://images.unsplash.com/photo-1702014861736-d62834317c5e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Studio Apartment"
        link="studios"
      />
    </section>
  );
};

export default OffersSection;
