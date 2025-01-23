import NextLink from "next/link";
import Image from "next/image";
//ui
import { Link } from "@nextui-org/link";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Alert } from "@nextui-org/alert";
export const ErrorCard = () => {
  return (
    <Card className="min-w-[400px] p-4">
      <CardHeader className="flex flex-col items-center gap-4">
        <Image
          src="/assets/icons/store-icon-192x192.png"
          width={80}
          height={80}
          alt="Icon"
        />
      </CardHeader>
      <CardBody>
        <Alert color="danger">Error: 404</Alert>
      </CardBody>
      <CardFooter className="flex flex-col items-center gap-4">
        <NextLink href="/" passHref legacyBehavior>
          <Link underline="hover" size="md">
            Go back
          </Link>
        </NextLink>
      </CardFooter>
    </Card>
  );
};
