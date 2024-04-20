import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendListCard = ({
  uid,
  name,
  photoURL,
  currentUser,
}: {
  uid: string;
  name: string;
  photoURL: string;
  currentUser: string;
}) => {
  return (
    <Link
      href={`/profile/${uid}`}
      className="px-3 py-2 flex items-center gap-4 rounded-md hover:bg-accent"
    >
      <div className="relative rounded-full overflow-hidden w-9 h-9">
        <Image
          src={photoURL}
          alt={name}
          fill
          quality={20}
          sizes="(max-width: 1200px) 50vw, 33vw"
          className=""
        />
      </div>
      <h1 className="font-bold text-base">{name}</h1>
    </Link>
  );
};

export default FriendListCard;
