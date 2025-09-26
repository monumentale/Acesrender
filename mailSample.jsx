  async function sendEmail(user, pass, htmlToSend, email, subject) {
    const url = "https://renderallmybackend.onrender.com/send-mail"; // Replace with your actual server URL
    try {
      const response = await axios.post(url, {
        htmlToSend: htmlToSend,
        user: user,
        pass: pass,
        email: email, //email
        subject: subject,
        CompanyName: "Gravityfinances",
      });
      console.log(response.data.message); // Log the success message
      Swal.fire("Processing!", "The Deposit is Being Processed.", "success");
    } catch (error) {
      console.error(error);
    }
  }
  const SendMailtoClientRenderSMTP = async () => {
    const htmlTemplate = `
    <center style="width: 100%; background-color: #f1f1f1;">
      <div class="email-container" style="max-width: 600px; margin: 0 auto;">
        <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
          <tbody>
            <tr>
              <td class="bg_white" style="padding: 1em 2.5em 0 2.5em;" valign="top">
                <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td class="logo" style="text-align: left;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/gravityes-90eb8.appspot.com/o/logo-com.png?alt=media&amp;token=e485d55a-43fc-4e12-8e01-eb928a67661b">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td class="hero bg_white" style="padding: 2em 0 2em 0;" valign="middle">
                <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="padding: 0 2.5em; text-align: left;">
                        <div class="text">
                          <h4>Gravityfinances- {{notification}}</h4>
                          <h4>Hello {{to_name}}</h4>
                          <h4>{{{message}}}</h4>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <p>For enquires/compliants contact the Admin via any of the communication channels</p>
      </div>
    </center>
    `;
    const message = ` <div style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none;
    mso-line-height-rule: exactly; font-family: arial,'helvetica neue', helvetica, sans-serif; line-height: 21px; color: #333333;
    font-size: 14px;"><strong>Your deposit of $${Amount} for ${Selectedinvestment.title}is being proccesed by Administrator</strong>
    <br ></br>
   </div>`; // Replace with actual message
    const replacedHtml = htmlTemplate
      .replace(/{{notification}}/g, "Deposit") // Replace all occurrences
      .replace(/{{to_name}}/g, userdetails.fullname)
      .replace(/{{{message}}}/g, message);
    const user = "support@gravityfinances.com"; // Replace with your email
    const pass = "gravityfinemail100"; // Replace with your email password
    const email = userdetails.email; // Replace with recipient's email
    const subject = "Deposit"; // Replace with the subject of the email
    sendEmail(user, pass, replacedHtml, email, subject);
  };