import React from "react";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="h-full flex items-center justify-center">
        {children}
    </section>
  );
};

export default ProfileLayout;
