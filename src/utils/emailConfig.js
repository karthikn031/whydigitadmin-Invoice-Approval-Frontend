import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SendEmail = async (updatedEmployee, toEmail, data) => {
  for (let i = 0; i < data.length; i++) {
    try {
      const item = data[i];
      const approveLink = `http://localhost:3000/authenticate?action=approve&toEmail=${toEmail}&id=${item.id}`;
      const rejectLink = `http://localhost:3000/authenticate?action=reject&toEmail=${toEmail}&id=${item.id}`;

      const templateParams = {
        empName: updatedEmployee,
        toEmail,
        expenceId: item.expenceId,
        name: item.name,
        amount: item.amount,
        currency: item.currency,
        description: item.description || "N/A",
        docId: item.docId,
        docDate: item.docDate,
        outstanding: item.outStanding,
        creditLimit: item.creditLimit,
        approveLink,
        rejectLink,
      };

      const response = await emailjs.send(
        "service_9y1nnmh",
        "template_823h83c",
        templateParams,
        "A7IEQ6ucoMSeZNw--"
      );

      console.log(`Email sent successfully for item ${i + 1}:`, response);
      await delay(1000); // Delay 1 second between emails
    } catch (error) {
      console.error(`Error sending email for item ${i + 1}:`, error);
    }
  }
};

const EmailConfig = ({ updatedEmployee, toEmail, data }) => {
  useEffect(() => {
    SendEmail(updatedEmployee, toEmail, data);
    console.log("function called");
  }, [updatedEmployee, toEmail, data]);

  return null;
};

export default EmailConfig;
