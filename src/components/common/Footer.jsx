import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row bg-primary-foreground/60 justify-between mt-[100px] relative w-[100%] px-[10%] py-10 border-t-2 border-b-border">
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-4xl">
          An<span>Y</span>meY
        </h1>
        <p className="text-primary">Made by Ryan {">-<"}</p>
        <p className="mt-10 text-sm">Data Provided By Consumet </p>
      </div>
      <div className="flex flex-row gap-20 pr-20">
        <div className="flex flex-col gap-2" >
          <h1>Product</h1>
          <p className="text-primary" >Features</p>
          <p className="text-primary" >Support</p>
          <p className="text-primary" >Changelog</p>
          <p className="text-primary" >Download</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Company</h1>
          <p className="text-primary" >About Us</p>
          <p className="text-primary" >Careers</p>
          <p className="text-primary" >Brand</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Developers</h1>
          <p className="text-primary" >GitHub</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
