const firebase = require('../util/firebase.js');
const fetch = require('node-fetch');

module.exports = {
    uploadFile(msg) {
        try {
            //get the attachment and type of attachment; rename the attachment in the format {guild id}{message id}{filetype}
            const attachment = msg.attachments.first();
            const type = attachment.url.match(/.*\.(png|jpeg|jpg|mp4|webp|gif)/i);
            console.log(type);
            if (type === null) return;
            attachment.name = `${msg.guild.id}/${msg.id}.${type[1]}`;
            console.log(attachment.name);

            //create a file in the storage bucket
            const file = firebase.storage.file(attachment.name);
            const writeStream = file.createWriteStream({ contentType: "auto", public: true });
            fetch(attachment.url)
                .then(res => res.body.pipe(writeStream))
                .catch(e => console.log(e));
        } catch (e) { console.log(e); }
    },
    getFile() {

    }
}