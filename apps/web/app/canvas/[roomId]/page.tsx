import RoomClient from "../../../components/RoomClient";

export default async function CanvasRoom({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const roomId = (await params).roomId;

  return <RoomClient roomId={roomId} />;
}
