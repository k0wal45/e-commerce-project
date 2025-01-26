import AboutInfo from "@/components/About/Info/AboutInfo";
import UniversalHero from "@/components/Hero/Universal/UniversalHero";
import React from "react";

const page = () => {
  return (
    <main>
      <UniversalHero
        title="About Us"
        image="https://images.unsplash.com/photo-1461272395971-7c6ffaa435b7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        position="center"
      />
      {aboutInfo.map((info, index) => (
        <AboutInfo
          key={index}
          title={info.title}
          text={info.text}
          img={info.img}
        />
      ))}
    </main>
  );
};

export default page;

const aboutInfo = [
  {
    title: "Brief History",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in urna et justo tincidunt sollicitudin. Nullam nec semper est. Nulla facilisi. Ut auctor, nunc in malesuada ultricies, nibh eros tincidunt nunc, nec ultricies nunc nunc nec nunc. Nullam nec semper est. Nulla facilisi. Ut auctor, nunc in malesuada ultricies, nibh eros tincidunt nunc, nec ultricies nunc nunc nec nunc.",
    img: "https://images.unsplash.com/photo-1517309230475-6736d926b979?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Brief History",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in urna et justo tincidunt sollicitudin. Nullam nec semper est. Nulla facilisi. Ut auctor, nunc in malesuada ultricies, nibh eros tincidunt nunc, nec ultricies nunc nunc nec nunc. Nullam nec semper est. Nulla facilisi. Ut auctor, nunc in malesuada ultricies, nibh eros tincidunt nunc, nec ultricies nunc nunc nec nunc.",
    img: "https://images.unsplash.com/photo-1517309230475-6736d926b979?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Brief History",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in urna et justo tincidunt sollicitudin. Nullam nec semper est. Nulla facilisi. Ut auctor, nunc in malesuada ultricies, nibh eros tincidunt nunc, nec ultricies nunc nunc nec nunc. Nullam nec semper est. Nulla facilisi. Ut auctor, nunc in malesuada ultricies, nibh eros tincidunt nunc, nec ultricies nunc nunc nec nunc.",
    img: "https://images.unsplash.com/photo-1517309230475-6736d926b979?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
