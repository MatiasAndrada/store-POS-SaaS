/* import { Suspense } from "react";
import { Loader1 } from "@/components/loaders";
import { NewVerificationForm } from "@/components/invitation/new-invitation-form";
 import { fetch_invitation_by_token } from "@/data/invitations";
import { getUserByEmail } from "@/data/user"; 

export default async function Page({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) {

  ?Comportamiento de la pagina 
  El searchParam que recibe es el token de la invitación
  Con este token buscarlo en la base de datos 
  * Si no existe el token mostrar un error
  Verificar si el email enlazado al token tiene un usuario
  * Si existe mostrar las opciones de aceptar o rechazar la invitación
  En caso de no existir redirigir a la pagina de registro 
  * Una vex creado el usuario o al estar logueado redirigir a la pagina de invitación


  return (
    <Suspense fallback={<Loader1 />}>
      <NewVerificationForm />
    </Suspense>
  );
}
 */