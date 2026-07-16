import { auth } from "../auth/config";
import { securityService } from "./SecurityService";

export class AuthenticationService {
  /**
   * Internal wrapper for triggering authentication checks or 
   * custom logic outside of standard HTTP requests.
   */
  async validateSession(sessionToken: string, ipAddress: string, userAgent: string) {
    const session = await auth.api.getSession({
      headers: new Headers({
        "cookie": \`better-auth.session_token=\${sessionToken}\`
      })
    });

    if (!session) {
      return null;
    }

    // Suspicious login / token theft detection check
    const isSuspicious = await securityService.detectSuspiciousLogin(
      session.user.id, 
      ipAddress, 
      userAgent
    );

    if (isSuspicious) {
      // Potentially force MFA or block
    }

    return session;
  }
}

export const authenticationService = new AuthenticationService();
