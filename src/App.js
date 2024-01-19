import Quagga from "quagga";
import { useEffect, useState } from "react";
import Scanner from "./Scanner/Scanner";
import BarcodeItem from "./BarcodeItem/BarcodeItem";
import "./App.css";

function App() {
  const [barcode, setBarcode] = useState("");
  // const [error, setError] = useState(null);
  // const [devices, setDevices] = useState([]);
  const [barcodeList, setBarcodeList] = useState([]);

  const addBarcode = (newBarcode) =>
    setBarcodeList((prevState) => [...prevState, newBarcode]);

  useEffect(() => {
    // navigator.mediaDevices.enumerateDevices().then(setDevices);
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
          area: {
            top: "0%",
            right: "0%",
            left: "0%",
            bottom: "0%",
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
      // setBarcode(result.codeResult.code);
      addBarcode(result.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div className="container">
      <Scanner />
      <ul className="barcode-list">
        {barcodeList.map((barcode, idx) => (
          <BarcodeItem key={idx}>{barcode}</BarcodeItem>
        ))}
      </ul>
    </div>
  );
}

export default App;
