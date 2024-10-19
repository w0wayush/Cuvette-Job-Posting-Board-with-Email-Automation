export const jobPostingEmail = (jobDetails: {
  jobTitle: string;
  companyName: string;
  recipientName: string;
  experienceLevel: string;
  jobDescription: string;
  applicationDeadline: string;
}) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>New Job Opportunity at ${jobDetails.companyName}</title>
      <style>
          /* Your existing styles */
      </style>
  </head>
  <body>
      <div class="container">
          <img class="logo" src="https://cuvette.tech/assets/images/programPage/cuvetteLogo.png" alt="Cuvette Logo">
          <div class="message">New Job Opportunity</div>
          
          <div class="job-card">
              <p>Hello ${jobDetails.recipientName},</p>
              <p>We found a job opportunity that matches your profile!</p>
              
              <div class="job-title">${jobDetails.jobTitle}</div>
              <div class="company-name">${jobDetails.companyName}</div>
              
              <div class="job-details">
                  <p><span class="detail-label">Experience Level:</span> ${
                    jobDetails.experienceLevel
                  }</p>
                  <p><span class="detail-label">Application Deadline:</span> ${
                    jobDetails.applicationDeadline
                  }</p>
                  <p><span class="detail-label">Job Description:</span></p>
                  <span>${jobDetails.jobDescription}</span>
              </div>
              
              <a href="${
                process.env.APPLICATION_BASE_URL || "[Your-Application-URL]"
              }" class="cta-button">Apply Now</a>
          </div>
          
          <div class="footer">
              <p>This email was sent by ${jobDetails.companyName}</p>
              <p>If you have any questions, please contact us at <a href="mailto:${
                process.env.SUPPORT_EMAIL || "support@cuvette.com"
              }">${process.env.SUPPORT_EMAIL || "support@cuvette.com"}</a></p>
          </div>
      </div>
  </body>
  </html>`;
};
