import { WebSocket } from "ws";
const api_saham_key = "AJT3BXFV2N21P9A7";
const socket = new WebSocket(`wss://ws.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${api_saham_key}`);

socket.on("open",()=>{
    console.log("opened")
    socket.send("server berhasil ")
    socket.send(JSON.stringify({
        type: "subscribe",
        symbol :"BBRI.jk"
    }));
});

socket.on('message', (event: string) => {
    const data = JSON.parse(event);

    if (data.data) {
        const price = data.data[0].p;
        const time = new Date(data.data[0].t);

        console.log(`Harga Realtime BBRI: ${price} @ ${time}`);
    }
});
