"use client";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/link";

export function BackRedirect() {
  const router = useRouter();
  return (
    <Link underline="hover" onPress={() => router.back()}>
      Go back
    </Link>
  );
}
