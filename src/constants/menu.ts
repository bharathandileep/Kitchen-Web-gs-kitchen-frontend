export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "apps", label: "Apps", isTitle: true },
  {
    key: "apps-ecommerce",
    label: "Ecommerce",
    isTitle: false,
    icon: "shopping-cart",
    children: [
      {
        key: "ecommerce-products",
        label: "Products",
        url: "/apps/ecommerce/products",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-details",
        label: "Product Details",
        url: "/apps/ecommerce/product-details",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-accordian",
        label: "Product Accordian",
        url: "/apps/ecommerce/product-accordian",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-edit-product",
        label: "Add Product",
        url: "/apps/ecommerce/edit-product",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-orders",
        label: "Orders",
        url: "/apps/ecommerce/orders",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-order-details",
        label: "Order Details",
        url: "/apps/ecommerce/order/details",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-checkout",
        label: "Checkout",
        url: "/apps/ecommerce/checkout",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-form-wizard",
        label: "Form Wizard",
        url: "/apps/ecommerce/form-wizard",
        parentKey: "apps-ecommerce",
      },
    ],
  }
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = MENU_ITEMS;
const TWO_COl_MENU_ITEMS: MenuItemTypes[] = MENU_ITEMS;

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
