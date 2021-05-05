const zulip = require("zulip-js");

// Pass the path to your zuliprc file here.
const config = { zuliprc: ".zuliprc" };

// Get queue_id

// (async () => {
//     const client = await zulip(config);

//     // Register a queue
//     const params = {
//         event_types: ["message"],
//     };

//     console.log(await client.queues.register(params));
// })();

// Get own user

(async () => {
    const client = await zulip(config);

    // Get the profile of the user/bot that requests this endpoint,
    // which is `client` in this case:
    console.log(await client.users.me.getProfile());
})();