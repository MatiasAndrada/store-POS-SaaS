
import Breadcrumbs from "@/components/breadcrumbs";

import Form from "@/components/projects/create-form";
import { lusitana } from "@/components/fonts";

export default function Page() {


    return (
        <main>
            {/*             <div className="h-screen d-flex flex-col justify-evenly content-between"> */}
            <div className="flex flex-col items-start justify-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: "Projects", href: "/projects" },
                        { label: "Create project", href: "/projects/create", active: true },
                    ]}
                />
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                    Create new project
                </h1>
            </div>
            <div className="h-full flex flex-col items-center justify-between">
                <Form />
            </div>
            {/*             </div> */}
        </main>
    );
}
