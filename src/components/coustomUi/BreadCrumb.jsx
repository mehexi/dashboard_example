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
  const productIdPattern = /^[0-9a-fA-F]{24}$/;

  const breadcrumbItems = pathParts
    .filter((part) => !productIdPattern.test(part))
    .map((part) => {
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

  if (!menuItems || !location.pathname) {
    return null; // Or a fallback UI
  }

  return (
    <Breadcrumb aria-label="Breadcrumb" className="hidden md:flex uppercase">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isCurrentPage = item.href === location.pathname;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage aria-current="page">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
