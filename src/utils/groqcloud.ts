// import axios from "axios";
require("dotenv").config();

const getSummary = async (content: any) => {
  try {
    // const response = await axios.post(
    //   'https://api.groq.com/openai/v1/chat/completions',
    //   {
    //     model: "llama3-8b-8192",
    //     messages: [
    //       {
    //         role: "user",
    //         content: content
    //       }
    //     ]
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    //     }
    //   }
    // );

    // console.log(response.data, "from sms top");
    

    return "Test" //response.data;
  } catch (error) {
    console.log(error, "from sms top");
    return error;
  }
};

export default { getSummary };
