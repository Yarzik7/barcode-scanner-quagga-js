import Quagga from "quagga";
import { useEffect, useState } from "react";
import Scanner from "./Scanner/Scanner";
import BarcodeItem from "./BarcodeItem/BarcodeItem";
import "./App.css";

function App() {
  // const [barcode, setBarcode] = useState("");
  // const [devices, setDevices] = useState([]);
  const [barcodeList, setBarcodeList] = useState([]);

  const addBarcode = (newBarcode) =>
    setBarcodeList((prevState) => [...prevState, newBarcode]);

  useEffect(() => {
    // navigator.mediaDevices
    //   .enumerateDevices()
    //   .then((devices) =>
    //     setDevices(devices.filter(({ kind }) => kind === "videoinput"))
    //   );

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
            deviceId:
              "e50a135e883ac85ff6307e1efa2c90a15d65f60f2b6ea1eb47dfcd5006f6dc14", // e8901f74866f821db235ea2907f2691e017fb990b324707b4f803bc3d545281d e50a135e883ac85ff6307e1efa2c90a15d65f60f2b6ea1eb47dfcd5006f6dc14
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
          return;
        }

        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      // Обробка знайденого штрихкоду
      // setBarcode(result.codeResult.code);
      addBarcode(result.codeResult.code);
      // Quagga.stop();
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
      {/* <ul className="barcode-list" style={{ display: "block" }}>
        {devices.map((device, idx) => (
          <BarcodeItem key={idx}>
            <p>{device.deviceId}</p>
            <p>{device.label}</p>
          </BarcodeItem>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
