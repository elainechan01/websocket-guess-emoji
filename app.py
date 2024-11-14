import asyncio
import websockets
import json

from charades import Charades

async def handler(websocket):
    game = Charades()

    async for act in websocket:
        try:
            act = game.player_verify_answer(act)
        except ValueError as exc:
            event = {
                "type": "error",
                "message": str(exc),
            }
            await websocket.send(json.dumps(event))
            continue
        
    
async def main():
    async with websockets.serve(handler, '', 8000):
        await asyncio.get_running_loop().create_future()


if __name__ == "__main__":
    asyncio.run(main())