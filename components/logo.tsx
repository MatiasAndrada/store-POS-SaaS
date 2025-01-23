import Link from "next/link";
import Image from "next/image";

interface IconProps {
  redirect?: string;
}

export const Icon = ({ redirect }: IconProps) => {
  return (
    <Link href={redirect || "#"} passHref>
      <div className="flex items-center cursor-pointer">
        <Image
          src="/assets/icons/store-icon-512x512.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-lg"
        />
      </div>
    </Link>
  );
};

export const IconWithText = ({ redirect }: IconProps) => {
  return (
    <Link href={redirect || "#"} passHref>
      <div className="flex items-center justify-center gap-4 cursor-pointer">
        <Image
          src="/assets/icons/store-icon-512x512.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <h1 className="text-2xl font-bold text-white">SasS POS</h1>
      </div>
    </Link>
  );
};
