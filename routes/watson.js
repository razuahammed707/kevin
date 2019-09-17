const AssistantV1 = require('ibm-watson/assistant/v1');




exports.sendMessage=async(text)=>{

    const service = new AssistantV1({
        version: '2019-02-28',
        iam_apikey: 'y6mvdsrqzvBklMVCUIACqchH8hZ9v9fVbgxOUoorE4RN',
        url: 'https://gateway.watsonplatform.net/assistant/api'
      });
      
    const reply=await service.message({
        workspace_id: '0c7a335f-63ef-47d7-b18b-7a75cdbd56d2',
        input: {'text': text}
    })

    return reply;

}