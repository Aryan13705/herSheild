import { auth } from "../auth/config";
import { securityService } from "./SecurityService";

export class AuthenticationService {
  /**
   * Internal wrapper for triggering authentication checks or 
   * custom logic outside of standard HTTP requests.
   */
  async validateSession(idToken: string, ipAddress: string, userAgent: string) {
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      
      if (!decodedToken) {
        return null;
      }

      // Suspicious login / token theft detection check
      const isSuspicious = await securityService.detectSuspiciousLogin(
        decodedToken.uid, 
        ipAddress, 
        userAgent
      );

      if (isSuspicious) {
        // Potentially force MFA or block
      }

      return decodedToken;
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      return null;
    }
  }
}

export const authenticationService = new AuthenticationService();
