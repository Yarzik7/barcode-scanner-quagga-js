import css from "./BarcodeItem.module.css";

const BarcodeItem = ({ children }) => {
  return <li className={css.barcodeItem}>{children}</li>;
};

export default BarcodeItem;
