import { Toaster } from "sonner";
import { UIProvider } from "../providers";
const InvitationLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <section className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <UIProvider>
        <Toaster richColors />
        {children}
      </UIProvider>
    </section>
  );
};

export default InvitationLayout;
