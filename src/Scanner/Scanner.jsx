import css from "./Scanner.module.css";

const Scanner = () => {
  return (
    <div
      id="scanner-container"
      className={["scanner-container cameraScanner", css.scanner].join(" ")}
    >
      <div className={css.scanOverlay}>
        <div className={css.scanField}></div>
      </div>
    </div>
  );
};

export default Scanner;
