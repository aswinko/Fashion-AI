import React from "react";

const BrandSection = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-muted-foreground">
            {" "}
            Built on Cutting-Edge Technologies
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
          {[
            "stack/nextjs.svg",
            "stack/supabase-icon.svg",
            "stack/postgresql.svg",
            "stack/github-logo.svg",
            "stack/vscode.svg",
          ].map((data, i) => (
            <div key={i} className="h-8">
              <img
                src={`/${data}`}
                alt={`Brand ${i}`}
                className="h-full w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
