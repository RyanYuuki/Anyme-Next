import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row justify-between py-10 pl-5 relative left-[10%] w-[80%] border-t-2 border-b-border">
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-4xl">
          An<span>Y</span>meY
        </h1>
        <p className="text-slate-300">Made by Ryan {">-<"}</p>
        <p className="mt-10 text-sm">Data Provided By Consumet </p>
      </div>
      <div className="flex flex-row gap-20 pr-20">
        <div className="flex flex-col gap-2" >
          <h1>Product</h1>
          <p className="text-slate-300" >Features</p>
          <p className="text-slate-300" >Support</p>
          <p className="text-slate-300" >Changelog</p>
          <p className="text-slate-300" >Download</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Company</h1>
          <p className="text-slate-300" >About Us</p>
          <p className="text-slate-300" >Careers</p>
          <p className="text-slate-300" >Brand</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Developers</h1>
          <p className="text-slate-300" >GitHub</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
