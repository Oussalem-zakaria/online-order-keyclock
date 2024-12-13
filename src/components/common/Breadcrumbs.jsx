import { Breadcrumbs } from "@material-tailwind/react";

export function BreadcrumbsDefault({ children }) {
  return <Breadcrumbs className="bg-blue-100">{children}</Breadcrumbs>;
}