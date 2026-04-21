import { Controller, Get, Res } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@AllowAnonymous()
@Controller('test')
export class TestController {
  @Get('auth')
  serveAuthTest(@Res() res: any) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Auth Test</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            h1 { color: #333; }
            h2 { color: #666; }
            .form-container { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 5px; background: white; }
            .form-group { margin-bottom: 15px; }
            label { display: inline-block; width: 120px; font-weight: bold; }
            input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 300px; }
            button { padding: 10px 20px; margin: 5px 5px 5px 0; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; }
            button:hover { background: #0056b3; }
            pre { background: #f0f0f0; padding: 10px; border-radius: 5px; overflow-x: auto; border: 1px solid #ddd; }
            .button-group { margin: 20px 0; }
          </style>
      </head>
      <body>
          <h1>🔐 Authentication Test</h1>
          
          <div class="form-container">
            <h2>Sign In Form</h2>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" value="testuser@example.com">
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" value="SecurePass123!">
            </div>
            <div class="button-group">
              <button onclick="signIn()">Sign In</button>
              <button onclick="clearForm()">Clear Form</button>
            </div>
          </div>
          
          <div class="button-group">
            <button onclick="signOut()">Sign Out</button>
            <button onclick="testGraphQL()">Test GraphQL Query</button>
            <button onclick="testProtectedRoute()">Test Protected Route</button>
            <button onclick="checkCookies()">Check Cookies</button>
            <button onclick="clearOutput()">Clear Output</button>
          </div>
          
          <h2>Output:</h2>
          <pre id="output">Ready to test...</pre>

          <script>
              const output = document.getElementById('output');

              function log(message) {
                output.textContent += '\\n' + message;
                console.log(message);
              }

              async function signOut() {
                  output.textContent = '';
                  log('Signing out...');
                  try {
                      const res = await fetch('/api/auth/sign-out', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          credentials: 'include',
                      });
                      
                      log('Response Status: ' + res.status);
                      const data = await res.json();
                      log('Response Body:');
                      log(JSON.stringify(data, null, 2));
                      
                      log('\\n✅ Sign out successful!');
                  } catch (error) {
                      log('❌ Error: ' + error.message);
                  }
              }

              async function signIn() {
                  output.textContent = '';
                  const email = document.getElementById('email').value;
                  const password = document.getElementById('password').value;
                  
                  if (!email || !password) {
                    log('❌ Email and password are required');
                    return;
                  }
                  
                  log('Signing in with email: ' + email);
                  try {
                      const res = await fetch('/api/auth/sign-in/email', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          credentials: 'include',
                          body: JSON.stringify({
                              email: email,
                              password: password
                          })
                      });
                      
                      log('Response Status: ' + res.status);
                      log('Response Headers:');
                      res.headers.forEach((value, key) => {
                        log('  ' + key + ': ' + value);
                      });
                      
                      const data = await res.json();
                      log('\\nResponse Body:');
                      log(JSON.stringify(data, null, 2));
                      
                      log('\\n✅ Sign in successful! Check the Cookies tab to verify the auth cookie was set.');
                  } catch (error) {
                      log('❌ Error: ' + error.message);
                  }
              }

              async function testGraphQL() {
                  output.textContent = '';
                  log('Testing GraphQL query...');
                  try {
                      const res = await fetch('/graphql', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          credentials: 'include',
                          body: JSON.stringify({
                              query: '{ signIn { message } }'
                          })
                      });
                      const data = await res.json();
                      log('GraphQL Response:');
                      log(JSON.stringify(data, null, 2));
                  } catch (error) {
                      log('❌ Error: ' + error.message);
                  }
              }

              async function testProtectedRoute() {
                output.textContent = '';
                log('Testing protected route...');
                try {
                    const res = await fetch('/api/test', {
                        method: 'GET',
                        credentials: 'include',
                    });
                    const data = await res.status === 200 ? await res.text() : await res.json();
                    log('Response Status: ' + res.status);
                    log('Response: ' + JSON.stringify(data, null, 2));
                } catch (error) {
                    log('❌ Error: ' + error.message);
                }
              }

              function checkCookies() {
                  output.textContent = '';
                  if (!document.cookie) {
                      log('❌ No cookies found');
                      return;
                  }
                  log('✅ Cookies found:');
                  log(document.cookie);
              }

              function clearForm() {
                document.getElementById('email').value = 'testuser@example.com';
                document.getElementById('password').value = 'SecurePass123!';
              }

              function clearOutput() {
                output.textContent = '';
              }
          </script>
      </body>
      </html>
    `;
    res.type('text/html').send(html);
  }
}
