import Quagga from "quagga";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [barcode, setBarcode] = useState("");
  // const [error, setError] = useState(null);
  // const [devices, setDevices] = useState([]);

  const cameraScannerRef = useRef();

  useEffect(() => {
    // Отримати список доступних пристроїв
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        // Знайти камеру за допомогою фільтрації за kind і label
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        if (videoDevices.length > 0) {
          // Використовуємо ідентифікатор першої знайденої камери
          const deviceId = videoDevices[4].deviceId;

          // Ініціалізуємо QuaggaJS з вказаною камерою
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
                  deviceId: deviceId, // вибір конкретної камери за ідентифікатором
                },
              },
              decoder: {
                readers: ["ean_reader", "upc_reader"],
              },
            },
            function (err) {
              if (err) {
                console.error("Помилка ініціалізації Quagga: ", err);
                return;
              }
              Quagga.start();
            }
          );
        } else {
          console.error("Немає доступних камер");
        }
      })
      .catch((error) => {
        console.error("Помилка отримання доступу до камер: ", error);
      });

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
      <div
        ref={cameraScannerRef}
        id="scanner-container"
        className="scanner-container cameraScanner"
      >
        {/* Відображення відеопотоку з камери */}
      </div>
      {/* {error && <p className="errorMessage">{JSON.stringify(error)}</p>} */}
      {/* <ul className="devicesList">
        {devices.map(({ label }) => (
          <li>{label}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
