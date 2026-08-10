import { describe, it, expect, vi } from "vitest";
import { securityService } from "../src/modules/identity/services/SecurityService";

describe("SecurityService", () => {
  it("should not flag login as suspicious under normal circumstances", async () => {
    // Mock db call inside securityService if needed or rely on local test DB.
    // Assuming simple unit test for now:
    vi.mock("@hershield/database", () => ({
      db: {
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue([{ count: 0 }])
          })
        })
      },
      schema: { systemEvents: {} }
    }));

    const result = await securityService.detectSuspiciousLogin("user_123", "127.0.0.1", "test-agent");
    expect(result).toBe(false);
  });
});
