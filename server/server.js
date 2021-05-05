const zulip = require('zulip-js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;


// const path = require('path');
// const zuliprc = path.resolve(__dirname, '.zuliprc');
const config = { zuliprc: ".zuliprc" };

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(cors());
app.use(morgan('tiny'));

// get Users
app.get('/users', (req, res) => {
  (async  () => {
        const client = await zulip(config);

        await client.users.retrieve({ })
          .then((data) => {
            console.log('Data:', data);
            res.json(data);
          })
          .catch((error) => {
            console.log('error', daerrorta)
          })
    
        // console.log(await client.users.retrieve());
    
        // console.log(await client.users.retrieve({client_gravatar: true}));
    })();
})

// get messages
app.get('/messages/:otherUser', (req, res) => {
  (async () => {
    const client = await zulip(config);

    const mail = req.params.otherUser;

    const readParams = {
        anchor: "newest",
        num_before: 100,
        num_after: 0,
        narrow: [
            {operator: "sender", operand: mail }
        ],
    };

    await client.messages.retrieve(readParams)
      .then((data) => {
        console.log('Data:', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error', daerrorta)
      })
  })();
})

// send message

app.post('/send', (req, res) => {
  (async () => {
    const client = await zulip(config);
    const user_mail_id = req.body.user;
    // const msgType = req.body.msgType;
    const msgContent = req.body.msg;
    params = {
        to: user_mail_id,
        type: "private",
        content: msgContent
    };

    await client.messages.send(params),((error) => {
      if (error) {
        res.status(500).json({ msg: 'Sorry, internal server errors' });
        return;
    }
    
    res.json({
        msg: 'Your msg has been sent!!!'
    });
    }) 
    
  })();

});


// Get own user

app.get('/ownUser', (req, res) => {

  (async () => {
    const client = await zulip(config);

    await client.users.me.getProfile({ })
      .then((data) => {
        console.log('Data:', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error', daeerrorta)
      })

  })();
  
})


// const config = { zuliprc: ".zuliprc-admin" };

// sending a private message

// (async () => {
//   const client = await zulip(config);
  
//   const user_mail_id = "nirmalkumarcse07@gmail.com";
//   params = {
//       to: [user_mail_id],
//       type: "private",
//       content: "Hi bro, This message is sent from node"
//   };
//   console.log(await client.messages.send(params));
// })();


// Get all users

// (async  () => {
//     const client = await zulip(config);

//     console.log(await client.users.retrieve());

//     console.log(await client.users.retrieve({client_gravatar: true}));
// })();





// Create a user

// (async () => {
//     const client = await zulip(config);

//     const params = {
//         email: "techyfresh2k21@gmail.com",
//         password: "TechyFresh2k21",
//         full_name: "Prem Kumar"
//     };
//     console.log(await client.users.create(params));
// })();


// Get a messages 

// (async () => {
//     const client = await zulip(config);

//     const readParams = {
//         anchor: "newest",
//         num_before: 100,
//         num_after: 0,
//         narrow: [
//             {operator: "sender", operand: "dineshvinayakam2065620@gmail.com"},
//             {operator: "stream", operand: "DFreshers" },
//         ],
//     };

//     console.log(await client.messages.retrieve(readParams));
// })();

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));