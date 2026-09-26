type Controller = ReadableStreamDefaultController<Uint8Array>;

const streams = new Map<string, Set<Controller>>();

export function addStream(listId: string, controller: Controller) {
  if (!streams.has(listId)) streams.set(listId, new Set());
  streams.get(listId)!.add(controller);
}

export function removeStream(listId: string, controller: Controller) {
  streams.get(listId)?.delete(controller);
  if (streams.get(listId)?.size === 0) streams.delete(listId);
}

export function broadcast(listId: string, event: string, data: unknown) {
  const controllers = streams.get(listId);
  if (!controllers) return;
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  const encoded = new TextEncoder().encode(payload);
  for (const ctrl of controllers) {
    try {
      ctrl.enqueue(encoded);
    } catch {
      controllers.delete(ctrl);
    }
  }
}
