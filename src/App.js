import Quagga from "quagga";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);

  const cameraScannerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(setDevices);
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // вибір тилової камери
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader"],
        },
      },
      function (err) {
        if (err) {
          // console.error("Помилка ініціалізації Quagga: ", err);
          setError(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      // Обробка знайденого штрихкоду
      // console.log("Знайдено штрихкод:", result.codeResult.code);
      setBarcode(result.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div className="container">
      <p className="barcode">{barcode}</p>
      <div
        ref={cameraScannerRef}
        id="scanner-container"
        className="scanner-container cameraScanner"
      >
        {/* Відображення відеопотоку з камери */}
      </div>
      {error && <p className="errorMessage">{JSON.stringify(error)}</p>}
      <ul className="devicesList">
        {devices.map(({ label }) => (
          <li>{label}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
