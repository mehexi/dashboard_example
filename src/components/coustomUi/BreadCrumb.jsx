import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const getBreadcrumbItems = (menuItems, pathname) => {
  const pathParts = pathname.split("/").filter((part) => part);
  let currentPath = "";

  const breadcrumbItems = pathParts.map((part) => {
    currentPath += `/${part}`;
    const menuItem = menuItems.find((item) => item.href === currentPath);
    return menuItem
      ? { ...menuItem, href: currentPath }
      : { label: part, href: currentPath };
  });
  return breadcrumbItems;
};

const DynamicBreadcrumb = ({ menuItems }) => {
  const location = useLocation();

  const breadcrumbItems = getBreadcrumbItems(menuItems, location.pathname);

  return (
    <Breadcrumb className="hidden md:flex uppercase">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
