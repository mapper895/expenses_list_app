import React from "react";

import { ReactComponent as IconoComida } from "../img/cat_comida.svg";
import { ReactComponent as IconoCompras } from "../img/cat_compras.svg";
import { ReactComponent as IconoCuentasYPagos } from "../img/cat_cuentas-y-pagos.svg";
import { ReactComponent as IconoDiversion } from "../img/cat_diversion.svg";
import { ReactComponent as IconoHogar } from "../img/cat_hogar.svg";
import { ReactComponent as IconoRopa } from "../img/cat_ropa.svg";
import { ReactComponent as IconoSaludEHigiene } from "../img/cat_salud-e-higiene.svg";
import { ReactComponent as IconoTransporte } from "../img/cat_transporte.svg";

const CategoryIcon = ({ id }) => {
  switch (id) {
    case "comida":
      return <IconoComida />;
    case "compras":
      return <IconoCompras />;
    case "cuentas y pagos":
      return <IconoCuentasYPagos />;
    case "diversion":
      return <IconoDiversion />;
    case "hogar":
      return <IconoHogar />;
    case "ropa":
      return <IconoRopa />;
    case "salud e higiene":
      return <IconoSaludEHigiene />;
    case "transporte":
      return <IconoTransporte />;
    default:
      return null;
  }
};

export default CategoryIcon;
