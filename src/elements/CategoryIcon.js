import React from "react";

import { ReactComponent as FoodIcon } from "../img/cat_comida.svg";
import { ReactComponent as ShopIcon } from "../img/cat_compras.svg";
import { ReactComponent as BillsIcon } from "../img/cat_cuentas-y-pagos.svg";
import { ReactComponent as FunIcon } from "../img/cat_diversion.svg";
import { ReactComponent as HomeIcon } from "../img/cat_hogar.svg";
import { ReactComponent as ClothesIcon } from "../img/cat_ropa.svg";
import { ReactComponent as HealthIcon } from "../img/cat_salud-e-higiene.svg";
import { ReactComponent as TransportIcon } from "../img/cat_transporte.svg";

const CategoryIcon = ({ id }) => {
  switch (id) {
    case "comida":
      return <FoodIcon />;
    case "compras":
      return <ShopIcon />;
    case "cuentas y pagos":
      return <BillsIcon />;
    case "diversion":
      return <FunIcon />;
    case "hogar":
      return <HomeIcon />;
    case "ropa":
      return <ClothesIcon />;
    case "salud e higiene":
      return <HealthIcon />;
    case "transporte":
      return <TransportIcon />;
    default:
      return null;
  }
};

export default CategoryIcon;
