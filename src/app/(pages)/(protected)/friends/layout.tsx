import React from "react";

const FriendsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
  <div className="h-full px-14 lg:px-36 py-3 flex justify-center">
    {children}
    </div>
);
};

export default FriendsLayout;
