import classes from "./offers.module.scss";
import Panel from "./Panel/Panel";

const OffersSection = () => {
  return (
    <section className={classes.offers}>
      <Panel
        image="https://images.unsplash.com/photo-1628744448839-170bf324f27e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Detached houses"
        link=""
      />
      <Panel
        image="https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Apartment in an estate building"
        link=""
      />
      <Panel
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Modern architecture"
        link="modernhouse"
      />
    </section>
  );
};

export default OffersSection;
