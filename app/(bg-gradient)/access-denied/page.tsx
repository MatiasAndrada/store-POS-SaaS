import Image from "next/image";
import { BackRedirect } from "@/components/back-redirect";
//ui
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Alert } from "@nextui-org/alert";
export default function Page() {
  return (
    <Card className="w-[400px] p-4" shadow="md">
      <CardHeader className="flex flex-col items-center gap-4">
        <Image
          src="/assets/icons/store-icon-192x192.png"
          width={80}
          height={80}
          alt="Icon"
        />
        <h1 className="text-3xl font-semibold">Acceso Denegado</h1>
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-center w-full h-full space-y-4">
        <Alert
          color="danger"
          title="No tienes permisos para acceder a esta página"
        />
      </CardBody>
      <CardFooter className="flex justify-center">
        <BackRedirect />
      </CardFooter>
    </Card>
  );
}
