import classes from "./layout.module.scss";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={classes.layout}>
      {children}
      {/* <LatestListing /> */}
    </main>
  );
};

export default layout;
