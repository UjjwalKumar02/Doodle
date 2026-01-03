import { Shapes } from "../../types";

async function GetExistingShapes(roomId: string) {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/room/${roomId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (!res.ok) {
    return [];
  }

  const shapes = await res.json();
  return shapes;
}

export async function Draw({
  canva,
  roomId,
  socket,
}: {
  canva: HTMLCanvasElement;
  roomId: string;
  socket: WebSocket;
}) {
  const ctx = canva.getContext("2d");
  if (!ctx) return;

  let existingShapes: Shapes[] = [];

  let resDate = await GetExistingShapes(roomId);
  resDate.map((data: any) => existingShapes.push(JSON.parse(data.content)));

  let draw = false;
  let startX = 0;
  let startY = 0;
  let previewWidth = 0;
  let previewHeight = 0;

  // Postion Estimator
  const getPos = (e: MouseEvent) => {
    const rect = canva.getBoundingClientRect();
    return {
      posX: e.clientX - rect.left,
      posY: e.clientY - rect.top,
    };
  };

  // Clear and Redraw the shapes
  const redraw = () => {
    ctx.clearRect(0, 0, canva.width, canva.height);

    existingShapes.map((shape) => {
      shape.type === "rect" &&
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    });

    if (draw) {
      ctx.strokeRect(startX, startY, previewWidth, previewHeight);
    }
  };

  redraw();

  // Incoming message handler
  socket.onmessage = (e) => {
    existingShapes.push(JSON.parse(e.data));
    redraw();
  };

  // Mousedown event handler
  canva.addEventListener("mousedown", (e) => {
    draw = true;
    const { posX, posY } = getPos(e);
    startX = posX;
    startY = posY;
  });

  // Mousemove event handler
  canva.addEventListener("mousemove", (e) => {
    if (!draw) return;

    const { posX, posY } = getPos(e);
    previewWidth = posX - startX;
    previewHeight = posY - startY;

    redraw();
  });

  // Mouseup event handler
  canva.addEventListener("mouseup", (e) => {
    draw = false;

    const { posX, posY } = getPos(e);
    const width = posX - startX;
    const height = posY - startY;

    ctx.clearRect(0, 0, canva.width, canva.height);

    const shape: Shapes = {
      type: "rect",
      x: startX,
      y: startY,
      width: width,
      height: height,
    };

    existingShapes.push(shape);

    // Outgoing message
    socket.send(
      JSON.stringify({
        type: "chat",
        content: JSON.stringify(shape),
        roomId,
      })
    );

    redraw();
  });
}
