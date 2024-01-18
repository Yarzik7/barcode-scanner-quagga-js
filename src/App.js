import Quagga from "quagga";
import { useEffect, useState } from "react";
import Scanner from "./Scanner/Scanner";
import "./App.css";

function App() {
  const [barcode, setBarcode] = useState("");
  // const [error, setError] = useState(null);
  // const [devices, setDevices] = useState([]);

  useEffect(() => {
    // navigator.mediaDevices.enumerateDevices().then(setDevices);
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 400,
            height: 200,
            facingMode: "environment", // вибір тилової камери
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader"],
        },
      },
      function (err) {
        if (err) {
          console.error(err);
          // setError(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      // Обробка знайденого штрихкоду
      setBarcode(result.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div className="container">
      <p className="barcode">{barcode}</p>
      <Scanner />
      <ul className="barcode-list"></ul>

      {/* {error && <p className="errorMessage">{JSON.stringify(error)}</p>}
      <ul className="devicesList">
        {devices.map(({ label }) => (
          <li>{label}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
