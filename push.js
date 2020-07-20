var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BA4OTDMxSqkmRFgN9rHiPjeyYEfRbmAsNjsDo_wqVB7HFRz0XXysXIQjZY25_hm5Lg6rY8gosUt3qZpxphB2gtE",
    "privateKey": "3ycFdrcRGPw4IDecMVYvONuSigM-mc9zwpDkKk2sHe0"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fv6Nvy7FkBk:APA91bHY_2k4A_Cv5WdViWGvRbLbk7FsIBi3e3PC1hl2NpRYQX6nSPG3yUHD_auDUnnJ8aByewIo6ZJrYgME7BRyLUGHU8UcOkOwxVxqrXVxxylhQ1u7Scn44NRLANzEb1dTaVwPdDz9",
    "keys": {
        "p256dh": "BOCLnWyz94AIUnVE47ZpIhMKgxmS8eVg9CjnYhZPdP+d48nsnDQPYeiLMhrn05LkWPyEwVQVBd0UOy6S24t/cWs=",
        "auth": "7eUxtKIKlR6DewQDQyeTIw=="
    }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '670940585120',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);