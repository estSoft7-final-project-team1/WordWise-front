// import { useEffect, useState } from "react";

// const ChatEx = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8080/chat-endpoint");

//     ws.onopen = () => {
//       console.log("WebSocket 연결됨");
//     };

//     ws.onmessage = (event) => {
//       setMessages((prev) => [...prev, event.data]);
//     };

//     ws.onclose = () => {
//       console.log("WebSocket 연결 종료");
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (socket && input.trim()) {
//       socket.send(input);
//       setInput("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-base-200 p-4 flex items-center justify-center">
//       <div className="w-full max-w-2xl h-[calc(100vh-8rem)] bg-base-100 rounded-box shadow-lg flex flex-col">
//         <h2 className="text-xl font-semibold mb-2">WebSocket 채팅</h2>
//         <div className="flex-1 overflow-y-auto p-4 space-y-6">
//           {messages.map((msg, index) => (
//             <p key={index} className="text-sm">{msg}</p>
//           ))}
//         </div>
//         <div className="flex gap-3 p-4 border-t border-base-300">
//           <input
//             type="text"
//             className="input input-bordered flex-1 input-sm"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={sendMessage}
//           >
//             전송
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatEx;
