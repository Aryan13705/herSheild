export class StreamManager {
  private activeStreams: Map<string, ReadableStream> = new Map();

  public registerStream(id: string, stream: ReadableStream) {
    this.activeStreams.set(id, stream);
  }

  /**
   * Allows the UI or Kernel to cancel a long-running generation.
   */
  public async cancelStream(id: string) {
    const stream = this.activeStreams.get(id);
    if (stream) {
      await stream.cancel('User aborted or Kernel timeout');
      this.activeStreams.delete(id);
      console.log(`[StreamManager] Stream ${id} cancelled.`);
    }
  }
}
