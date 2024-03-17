# Secure Single Page Applications
##### Recommendations from XM NETSEC Department

## Cross-Site Scripting (XSS) Attacks

### Problem
The SPAs are less immune to the XSS attacks.
By using XSS, hackers can inject the client-side
scripts into the web applications.

### Recommendation

Angular has a built-in protection against common web-application vulnerabilities and attacks
such as XSS attack, as described [here](https://angular.io/guide/security). To systematically
block XSS bugs, Angular treats all values as untrusted by default. When a value is inserted
into the DOM from a template, via property, attribute, style, class binding, or interpolation,
Angular recognizes the value as unsafe and automatically sanitizes it. It is very important
to have developers to follow the best practices and security web configuration as described
in Angular security guide, such as:
* Keep current with the latest Angular library releases
* Do not modify angular source code
* Avoid practices that are marked as Security Risk in the [official documentation](https://angular.io/api?status=security-risk)
* Direct use of the DOM APIs and explicit sanitization calls
* Content security policy (CSP) is an HTTP header. [details](https://blogs.akamai.com/sitr/2018/10/security-response-headers-what-they-are-why-you-should-care-and-how-akamai-can-help.html)
* Use the offline template compiler
* Use a templating language that automatically escapes values to prevent XSS
  vulnerabilities on the server. Don&#39;t generate Angular templates on the server side using
  a templating language; doing this carries a high risk of introducing template-injection
  vulnerabilities.

## Exposure of sensitive data.

### Problem

If developers aren’t careful about what data is contained in the initial page load,
they can easily send data that shouldn’t be exposed to all users. The whole of a SPA
isn’t generally visible in the browser, which can provide a false sense of security.
[details](https://www.akamai.com/us/en/multimedia/documents/white-paper/how-akamai-augments-your-security-practice-to-mitigate-the-owasp-top-10-risks.pdf)

### Recommendation

Some implementers keep 'sensitive data entry' on a separate page from the rest of their
application, a page that can be tightly controlled and locked down as best as possible,
preferably one that is difficult to phis users with.

## Missing Access Control at the Functional Level

### Problem

Since developers move features and logic off the server and out to the client,
it’s really easy to provide a client with access to functions that they shouldn’t
to be permitted to use.

### Recommendation

Missing Function Level Access Control is one of the vulnerabilities on OWASP.
 The below blog post provides a PoC [video](https://blog.detectify.com/2016/07/13/owasp-top-10-missing-function-level-access-control-7) and remediation's.

## Additional Security checks:

* Monitoring/reporting of APIs
* Use token-based authentication. Do not use cookies
** JWT should not contain any sensitive data stored in the payload of the token, as the header and payload are Base64URL encoded and it is not encrypted. Otherwise you can use JWE that allows you to encrypt the contents of the JWT
* Store tokens in sessionStorage (is cleared as soon as the user closes the browser) instead of local storage
* CORS Access-Control-Allow-Origin: wildcard “*” is ok if cookies are not used, and it may be necessary to work with your [design](https://blog.angular-university.io/service-workers)
* Use frameworks that prevent XSS by default (Angular2 does it by automatically sanitizing inputs and prevents arbitrary code execution)
* Enable Content Security Policy (CSP) as a defense in depth
